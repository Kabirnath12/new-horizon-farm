# 🌾 New Horizon Farm

A modern, responsive full-stack web application for **New Horizon
Farm**, built as a portfolio project to demonstrate real-world frontend
and backend development.

The project currently includes a customer-facing farm website, product
browsing, search/filter/sort functionality, product details, a
basket/order enquiry flow, gallery, contact form, and an Express.js REST
API.

> **Project status:** Working full-stack starter application.\
> The backend currently uses in-memory data. MongoDB, authentication,
> admin features, payments, testing, Docker, and deployment are planned
> next.

------------------------------------------------------------------------

## 🚀 Live Architecture

``` text
Browser
   │
   ├── HTML / CSS
   └── JavaScript
          │
          │ HTTP / REST API
          ▼
   Node.js + Express
          │
          ▼
   In-memory Products / Enquiries
```

The next production architecture will replace the temporary in-memory
layer with a database and add authentication, admin management, orders,
payments, caching, testing, and deployment.

------------------------------------------------------------------------

## ✨ Features

### Frontend

-   Responsive navigation bar
-   Mobile menu
-   Hero section
-   Farm/about section
-   Product catalogue
-   Product search
-   Product category filtering
-   Product sorting
-   Product detail modal
-   Basket/order enquiry flow
-   LocalStorage persistence
-   Gallery
-   Contact/enquiry form
-   Backend connection using `fetch()`
-   Frontend fallback data when the backend is unavailable
-   Responsive design for desktop, tablet, and mobile

### Backend

-   Node.js
-   Express.js
-   CORS
-   Environment variable support with `dotenv`
-   REST API
-   Product listing endpoint
-   Individual product endpoint
-   Enquiry submission endpoint
-   Enquiry listing endpoint
-   Health-check endpoint
-   Temporary in-memory data store

------------------------------------------------------------------------

## 🛠️ Tech Stack

### Frontend

-   HTML5
-   CSS3
-   JavaScript (ES6+)
-   Fetch API
-   LocalStorage

### Backend

-   Node.js
-   Express.js
-   CORS
-   dotenv

### Planned Production Stack

-   React / Next.js
-   TypeScript
-   MongoDB / PostgreSQL
-   Authentication
-   Role-Based Access Control (RBAC)
-   Redis
-   Background jobs / queues
-   Payment integration
-   Docker
-   Automated testing
-   CI/CD
-   Cloud deployment

------------------------------------------------------------------------

## 📁 Project Structure

``` text
New_Horizon_Farm_Full_Project/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── assets/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── README.md
└── PROJECT_MAP.md
```

------------------------------------------------------------------------

## 💻 Requirements

Install the following before running the project:

-   Node.js
-   npm
-   Git
-   VS Code (recommended)
-   A modern web browser

Check Node.js and npm:

``` bash
node --version
npm --version
```

Check Git:

``` bash
git --version
```

------------------------------------------------------------------------

# ▶️ Running the Project

## 1. Clone the repository

``` bash
git clone https://github.com/YOUR_USERNAME/new-horizon-farm.git
```

Then enter the project:

``` bash
cd new-horizon-farm
```

------------------------------------------------------------------------

## 2. Start the backend

Open a terminal:

``` bash
cd backend
```

Install dependencies:

``` bash
npm install
```

Start the development server:

``` bash
npm run dev
```

The API should run at:

``` text
http://localhost:5000
```

Health check:

``` text
http://localhost:5000/api/health
```

Expected response:

``` json
{
  "status": "ok"
}
```

Keep this terminal running while testing backend functionality.

------------------------------------------------------------------------

## 3. Start the frontend

Open the `frontend` folder in VS Code.

Recommended:

-   Install the **Live Server** extension in VS Code.
-   Right-click `frontend/index.html`.
-   Select **Open with Live Server**.

The frontend will normally open on a local address such as:

``` text
http://127.0.0.1:5500
```

The exact port may differ.

------------------------------------------------------------------------

# 🔌 API Documentation

Base URL:

``` text
http://localhost:5000/api
```

## Health Check

### `GET /health`

Checks whether the backend is running.

Example:

``` http
GET /api/health
```

Response:

``` json
{
  "status": "ok"
}
```

------------------------------------------------------------------------

## Get Products

### `GET /products`

Returns the available products.

Example:

``` http
GET /api/products
```

------------------------------------------------------------------------

## Get Product

### `GET /products/:id`

Returns one product by ID.

Example:

``` http
GET /api/products/1
```

------------------------------------------------------------------------

## Submit Enquiry

### `POST /enquiries`

Submits a customer enquiry.

The frontend sends enquiry information to the Express backend.

Example request:

``` json
{
  "name": "Customer Name",
  "phone": "9876543210",
  "message": "I would like to know more about your farm products."
}
```

------------------------------------------------------------------------

## Get Enquiries

### `GET /enquiries`

Returns submitted enquiries from the temporary in-memory store.

> application should protect administrative enquiry data with
> authentication and authorization.

------------------------------------------------------------------------

# 🔐 Environment Variables

The backend includes:

``` text
backend/.env.example
```

Copy it to:

``` text
backend/.env
```

