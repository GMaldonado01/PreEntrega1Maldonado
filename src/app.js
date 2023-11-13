import express from "express";
import ProductRouter from "./router/product.routes.js";
import CartRoutert from "./router/carts.routes.js";
import { engine } from "express-handlebars";
import * as path from "path";
import __dirname from "./utils.js";

const app = express();
const port = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", engine());
app.use("view engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"));

app.use("/", express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
  res.render("home", {
    title: "Express Avanced | Handlebars",
    products: allProduct,
  });
});

app.use("/api/products", ProductRouter);
app.use("/api/products", CartRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
