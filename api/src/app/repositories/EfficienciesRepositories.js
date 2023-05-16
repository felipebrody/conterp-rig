const db = require("../../database/index");

class EfficienciesRepositories {
  async findById(id) {
    const [row] = await db.query("SELECT * FROM efficiencies WHERE id = $1", [
      id,
    ]);
    return row;
  }

  async findByRigId(id) {
    const rows = await db.query(
      `SELECT efficiencies.*,
            gloss_details.start_hour AS gloss_start_hour,
            gloss_details.end_hour AS gloss_end_hour,
            repair_details.hours AS repair_hours,
            dtm_details.hours AS dtm_hours,
            dtm_details.distance as dtm_distance,
            users.name AS user_name,
            users.email AS user_email,
            rigs.name AS rig_name
            FROM efficiencies
            LEFT JOIN gloss_details ON gloss_details.id = efficiencies.gloss_detail_id
            LEFT JOIN users ON users.id = efficiencies.user_id
            LEFT JOIN rigs ON rigs.id = efficiencies.rig_id
            LEFT JOIN repair_details ON repair_details.id = efficiencies.repair_detail_id
            LEFT JOIN dtm_details ON dtm_details.id = efficiencies.dtm_detail_id
            WHERE efficiencies.rig_id = $1`,
      [id]
    );
    return rows;
  }

  async findAll() {
    const rows = await db.query(
      `SELECT efficiencies.*, 
            gloss_details.start_hour AS gloss_start_hour,
            gloss_details.end_hour AS gloss_end_hour,
            repair_details.hours AS repair_hours,
            dtm_details.hours AS dtm_hours,
            dtm_details.distance as dtm_distance,
            users.name AS user_name,
            users.email AS user_email,
            rigs.name AS rig_name
            FROM efficiencies
            LEFT JOIN gloss_details ON gloss_details.id = efficiencies.gloss_detail_id
            LEFT JOIN users ON users.id = efficiencies.user_id
            LEFT JOIN rigs ON rigs.id = efficiencies.rig_id
            LEFT JOIN repair_details ON repair_details.id = efficiencies.repair_detail_id
            LEFT JOIN dtm_details ON dtm_details.id = efficiencies.dtm_detail_id
            `
    );

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

  async create({
    date,
    rig_id,
    user_id,
    gloss_detail_id,
    available_hours,
    repair_detail_id,
    dtm_detail_id,
    fluid_ratio,
    equipment_ratio,
  }) {
    const [row] = await db.query(
      `INSERT INTO efficiencies(
            date,
            rig_id,
            user_id,
            gloss_detail_id,
            available_hours,
            repair_detail_id,
            dtm_detail_id,
            fluid_ratio,
            equipment_ratio
            )
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)  
        RETURNING *  
        `,
      [
        date,
        rig_id,
        user_id,
        gloss_detail_id,
        available_hours,
        repair_detail_id,
        dtm_detail_id,
        fluid_ratio,
        equipment_ratio,
      ]
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
