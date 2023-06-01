const db = require("../../database/index");
class RepairPeriodsRepositories {
  async findAll() {
    const rows = await db.query(`SELECT * FROM repair_periods`);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`SELECT * FROM repair_periods WHERE id = $1`, [
      id,
    ]);
    return row;
  }

  async findByName(name) {
    const [row] = await db.query(
      `SELECT * FROM repair_periods WHERE name = $1`,
      [name]
    );
    return row;
  }

  async create({
    start_time,
    end_time,
    description,
    repair_classification,
    oil_well_id,
    repair_detail_id,
  }) {
    const [row] = await db.query(
      `INSERT INTO repair_periods (start_hour,end_hour,classification,description,repair_detail_id, oil_well_id)
             VALUES ($1,$2,$3,$4,$5,$6)
            RETURNING *
            `,
      [
        start_time,
        end_time,
        repair_classification,
        description,
        repair_detail_id,
        oil_well_id,
      ]
    );
    return row;
  }

  async update(id, { name }) {
    const [row] = await db.query(
      `
        UPDATE repair_periods
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
      "DELETE FROM repair_periods WHERE id = $1",
      [id]
    );
    return deleteOp;
  }
}

module.exports = new RepairPeriodsRepositories();
