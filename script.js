// ==========================
// Login Check
// ==========================

if (localStorage.getItem("login") != "true") {
    if (window.location.pathname.includes("dashboard.html") ||
        window.location.pathname.includes("students.html")) {
        window.location = "login.html";
    }
}

// ==========================
// Students Array
// ==========================

let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

// ==========================
// Dashboard
// ==========================

function loadDashboard() {

    let totalStudents = document.getElementById("totalStudents");
    let totalDept = document.getElementById("totalDept");

    if (totalStudents) {
        totalStudents.innerHTML = students.length;
    }

    if (totalDept) {

        let dept = [];

        students.forEach(s => {
            if (!dept.includes(s.dept)) {
                dept.push(s.dept);
            }
        });

        totalDept.innerHTML = dept.length;
    }

}

// ==========================
// Logout
// ==========================

function logout() {

    localStorage.removeItem("login");

    window.location = "login.html";

}

// ==========================
// Save Student
// ==========================

function saveStudent() {

    let id = document.getElementById("id").value.trim();
    let name = document.getElementById("name").value.trim();
    let dept = document.getElementById("dept").value.trim();
    let year = document.getElementById("year").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();



    if (
        id == "" ||
        name == "" ||
        dept == "" ||
        year == "" ||
        email == "" ||
        phone == ""
    ) {
        alert("Please fill all fields");
        return;
    }

    let student = {
        id,
        name,
        dept,
        year,
        email,
        phone
    
    };

    if (editIndex == -1) {
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = -1;
    }

    localStorage.setItem("students", JSON.stringify(students));

    clearForm();

    displayStudents();

    loadDashboard();

    loadChart();

}
// ==========================
// Display Students
// ==========================

function displayStudents() {

    let table = document.getElementById("studentTable");

    if (!table) return;

    table.innerHTML = "";

    students.forEach((student, index) => {

        table.innerHTML += `
        <tr>

            <td>${student.id}</td>

            <td>${student.name}</td>

            <td>${student.dept}</td>

            <td>${student.year}</td>

            <td>${student.email}</td>

            <td>${student.phone}</td>

            <td>

                <button class="editBtn"
                onclick="editStudent(${index})">

                Edit

                </button>

                <button class="deleteBtn"
                onclick="deleteStudent(${index})">

                Delete

                </button>

            </td>

        </tr>
        `;

    });

}

// ==========================
// Edit Student
// ==========================

function editStudent(index) {

    editIndex = index;

    document.getElementById("id").value = students[index].id;

    document.getElementById("name").value = students[index].name;

    document.getElementById("dept").value = students[index].dept;

    document.getElementById("year").value = students[index].year;

    document.getElementById("email").value = students[index].email;

    document.getElementById("phone").value = students[index].phone;


}

// ==========================
// Delete Student
// ==========================

function deleteStudent(index) {

    if (confirm("Delete this student?")) {

        students.splice(index, 1);

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        displayStudents();

        loadDashboard();

        loadChart();

    }

}

// ==========================
// Clear Form
// ==========================

function clearForm() {

    document.getElementById("id").value = "";

    document.getElementById("name").value = "";

    document.getElementById("dept").value = "";

    document.getElementById("year").value = "";

    document.getElementById("email").value = "";

    document.getElementById("phone").value = "";

    

}
// ==========================
// Search Student
// ==========================

function searchStudent() {

    let value = document.getElementById("search").value.toLowerCase();

    let rows = document.querySelectorAll("#studentTable tr");

    rows.forEach(row => {

        row.style.display =
            row.innerText.toLowerCase().includes(value)
            ? ""
            : "none";

    });

}


// ==========================
// Dark Mode
// ==========================

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

    let btn = document.getElementById("darkBtn");

    if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem("theme", "dark");

        if (btn) btn.innerHTML = "☀️ Light Mode";

    } else {

        localStorage.setItem("theme", "light");

        if (btn) btn.innerHTML = "🌙 Dark Mode";

    }

}

// ==========================
// Chart.js
// ==========================

function loadChart() {

    let canvas = document.getElementById("studentChart");

    if (!canvas) return;

    let count = {};

    students.forEach(s => {

        count[s.dept] = (count[s.dept] || 0) + 1;

    });

    if (window.studentChart) {
        window.studentChart.destroy();
    }

    window.studentChart = new Chart(canvas, {

        type: "bar",

        data: {

            labels: Object.keys(count),

            datasets: [{
                label: "Students",

                data: Object.values(count),

                borderWidth: 1
            }]
        },

        options: {

            responsive: true,

            scales: {
                y: {
                    beginAtZero: true
                }
            }

        }

    });

}

// ==========================
// Initial Load
// ==========================

document.addEventListener("DOMContentLoaded", function () {

    displayStudents();

    loadDashboard();

    loadChart();

    let btn = document.getElementById("darkBtn");

    if (btn && document.body.classList.contains("dark-mode")) {
        btn.innerHTML = "☀️ Light Mode";
    }

});
