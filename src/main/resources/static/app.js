//  mock data list 
let employees = [
    { id: 1, firstName: "John", lastName: "Doe", email: "john@company.com", department: "HR", role: "Manager" },
    { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@company.com", department: "IT", role: "Engineer" },
    { id: 3, firstName: "Sam", lastName: "Green", email: "sam@company.com", department: "HR", role: "Engineer" },
    { id: 4, firstName: "Alice", lastName: "Brown", email: "alice@company.com", department: "Finance", role: "Analyst" },
    { id: 5, firstName: "Bob", lastName: "Johnson", email: "bob@company.com", department: "Marketing", role: "Executive" },
    { id: 6, firstName: "Emily", lastName: "Davis", email: "emily@company.com", department: "IT", role: "Manager" },
    { id: 7, firstName: "Michael", lastName: "Lee", email: "michael@company.com", department: "Finance", role: "Accountant" },
    { id: 8, firstName: "Sara", lastName: "Miller", email: "sara@company.com", department: "Operations", role: "Coordinator" },
    { id: 9, firstName: "David", lastName: "Wilson", email: "david@company.com", department: "IT", role: "Support" },
    { id: 10, firstName: "Nina", lastName: "Taylor", email: "nina@company.com", department: "HR", role: "Recruiter" }
];


let editingId = null;
let intialPage = 1;
let pageSize = 10;
let filteredEmployees = [...employees];

/* * displaycard this funaction is show card with details
   * when user select pages filter the data based on paging
   * Card will add into listContainer append into DOM 
   * Each time creating new conatiner add element and append 
 */

function displayCard(page) {

    let pageSize = parseInt(document.getElementById('pageSize').value);
    const listContainer = document.getElementById('employeeList');
    const pagination = document.getElementById('paginationControls');

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pagesItems = filteredEmployees.slice(start, end);

    listContainer.innerHTML = '';
    pagesItems.forEach(emp => {
        const card = document.createElement('div');
        card.className = 'employee-card';
        card.setAttribute('data-id', emp.id);
        card.setAttribute('data-firstname', emp.firstName);
        card.setAttribute('data-lastname', emp.lastName);
        card.setAttribute('data-email', emp.email);
        card.setAttribute('data-department', emp.department);
        card.setAttribute('data-role', emp.role);

        card.innerHTML = `
      <p><strong>${emp.firstName} ${emp.lastName}</strong></p>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Deparment:</strong> ${emp.department}</p>
      <p><strong>Deparment:</strong> ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;

        listContainer.appendChild(card);
    });

    pagination.innerHTML = '';
    const pageCount = Math.ceil(filteredEmployees.length / pageSize);
    for (let i = 1; i <= pageCount; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.onclick = () => displayCard(i);
        if (i === page) btn.style.fontWeight = 'bold';
        pagination.appendChild(btn);
    }

    intialPage = page;
}

// form card taggle submit for hide and display
function addNewEmp() {
    document.getElementById("emp-form").classList.toggle("emp-from-container-active");
}


// sidebar filter apply button functionality and filter that data

function applyFilters() {
    const dept = document.getElementById('filterDepartment').value.toLowerCase();
    const role = document.getElementById('filterRole').value.toLowerCase();
    filteredEmployees = employees.filter(emp => {
        return (!dept || emp.department.toLowerCase().includes(dept)) &&
            (!role || emp.role.toLowerCase().includes(role));
    });
    displayCard(1);
}

/* On change function while user searching by name or sort by first name or deparmnet filtter data
    * 1) when user search name or email this funcational will run  
    * 2) another functionality is sortBy filter by first name or department
*/

function OnchangeFunc() {
    //console.log(event)
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const dept = document.getElementById('filterDepartment').value.toLowerCase();
    const role = document.getElementById('filterRole').value.toLowerCase();
    const sortBy = document.getElementById('sortBy').value;

    filteredEmployees = employees.filter(emp => {
        const matchesSearch = emp.firstName.toLowerCase().includes(searchTerm) ||
            emp.email.toLowerCase().includes(searchTerm);
        const matchesDept = !dept || emp.department.toLowerCase().includes(dept);
        return matchesSearch && matchesDept;
    });

    if (sortBy) {
        filteredEmployees.sort((a, b) => {
            const aVal = a[sortBy].toLowerCase();
            const bVal = b[sortBy].toLowerCase();
            return aVal.localeCompare(bVal);
        });
    }

    displayCard(1);
}

// fillter side-bar clear button functionalites this make value into empty

function clearFilters() {
    document.getElementById('filterDepartment').value = '';
    document.getElementById('filterRole').value = '';
    filteredEmployees = [...employees];
    renderPage(1);
}

// side-bar visiblility active button classattribute toggle

function toggleFilter() {
    const sidebar = document.getElementById('filterSidebar');
    sidebar.classList.toggle('active');
}


/* * 1) editFunction call when user click on Edit with details
   * 2) if user id not fonund it return empty */
function editEmployee(id) {
    addNewEmp(); //call function show form with details
    const emp = employees.find(each => each.id === id);
    if (!emp) return;
    else {
        document.getElementById('firstName').value = emp.firstName;
        document.getElementById('lastName').value = emp.lastName;
        document.getElementById('email').value = emp.email;
        document.getElementById('department').value = emp.department;
        document.getElementById('role').value = emp.role;
        document.getElementById('formTitle').textContent = 'Edit Employee';
        editingId = id;
    };
}


/* * When user want delete that details in deleteEmployee functional run this funaction
   * show alert() with deleted id */
function deleteEmployee(id) {
    filteredEmployees = filteredEmployees.filter(emp => emp.id !== id);
    displayCard(intialPage);
    alert("Employee Deleted " + id);
}

/* -> when user click on add or submit this funation will run
   -> new user details creates as object and push into employees list */
document.getElementById('emp-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const newEmployee = {
        id: filteredEmployees.length + 1,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        department: document.getElementById('department').value,
        role: document.getElementById('role').value
    };
    filteredEmployees.push(newEmployee);
    displayCard(1);
    document.getElementById('emp-form').reset(); // rest funcation empty all element in form
});

// to loading of dom page
document.addEventListener('DOMContentLoaded', () => {
    displayCard(1);
});
