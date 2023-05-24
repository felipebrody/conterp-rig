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
      `SELECT
    efficiencies.id AS id,
    efficiencies.date,
    efficiencies.available_hours,
    rigs.name AS rig_name,
    users.name AS user_name,
    oil_wells.name AS oil_well_name,
    dtm_details.hours AS dtm_hours,
    dtm_details.distance AS dtm_distance,
    fluid_ratio.ratio AS fluid_ratio,
    equipment_ratio.ratio AS equipment_ratio,
    gloss_details.id AS gloss_detail_id,
    repair_details.id AS repair_detail_id
  FROM
    efficiencies
    JOIN rigs ON efficiencies.rig_id = rigs.id
    JOIN users ON efficiencies.user_id = users.id
    JOIN oil_wells ON efficiencies.oil_well_id = oil_wells.id
    LEFT JOIN gloss_details ON gloss_details.efficiency_id = efficiencies.id
    LEFT JOIN repair_details ON repair_details.efficiency_id = efficiencies.id
    LEFT JOIN dtm_details ON dtm_details.efficiency_id = efficiencies.id
    LEFT JOIN fluid_ratio ON fluid_ratio.efficiency_id = efficiencies.id
    LEFT JOIN equipment_ratio ON equipment_ratio.efficiency_id = efficiencies.id
    

    WHERE efficiencies.rig_id = $1;
  `,
      [id]
    );

    return rows;
  }

  async findAll() {
    const rows = await db.query(`SELECT
    efficiencies.id AS id,
    efficiencies.date,
    efficiencies.available_hours,
    rigs.name AS rig_name,
    users.name AS user_name,
    oil_wells.name AS oil_well_name,
    dtm_details.hours AS dtm_hours,
    dtm_details.distance AS dtm_distance,
    fluid_ratio.ratio AS fluid_ratio,
    equipment_ratio.ratio AS equipment_ratio,
    gloss_details.id AS gloss_detail_id,
    repair_details.id AS repair_detail_id
  FROM
    efficiencies
    JOIN rigs ON efficiencies.rig_id = rigs.id
    JOIN users ON efficiencies.user_id = users.id
    JOIN oil_wells ON efficiencies.oil_well_id = oil_wells.id
    LEFT JOIN gloss_details ON gloss_details.efficiency_id = efficiencies.id
    LEFT JOIN repair_details ON repair_details.efficiency_id = efficiencies.id
    LEFT JOIN dtm_details ON dtm_details.efficiency_id = efficiencies.id
    LEFT JOIN fluid_ratio ON fluid_ratio.efficiency_id = efficiencies.id
    LEFT JOIN equipment_ratio ON equipment_ratio.efficiency_id = efficiencies.id
    
  `);
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

  async create({ date, rig_id, user_id, oil_well, available_hours }) {
    const [row] = await db.query(
      `INSERT INTO efficiencies(
        date,
        rig_id,
        user_id,
        oil_well_id,
        available_hours
        )
        VALUES($1,$2,$3,$4,$5)  
        RETURNING *  
        `,
      [date, rig_id, user_id, oil_well, available_hours]
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
