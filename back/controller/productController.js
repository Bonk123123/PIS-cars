import db from "../db.js";

class productController {
  async getProducts(req, res) {
    try {
      const products = await db.query("SELECT * FROM public.cars");
      res.json(products.rows);
    } catch (error) {
      res.json(error);
    }
  }
  async createProduct(req, res) {
    try {
      const { car, mark, number, year, oil } = req.body;
      const productDb = await db.query(
        "INSERT INTO public.cars (car, mark, number, year, oil, totalmilleage) VALUES ($1, $2, $3, $4, $5, $6)",
        [car, mark, number, year, oil, 0]
      );
      res.json(productDb.rows);
    } catch (error) {
      res.json(error);
    }
  }
  async changeProduct(req, res) {
    try {
      const { product, quantity_product, price, id } = req.body;
      const productDb = await db.query(
        "UPDATE public.cars SET product = $1, quantity_product = $2, price = $3 WHERE id = $4",
        [product, quantity_product, price, id]
      );
      res.json(productDb.rows);
    } catch (error) {
      res.json(error);
    }
  }
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const productDb = await db.query(
        "DELETE FROM public.cars WHERE id = $1",
        [id]
      );
      res.json(productDb);
    } catch (error) {
      res.json(error);
    }
  }
}

export default new productController();
