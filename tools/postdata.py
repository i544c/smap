import requests
import json

data = json.load(open("dummy_data/data.json"))

for one in data:
    print(one)
    r = requests.post("http://localhost:8080/sumari", json=one)
    print(r.text)
