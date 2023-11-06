import fs from "fs";

export class ProductManager {
  static currentId = 0;

  constructor(path) {
    this.path = path;
  }

  async addProduct(newProduct) {
    const products = await this.getProducts();

    ProductManager.currentId++;
    const newProductWithId = {
      id: ProductManager.currentId,
      ...newProduct,
    };

    const newProducts = [...products, newProductWithId];

    await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
  }

  async getProducts() {
    try {
      const products = await fs.promises.readFile(this.path);
      return JSON.parse(products);
    } catch (error) {
      return [];
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    const product = products.find((item) => item.id === id);
    if (product === undefined) {
      console.log(`El producto con id ${id} no existe.`);
    }
    return product;
  }

  async updateProduct(id, newData) {
    const products = await this.getProducts();
    const productIndex = products.findIndex((item) => item.id === id);
    if (productIndex !== -1) {
      products[productIndex] = {
        ...products[productIndex],
        ...newData,
      };
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      console.log(`Producto con id ${id} actualizado.`);
    } else {
      console.log(`No se encontró ningún producto con el id ${id}.`);
    }
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const filteredProducts = products.filter((item) => item.id !== id);

    if (products.length === filteredProducts.length) {
      console.log(`Producto con id ${id} no existe.`);
      return;
    }

    await fs.promises.writeFile(this.path, JSON.stringify(filteredProducts));
    console.log(`Producto con id ${id} eliminado.`);
  }
}
const manager1 = new ProductManager("./products.json");

const newProduct = {
  title: "New Product",
  description: "Description product",
  price: 100,
  thumbnail: "path/a/image.jpg",
  code: "ABC123",
  stock: 10,
};
const newProduct2 = {
  title: "New Product 2",
  description: "Description product",
  price: 100,
  thumbnail: "path/a/image.jpg",
  code: "ABC123",
  stock: 10,
};

await manager1.addProduct(newProduct);
await manager1.addProduct(newProduct2);
