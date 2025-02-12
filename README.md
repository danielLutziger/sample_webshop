# 🚀 Deployment Guide

## 🌟 Prerequisites
Before deploying, ensure you have:  
✅ Google Cloud SDK installed (`gcloud`)  
✅ Proper IAM permissions for your service account  
✅ Node.js installed (`npm`)

---

## 🌍 First-Time Deployment
Grant **Cloud Storage permissions** to the App Engine service account:

```sh
gcloud projects add-iam-policy-binding PROJECT-ID \
  --member="serviceAccount:PROJECT-ID@appspot.gserviceaccount.com" \
  --role="roles/storage.admin"
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

---

### **📌 How to Use It?**
✅ **Copy-Paste** this directly into your `README.md`.  
✅ It **keeps all formatting** (headings, code blocks, emojis).  
✅ Just replace `PROJECT-ID` and `yourusername` in the author section.

Let me know if you need any more tweaks! 🚀🔥
