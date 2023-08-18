const inquirer = require('inquirer');
const {
    viewEmployees, viewRoles, viewDepartment, addEmployee,
    updateRole, addDepartment, addRole, seeBudget
} = require('./db/queries');


menu();

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
        .then(async data => {
            switch (data.action) {
                case 'View all employees':
                    await viewEmployees();
                    break;
                case 'Add an employee':
                    await addEmployee();
                    break;
                case 'Update employee role':
                    await updateRole();
                    break;
                case 'View all roles':
                    await viewRoles();
                    break;
                case 'Add a role':
                    await addRole();
                    break;
                case 'View all departments':
                    await viewDepartment();
                    break;
                case 'Add department':
                    await addDepartment();
                    break;
                case 'See annual utilized budget':
                    await seeBudget();
                    break;
                case 'Quit':
                    await quit();
                    break;
            }
        })
        .catch(err => {
            console.error("error:", err);
        });
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
            if (data.quit === 'Yes') {
                process.exit();
            } else {
                menu();
            }
        })
        .catch(err => {
            console.error("error:", err);
        });
}
