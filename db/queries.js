const inquirer = require('inquirer');
require('dotenv').config();
const connection = require('../config/connection')


async function displayEmployees() {

    const [allEmployees, employeesfields] = await connection.promise().query(
        `SELECT 
        employees_id,
        employee.first_name,
        employee.last_name,
        role.title,
        CONCAT(mgr.first_name, ' ', mgr.last_name) AS manager_id
        FROM employees AS emp
        LEFT JOIN roles ON empployees.role_id = rl.id
        LEFT JOIN departments ON roles.department_id = dep.id
        LEFT JOIN employees  ON emp.manager_id = mgr.id;`
    );

    console.table(allEmployees);

}


async function displayRoles() {
    const [roles, rolesFields] = await connection.promise().query('SELECT * FROM roles');
    console.table(roles);
}

async function displayDepartments() {
    const [departments, departmentsFields] = await connection.promise().query('SELECT * FROM departments');
    console.table(departments);
}

// displayDepartments = () => {

//     connection.query("select id, Department from Departments", function (err, results) {
//         err ? console.log(err) : console.table(results);

//     });
// };

async function addedEmployee() {
    const roles = await connection.promise().query('SELECT * FROM roles');
    const roleChoices = roles.map(role => ({
        name: role.title,
        value: role.id
    }));

    const employees = await connection.promise().query('SELECT * FROM employees');
    const employeeChoices = employees.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));

    employeeChoices.push('NO MANAGER');
    employeeChoices.unshift({ name: 'NO MANAGER', value: null });

    await inquirer
        .prompt([
            {
                type: 'input',
                message: "Employee's first name?",
                validate: lengthValidator,
                name: 'firstName'
            },
            {
                type: 'input',
                message: "Employee's last name?",
                validate: lengthValidator,
                name: 'lastName'
            },
            {
                type: 'list',
                message: "Employee's manager?",
                choices: employeeChoices,
                name: 'empManager'
            },
            {
                type: 'list',
                message: "What is the employee's role?",
                choices: roleChoices,
                name: 'role'
            }
        ])
        .then(async data => {
            const managerId = data.empManager === 'NO MANAGER' ? null : data.empManager;

            await connection.promise().query(
                'INSERT INTO employees (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)',
                [data.firstName, data.lastName, data.role, managerId]
            );
            console.info(data.first_name, 'added!');
        })
        .catch(err => {
            console.error("error:", err);
        });
}


async function addedRole() {
    const departments = await connection.promise().query('SELECT * FROM departments');
    const departmentChoices = departments.map(department => ({
        name: department.department,
        value: department.id
    }));
    await inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the role?",
                validate: roleLengthValidator,
                name: 'roleName'
            },
            {
                type: 'input',
                message: 'What is the salary for said role?',
                validate: salaryValidator,
                name: 'salary'
            },
            {
                type: 'list',
                message: 'What is the department this role is in?',
                choices: departmentChoices,
                name: 'department'
            }
        ])
        .then(async data => {
            await connection.promise().query(
                `INSERT INTO roles (title, salary, department_id) values ('${data.roleName}','${data.salary}', ${data.department})`
            )
            console.info(data.roleName, 'role added')
        })
        .catch(err => {
            console.error("error:", err)
        })
}

async function updatedRole() {
    const employees = await connection.promise().query('SELECT * FROM employees',)
    const employeeChoices = employees.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }))
    await inquirer
        .prompt([
            {
                type: 'list',
                message: 'Select the employee you want to update the role of:',
                choices: employeeChoices,
                name: 'employeeId'
            }
        ])
        .then(async data => {
            const roles = await connection.promise()
                .query('select * from role')
            const roleChoices = roles.map(role => ({
                name: role.title,
                value: role.id
            }))

            await inquirer
                .prompt(
                    {
                        type: 'list',
                        message: 'What is the role you want updated for selected Employee?',
                        choices: roleChoices,
                        name: 'roleId'
                    }
                )
                .then(async roleData => {
                    await connection.promise().query(
                        'update Employees set role_id = ? where id = ?',
                        [roleData.roleId, data.employeeId]
                    )
                    console.log('Role updated')
                })
                .catch(err => {
                    console.error("error:", err)
                })
        })
        .catch(err => {
            console.error("error:", err)
        })
}

async function addedDepartment() {
    await inquirer
        .prompt(
            {
                type: 'input',
                message: 'What is the name of the department you want to add?',
                validate: depLengthValidator,
                name: 'addDepartment'
            }
        )
        .then(async department => {
            await connection.promise().query(
                `INSERT INTO departments (department) VALUE ('${department.addedDepartment}')`
            )
            console.info(department.addedDepartment, 'department added.')
        })
        .catch(err => {
            console.error("error:", err)
        })
}
async function calculatedBudget() {
    const budget = await connection.promise().query(

        `SELECT dep.department AS department, SUM(rl.salary) AS utilized_budget
       FROM employees emp
       LEFT JOIN role rl ON emp.role_id = rl.id
       LEFT JOIN department dep ON rl.department_id = dep.id
       GROUP BY department`
    )

    return budget
}

async function displayBudget() {
    const [budgetData, budgetFields] = await calculatedBudget()
    console.table(budgetData)
}



const lengthValidator = async (input) => {
    if (input.length <= 1) {
        return 'Enter valid name.';
    } else {
        return true;
    }
}

const roleLengthValidator = async (input) => {
    if (input.length <= 1) {
        return 'Enter valid role name.';
    } else {
        return true;
    }
}

const depLengthValidator = async (input) => {
    if (input.length <= 1) {
        return 'Enter in a valid Department.';
    } else {
        return true;
    }
}

const salaryValidator = async (input) => {
    if (isNaN(input)) {
        return 'Enter valid salary.';
    } else {
        return true;
    }
}

module.exports = {
    displayEmployees, displayRoles, displayDepartments, addedEmployee,
    updatedRole, addedDepartment, addedRole, displayBudget
}