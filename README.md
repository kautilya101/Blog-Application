Note: Noticed sometimes app is taking a bit longer than expected do to the Deployment site used Render. 
# Blog Application

+ ## Frontend
    + React libray for making seamless user experience.
    + Tailwindcss
    + Context API for state management.
    + moment.js for Date formatting.
    + react-icons.
    + Jwt for authentication.

+ ## Backend
    + Node.js/Express.js for creating a server.
    + TypeScript.
    + Jwt for authentication.
    + Zod for Validation.
    + Prisma
    + PostgreSQL


To run Frontend: 
+ cd frontend
+ npm i  -> to install node_modules.
+ npm run dev

To run Backend: 
+ cd backend
+ npm i
+ cd src
+ npm run build 

Note:  You will need to add environment variables in *backend* for 
+ PORT,
+ DATABSE_URL,
+ ACCESS_SECRET_TOKEN in a .env file.
Same for *frontend* you need to add url of backend hosted server in 
+ VITE_BASE_URL.  ex: localhost:3000/v1




