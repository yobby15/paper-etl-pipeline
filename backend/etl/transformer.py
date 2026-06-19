import pandas as pd
import os
import re
import yake

yake_extractor = yake.KeywordExtractor(lan="id", n=2, dedupLim=0.9, top=5)

def clean_text(text):
    if not isinstance(text, str):
        return "-"
    text = text.replace("&nbsp;", " ")
    text = re.sub(r'<[^>]+>', '', text)
    text = " ".join(text.split())
    return text

def ekstrak_kata_kunci(teks):
    if not teks or teks == "-":
        return "-"
    keywords_score = yake_extractor.extract_keywords(teks)
    keywords_list = [kw[0] for kw in keywords_score]
    return ", ".join(keywords_list)

def run_transformation():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.dirname(current_dir)
    data_dir = os.path.join(backend_dir, "data")
    
    path_papers = os.path.join(data_dir, "raw_papers_gabungan.json")
    
    print("=== MEMULAI TRANSFORMASI DATA (SILVER LAYER) ===\n")
    
    if os.path.exists(path_papers):
        print("[1] Memproses Data E-Journal...")
        df_papers = pd.read_json(path_papers)
        print(f"    -> Data awal: {len(df_papers)} baris")
        
        df_papers['judul_bersih'] = df_papers['judul'].apply(clean_text)
        df_papers['abstrak_bersih'] = df_papers['abstrak'].apply(clean_text)
        
        df_papers_bersih = df_papers[df_papers['abstrak_bersih'].str.len() > 15].copy()
        
        print("[2] Mengekstrak Kata Kunci dengan NLP YAKE! (Mohon tunggu sebentar)...")
        df_papers_bersih['keywords'] = df_papers_bersih['abstrak_bersih'].apply(ekstrak_kata_kunci)
        
        out_papers = os.path.join(data_dir, "clean_papers.csv")
        df_papers_bersih.to_csv(out_papers, index=False, encoding='utf-8')
        print(f"    -> Data bersih (setelah filter & NLP): {len(df_papers_bersih)} baris")
        print(f"    -> Tersimpan di: {out_papers}\n")
    else:
        print(f"[ERROR] File {path_papers} tidak ditemukan!")

    print("=== TRANSFORMASI SELESAI ===")

if __name__ == "__main__":
    run_transformation()