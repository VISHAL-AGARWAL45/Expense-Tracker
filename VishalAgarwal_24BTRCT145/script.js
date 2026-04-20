const form = document.getElementById("expense-form");
const list = document.getElementById("expense-list");
const totalEl = document.getElementById("total-amount");
const filter = document.getElementById("filter-category");

/* 🔐 CHECK LOGIN + GET USER */
fetch("get_user.php")
.then(res => res.text())
.then(name => {
    if (!name || name === "") {
        window.location.href = "login.html";
    } else {
        document.getElementById("user-name").textContent = name;
    }
});

/* ➕ ADD EXPENSE */
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const data = new FormData();
    data.append("name", document.getElementById("expense-name").value);
    data.append("amount", document.getElementById("expense-amount").value);
    data.append("category", document.getElementById("expense-category").value);
    data.append("date", document.getElementById("expense-date").value);

    fetch("add_expense.php", {
        method: "POST",
        body: data
    })
    .then(res => res.text())
    .then(response => {
        console.log("ADD:", response); // debug
        form.reset();
        loadExpenses();
    });
});

/* 📥 LOAD EXPENSES */
function loadExpenses() {
    fetch("get_expense.php")
    .then(res => res.json())
    .then(data => {
        display(data);
    });
}

/* 📊 DISPLAY TABLE */
function display(data) {
    list.innerHTML = "";
    let total = 0;

    data.forEach(exp => {
        total += parseFloat(exp.amount);

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${exp.name}</td>
            <td>₹${exp.amount}</td>
            <td>${exp.category}</td>
            <td>${exp.date}</td>
            <td>
                <button onclick="deleteExpense(${exp.id})">Delete</button>
            </td>
        `;

        list.appendChild(row);
    });

    totalEl.textContent = total.toFixed(2);
}

/* ❌ DELETE EXPENSE */
function deleteExpense(id) {
    if (!confirm("Delete this expense?")) return;

    fetch("delete_expense.php?id=" + id)
    .then(res => res.text())
    .then(response => {
        console.log("DELETE:", response); // debug

        if (response === "success") {
            loadExpenses();
        } else {
            alert("❌ Delete failed");
        }
    });
}

/* 🔍 FILTER */
filter.addEventListener("change", function() {
    fetch("get_expense.php")
    .then(res => res.json())
    .then(data => {
        if (this.value === "All") {
            display(data);
        } else {
            const filtered = data.filter(e => e.category === this.value);
            display(filtered);
        }
    });
});

/* 🚪 LOGOUT */
function logout() {
    window.location.href = "logout.php";
}

/* 🚀 INITIAL LOAD */
loadExpenses();