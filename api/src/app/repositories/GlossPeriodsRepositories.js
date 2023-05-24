const db = require("../../database/index");
class GlossPeriodsRepositories {
  async findAll() {
    const rows = await db.query(`SELECT * FROM gloss_periods`);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`SELECT * FROM gloss_periods WHERE id = $1`, [
      id,
    ]);
    return row;
  }

  async findByName(name) {
    const [row] = await db.query(
      `SELECT * FROM gloss_periods WHERE name = $1`,
      [name]
    );
    return row;
  }

  async create({
    start_time_gloss,
    end_time_gloss,
    gloss_classification,
    gloss_description,
    gloss_detail_id,
  }) {
    const [row] = await db.query(
      `INSERT INTO gloss_periods (start_hour,end_hour,classification,description,gloss_detail_id)
             VALUES ($1,$2,$3,$4,$5)
            RETURNING *
            `,
      [
        start_time_gloss,
        end_time_gloss,
        gloss_classification,
        gloss_description,
        gloss_detail_id,
      ]
    );
    return row;
  }

  async update(id, { name }) {
    const [row] = await db.query(
      `
        UPDATE gloss_periods
        SET name = $1
        WHERE id = $2
        RETURNING *
        `,
      [name, id]
    );

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query("DELETE FROM gloss_periods WHERE id = $1", [
      id,
    ]);
    return deleteOp;
  }
}

module.exports = new GlossPeriodsRepositories();
