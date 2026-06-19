import pandas as pd
import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("[ERROR] URL atau KEY Supabase belum diatur di file .env!")
    exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def load_csv_to_supabase(file_name, sumber_data):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.dirname(current_dir)
    file_path = os.path.join(backend_dir, "data", file_name)
    
    if not os.path.exists(file_path):
        print(f"[ERROR] File {file_name} tidak ditemukan di folder data!")
        return

    print(f"\n[Load] Membaca data dari {file_name}...")
    df = pd.read_csv(file_path)

    df = df.where(pd.notnull(df), None)

    records_inserted = 0
    
    print(f"[Load] Mengunggah {len(df)} baris data ke tabel 'papers'...")
    for index, row in df.iterrows():
        data_payload = {
            "id_artikel": row["id_artikel"],
            "judul": row["judul_bersih"],
            "penulis": row["penulis"],
            "abstrak": row["abstrak_bersih"],
            "tanggal": row["tanggal"],
            "link_pdf": row["link_pdf"],
            "sumber": sumber_data,
            "keywords": row["keywords"]
        }
        
        try:
            supabase.table("papers").upsert(
                data_payload, 
                on_conflict="id_artikel"
            ).execute()
            records_inserted += 1
        except Exception as e:
            print(f"Gagal mengunggah baris ke-{index}: {e}")
            
    print(f"[Sukses] Berhasil mengunggah {records_inserted} data dari {file_name}!")

if __name__ == "__main__":
    print("=== MEMULAI FASE LOAD (SILVER TO CLOUD DATABASE) ===")
    
    load_csv_to_supabase("clean_papers.csv", "E-Journal UNESA")
    
    print("\n=== FASE LOAD SELESAI: DATABASE SIAP DIGUNAKAN ===")