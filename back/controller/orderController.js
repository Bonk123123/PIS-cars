import db from "../db.js";

class orderController {
  async getMileage(req, res) {
    try {
      const cars = await db.query("SELECT * FROM public.cars");
      const drivers = await db.query("SELECT * FROM public.drivers");

      const mileageCars = cars.rows.map((item) => {
        return { car: item.car, mileage: item.totalmilleage };
      });

      let driversDub = [];

      drivers.rows.forEach((item) => {
        if (!driversDub.includes(item.driver)) {
          driversDub.push(item.driver);
        }
      });

      let mileageDrivers = [];

      driversDub.forEach((driver) => {
        let total = 0;
        drivers.rows.forEach((item) => {
          if (driver === item.driver) {
            total += item.totalmilleage;
          }
        });
        mileageDrivers.push({ driver: driver, mileage: total });
      });

      res.json([mileageCars, mileageDrivers]);
    } catch (error) {
      res.json(error);
    }
  }
  async getOrders(req, res) {
    try {
      const orders = await db.query("SELECT * FROM public.documents");
      res.json(orders.rows);
    } catch (error) {
      res.json(error);
    }
  }
  async createOrder(req, res) {
    try {
      const {
        driver,
        car,
        departureTime,
        arrivalTime,
        initialMileage,
        finalMileage,
        mileage,
        fuelConsumption,
      } = req.body;
      const quantity = await db.query(
        "INSERT INTO public.cars (driver, car, departureTime,	arrivalTime, initialMileage,	finalMileage,	mileage, fuelConsumption) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [
          driver,
          car,
          departureTime,
          arrivalTime,
          initialMileage,
          finalMileage,
          mileage,
          fuelConsumption,
        ]
      );

      const totalCar = await db.query(
        "SELECT (totalmilaege) FROM public.cars WHERE car = $1",
        [car]
      );
      const totalDriver = await db.query(
        "SELECT (totalmilaege) FROM public.drivers WHERE driver = $1 and car = $2",
        [driver, car]
      );

      const totuptcar = await db.query(
        "UPDATE public.cars SET totalmileage = $1 WHERE car = $2",
        [totalCar.rows[0] + mileage, car]
      );
      const totuptdriv = await db.query(
        "UPDATE public.drivers SET totalmileage = $1 WHERE driver = $2 and car = $3",
        [totalDriver.rows[0] + mileage, driver, car]
      );

      res.json(quantity.rows);
    } catch (error) {
      res.json(error);
    }
  }

  async deleteOrders(req, res) {
    try {
      const { id } = req.params;
      const order = await db.query(
        "DELETE FROM public.documents WHERE id = $1",
        [id]
      );
      res.json(order.rows);
    } catch (error) {
      res.json(error);
    }
  }
}

export default new orderController();
