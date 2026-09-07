const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const products = [
  { id: "chicken", name: "Farm Chicken", category: "poultry", price: 250, unit: "kg", available: true, description: "Fresh farm-raised chicken from New Horizon Farm.", image: "assets/chicken.svg" },
  { id: "duck", name: "Farm Duck", category: "poultry", price: 400, unit: "kg", available: true, description: "Fresh farm-raised duck from our farm.", image: "assets/duck.svg" },
  { id: "eggs", name: "Farm Eggs", category: "eggs", price: 10, unit: "egg", available: true, description: "Fresh farm eggs produced at New Horizon Farm.", image: "assets/eggs.svg" },
  { id: "vegetables", name: "Farm Vegetables", category: "farm", price: 80, unit: "kg", available: true, description: "Seasonal vegetables and farm produce.", image: "assets/vegetables.svg" }
];

const enquiries = [];

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "new-horizon-farm-api" });
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find(item => item.id === req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

app.post("/api/enquiries", (req, res) => {
  const { name, phone, message } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({ message: "Name, phone and message are required." });
  }

  const enquiry = {
    id: Date.now().toString(),
    name,
    phone,
    message,
    createdAt: new Date().toISOString()
  };

  enquiries.push(enquiry);
  res.status(201).json({ message: "Enquiry received", enquiry });
});

app.get("/api/enquiries", (req, res) => {
  res.json(enquiries);
});

app.listen(PORT, () => {
  console.log(`New Horizon Farm API running at http://localhost:${PORT}`);
});
