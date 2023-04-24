function calcMortgage(){
    let amount = parseFloat(document.getElementById("amount").value);
    let months = parseFloat(document.getElementById("months").value);
    let rate = parseFloat(document.getElementById("rate").value);

    if(isNaN(amount) || amount <= 0){
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Please enter a positive dollar value for the Loan Amount",
            backdrop: false
        });
        return;
    }
    if(!Number.isInteger(months) || months < 1){
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Please enter a positive number of months for the Term",
            backdrop: false
        });
        return;
    }
    if (isNaN(rate) || rate < 0) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Please enter a positive percentage value for the Interest Rate",
            backdrop: false
        });
        return;
    }

    let mpayment = (amount * (rate/1200)) / (1 - Math.pow((1 + (rate/1200)), -months)) 
    let totalint = buildTable(amount, months, rate, mpayment);
    displayTotals(mpayment, amount, totalint);
}

function buildTable(amount, months, rate, mpayment){
    table = document.getElementById("calcTable");
    template = document.getElementById("trtemp");

    let totalint = 0;
    let balance = amount;

    for(i = 1; i <= months; i++){
        let tableRow = document.importNode(template.content, true);

        tableRow.querySelector("[data-id='month']").textContent = i;

        tableRow.querySelector("[data-id='pay']").textContent = formatCurrency(mpayment);

        let interest = balance * (rate / 1200);
        tableRow.querySelector("[data-id='int']").textContent = formatCurrency(interest);

        let principal = mpayment - interest;
        tableRow.querySelector("[data-id='prin']").textContent = formatCurrency(principal);

        totalint += interest;
        tableRow.querySelector("[data-id='total']").textContent = formatCurrency(totalint);

        balance -= principal;
        tableRow.querySelector("[data-id='bal']").textContent = formatCurrency(Math.abs(balance));

        table.appendChild(tableRow);
    }

    return totalint;
}

function displayTotals(mpayment, amount, totalint){
    let cost = amount + totalint
    document.getElementById("monthly").textContent = formatCurrency(mpayment);
    document.getElementById("tprin").textContent = formatCurrency(amount);
    document.getElementById("tint").textContent = formatCurrency(totalint);
    document.getElementById("tcost").textContent = formatCurrency(cost);
}

function formatCurrency(num){
    return num.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
}
