const db = require("../../database/index");
class FluidRatioRepositories {
  async findAll() {
    const rows = await db.query(`SELECT * FROM fluid_ratio`);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`SELECT * FROM fluid_ratio WHERE id = $1`, [
      id,
    ]);
    return row;
  }

  async findByName(name) {
    const [row] = await db.query(`SELECT * FROM fluid_ratio WHERE name = $1`, [
      name,
    ]);
    return row;
  }

  async create({ fluid_ratio, efficiency_id }) {
    const [row] = await db.query(
      `INSERT INTO fluid_ratio (ratio, efficiency_id)
             VALUES ($1,$2)
            RETURNING *
            `,
      [fluid_ratio, efficiency_id]
    );
    return row;
  }
}

module.exports = new FluidRatioRepositories();
