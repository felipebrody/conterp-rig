const db = require("../../database/index");
class GlossDetailsRepositories {
  async findAll() {
    const rows = await db.query(`SELECT * FROM gloss_details`);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`SELECT * FROM gloss_details WHERE id = $1`, [
      id,
    ]);
    return row;
  }

  async findByName(name) {
    const [row] = await db.query(
      `SELECT * FROM gloss_details WHERE name = $1`,
      [name]
    );
    return row;
  }

  async create({ efficiency_id }) {
    const [row] = await db.query(
      `INSERT INTO gloss_details (efficiency_id)
             VALUES ($1)
            RETURNING *
            `,
      [efficiency_id]
    );
    return row;
  }

  async update(id, { name }) {
    const [row] = await db.query(
      `
        UPDATE gloss_details
        SET name = $1
        WHERE id = $2
        RETURNING *
        `,
      [name, id]
    );

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query("DELETE FROM gloss_details WHERE id = $1", [
      id,
    ]);
    return deleteOp;
  }
}

module.exports = new GlossDetailsRepositories();
