const db = require("../../database/index");
class DtmRepositories {
  async findAll() {
    const rows = await db.query(`SELECT * FROM dtm_details`);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`SELECT * FROM dtm_details WHERE id = $1`, [
      id,
    ]);
    return row;
  }

  async findByName(name) {
    const [row] = await db.query(`SELECT * FROM dtm_details WHERE name = $1`, [
      name,
    ]);
    return row;
  }

  async create({ dtm_hours, dtm_distance, efficiency_id }) {
    const [row] = await db.query(
      `INSERT INTO dtm_details (hours,distance, efficiency_id)
             VALUES ($1,$2, $3)
            RETURNING *
            `,
      [dtm_hours, dtm_distance, efficiency_id]
    );
    return row;
  }
}

module.exports = new DtmRepositories();
