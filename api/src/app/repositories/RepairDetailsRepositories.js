const db = require("../../database/index");
class RepairDetailsRepositories {
    async findAll() {
        const rows = await db.query(`SELECT * FROM repair_details`);

        return rows;
    }

    async findById(id) {
        const [row] = await db.query(`SELECT * FROM repair_details WHERE id = $1`, [
            id,
        ]);
        return row;
    }

    async findByName(name) {
        const [row] = await db.query(
            `SELECT * FROM repair_details WHERE name = $1`,
            [name]
        );
        return row;
    }

    async create({ repair_classification, repair_hours }) {
        const [row] = await db.query(
            `INSERT INTO repair_details (hours,  classification)
             VALUES ($1,$2)
            RETURNING *
            `,
            [repair_hours, repair_classification]
        );
        return row;
    }


}

module.exports = new RepairDetailsRepositories();
