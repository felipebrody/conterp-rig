const db = require("../../database/index");
const queryString = require("../utils/queryString.js");

class EfficienciesRepositories {
  async findById(id) {
    const [row] = await db.query(
      `${queryString} WHERE efficiencies.id = $1;
`,
      [id]
    );
    return row;
  }

  async findByRigId(id) {
    const rows = await db.query(
      `${queryString} WHERE efficiencies.rig_id = $1`,
      [id]
    );
    return rows;
  }

  async findAll() {
    const rows = await db.query(`${queryString}`);
    return rows;
  }

  async update(
    id,
    { date, gloss_hours, available_hours, repair_hours, dtm_hours }
  ) {
    const [row] = await db.query(
      `
        UPDATE efficiencies
        SET date = $1, gloss_hours = $2, available_hours = $3, repair_hours = $4, dtm_hours = $5
        WHERE id = $6
        RETURNING *
        `,
      [date, gloss_hours, available_hours, repair_hours, dtm_hours, id]
    );

    return row;
  }

  async findByDate({ rig_id, date }) {
    const [row] = await db.query(
      `
        SELECT * FROM efficiencies
        WHERE rig_id = $1 AND date = $2
        `,
      [rig_id, date]
    );
    return row;
  }

  async create({ date, available_hours, efficiency, rig_id, user_id }) {
    const [row] = await db.query(
      `INSERT INTO efficiencies(
        date,
        available_hours,
        efficiency,
        rig_id,
        user_id
        )
        VALUES($1,$2,$3,$4,$5)  
        RETURNING *  
        `,
      [date, available_hours, efficiency, rig_id, user_id]
    );

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query("DELETE FROM efficiencies WHERE id = $1", [
      id,
    ]);
    return deleteOp;
  }
}

module.exports = new EfficienciesRepositories();
