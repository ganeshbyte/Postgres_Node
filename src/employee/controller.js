var { Pool } = require('pg')
const quries = require("./queries");
var pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "test",
    password: "Password",
    port: 5432
});

const getAllEmployee = (req, res) => {
    pool.query(quries.getAllEmployee, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err })
        }
        if (result.rowCount === 0) {
            return res.status(404).json({ msg: "Employee Not Found" });
        }
        res.status(200).json(result.rows);
    })
}

const getEmployeeById = (req, res) => {
    const id = req.params.id;
    pool.query(quries.getEmployeeById, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err })
        }
        if (result.rowCount === 0) {
            return res.status(404).json({ msg: "Employee not found" });
        }
        res.status(200).json(result.rows);
    })
}

const createEmployee = (req, res) => {

    const { first_name, last_name, gender, date_of_birth, deparment } = req.body;

    if (!first_name || !last_name || !gender || !date_of_birth || !deparment) {
        return res.status(404).json({ msg: "All Fields required!" });
    }
    pool.query(quries.addEmployee, [first_name, last_name, gender, date_of_birth, deparment], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err })
        }
        res.status(200).json({ msg: "Employee created successfully" });
    })
}

const updateEmployeeById = (req, res) => {

    const id = req.params.id;

    const updateFields = Object.keys(req.body);

    let updateEmployeeById = `UPDATE employee SET `;

    updateFields.forEach((field, index) => {
        if (index > 0) {
            updateEmployeeById += `, ${field} = $${index + 1}`;
        } else {
            updateEmployeeById += `${field} = $${index + 1}`;
        }
    });
    updateEmployeeById += ` WHERE id = $${updateFields.length + 1}`;

    pool.query(updateEmployeeById, [...Object.values(req.body), id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err })
        }
        if (result.rowCount === 0) {
            return res.status(404).json({ msg: "Employee Not Found" });
        }
        res.status(200).json({ msg: "successfully Updated Employee..." });
    });
}

const deleteEmployeeById = (req, res) => {

    const id = req.params.id;

    pool.query(quries.deleteEmployeeById, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err })
        }
        if (result.rowCount === 0) {
            return res.status(200).json({ msg: "Employee Not Found" });
        }
        res.status(200).json({ msg: "Employee deleted Successfully!" });
    })
}

module.exports = { getAllEmployee, getEmployeeById, createEmployee, deleteEmployeeById, updateEmployeeById };