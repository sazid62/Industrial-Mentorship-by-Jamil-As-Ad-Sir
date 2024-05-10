

const ar = [
    // {
    //     name: "Income",
    //     tk: 20,
    // },

    // {
    //     name: "Expense",
    //     tk: 230,
    // },
    // {
    //     name: "Income",
    //     tk: 12,
    // },

];
////////////////////////////////////////////////////////////////
//This is taking previous data from localStorage to array!
let arLocal = localStorage.getItem("db");
arLocal = JSON.parse(arLocal);
if (arLocal)
    for (let i = 0; i < arLocal.length; i++) ar.push(arLocal[i]);
////////////////////////////////////////////////////////////////







////////////////////////////////////////////////////////////////
// taking input and check valididty and show every updated value
const input = document.querySelector("#input");
const button = document.querySelector("#button");
button.addEventListener("click", (event) => {
    let val = input.value;

    val = Number(val);
    console.log(val);
    if (Number.isNaN(val) === true || val == 0 || val === null) {
        alert("Please ente valide number.");

    }
    else {
        console.log("valid");
        if (val < 0) {
            ar.push({ name: "Expense", tk: -val });
        }
        else {

            ar.push({ name: "Income", tk: val });
        }
        showList();
        income_expense_update();
    }

    input.value = "";

});
////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////
//show updated value Expense & Income from my arraay
function income_expense_update() {
    let income = 0, expense = 0;
    for (let i = 0; i < ar.length; i++) {
        if (ar[i].name == "Income") income += ar[i].tk;
        else expense += ar[i].tk;
    }

    const incomeEle = document.querySelector("#income");
    incomeEle.innerText = "Income = " + income;


    const expenseEle = document.querySelector("#expense");
    expenseEle.innerText = "Expense = " + expense;

}
///////////////////////////////////////////////////////////////////////////

function deleteIndex(id) {
    ar.splice(id, 1);
    income_expense_update();
}

function editList(id) {
    let val = prompt("Enter value ");
    val = Number(val);

    if (val == null || val == NaN) {
        alert("Please enter Valid number again");
    }
    else {
        if (val < 0) {
            ar[id].name = "Expense";
            ar[id].tk = val;
        }
        else {
            ar[id].tk = val;
            ar[id].name = "Income";
        }

        showList();
        income_expense_update();
    }
}

function showList() {
    //save array to my Local Storage
    localStorage.setItem("db", JSON.stringify(ar));








    const list = document.querySelector("#list");
    list.innerHTML = "";
    for (let i = 0; i < ar.length; i++) {
        const div = document.createElement("div");
        div.classList.add("flex", "justify-between", "bg-slate-300", "flex-row");
        div.innerHTML = `<div class="flex gap-1">
        
        <h3 id="value">${ar[i].name} = ${ar[i].tk}</h3>
        </div>
        
        <div class="flex gap-2  text-white gap-3">
        <button id="${i}" class = "edit" class="px-2 gap-1 bg-black px-3" value = "">Edit</button>
        <button id="${i}" class = "delete" class="bg-black px-3">Delete</button>
        
        </div>`

        list.appendChild(div);
        list.addEventListener(('click'), (event) => {
            event.stopImmediatePropagation();
            if (event.target.closest('button').classList.contains('delete')) {
                const index = event.target.closest('button').id;
                deleteIndex(index)
                showList();
            }
            else if (event.target.closest('button').classList.contains('edit')) {

                const index = event.target.closest('button').id;
                editList(index);
            }
        });
    }
}

showList();
income_expense_update();