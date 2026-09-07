# New Horizon Farm — Full-Stack Project

This is a production-style learning project built around the New Horizon Farm website.

## Stack

### Frontend
- HTML5
- CSS3
- Responsive design
- Vanilla JavaScript
- Fetch API
- LocalStorage

### Backend
- Node.js
- Express
- REST API
- CORS
- Environment configuration

### Current features
- Responsive navigation
- Hero/about/gallery/contact sections
- Product catalogue
- Search
- Category filtering
- Sorting
- Product detail modal
- Basket/order enquiry
- LocalStorage basket persistence
- Contact/enquiry API
- API health endpoint
- Frontend fallback data when backend is offline

## Run locally

### 1. Open the backend

```bash
cd backend
npm install
npm run dev
```

The API runs at:

```text
http://localhost:5000
```

Test:

```text
http://localhost:5000/api/health
http://localhost:5000/api/products
```

### 2. Open the frontend

Open `frontend/index.html` with VS Code Live Server.

The frontend expects:

```text
http://localhost:5000/api
```

If the backend is offline, the product catalogue automatically uses local fallback data so the UI still works.

## Recommended next learning stages

This project is intentionally built as a base for learning.

1. Replace fallback products with MongoDB/Mongoose.
2. Add user registration/login.
3. Add JWT/session authentication.
4. Add admin dashboard.
5. Add product CRUD.
6. Add image upload to cloud storage.
7. Add real order records.
8. Add PostgreSQL for orders/transactions.
9. Add Redis caching.
10. Add email/background jobs.
11. Add payment integration.
12. Dockerize frontend/backend.
13. Add automated tests.
14. Add CI/CD.
15. Deploy to cloud.
16. Add monitoring and production security.

## Learning method

Do not try to memorize the code.

First run the application. Then learn one part at a time:

HTML → CSS → JavaScript → DOM → Fetch/API → Node → Express → Database → Auth → Redis → Docker → Cloud.

The finished project is the reference implementation; the learning sessions will break it down and rebuild your understanding step by step.
