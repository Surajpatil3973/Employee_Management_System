const apiBaseUrl = "http://localhost:8080/api/employees";

// Function to fetch and display employees
function fetchEmployees() {
    fetch(apiBaseUrl)
        .then(response => response.json())
        .then(employees => {
            const employeesTable = document.getElementById("employeesTable");
            employeesTable.innerHTML = ""; // Clear table
            employees.forEach(employee => {
                const row = `
                    <tr>
                        <td>${employee.id}</td>
                        <td>${employee.name}</td>
                        <td>${employee.phoneno}</td>
                        <td>${employee.department}</td>
                    </tr>
                `;
                employeesTable.innerHTML += row;
            });
        })
        .catch(error => console.error("Error fetching employees:", error));
}

// Function to add a new employee
document.getElementById("addEmployeeForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const phoneno = document.getElementById("phoneno").value;
    const department = document.getElementById("department").value;

    const newEmployee = { name, phoneno, department };

    fetch(apiBaseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
    })
        .then(response => {
            if (response.ok) {
                fetchEmployees(); // Refresh the employee list
                document.getElementById("addEmployeeForm").reset(); // Reset form
            } else {
                alert("Error adding employee");
            }
        })
        .catch(error => console.error("Error adding employee:", error));
});

// Initial fetch to populate employees
fetchEmployees();
