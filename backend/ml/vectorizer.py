import pandas as pd
import os
import pickle
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv

load_dotenv()

def build_local_model():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.dirname(current_dir)
    data_dir = os.path.join(backend_dir, "data")
    file_path = os.path.join(data_dir, "clean_papers.csv")
    
    if not os.path.exists(file_path):
        print(f"[ERROR] File {file_path} tidak ditemukan!")
        return

    print("1. Memuat dataset jurnal...")
    df = pd.read_csv(file_path)
    
    df['abstrak_bersih'] = df['abstrak_bersih'].fillna("Tidak ada abstrak")
    daftar_abstrak = df['abstrak_bersih'].tolist()

    print("2. Mengunduh dan memuat Model AI (paraphrase-multilingual-MiniLM-L12-v2)...")
    model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')

    print("3. AI sedang membaca dan mengubah abstrak menjadi vektor (Embedding)...")
    embeddings = model.encode(daftar_abstrak, show_progress_bar=True)

    print(f"   -> Selesai! Ukuran matriks vektor: {embeddings.shape}")

    output_model_path = os.path.join(data_dir, "paper_embeddings.pkl")
    
    data_to_save = {
        "id_artikel": df['id_artikel'].tolist(),
        "judul": df['judul_bersih'].tolist(),
        "embeddings": embeddings
    }
    
    with open(output_model_path, "wb") as f:
        pickle.dump(data_to_save, f)
        
    print(f"4. Berhasil menyimpan model embedding di: {output_model_path}")
    print("=== MODEL LOKAL SIAP DIGUNAKAN! ===")

if __name__ == "__main__":
    build_local_model()