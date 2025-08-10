Patient Booking and Dashboard Application
👨‍💻 Project Description
This is a full-stack web application for managing patient appointments. The backend, built with Node.js and Express.js, provides a secure API for user authentication and appointment management. The frontend is a responsive patient dashboard created with Next.js, allowing users to book and view their appointments.

✨ Features
Frontend (Patient Dashboard)
User Authentication: Unauthenticated users are automatically redirected to the login page.

Date-Based Slot Filtering: Provides a date selector to view available slots for the next seven days.

Appointment Booking: Patients can easily book an available time slot.

My Bookings: Displays a list of all current appointments for the logged-in user.

Secure Logout: A dedicated button allows users to securely end their session.

Backend (API)
RESTful API: Endpoints for registration, login, fetching slots, and booking appointments.

JWT Authentication: Secures API routes with JSON Web Tokens.

Password Hashing: Passwords are securely hashed using bcryptjs.

Database Seeding: A script is included to populate the database with an admin user and initial time slots.

🛠️ Tech Stack Choices
Backend
Node.js & Express.js: The choice of Node.js with the Express framework allows for a highly scalable, non-blocking API. This stack is ideal for handling many concurrent requests, which is a common requirement for web services. A key trade-off is that it can be less suited for CPU-intensive tasks compared to languages like Java or Go.

Mongoose & MongoDB: We used Mongoose to interact with a MongoDB NoSQL database. MongoDB's flexible schema is a major advantage for rapidly developing applications, as it doesn't require a rigid data structure. The trade-off is that it can be less performant for complex joins compared to a traditional SQL database.

Frontend
Next.js: Next.js was chosen for its robust framework features, including server-side rendering and static site generation, which improve performance and SEO. It provides a strong foundation for building scalable React applications. A potential trade-off is the added complexity compared to a simpler Create React App setup.

Tailwind CSS & shadcn/ui: This combination enables rapid and consistent UI development. Tailwind's utility-first approach allows for highly customizable designs directly in the JSX, while shadcn/ui provides pre-built, accessible components that integrate seamlessly with Tailwind, saving significant development time. The main trade-off is the initial learning curve of Tailwind's extensive utility class system.

🚀 How to Run Locally
README steps verified ✅

Prerequisites
Node.js (v18 or higher)

MongoDB

npm or yarn

Steps
Install Backend Dependencies: Navigate to your backend directory and run:

npm install

Install Frontend Dependencies: Navigate to your frontend directory and run:

npm install

Run Backend: Start the backend server with a single command:

npm start

(Note: You must first run npm run seed once to populate the database)

Run Frontend: Start the Next.js development server with:

npm run dev

⚙️ Environment Variables
Backend (.env)
MONGO_URI: The connection string for your MongoDB database.

JWT_SECRET: A secret key for signing JWTs.

ADMIN_EMAIL: The email for the default admin user.

ADMIN_PASSWORD: The password for the default admin user.

Frontend (.env.local)
NEXT_PUBLIC_API_URL: The base URL of your backend API (e.g., http://localhost:3000/api).

🌐 API Endpoints (Postman/cURL)
1. Register a Patient
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
    "name": "Test Patient",
    "email": "patient@example.com",
    "password": "Passw0rd!"
}'

2. Login and Get a JWT
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
    "email": "patient@example.com",
    "password": "Passw0rd!"
}'

3. Book an Appointment
# First, get the JWT from the login response above.
# Replace <YOUR_JWT_TOKEN> with the actual token.
# Replace <SLOT_ID> with a valid slot ID from the database.
curl -X POST http://localhost:3000/api/book \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
-d '{
    "slotId": "<SLOT_ID>"
}'

☁️ Deployment Steps
Frontend (Next.js):

Build the Next.js application for production:

npm run build

Deploy the out directory to a hosting provider like Vercel or Netlify. These services often integrate directly with your Git repository for continuous deployment.

# Example for Vercel
vercel --prod

Backend (Node.js/Express):

Containerize the application using a Dockerfile.

Push the image to a container registry (e.g., Docker Hub).

Deploy the container to a cloud platform like Heroku, Render, or a Kubernetes cluster.

Ensure all backend environment variables are configured on the deployment platform.

📝 Known Limitations & Next Steps
Notes on Trade-offs & Next Steps
Missing Delete API: The frontend code includes a delete button, but the corresponding DELETE API endpoint on the backend is not yet implemented. This would be my first priority with more time.

No Admin Dashboard: The application lacks an interface for an admin user to manage slots, user accounts, or view all bookings.

Basic Error Handling: The current error handling is functional but could be more robust to provide detailed and user-friendly feedback for various API failures.

Improved UI: I'd improve the styling of the "My Bookings" section, possibly adding a visual indicator for appointment status (e.g., Confirmed, Pending). I'd also integrate a more robust date picker component for a better user experience.

ℹ️ Application Details
Frontend URL: 

API URL: 

Patient: Abhianv@gmail.com / 123456

Admin: admin@example.com / Password123

Repo URL: 