import requests
import xml.etree.ElementTree as ET

url = "https://ejournal.unesa.ac.id/index.php/jinacs/oai"

resp = requests.get(url, params={
    "verb": "ListRecords",
    "metadataPrefix": "oai_dc"
}, timeout=15)

root = ET.fromstring(resp.text)

records = root.findall('.//{http://www.openarchives.org/OAI/2.0/}record')

for rec in records[:5]:
    meta = rec.find('.//{http://www.openarchives.org/OAI/2.0/}metadata')
    if meta is not None:
        print(ET.tostring(meta, encoding='unicode'))
        print("---")

token_el = root.find('.//{http://www.openarchives.org/OAI/2.0/}resumptionToken')
if token_el is not None:
    print(f"\nresumptionToken  : {token_el.text}")
    print(f"completeListSize : {token_el.attrib.get('completeListSize', '?')}")
    print(f"cursor           : {token_el.attrib.get('cursor', '?')}")