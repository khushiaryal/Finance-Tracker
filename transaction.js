const modal = document.getElementById("transactionModal");
const addBtn = document.getElementById("addTransactionBtn");
const saveBtn = document.getElementById("saveTransaction");
const table = document.getElementById("transactionTable");

// Open Modal
addBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

// Close Modal when clicking outside
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Load Transactions
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

displayTransactions();

// Save Transaction
saveBtn.addEventListener("click", () => {

    const name = document.getElementById("name").value.trim();
    const category = document.getElementById("category").value;
    const type = document.getElementById("type").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;

    if(name === "" || amount === "" || date === ""){
        alert("Please fill all fields.");
        return;
    }

    const transaction = {
        id: Date.now(),
        name,
        category,
        type,
        amount,
        date
    };

    transactions.push(transaction);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    displayTransactions();

    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";

    modal.style.display = "none";

});

// Display Transactions
function displayTransactions(){

    table.innerHTML = "";

    transactions.forEach((t) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${t.name}</td>
            <td>${t.category}</td>
            <td>${t.type}</td>
            <td>${t.date}</td>
            <td class="${t.type === "Income" ? "income" : "expense"}">
                ${t.type === "Income" ? "+" : "-"}$${t.amount}
            </td>
            <td>
                <button class="edit" onclick="editTransaction(${t.id})">Edit</button>
                <button class="delete" onclick="deleteTransaction(${t.id})">Delete</button>
            </td>
        `;

        table.appendChild(row);

    });

}

// Delete Transaction
function deleteTransaction(id){

    if(confirm("Delete this transaction?")){

        transactions = transactions.filter(t => t.id !== id);

        localStorage.setItem("transactions", JSON.stringify(transactions));

        displayTransactions();

    }

}

// Edit Transaction
function editTransaction(id){

    const transaction = transactions.find(t => t.id === id);

    if(!transaction) return;

    document.getElementById("name").value = transaction.name;
    document.getElementById("category").value = transaction.category;
    document.getElementById("type").value = transaction.type;
    document.getElementById("amount").value = transaction.amount;
    document.getElementById("date").value = transaction.date;

    modal.style.display = "flex";

    saveBtn.onclick = function(){

        transaction.name = document.getElementById("name").value;
        transaction.category = document.getElementById("category").value;
        transaction.type = document.getElementById("type").value;
        transaction.amount = document.getElementById("amount").value;
        transaction.date = document.getElementById("date").value;

        localStorage.setItem("transactions", JSON.stringify(transactions));

        displayTransactions();

        modal.style.display = "none";

        // Restore Save Button
        saveBtn.onclick = null;
        location.reload();

    };

}