Example:

``` env
PORT=5000
```

`.env` files should not be committed to GitHub when they contain
secrets.

------------------------------------------------------------------------

# 🧪 Current Data Storage

The current backend stores products and enquiries **in memory**.

This means data can disappear when the Node.js server restarts.

This is intentional for the first version of the project so the core
frontend → API workflow can be understood before introducing a database.

### Next database upgrade

The planned flow is:

``` text
Frontend
   ↓
Express API
   ↓
MongoDB
   ↓
Products
Enquiries
Users
Orders
```

------------------------------------------------------------------------

# 🧭 Development Roadmap

## Phase 1 --- Current Version

-   [x] Responsive frontend
-   [x] Product catalogue
-   [x] Search/filter/sort
-   [x] Product modal
-   [x] Basket/order enquiry flow
-   [x] Contact form
-   [x] Express backend
-   [x] REST API
-   [x] Frontend ↔ backend connection

## Phase 2 --- Database

-   [ ] MongoDB integration
-   [ ] Mongoose models
-   [ ] Persistent products
-   [ ] Persistent enquiries
-   [ ] Database validation
-   [ ] Error handling

## Phase 3 --- Authentication

-   [ ] User registration
-   [ ] Login
-   [ ] Password hashing
-   [ ] JWT/session authentication
-   [ ] Role-based access control
-   [ ] Admin account

## Phase 4 --- Admin Dashboard

-   [ ] Admin login
-   [ ] Product management
-   [ ] Add product
-   [ ] Edit product
-   [ ] Delete product
-   [ ] Enquiry management
-   [ ] Order management
-   [ ] Dashboard statistics

## Phase 5 --- E-Commerce

-   [ ] Shopping cart
-   [ ] Customer accounts
-   [ ] Orders
-   [ ] Order status
-   [ ] Payment integration
-   [ ] Invoice/receipt generation
-   [ ] Email notifications

## Phase 6 --- Production Engineering

-   [ ] TypeScript
-   [ ] React / Next.js migration
-   [ ] PostgreSQL where appropriate
-   [ ] Redis
-   [ ] Background jobs
-   [ ] API validation
-   [ ] Rate limiting
-   [ ] Logging
-   [ ] Automated testing
-   [ ] Docker
-   [ ] CI/CD
-   [ ] Cloud deployment
-   [ ] Monitoring

------------------------------------------------------------------------

# 🧠 What This Project Teaches



### Frontend

-   HTML structure
-   CSS layouts
-   Responsive design
-   JavaScript fundamentals
-   DOM manipulation
-   Events
-   Arrays and objects
-   `map()`, `filter()`, and `find()`
-   Modules
-   Async JavaScript
-   `fetch()`
-   API integration
-   LocalStorage

### Backend

-   Node.js
-   Express
-   HTTP requests
-   REST APIs
-   Routes
-   Controllers
-   Request/response handling
-   JSON
-   Middleware
-   CORS
-   Environment variables
-   Backend error handling

### Full-Stack Concepts

-   Frontend/backend separation
-   Client-server architecture
-   API communication
-   Data flow
-   CRUD operations
-   Authentication
-   Authorization
-   Database integration
-   Deployment

------------------------------------------------------------------------

# 🧑‍💻 Development Workflow

A typical development workflow is:

``` text
1. Build a feature
       ↓
2. Test locally
       ↓
3. Fix bugs
       ↓
4. git status
       ↓
5. git add .
       ↓
6. git commit
       ↓
7. git push
       ↓
8. GitHub
```

Useful commands:

``` bash
git status
git add .
git commit -m "Describe the change"
git push
```

------------------------------------------------------------------------

# 🐛 Troubleshooting

## "Backend is offline"

Make sure the backend terminal is running:

``` bash
cd backend
npm run dev
```

Then check:

``` text
http://localhost:5000/api/health
```

------------------------------------------------------------------------

## `npm` is not recognized

Install Node.js and restart VS Code.

Then check:

``` bash
node --version
npm --version
```

------------------------------------------------------------------------

## Port already in use

Another application may already be using port `5000`.

Stop the existing process or change the port in `.env`.

------------------------------------------------------------------------

## Frontend loads but products are missing

Check that:

1.  The backend is running.
2.  `http://localhost:5000/api/products` works.
3.  Browser developer tools show no network/CORS errors.
4.  The frontend JavaScript file is loading correctly.

------------------------------------------------------------------------

# 📌 Important Security Notes

This is currently a development-stage application.

Before using it for real customers:

-   Never expose passwords or API secrets.
-   Never commit `.env` files containing secrets.
-   Add authentication before exposing admin operations.
-   Validate and sanitize user input.
-   Add rate limiting.
-   Protect sensitive API routes.
-   Use HTTPS in production.
-   Use a real database.
-   Add proper logging and monitoring.
-   Add automated tests.
-   Review dependencies and vulnerabilities.

------------------------------------------------------------------------

# 📄 License

project.

Add a formal open-source license if you later decide to distribute the
project publicly under specific licensing terms.

------------------------------------------------------------------------

## 🌱 New Horizon Farm

**From farm products to a production-grade full-stack application.**
