import { Router } from "express";
import CartManager from "../CartManager.js";

const CartRouter = Router();
const carts = new CartManager();

CartRouter.post("/", async (req, res) => {
  res.send(await carts.addCarts());
});

CartRouter.get("/", async (req, res) => {
  res.send(await carts.getCarts);
});

CartRouter.get("/:id", async (req, res) => {
  res.send(await carts.getCartById(req.params.id));
});

CartRouter.post("/:cid/products/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productId = req.params.pid;
  res.send(await carts.addProductInCart(cartId, productId));
});
export default CartRouter;
