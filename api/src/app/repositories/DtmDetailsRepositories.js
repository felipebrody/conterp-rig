const db = require("../../database/index");
class DtmDetailsRepositories {
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

  async create({ efficiency_id }) {
    const [row] = await db.query(
      `INSERT INTO dtm_details (efficiency_id)
                 VALUES ($1)
                RETURNING *
                `,
      [efficiency_id]
    );
    return row;
  }
}

module.exports = new DtmDetailsRepositories();
