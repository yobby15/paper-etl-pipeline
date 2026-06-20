from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
import os
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv
from contextlib import asynccontextmanager
from apscheduler.schedulers.background import BackgroundScheduler
import subprocess
from datetime import datetime

current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.dirname(current_dir)
env_path = os.path.join(backend_dir, ".env")

load_dotenv(env_path)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

print("[INFO] Memuat Model AI ke GPU...")
model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2', device='cuda')

def auto_run_pipeline():
    print(f"\n[CRON {datetime.now().strftime('%H:%M:%S')}] Memulai eksekusi Pipeline ETL+V Penuh...")
    try:
        etl_dir = os.path.join(backend_dir, "etl")
        ml_dir = os.path.join(backend_dir, "ml")
        
        extractor_path = os.path.join(etl_dir, "extractor.py")
        transformer_path = os.path.join(etl_dir, "transformer.py")
        loader_path = os.path.join(etl_dir, "loader.py")
        vectorizer_path = os.path.join(ml_dir, "vectorizer.py")
        upload_vectors_path = os.path.join(ml_dir, "upload_vectors.py")
        
        print(">> [1/5] Menjalankan Extractor (Menarik data dari OAI-PMH)...")
        subprocess.run(["uv", "run", "python", extractor_path], check=True)
        
        print(">> [2/5] Menjalankan Transformer (Cleaning data & format tabular)...")
        subprocess.run(["uv", "run", "python", transformer_path], check=True)
        
        print(">> [3/5] Menjalankan Loader (Mengunggah data teks ke Supabase)...")
        subprocess.run(["uv", "run", "python", loader_path], check=True)
        
        print(">> [4/5] Menjalankan Vectorizer (Membuat embedding abstrak via GPU CUDA)...")
        subprocess.run(["uv", "run", "python", vectorizer_path], check=True)
        
        print(">> [5/5] Menjalankan Upload Vectors (Sinkronisasi pgvector ke Cloud)...")
        subprocess.run(["uv", "run", "python", upload_vectors_path], check=True)
        
        print("[CRON] 🎉 Seluruh Siklus ETL+V Otomatis Berhasil Diselesaikan dengan Sempurna!\n")
    except subprocess.CalledProcessError as e:
        print(f"[CRON] ❌ Proses terhenti karena terjadi error pada salah satu skrip: {e}\n")
    except Exception as e:
        print(f"[CRON] ❌ Terjadi kesalahan sistem tak terduga: {e}\n")

@asynccontextmanager
async def lifespan(app: FastAPI):
    scheduler = BackgroundScheduler()
    
    # scheduler.add_job(auto_run_pipeline, 'interval', minutes=1)
    
    scheduler.add_job(auto_run_pipeline, 'cron', day_of_week='sun', hour=0, minute=0)
    
    scheduler.start()
    print("[INFO] Mesin Scheduler otomatis diaktifkan.")
    
    yield 
    
    scheduler.shutdown()
    print("[INFO] Mesin Scheduler dimatikan.")

app = FastAPI(title="API Paper Cerdas v2 (Cloud Vector)", lifespan=lifespan)


_default_origins = "http://localhost:5173,http://127.0.0.1:5173"
allowed_origins = os.getenv("FRONTEND_ORIGINS", _default_origins).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Sistem Temu Kembali Informasi AI siap!"}

@app.get("/search/semantic")
def semantic_search(query: str, limit: int = 5):
    query_vector = model.encode(query).tolist()
    
    response = supabase.rpc("match_papers", {
        "query_embedding": query_vector,
        "match_threshold": 0.2, 
        "match_count": limit
    }).execute()
    
    return response.data

def buat_id_penulis_unik(nama):
    kata_kata = nama.replace(",", " ").replace(".", " ").lower().split()
    kata_kata.sort()
    return " ".join(kata_kata)

@app.get("/papers/graph")
def get_graph_data(limit: int = 50):
    response = supabase.table("papers").select("id_artikel, judul, penulis").limit(limit).execute()
    
    nodes = []
    edges = []
    node_ids = set()
    
    for item in response.data:
        paper_id = item['id_artikel']
        
        if paper_id not in node_ids:
            nodes.append({"id": paper_id, "label": item['judul'], "group": "paper"})
            node_ids.add(paper_id)
            
        if item['penulis'] and item['penulis'] != "-":
            authors = [a.strip() for a in item['penulis'].split(";") if a.strip()]
            
            for author in authors:
                author_id_unik = buat_id_penulis_unik(author)
                
                if author_id_unik not in node_ids:
                    nodes.append({"id": author_id_unik, "label": author, "group": "author"})
                    node_ids.add(author_id_unik)
                
                edges.append({
                    "source": author_id_unik, 
                    "target": paper_id,
                    "relation": "wrote"
                })
                
    return {"nodes": nodes, "edges": edges}