const {Client} = require("pg");

const localHost = "localhost";
const renderHost = "dpg-ciaphj98g3nden686mlg-a";

const localHostPassoword = "root";
const renderHostPassword = "BkZou1LFOuWlkfQ7eCLZydMRuI8NOSxE";

const client = new Client({
  host: renderHost,
  port: 5432,
  user: "root",
  password: renderHostPassword,
  database: "conterp",
  timezone: "America/Sao_Paulo",
});

client.connect();

exports.query = async (query, values) => {
  const {rows} = await client.query(query, values);

  return rows;
};
