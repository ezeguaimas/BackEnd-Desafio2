const fs = require("fs");
const { readFileSync, writeFileSync } = fs;

const path = "./productos.json";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }
  getProducts() {
    try {
      const data = readFileSync(this.path, "utf8");
      this.products = JSON.parse(data);
      console.log("Productos cargados exitosamente");
      console.log(this.products);
      return this.products;
    } catch (error) {
      console.log("Error cargando productos:");
      throw new Error("Error cargando productos");
    }
  }

  saveProducts() {
    try {
      writeFileSync(this.path, JSON.stringify(this.products, null, 2));
      console.log("Producto guardado exitosamente");
      console.log(this.products);
      return this.products;
    } catch (error) {
      console.log("Error guardando producto:");
      throw new Error("Error guardando producto");
    }
  }

  addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log("Error: Todos los campos son obligatorios");
      throw new Error("Error: Todos los campos son obligatorios");
    }

    const codeRepeat = this.products.find((p) => p.code === product.code);
    if (codeRepeat) {
      console.log("Error: El código del producto ya existe");
      throw new Error("Error: El código del producto ya existe");
    }

    const lastProductId =
      this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
    product.id = lastProductId + 1;

    this.products.push(product);
    this.saveProducts();
    console.log("Producto agregado exitosamente");
    console.log(this.products);
    return this.products;
  }

  getProductById(idProduct) {
    const reqProduct = this.products.find(
      (product) => product.id === idProduct
    );
    if (reqProduct) {
      console.log(reqProduct);
      return reqProduct;
    } else {
      console.error("Not found");
      return null;
    }
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex !== -1) {
      const updatedProduct = {
        ...this.products[productIndex],
        ...updatedFields,
      };
      this.products[productIndex] = updatedProduct;
      this.saveProducts();
      console.log("Producto actualizado exitosamente");
    } else {
      console.log("Error: Producto no encontrado");
      return null;
    }
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      this.saveProducts();
      console.log("Producto eliminado exitosamente");
    } else {
      console.log("Error: Producto no encontrado");
      return null;
    }
  }
}
