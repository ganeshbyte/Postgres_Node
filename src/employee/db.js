var { Pool } = require('pg')

var pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "test",
    password: "Password",
    port: 5432
});

module.exports = pool;

