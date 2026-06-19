import requests
import xml.etree.ElementTree as ET
import json
import time
import os

def harvest_all_papers(journal_slug):
    base_url = f"https://ejournal.unesa.ac.id/index.php/{journal_slug}/oai"
    params = {"verb": "ListRecords", "metadataPrefix": "oai_dc"}
    
    NS = {
        'oai': 'http://www.openarchives.org/OAI/2.0/',
        'dc': 'http://purl.org/dc/elements/1.1/',
        'oai_dc': 'http://www.openarchives.org/OAI/2.0/oai_dc/'
    }
    
    all_papers = []
    has_more_data = True
    page = 1

    print(f"Mulai ekstraksi dari: {journal_slug}...")

    while has_more_data:
        print(f"Mengambil halaman {page}...")
        try:
            resp = requests.get(base_url, params=params, timeout=20)
            root = ET.fromstring(resp.text)
        except Exception as e:
            print(f"Error koneksi/parsing: {e}")
            break

        records = root.findall('.//oai:record', NS)
        
        for rec in records:
            header = rec.find('.//oai:header', NS)
            if header is not None and header.attrib.get('status') == 'deleted':
                continue

            meta = rec.find('.//oai_dc:dc', NS)
            if meta is not None:
                
                penulis_tags = meta.findall('dc:creator', namespaces=NS)
                daftar_penulis = ", ".join([p.text for p in penulis_tags if p.text])

                paper = {
                    "id_artikel": header.findtext('oai:identifier', namespaces=NS),
                    "judul": meta.findtext('dc:title', namespaces=NS) or "TANPA JUDUL",
                    "penulis": daftar_penulis or "-",
                    "abstrak": meta.findtext('dc:description', namespaces=NS) or "-",
                    "tanggal": meta.findtext('dc:date', namespaces=NS) or "-",
                    "link_pdf": meta.findtext('dc:relation', namespaces=NS) or "-"
                }
                all_papers.append(paper)

        token_el = root.find('.//oai:resumptionToken', NS)
        if token_el is not None and token_el.text:
            params = {"verb": "ListRecords", "resumptionToken": token_el.text}
            page += 1
            time.sleep(1)
        else:
            has_more_data = False

    return all_papers


daftar_jurnal = [
    "jinacs"
]

semua_data_gabungan = []

for slug in daftar_jurnal:
    hasil = harvest_all_papers(slug)
    print(f"Berhasil mengekstrak {len(hasil)} artikel dari {slug}!\n")
    semua_data_gabungan.extend(hasil)

print(f"Total keseluruhan artikel yang diekstrak: {len(semua_data_gabungan)}")

current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.dirname(current_dir)

data_dir = os.path.join(backend_dir, "data")

if not os.path.exists(data_dir):
    os.makedirs(data_dir)

file_path = os.path.join(data_dir, "raw_papers_gabungan.json")

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(semua_data_gabungan, f, ensure_ascii=False, indent=4)

print(f"Semua data mentah berhasil disimpan di '{file_path}'")