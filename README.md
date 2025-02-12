# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


How to use and deploy this webshop:

## Frontend
Webapp is in src/

Running the app: npm vite build
Adjusting Services (Price, Name, Description etc.)


# Backend - Appointment Booking API

This backend provides an API for managing appointment bookings. It is built with **Node.js**, **Express**, and **Prisma ORM** using **PostgreSQL** as the database.

---

## 🚀 Features
- **Book an appointment** while preventing overlapping bookings.
- **Retrieve booked time slots** in a structured JSON format.
- **PostgreSQL database** with Prisma ORM.
- **REST API endpoints** for managing appointments.

---

## 🔧 Setup & Installation

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/your-repo.git
cd your-repo/server
```

### 2️⃣ **Install Dependencies**
npm install

### 3️⃣ Configure Environment Variables
Create a `.env` file in the `server/` directory and define:
```env
DATABASE_URL="postgres://your_user:your_password@your_host/your_database"
PORT=3001
```

### 4️⃣ Set Up the Database
```sh
npx prisma migrate dev --name init
npx prisma generate
```

### 5️⃣ Run the Backend Server
```sh
npm run dev
```

# 🚀 Deployment
### 1️⃣ Deploy to Google Cloud
https://cloud.google.com/appengine/docs/standard/nodejs/building-app/creating-project?hl=de
gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com
gcloud auth configure-docker
docker build -t gcr.io/je-webservice/my-app .
docker push gcr.io/je-webservice/my-app
gcloud run deploy my-app \
--image gcr.io/je-webservice/my-app \
--platform managed \
--region us-central1 \
--allow-unauthenticated

# 📚 Tech Stack
- Frontend: Vite + React
- Backend: Node.js, Express.js
- Database: PostgreSQL
- ORM: Prisma
- Hosting: Vercel

---

# ✨ Author
Developed by @daniellutziger
### **📌 How to Use This**
1. **Copy everything** from above.
3. **Paste it in** and save.
4. **Done!** 🎉

Let me know if you need any modifications! 🚀
