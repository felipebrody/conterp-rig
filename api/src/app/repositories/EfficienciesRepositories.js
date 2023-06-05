const db = require("../../database/index");

class EfficienciesRepositories {
  async findById(id) {
    const [row] = await db.query(
      `SELECT
    efficiencies.id AS efficiency_id,
    efficiencies.date,
    efficiencies.available_hours,
    ARRAY(
      SELECT
        json_build_object(
          'id', gloss_periods.id,
          'start_hour', gloss_periods.start_hour,
          'end_hour', gloss_periods.end_hour,
          'type', gloss_periods.classification,
          'description', gloss_periods.description,
          'oil_well_name', oil_wells.name
        )
      FROM gloss_details
      JOIN gloss_periods ON gloss_periods.gloss_detail_id = gloss_details.id
      JOIN oil_wells ON oil_wells.id = gloss_periods.oil_well_id
      WHERE gloss_details.efficiency_id = efficiencies.id
      ORDER BY gloss_periods.start_hour
    ) AS gloss_periods,
    ARRAY(
      SELECT
        json_build_object(
          'id', repair_periods.id,
          'start_hour', repair_periods.start_hour,
          'end_hour', repair_periods.end_hour,
          'classification', repair_periods.classification,
          'description', repair_periods.description,
          'oil_well_name', oil_wells.name
        )
      FROM repair_details
      JOIN repair_periods ON repair_periods.repair_detail_id = repair_details.id
      JOIN oil_wells ON oil_wells.id = repair_periods.oil_well_id
      WHERE repair_details.efficiency_id = efficiencies.id
      ORDER BY repair_periods.start_hour
    ) AS repair_periods,
    ARRAY(
      SELECT
        json_build_object(
          'id', operating_periods.id,
          'start_hour', operating_periods.start_hour,
          'end_hour', operating_periods.end_hour,
          'description', operating_periods.description,
          'oil_wells_name', oil_wells.name
        )
      FROM operating_periods_details
      JOIN operating_periods ON operating_periods.operating_detail_id = operating_periods_details.id
      JOIN oil_wells ON oil_wells.id = operating_periods.oil_well_id
      WHERE operating_periods_details.efficiency_id = efficiencies.id
      ORDER BY operating_periods.start_hour
    ) AS operating_periods,
    ARRAY(
      SELECT
        json_build_object(
          'id', dtm_periods.id,
          'start_hour', dtm_periods.start_hour,
          'end_hour', dtm_periods.end_hour,
          'description', dtm_periods.description,
          'oil_wells_name', oil_wells.name
        )
      FROM dtm_details
      JOIN dtm_periods ON dtm_periods.dtm_detail_id = dtm_details.id
      JOIN oil_wells ON oil_wells.id = dtm_periods.oil_well_id
      WHERE dtm_details.efficiency_id = efficiencies.id
      ORDER BY dtm_periods.start_hour
    ) AS dtm_periods
  FROM efficiencies
  WHERE efficiencies.id = $1;

`,
      [id]
    );
    return row;
  }

