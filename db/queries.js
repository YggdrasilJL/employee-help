const inquirer = require('inquirer');
require('dotenv').config();
const connection = require('../config/connection')

async function viewEmployeesI() {
    const allEmployees =
        await connection.promise().query(
            `SELECT 
        emp.id AS employee_id,
        emp.first_name,
        emp.last_name,
        rl.Job_Title AS job_title,
        dep.Department AS department,
        rl.Salary,
        CONCAT(mgr.first_name, ' ', mgr.last_name) AS manager
     FROM Employees emp
     LEFT JOIN Roles rl ON emp.Role_id = rl.id
     LEFT JOIN Departments dep ON rl.Department_id = dep.id
     LEFT JOIN Employees mgr ON emp.Manager_id = mgr.id;`
        );
    console.table(allEmployees);
}

async function viewRoles() {
    const roles = await connection.promise().query(
        'select * from role'
    )
    console.table(roles)
}

async function viewDepartmentsI() {
    const departments = await connection.promise().query(
        'select * from department'
    )
    console.table(departments)
}

async function addEmployee() {
    const roles = await connection.promise().query('select * from role');


    const roleChoices = roles.map(role => ({
        name: role.title,
        value: role.id
    }));

    const employees = await connection.promise().query('select * from employee');
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
                'insert into employee (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)',
                [data.firstName, data.lastName, data.role, managerId]
            );
            console.info(data.firstName, 'added!');
        })
        .catch(err => {
            console.error("error:", err);
        });
}


async function addRoleI() {
    const departments = await connection.promise().query(
        'select * from department'
    )
    const departmentChoices = departments.map(department => ({
        name: department.departments,
        value: department.id
    }))
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
                `insert into role (title, salary, department_id) values ('${data.roleName}','${data.salary}', ${data.department})`
            )
            console.info(data.roleName, 'role added')
        })
        .catch(err => {
            console.error("error:", err)
        })
}

async function updateRoleI() {
    const employees = await connection.promise().query(
        'select * from employee',
    )
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
            const [roles, fields] = await connection.promise()
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
                        'update employee set role_id = ? where id = ?',
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

async function addDepartmentI() {
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
                `insert into department (departmen) value ('${departments.addDepartmentI}')`
            )
            console.info(department.addDepartmentI, 'department added.')
        })
        .catch(err => {
            console.error("error:", err)
        })
}
async function calculateBudget() {
    const budget = await connection.promise().query(

        `SELECT dep.department_name AS department, SUM(rl.salary) AS utilized_budget
       FROM employee emp
       LEFT JOIN role rl ON emp.role_id = rl.id
       LEFT JOIN department dep ON rl.department_id = dep.id
       GROUP BY department`
    )

    return budget
}

async function seeBudget() {
    const budgetData = await calculateBudget()
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
    viewEmployeesI, viewRolesI, viewDepartmentsI, addEmployeeI,
    updateRoleI, addDepartmentI, addRoleI, seeBudgetI
}