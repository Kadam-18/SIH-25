# import firebase_admin
# from firebase_admin import credentials

# cred = credentials.Certificate("backend/backend01/firebase_key.json")
# firebase_admin.initialize_app(cred)


import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate(
    "D:/SIH/SIH-25/ayushcare/backend/backend01/firebase_key.json"
)
firebase_admin.initialize_app(cred)
