import db from "../db.js";

class userController {
  async getUsers(req, res) {
    try {
      const users = await db.query("SELECT * FROM public.drivers");
      res.json(users.rows);
    } catch (error) {
      res.json(error);
    }
  }
  async createUser(req, res) {
    try {
      const { driver, car } = req.body;
      const user = await db.query(
        "INSERT INTO public.drivers (driver, car, totalmilleage) VALUES ($1, $2, $3)",
        [driver, car, 0]
      );
      res.json(user.rows);
    } catch (error) {
      res.json(error);
    }
  }
  async changeUser(req, res) {
    try {
      const {
        sumbuy,
        current_money,
        max_duty,
        current_duty,
        loan_balance,
        comment,
        id,
      } = req.body;
      const user = await db.query(
        "UPDATE public.drivers SET sumbuy = $1, current_money = $2, max_duty = $3, current_duty = $4, loan_balance = $5, comment = $6 WHERE id = $7",
        [
          sumbuy,
          current_money,
          max_duty,
          current_duty,
          loan_balance,
          comment,
          id,
        ]
      );
      res.json(user.rows);
    } catch (error) {
      res.json(error);
    }
  }
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await db.query("DELETE FROM public.drivers WHERE id = $1", [
        id,
      ]);
      res.json(user.rows);
    } catch (error) {
      res.json(error);
    }
  }
}

export default new userController();
