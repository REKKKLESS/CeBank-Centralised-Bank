import requests
import json
url = 'http://localhost:3000/'
resp = requests.post(url,json={"message":"Hello"})
print(resp.json())

