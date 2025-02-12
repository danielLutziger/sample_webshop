# First deploy

npm run build

gcloud services enable storage.googleapis.com

gcloud storage buckets create gs://your-frontend-bucket --location=europe-west6 --default-storage-class=STANDARD
(replace your-frontend-bucket with a unique name)

gcloud storage buckets add-iam-policy-binding gs://your-frontend-bucket --member=allUsers --role=roles/storage.objectViewer

gcloud storage cp -r dist/* gs://your-frontend-bucket

http://storage.googleapis.com/your-frontend-bucket/index.html

# Redeploy

npm run build
gcloud storage cp -r dist/* gs://your-frontend-bucket
