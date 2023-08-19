const inquirer = require('inquirer');
const {
    displayEmployees, displayRoles, displayDepartments, addedEmployee,
    updatedRole, addedDepartment, addedRole, displayBudget
} = require('./db/queries');




menu()
async function menu() {
    console.log(`
    __________               .__                                        _____                              ____                  
   \______   \\ __ __  ______|__|  ____    ____    ______  ______      /     \\  _____     ____  _____     / ___\\   ____ _______  
    |    |  _/|  |  \\/  ___/|  | /    \\ _/ __ \\  /  ___/ /  ___/     /  \\ /  \\ \\__  \\   /    \\ \\__  \\   / /_/  >_/ __ \\_  __ \\ 
    |    |   \\|  |  /\\___ \\ |  ||   |  \\\\  ___/  \\___ \\  \\___ \\     /    Y    \\ / __ \\_|   |  \\/ __ \\_ \\___  / \\  ___/ |  | \\/ 
    |______  /|____//____  >|__||___|  / \\___  >/____  >/____  >    \\____|__  /(____  /|___|  /(____  //_____/   \\___  >|__|    
           \\/            \\/          \\/      \\/      \\/      \\/             \\/      \\/      \\/      \\/               \\/         
                                                                                                                               
    `);

    await inquirer
        .prompt({
            type: 'list',
            message: 'What would you like to do?',
            choices:
                ['View all employees',
                    'Add an employee',
                    'Update employee role',
                    'View all roles',
                    'Add a role',
                    'View all departments',
                    'Add department',
                    'See annual utilized budget',
                    'Quit'],
            name: 'action'
        })
        .then(data => {
            switch (data.action) {
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update employee role':
                    updateRole();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'Add department':
                    addDepartment();
                    break;
                case 'See annual utilized budget':
                    viewBudget();
                    break;
                case 'Quit':
                    quit();
                    break;
            }
        })
        .catch(err => {
            console.error("error:", err);
        });
}

async function viewEmployees() {
    await displayEmployees()
    menu()
}

async function viewRoles() {
    await displayRoles()
    menu()
}

async function viewDepartments() {
    await displayDepartments()
    menu()
}

async function addEmployee() {
    await addedEmployee()
    menu()
}

async function addDepartment() {
    await addedDepartment()
    menu()
}

async function addRole() {
    await addedRole()
    menu()
}

async function updateRole() {
    await updatedRole()
    menu()
}

async function viewBudget() {
    await displayBudget()
    menu()
}

async function quit() {
    await inquirer
        .prompt(
            {
                type: 'list',
                message: 'Are you sure you want to quit?',
                choices: ['Yes', 'No'],
                name: 'quit'
            }
        )
        .then(async data => {
            await data.quit === 'Yes' ? process.exit() : menu()
        })
        .catch(err => {
            console.error("error:", err)
        })
}