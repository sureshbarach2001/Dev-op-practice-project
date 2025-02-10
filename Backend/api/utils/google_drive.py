# api/utils/google_drive.py
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseUpload
from django.conf import settings
import io
import os
import logging

logger = logging.getLogger(__name__)

class GoogleDriveService:
    def __init__(self):
        try:
            credentials_path = settings.GOOGLE_DRIVE_CREDENTIALS_FILE
            logger.info(f"Loading credentials from: {credentials_path}")
            
            if not os.path.exists(credentials_path):
                raise Exception(f"Credentials file not found at: {credentials_path}")
                
            credentials = service_account.Credentials.from_service_account_file(
                credentials_path,
                scopes=['https://www.googleapis.com/auth/drive.file']
            )
            self.service = build('drive', 'v3', credentials=credentials)
        except Exception as e:
            logger.error(f"Failed to initialize Google Drive service: {str(e)}")
            raise

    def upload_image(self, image_file, filename):
        try:
            image_bytes = io.BytesIO(image_file.read())
            image_bytes.seek(0)
            
            file_metadata = {
                'name': filename,
                'mimeType': 'image/jpeg'
            }
            
            # Create media object
            media = MediaIoBaseUpload(
                image_bytes,
                mimetype='image/jpeg',
                resumable=True
            )
            
            logger.info(f"Uploading file: {filename}")
            file = self.service.files().create(
                body=file_metadata,
                media_body=media,
                fields='id, webViewLink'
            ).execute()
            
            
            self.service.permissions().create(
                fileId=file['id'],
                body={
                    'type': 'anyone',
                    'role': 'reader'
                }
            ).execute()
            
            direct_link = f"https://drive.google.com/uc?id={file['id']}"
            
            logger.info(f"File uploaded successfully. ID: {file['id']}")
            return {
                'file_id': file['id'],
                'view_link': direct_link
            }
            
        except Exception as e:
            logger.error(f"Failed to upload image: {str(e)}")
            raise Exception(f"Failed to upload image to Google Drive: {str(e)}")