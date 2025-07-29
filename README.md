# Talent Vault

**Talent Vault** is an AI-powered resume management platform designed to streamline the hiring process for HR teams and recruiters. It offers intelligent resume parsing, advanced search and filter capabilities, and smart role-matching insights to identify top candidates efficiently.

---

## 🌟 Key Features

🔐 Authentication: Secure login and signup for HR users using JWT tokens.
📄 Resume Upload: Upload PDF resumes and automatically extract candidate details.
🤖 AI Resume Parsing: Integrates OpenAI API to parse and structure resume data (name, email, phone, education, skills, experience, etc.).
🧠 Role-Match Ranker: Upload job descriptions and rank top candidates based on relevance scores and AI-generated short explanations.
🔍 Smart Search & Filter: Search candidates using filters like skills, experience, location, and keyword tags.
📂 Resume Storage: Resumes are securely stored in AWS S3.
🌐 Deployment: Deployed on AWS EC2 with NGINX, PostgreSQL (RDS), and custom domain support.
🎯 React.js Frontend with clean UI (Upload and Search tabs)
📡 Spring Boot REST APIs for backend logic

🧱 Tech Stack
Layer	Technology
Frontend	React.js + Tailwind CSS
Backend	Spring Boot (Java 17)
Auth	JWT-based authentication
Database	PostgreSQL
Hosting: AWS EC2 (Frontend + Backend)
AI Integration: OpenAI GPT for resume parsing & ranking
DevOps	AWS CLI, IAM, Route 53

🖥️ Application Pages
1. Upload Page
Authenticated users only
Upload resumes with metadata (e.g., name, role, location)
Metadata and file path stored in PostgreSQL
2. Search Page
Filter resumes by metadata
Display table of results with download links
Download single or all resumes
🛠️ Local Development Setup
To run TalentVault locally, follow the steps below to set up the backend and frontend.

⚙️ Prerequisites
Ensure the following are installed on your machine:
Java 17+
PostgreSQL
Node.js + npm
Maven
Git

🗄️ Step 1: PostgreSQL Setup
Create a PostgreSQL database named talentvault:
CREATE DATABASE talentvault;
Create the required tables:
-- users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- resumes table
CREATE TABLE resumes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(100),
  role VARCHAR(100),
  location VARCHAR(100),
  file_path TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
🧩 Step 2: Backend Setup (Spring Boot)
Navigate to the backend folder:
cd backend
Create or edit src/main/resources/application.properties:
# PostgreSQL DB config
spring.datasource.url=jdbc:postgresql://localhost:5432/talentvault
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD
spring.jpa.hibernate.ddl-auto=update

# JWT secret
jwt.secret=your-jwt-secret-key

# File upload path (use absolute path for local system)
file.upload-dir=/your/local/upload/path
Build and run the project:
./mvnw clean install
java -jar target/talentvault.jar
The backend will start at: http://localhost:8080

🌐 Step 3: Frontend Setup (React)
Navigate to the frontend folder:
cd frontend
Install dependencies:
npm install
Create a .env file in the root of the frontend:
REACT_APP_API_BASE_URL=http://localhost:8080/api
Start the development server:
npm start
The frontend will start at: http://localhost:3000

☁️ AWS Deployment Guide (Production)
1. AWS CLI Setup
Install AWS CLI
Create an IAM user with programmatic access and attach AdministratorAccess policy (for dev).
Run:
aws configure
Enter:
Access Key ID
Secret Access Key
Region (e.g., us-east-1)
Output format: json

2. PostgreSQL Setup (RDS)
Go to AWS RDS > Create PostgreSQL instance
Enable public access (dev only)
Create database talentvault
Update your application.properties with the RDS endpoint

3. Deploy Backend to EC2
Launch EC2 instance (Amazon Linux or Ubuntu)
SSH into the instance
Install Java:
sudo yum install java-17-openjdk -y
Transfer JAR:
scp target/talentvault.jar ec2-user@your-ec2-ip:/home/ec2-user/
Run the app:
java -jar talentvault.jar

4. Deploy Frontend to EC2:  
Build React app (`npm run build`)
scp files to EC2 instance
Serve static files via NGINX on EC2

5. Custom Domain with Route 53
Buy or connect a domain in Route 53
Create a Hosted Zone
Update your registrar’s DNS to use Route 53 name servers
Add A record for EC2 public IP or CloudFront distribution

6. Security Best Practices
Use HTTPS via CloudFront or NGINX + Let's Encrypt
Use IAM roles for EC2 instead of storing credentials
Keep your S3 bucket private
Store secrets using AWS SSM or Secrets Manager
Restrict access to RDS by IP or VPC security groups

🔐 Authentication Flow
User logs in or signs up → receives JWT
JWT contains userId
Frontend stores JWT in localStorage
All protected API routes require Authorization: Bearer <token>
🧪 Testing Checklist
✅ User signup/login
✅ Resume upload + metadata
✅ Search with filters
✅ Resume download
✅ Backend secure via JWT
✅ Data persists to PostgreSQL
📚 Future Enhancements
Add dashboard
Resume preview and parsing (e.g., Apache Tika)
AI integration to reduce manual uploading effort

🤝 Contributing
Fork the repo
Create your feature branch: git checkout -b feature/your-feature
Commit your changes: git commit -m 'Add feature'
Push to the branch: git push origin feature/your-feature
Open a pull request

📫 Contact
GitHub: JainYatharth
Email: yatharthj1511@gmail.com
