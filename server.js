const express = require("express");
const employeeRoutes = require("./src/employee/routes")
const app = express();

const port = 5000;

app.use(express.json())

app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
    res.send(
        "Hello World"
    );
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})