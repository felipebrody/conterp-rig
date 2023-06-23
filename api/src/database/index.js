const { Client } = require("pg");

const client = new Client({
  host: "dpg-ciaphj98g3nden686mlg-a",
  port: 5432,
  user: "root",
  password: "BkZou1LFOuWlkfQ7eCLZydMRuI8NOSxE",
  database: "conterp",
  timezone: "America/Sao_Paulo",
});

client.connect();

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);

  return rows;
};
