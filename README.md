# New Horizon Farm

A responsive full-stack web application for New Horizon Farm, providing
a modern online presence for farm products and customer enquiries.

## Features

-   Responsive navigation and mobile layout
-   Farm introduction and information sections
-   Product catalogue
-   Product search
-   Product category filtering
-   Product sorting
-   Product details modal
-   Basket/order enquiry functionality
-   Customer enquiry form
-   Gallery
-   REST API integration
-   Backend health-check endpoint
-   LocalStorage support for basket data
-   Frontend fallback product data when the API is unavailable

## Tech Stack

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
-   REST API

## Project Structure

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
├── PROJECT_MAP.md
└── README.md
```

## Getting Started

### Prerequisites

Make sure Node.js and npm are installed.

Check the versions:

``` bash
node --version
npm --version
```

### Clone the repository

``` bash
git clone https://github.com/YOUR_USERNAME/new-horizon-farm.git
cd new-horizon-farm
```

### Start the backend

``` bash
cd backend
npm install
npm run dev
```

The backend runs on:

``` text
http://localhost:5000
```

### Start the frontend

Open the `frontend` folder in VS Code and launch `index.html` using Live
Server or another local web server.

The frontend communicates with the backend API running on port `5000`.

## API Endpoints

Base URL:

``` text
http://localhost:5000/api
```

  Method   Endpoint              Description
  -------- --------------------- ------------------------------
  GET      `/api/health`         Check API status
  GET      `/api/products`       Retrieve all products
  GET      `/api/products/:id`   Retrieve a product by ID
  POST     `/api/enquiries`      Submit a customer enquiry
  GET      `/api/enquiries`      Retrieve submitted enquiries

## Example Health Check

Open:

``` text
http://localhost:5000/api/health
```

Expected response:

``` json
{
  "status": "ok"
}
```

## Data Storage

The current backend uses an in-memory data store for products and
enquiries.

Because the data is stored in memory, enquiry records are reset when the
backend server restarts.

## Environment Configuration

The backend includes an `.env.example` file.

Example:

``` env
PORT=5000
```

Create a `.env` file inside the `backend` directory when
environment-specific configuration is required.

## Git

To save changes to the repository:

``` bash
git add .
git commit -m "Update New Horizon Farm"
git push
```

## Author

**Kabirshree Nath**
