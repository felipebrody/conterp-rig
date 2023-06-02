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
      efficiencies.id AS efficiency_id,
      efficiencies.date,
      ARRAY_AGG(gloss_periods ORDER BY gloss_periods.start_hour) AS gloss_periods,
      ARRAY_AGG(repair_periods ORDER BY repair_periods.start_hour) AS repair_periods,
      ARRAY_AGG(operating_periods ORDER BY operating_periods.start_hour) AS operating_periods,
      ARRAY_AGG(dtm_periods ORDER BY dtm_periods.start_hour) AS dtm_periods
    FROM
      efficiencies
    LEFT JOIN
      gloss_details ON gloss_details.efficiency_id = efficiencies.id
    LEFT JOIN
      gloss_periods ON gloss_periods.gloss_detail_id = gloss_details.id
    LEFT JOIN
      repair_details ON repair_details.efficiency_id = efficiencies.id
    LEFT JOIN
      repair_periods ON repair_periods.repair_detail_id = repair_details.id
    LEFT JOIN
      operating_periods_details ON operating_periods_details.efficiency_id = efficiencies.id
    LEFT JOIN
      operating_periods ON operating_periods.operating_detail_id = operating_periods_details.id
    LEFT JOIN
      dtm_details ON dtm_details.efficiency_id = efficiencies.id
    LEFT JOIN
      dtm_periods ON dtm_periods.dtm_detail_id = dtm_details.id
      WHERE efficiencies.rig_id = $1
    GROUP BY
      efficiencies.id,
      efficiencies.date;
  `,
      [id]
    );

    /* async findByRigId(id) {
    const rows = await db.query(
      `SELECT
      efficiencies.id AS efficiency_id,
      efficiencies.date,
      efficiencies.available_hours,
      gloss_periods.start_hour AS gloss_start_hour,
      gloss_periods.end_hour AS gloss_end_hour,
      gloss_periods.classification AS gloss_classification,
      gloss_periods.description AS gloss_description,
      repair_periods.start_hour AS repair_start_hour,
      repair_periods.end_hour AS repair_end_hour,
      repair_periods.classification AS repair_classification,
      repair_periods.description AS repair_description,
      operating_periods.start_hour AS operating_start_hour,
      operating_periods.end_hour AS operating_end_hour,
      operating_periods.description AS operating_description,
      dtm_periods.start_hour AS dtm_start_hour,
      dtm_periods.end_hour AS dtm_end_hour,
      dtm_periods.distance AS dtm_distance,
      dtm_periods.description AS dtm_description
    FROM
      efficiencies
    LEFT JOIN gloss_details ON efficiencies.id = gloss_details.efficiency_id
    LEFT JOIN gloss_periods ON gloss_details.id = gloss_periods.gloss_detail_id
    LEFT JOIN repair_details ON efficiencies.id = repair_details.efficiency_id
    LEFT JOIN repair_periods ON repair_details.id = repair_periods.repair_detail_id
    LEFT JOIN operating_periods_details ON efficiencies.id = operating_periods_details.efficiency_id
    LEFT JOIN operating_periods ON operating_periods_details.id = operating_periods.operating_detail_id
    LEFT JOIN dtm_details ON efficiencies.id = dtm_details.efficiency_id
    LEFT JOIN dtm_periods ON dtm_details.id = dtm_periods.dtm_detail_id
    WHERE efficiencies.rig_id = $1
    ORDER BY
      efficiencies.id,
      gloss_periods.start_hour,
      repair_periods.start_hour,
      operating_periods.start_hour,
      dtm_periods.start_hour
  `,
      [id]
    ); */

    return rows;
  }

  async findAll() {
    const rows = await db.query(`SELECT
    efficiencies.id AS efficiency_id,
    efficiencies.date,
    efficiencies.available_hours,
    gloss_periods.start_hour AS gloss_start_hour,
    gloss_periods.end_hour AS gloss_end_hour,
    gloss_periods.classification AS gloss_classification,
    gloss_periods.description AS gloss_description,
    repair_periods.start_hour AS repair_start_hour,
    repair_periods.end_hour AS repair_end_hour,
    repair_periods.classification AS repair_classification,
    repair_periods.description AS repair_description,
    operating_periods.start_hour AS operating_start_hour,
    operating_periods.end_hour AS operating_end_hour,
    operating_periods.description AS operating_description,
    dtm_periods.start_hour AS dtm_start_hour,
    dtm_periods.end_hour AS dtm_end_hour,
    dtm_periods.distance AS dtm_distance,
    dtm_periods.description AS dtm_description
  FROM
    efficiencies
  LEFT JOIN gloss_details ON efficiencies.id = gloss_details.efficiency_id
  LEFT JOIN gloss_periods ON gloss_details.id = gloss_periods.gloss_detail_id
  LEFT JOIN repair_details ON efficiencies.id = repair_details.efficiency_id
  LEFT JOIN repair_periods ON repair_details.id = repair_periods.repair_detail_id
  LEFT JOIN operating_periods_details ON efficiencies.id = operating_periods_details.efficiency_id
  LEFT JOIN operating_periods ON operating_periods_details.id = operating_periods.operating_detail_id
  LEFT JOIN dtm_details ON efficiencies.id = dtm_details.efficiency_id
  LEFT JOIN dtm_periods ON dtm_details.id = dtm_periods.dtm_detail_id
  ORDER BY
    efficiencies.id,
    gloss_periods.start_hour,
    repair_periods.start_hour,
    operating_periods.start_hour,
    dtm_periods.start_hour;
  `);
    return rows;
  }

  /* async findAll() {
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
  } */

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

  async create({ date, available_hours, rig_id, user_id }) {
    const [row] = await db.query(
      `INSERT INTO efficiencies(
        date,
        available_hours,
        rig_id,
        user_id
        )
        VALUES($1,$2,$3,$4)  
        RETURNING *  
        `,
      [date, available_hours, rig_id, user_id]
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
