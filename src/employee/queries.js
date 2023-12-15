const getAllEmployee = "SELECT * FROM employee";
const getEmployeeById = "SELECT * FROM employee WHERE id = $1";
const addEmployee = "INSERT INTO employee (first_name, last_name, gender, date_of_birth, deparment) VALUES ($1, $2,$3,$4,$5) RETURNING *";
const deleteEmployeeById = "DELETE FROM employee WHERE id = $1";

module.exports = {
    getAllEmployee,
    getEmployeeById,
    addEmployee,
    deleteEmployeeById
}