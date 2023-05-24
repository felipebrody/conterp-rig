const db = require("../../database/index");
class EquipmentRatioRepositories {
  async findAll() {
    const rows = await db.query(`SELECT * FROM equipment_ratio`);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(
      `SELECT * FROM equipment_ratio WHERE id = $1`,
      [id]
    );
    return row;
  }

  async findByName(name) {
    const [row] = await db.query(
      `SELECT * FROM equipment_ratio WHERE name = $1`,
      [name]
    );
    return row;
  }

  async create({ equipment_ratio, efficiency_id }) {
    const [row] = await db.query(
      `INSERT INTO equipment_ratio (ratio, efficiency_id)
             VALUES ($1,$2)
            RETURNING *
            `,
      [equipment_ratio, efficiency_id]
    );
    return row;
  }
}

module.exports = new EquipmentRatioRepositories();
