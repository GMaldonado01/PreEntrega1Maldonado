import express from "express";
import ProductRouter from "./router/product.routes.js";
import CartRoutertRouter from "./router/carts.routes.js";

const app = express();
const port = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/products", ProductRouter);
app.use("/api/products", CartRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
