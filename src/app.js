import express from "express";
import { ProductManager } from "./ProductManager.js";

const app = express();
const port = 3030;

const manager = new ProductManager("./products.json");

app.get("/products", async (req, res) => {
  const limit = req.query.limit;
  const products = await manager.getProducts();

  if (limit) {
    const limitedProducts = products.slice(0, parseInt(limit));
    res.json(limitedProducts);
  } else {
    res.json(products);
  }
});

app.get("/products/:pid", async (req, res) => {
  const productId = req.params.pid;
  const product = await manager.getProductById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
