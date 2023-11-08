import fs from "fs";
import { ProductManager } from "./ProductManager";

const productALL = new ProductManager();

class CartManager {
  static currentId = 0;

  constructor(path) {
    this.path = path;
  }

  async addCarts(newCarts) {
    const carts = await this.getCarts();

    ProductManager.currentId++;
    const newCartsWithId = {
      id: CartManager.currentId,
      ...newCart,
    };

    const newCart = [...carts, newCartsWithId];

    await fs.promises.writeFile(this.path, JSON.stringify(newCarts));
  }

  async getCarts() {
    try {
      const carts = await fs.promises.readFile(this.path);
      return JSON.parse(carts);
    } catch (error) {
      return [];
    }
  }

  async getCartById() {
    const getCartById = await this.getCartById();
    const cart = products.find((item) => item.id === id);
    if (cart === undefined) {
      console.log(`El carrito con id ${id} no existe.`);
    }
    return cart;
  }

  addProductInCart = async (cartId, productiD) => {
    const CartId = await this.getCartById(cartId);
    const cart = cart.find((item) => item.id === id);
    if (cart === undefined) {
      console.log(`El carrito con id ${id} no existe.`);
      const productsById = await productALL.getProductById(productiD);
      const product = product.find((item) => item.id === id);
      if (product === undefined) {
        console.log(`El producto con id ${id} no existe.`);

        let cartsALL = await this.getCarts();
        let cartFilter = cartsALL.filter((prod) => prod.id != id);
        let cartsConcat = [
          { id: cartId, products: [{ id: productsById.id, cantidad: 1 }] },
          ...cartFilter,
        ];
        await this.addCarts(cartsConcat);
        return "Producto agregado al cart";
      }
    }
  };
}
export default CartManager;