  async findByRigId(id) {
    const rows = await db.query(
      `SELECT
      efficiencies.id AS efficiency_id,
      efficiencies.date,
      efficiencies.available_hours,
      ARRAY(
        SELECT
          json_build_object(
            'id', gloss_periods.id,
            'start_hour', gloss_periods.start_hour,
            'end_hour', gloss_periods.end_hour,
            'type', gloss_periods.classification,
            'description', gloss_periods.description,
            'oil_well_name', oil_wells.name
          )
        FROM gloss_details
        JOIN gloss_periods ON gloss_periods.gloss_detail_id = gloss_details.id
        JOIN oil_wells ON oil_wells.id = gloss_periods.oil_well_id
        WHERE gloss_details.efficiency_id = efficiencies.id
        ORDER BY gloss_periods.start_hour
      ) AS gloss_periods,
      ARRAY(
        SELECT
          json_build_object(
            'id', repair_periods.id,
            'start_hour', repair_periods.start_hour,
            'end_hour', repair_periods.end_hour,
            'classification', repair_periods.classification,
            'description', repair_periods.description,
            'oil_well_name', oil_wells.name
          )
        FROM repair_details
        JOIN repair_periods ON repair_periods.repair_detail_id = repair_details.id
        JOIN oil_wells ON oil_wells.id = repair_periods.oil_well_id
        WHERE repair_details.efficiency_id = efficiencies.id
        ORDER BY repair_periods.start_hour
      ) AS repair_periods,
      ARRAY(
        SELECT
          json_build_object(
            'id', operating_periods.id,
            'start_hour', operating_periods.start_hour,
            'end_hour', operating_periods.end_hour,
            'description', operating_periods.description,
            'oil_wells_name', oil_wells.name
          )
        FROM operating_periods_details
        JOIN operating_periods ON operating_periods.operating_detail_id = operating_periods_details.id
        JOIN oil_wells ON oil_wells.id = operating_periods.oil_well_id
        WHERE operating_periods_details.efficiency_id = efficiencies.id
        ORDER BY operating_periods.start_hour
      ) AS operating_periods,
      ARRAY(
        SELECT
          json_build_object(
            'id', dtm_periods.id,
            'start_hour', dtm_periods.start_hour,
            'end_hour', dtm_periods.end_hour,
            'description', dtm_periods.description,
            'oil_wells_name', oil_wells.name
          )
        FROM dtm_details
        JOIN dtm_periods ON dtm_periods.dtm_detail_id = dtm_details.id
        JOIN oil_wells ON oil_wells.id = dtm_periods.oil_well_id
        WHERE dtm_details.efficiency_id = efficiencies.id
        ORDER BY dtm_periods.start_hour
      ) AS dtm_periods
    FROM efficiencies
    WHERE efficiencies.rig_id = $1;

  `,
      [id]
    );
    return rows;
  }

  async findAll() {
    const rows = await db.query(`SELECT
    efficiencies.id AS efficiency_id,
    efficiencies.date,
    efficiencies.available_hours,
    ARRAY(
      SELECT
        json_build_object(
          'id', gloss_periods.id,
          'start_hour', gloss_periods.start_hour,
          'end_hour', gloss_periods.end_hour,
          'type', gloss_periods.classification,
          'description', gloss_periods.description,
          'oil_well_name', oil_wells.name
        )
      FROM gloss_details
      JOIN gloss_periods ON gloss_periods.gloss_detail_id = gloss_details.id
      JOIN oil_wells ON oil_wells.id = gloss_periods.oil_well_id
      WHERE gloss_details.efficiency_id = efficiencies.id
      ORDER BY gloss_periods.start_hour
    ) AS gloss_periods,
    ARRAY(
      SELECT
        json_build_object(
          'id', repair_periods.id,
          'start_hour', repair_periods.start_hour,
          'end_hour', repair_periods.end_hour,
          'classification', repair_periods.classification,
          'description', repair_periods.description,
          'oil_well_name', oil_wells.name
        )
      FROM repair_details
      JOIN repair_periods ON repair_periods.repair_detail_id = repair_details.id
      JOIN oil_wells ON oil_wells.id = repair_periods.oil_well_id
      WHERE repair_details.efficiency_id = efficiencies.id
      ORDER BY repair_periods.start_hour
    ) AS repair_periods,
    ARRAY(
      SELECT
        json_build_object(
          'id', operating_periods.id,
          'start_hour', operating_periods.start_hour,
          'end_hour', operating_periods.end_hour,
          'description', operating_periods.description,
          'oil_wells_name', oil_wells.name
        )
      FROM operating_periods_details
      JOIN operating_periods ON operating_periods.operating_detail_id = operating_periods_details.id
      JOIN oil_wells ON oil_wells.id = operating_periods.oil_well_id
      WHERE operating_periods_details.efficiency_id = efficiencies.id
      ORDER BY operating_periods.start_hour
    ) AS operating_periods,
    ARRAY(
      SELECT
        json_build_object(
          'id', dtm_periods.id,
          'start_hour', dtm_periods.start_hour,
          'end_hour', dtm_periods.end_hour,
          'description', dtm_periods.description,
          'oil_wells_name', oil_wells.name
        )
      FROM dtm_details
      JOIN dtm_periods ON dtm_periods.dtm_detail_id = dtm_details.id
      JOIN oil_wells ON oil_wells.id = dtm_periods.oil_well_id
      WHERE dtm_details.efficiency_id = efficiencies.id
      ORDER BY dtm_periods.start_hour
    ) AS dtm_periods
  FROM efficiencies
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
