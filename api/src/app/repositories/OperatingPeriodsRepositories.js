const db = require("../../database/index");
class OperatingPeriodsRepositories {
  async findAll() {
    const rows = await db.query(`SELECT * FROM operating_periods`);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(
      `SELECT * FROM operating_periods WHERE id = $1`,
      [id]
    );
    return row;
  }

  async findByName(name) {
    const [row] = await db.query(
      `SELECT * FROM operating_periods WHERE name = $1`,
      [name]
    );
    return row;
  }

  async create({
    start_time,
    end_time,
    description,
    oil_well_id,
    operating_detail_id,
  }) {
    const [row] = await db.query(
      `INSERT INTO operating_periods (start_hour,end_hour,description, oil_well_id, operating_detail_id)
             VALUES ($1,$2,$3,$4,$5)
            RETURNING *
            `,
      [start_time, end_time, description, oil_well_id, operating_detail_id]
    );
    return row;
  }

  async update(id, { name }) {
    const [row] = await db.query(
      `
        UPDATE operating_periods
        SET name = $1
        WHERE id = $2
        RETURNING *
        `,
      [name, id]
    );

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(
      "DELETE FROM operating_periods WHERE id = $1",
      [id]
    );
    return deleteOp;
  }
}

module.exports = new OperatingPeriodsRepositories();
