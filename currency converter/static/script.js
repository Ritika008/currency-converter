function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const base = document.getElementById("base").value.toUpperCase();
    const target = document.getElementById("target").value.toUpperCase();

    fetch('/convert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, base, target })
    })
    .then(response => response.json())
    .then(data => {
        if (data.result !== undefined) {
            document.getElementById("result").innerText = `${amount} ${base} = ${data.result} ${target}`;
        } else {
            document.getElementById("result").innerText = "Error: " + data.error;
        }
    })
    .catch(error => {
        document.getElementById("result").innerText = "Error converting currency.";
        console.error(error);
    });
}
