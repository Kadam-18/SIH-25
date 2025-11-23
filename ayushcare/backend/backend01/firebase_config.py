# import firebase_admin
# from firebase_admin import credentials

# cred = credentials.Certificate("backend/backend01/firebase_key.json")
# firebase_admin.initialize_app(cred)


import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate(
    "D:/code related/code practice/projects/ayushcare/ayushcare/backend/backend01/firebase_key.json"
)
firebase_admin.initialize_app(cred)
