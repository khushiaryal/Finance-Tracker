// ===============================
// MONTHLY EXPENSE BAR CHART
// ===============================

// Jan to Dec
const monthlyExpenses = [0,0,0,0,0,0,0,0,0,0,0,0];

transactions.forEach(transaction => {

    // Only count expenses
    if(transaction.type === "Expense"){

        const amount = Number(transaction.amount);

        // Get month from date
        const month = new Date(transaction.date).getMonth();

        monthlyExpenses[month] += amount;

    }

});

// Month Names
const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
];

// Create Chart

const bar = document.getElementById("barChart");

new Chart(bar,{

    type:"bar",

    data:{

        labels:months,

        datasets:[{

            label:"Monthly Expenses",

            data:monthlyExpenses,

            backgroundColor:"#7C3AED",

            borderRadius:8

        }]

    },

    options:{

        responsive:true,

        plugins:{

            legend:{
                display:false
            }

        },

        scales:{

            y:{
                beginAtZero:true
            }

        }

    }

});
