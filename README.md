# CleanTech-Canada

A modular platform for clean energy analytics and forecasting, combining Node.js, React, PostgreSQL, and AI microservices to deliver insights into renewable energy demand and supply.

As the energy sector shifts toward low-carbon technologies, data-driven tools are critical for monitoring performance, forecasting demand, and optimizing renewable energy assets.

**CleanTech-Canada** is designed as a full-stack web application where:
⚡ Node.js + Express handles APIs and database operations.
🌐 React provides a user-friendly dashboard.
🗄️ PostgreSQL stores demand and supply datasets.
🤖 FastAPI microservice powers AI/ML models for energy forecasting.
🐳 Docker ensures containerized deployments.
🔄 Jenkins + Azure support CI/CD and cloud scalability.

**Tech Stack**
Frontend React, Chart.js / Recharts
Backend  Node.js, Express
Database: PostgreSQL
ML Microservice: Python (FastAPI, scikit-learn, pandas)
Infrastructure: Docker, Jenkins, Azure

**Features (MVP)**
Upload and store demand & supply CSV files into PostgreSQL.
Visualize demand vs. supply trends in an interactive dashboard.
Filter data by date, generator, or fuel type.
Run basic demand forecasting models via the ML microservice.
Modular design for easy scalability and feature expansion.

**Setup**

1. Clone the repo
git clone https://github.com/<your-username>/CleanTech-Canada.git
cd CleanTech-Canada

2. Backend Setup (Node.js)
cd backend
npm install
npm start

3. Frontend Setup (React)
cd frontend
npm install
npm start

4. ML Service (FastAPI)
cd ml-service
pip install -r requirements.txt
uvicorn app.main:app --reload

5. Database (PostgreSQL)
Create a database named cleantech_db.
Update .env in backend with your DB credentials.



















1. Clone the repo
