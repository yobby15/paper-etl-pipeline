import requests
import xml.etree.ElementTree as ET
import json

BASE = "https://ejournal.unesa.ac.id/index.php"

NS = {
    'oai': 'http://www.openarchives.org/OAI/2.0/',
    'dc':  'http://purl.org/dc/elements/1.1/',
    'oai_dc': 'http://www.openarchives.org/OAI/2.0/oai_dc/',
}

def cek_jurnal(slug):
    """Cek apakah jurnal aktif dan ambil 3 artikel pertama"""
    url = f"{BASE}/{slug}/oai"
    
    resp = requests.get(url, params={"verb": "Identify"}, timeout=10)
    if resp.status_code != 200:
        print(f"[ERROR] {slug} tidak bisa diakses (status {resp.status_code})")
        return
    
    root = ET.fromstring(resp.text)
    nama = root.findtext('.//oai:repositoryName', namespaces=NS)
    print(f"\n✓ Jurnal aktif: {nama}")
    print(f"  URL: {url}")

    resp2 = requests.get(url, params={
        "verb": "ListRecords",
        "metadataPrefix": "oai_dc"
    }, timeout=15)
    
    root2 = ET.fromstring(resp2.text)
    records = root2.findall('.//oai:record', NS)
    print(f"  Total record ditemukan (halaman pertama): {len(records)}")
    
    print("\n  Contoh 3 artikel pertama:")
    for i, rec in enumerate(records[:3]):
        meta = rec.find('.//oai_dc:dc', NS)
        if meta is None:
            continue
        judul   = meta.findtext('dc:title',       namespaces=NS) or "-"
        penulis = meta.findtext('dc:creator',     namespaces=NS) or "-"
        tanggal = meta.findtext('dc:date',        namespaces=NS) or "-"
        print(f"\n  [{i+1}] {judul}")
        print(f"       Penulis : {penulis}")
        print(f"       Tanggal : {tanggal}")

JURNAL_TARGET = {
    "Teknik Informatika (utama)": "jinacs",
}

for nama, slug in JURNAL_TARGET.items():
    print(f"\n{'='*50}")
    print(f"Mengecek: {nama}")
    cek_jurnal(slug)