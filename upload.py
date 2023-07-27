import boto3
from botocore.exceptions import NoCredentialsError
from dotenv import load_dotenv
import os
import sys

# Load environment variables from .env file
load_dotenv()

# Create a session using your AWS credentials
session = boto3.Session(
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
)

# Create an S3 resource object using the session
s3 = session.resource('s3')

bucket_name = os.getenv('S3_BUCKET')

# Get command line arguments
timestamp, commit_message, author = sys.argv[1], sys.argv[2], sys.argv[3]

# Define the name you want to give it in S3
pictureName = f'pictures/{timestamp}/pic'
picturePath = f'./{timestamp}/pic'
screenshotName = f'pictures/{timestamp}/ss'
screenshotPath = f'./{timestamp}/ss'

metadata = {'commit_message': commit_message, 'timestamp': timestamp, 'author': author}

# Upload the file
try:
    s3.Bucket(bucket_name).upload_file(picturePath, pictureName, ExtraArgs={'Metadata': metadata})
    s3.Bucket(bucket_name).upload_file(screenshotPath, screenshotName)
    print("Upload Successful")
except FileNotFoundError:
    print("The file was not found")