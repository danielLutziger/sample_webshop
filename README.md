# 🚀 Deployment Guide

## 🌟 Prerequisites
Before deploying, ensure you have:  
✅ Google Cloud SDK installed (`gcloud`)  
✅ Proper IAM permissions for your service account  
✅ Node.js installed (`npm`)

---

```sh
gcloud auth application-default login
```

```sh
gcloud config set project nancy-nails-fr
```

```sh
gcloud services enable cloudbuild.googleapis.com

gcloud services enable appengine.googleapis.com iam.googleapis.com
```
```sh
gcloud app create --region=europe-west6
```
```sh
gcloud projects add-iam-policy-binding nancy-nails-fr --member="serviceAccount:nancy-nails-fr@appspot.gserviceaccount.com" --role="roles/storage.admin"
gcloud projects add-iam-policy-binding nancy-nails-fr --member="serviceAccount:nancy-nails-fr@appspot.gserviceaccount.com" --role="roles/cloudbuild.builds.editor"

```

## 🌍 First-Time Deployment
Grant **Cloud Storage permissions** to the App Engine service account:

```sh
`gcloud projects add-iam-policy-binding nancy-nails-fr --member="serviceAccount:nancy-nails-fr@appspot.gserviceaccount.com"   --role="roles/storage.admin"`
```

Then build the app and deploy
```sh
npm run build
gcloud app deploy
```

## 🔄 Redeploy (After Changes)
Then build the app and deploy
```sh
npm run deploy
```

---

# 👨‍💻 Author
👋 Created by Daniel 💡    
🌍 Follow me on [GitHub](https://github.com/danielLutziger)

