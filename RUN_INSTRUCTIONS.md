# 🚀 Step-by-Step Guide to Run Farm2Home Application

This guide will help you run both the **Backend (Python/FastAPI)** and **Frontend (React)** servers.

---

## 📋 Prerequisites

Make sure you have:
- ✅ **Python 3.8+** installed
- ✅ **Node.js 16+** and **npm** installed
- ✅ Both installed and working on your system

---

## 🔧 Part 1: Setting Up and Running the Backend

### Step 1: Open a Terminal in Cursor
- Press `` Ctrl + ` `` (backtick) or go to `Terminal` → `New Terminal` in the menu

### Step 2: Navigate to the Backend Folder
```powershell
cd backend
```

### Step 3: Create a Python Virtual Environment (First Time Only)
```powershell
python -m venv venv
```

### Step 4: Activate the Virtual Environment
```powershell
.\venv\Scripts\Activate.ps1
```

If you get an error about execution policy, run this first:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then activate again:
```powershell
.\venv\Scripts\Activate.ps1
```

You should see `(venv)` appear at the beginning of your terminal prompt.

### Step 5: Install Python Dependencies
```powershell
pip install -r requirements.txt
```

### Step 6: Run the Backend Server
```powershell
uvicorn app.main:app --reload --port 8000
```

**Success!** ✅ You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Application startup complete.
```

**Keep this terminal open!** The backend is now running on `http://127.0.0.1:8000`

---

## ⚛️ Part 2: Setting Up and Running the Frontend

### Step 1: Open a NEW Terminal in Cursor
- Press `` Ctrl + Shift + ` `` or go to `Terminal` → `New Terminal`
- This opens a second terminal window (keep the backend terminal running!)

### Step 2: Navigate to the Frontend Folder
```powershell
cd frontend
```

### Step 3: Install Node Dependencies (First Time Only)
```powershell
npm install
```

This will install all the React packages and dependencies.

### Step 4: Run the Frontend Server
```powershell
npm run dev
```

**Success!** ✅ You should see:
```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

**Keep this terminal open too!** The frontend is now running on `http://localhost:5173`

---

## 🌐 Part 3: Access Your Application

1. **Open your web browser** (Chrome, Firefox, Edge, etc.)

2. **Go to:** `http://localhost:5173`

3. You should see the **Home page** with a "Farmer Dashboard" button

4. **Click "Farmer Dashboard"** - it should navigate to the dashboard page!

---

## 📝 Quick Summary

**Two terminals need to be running:**

1. **Backend Terminal:**
   ```powershell
   cd backend
   .\venv\Scripts\Activate.ps1
   uvicorn app.main:app --reload --port 8000
   ```

2. **Frontend Terminal:**
   ```powershell
   cd frontend
   npm run dev
   ```

---

## 🛑 How to Stop the Servers

- **Backend:** Press `Ctrl + C` in the backend terminal
- **Frontend:** Press `Ctrl + C` in the frontend terminal

---

## ❓ Troubleshooting

### Backend Issues:
- **Port 8000 already in use?** 
  - Close other applications using port 8000, or change port: `--port 8001`

- **Module not found errors?**
  - Make sure virtual environment is activated: `.\venv\Scripts\Activate.ps1`
  - Reinstall dependencies: `pip install -r requirements.txt`

### Frontend Issues:
- **Port 5173 already in use?**
  - Vite will automatically use the next available port (5174, 5175, etc.)

- **Dependencies not installed?**
  - Run: `npm install` in the frontend folder

---

## 🎉 You're All Set!

Once both servers are running, your application is ready to use!
The frontend will communicate with the backend API automatically.

