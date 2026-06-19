import os
import pickle
from supabase import create_client, Client
from dotenv import load_dotenv

current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.dirname(current_dir)
env_path = os.path.join(backend_dir, ".env")
pkl_path = os.path.join(backend_dir, "data", "paper_embeddings.pkl")

load_dotenv(env_path)
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def upload_ke_cloud():
    print("[INFO] Membaca file pkl...")
    if not os.path.exists(pkl_path):
        print(f"[ERROR] File tidak ditemukan di {pkl_path}")
        return

    with open(pkl_path, "rb") as f:
        data = pickle.load(f)

    total_data = len(data['id_artikel'])
    print(f"[INFO] Ditemukan {total_data} vektor. Memulai proses unggah ke Supabase...")

    for i in range(total_data):
        id_artikel = data['id_artikel'][i]
        embedding_list = data['embeddings'][i].tolist()

        supabase.table('papers').update({'embedding': embedding_list}).eq('id_artikel', id_artikel).execute()
        
        print(f"[{i+1}/{total_data}] Berhasil sinkronisasi vektor untuk: {id_artikel}")

    print("=== PROSES MIGRASI VEKTOR SELESAI ===")

if __name__ == "__main__":
    upload_ke_cloud()