from googleapiclient.discovery import build
# from googleapiclient.http import MediaFileUpload
from google.oauth2.service_account import Credentials
# from myapp.models import Photo  # Replace `myapp` with your app name

SERVICE_ACCOUNT_FILE = 'service_account.json'
SCOPES = ['https://www.googleapis.com/auth/drive']
PARENT_FOLDER_ID = "1jjCAxTWqQDj7ynNZn_kKd0YVb8acUzSy"    
   

def authenticate():
    try:
        creds = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
        return creds
    except Exception as e:
        print(e)
        return None

def upload_photo(file_path,title):
    cred = authenticate()
    service = build('drive', 'v3', credentials=cred)

    file_metadata = {
        'name':title,
        'parents': [PARENT_FOLDER_ID],
    }

    file = service.files().create(
        body = file_metadata,
        media_body = file_path,
        fields='id'
    ).execute()

    file_id = file.get('id')
    service.permissions().create(
        fileId=file_id,
        body={'role': 'reader', 'type': 'anyone'},
    ).execute()
    file_url = f"https://drive.google.com/uc?id={file_id}&export=view"
    return file_url


# upload_photo('photo.jpg')