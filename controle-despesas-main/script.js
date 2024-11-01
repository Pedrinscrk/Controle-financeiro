const transactionUl = document.querySelector("#transactions");

        const dummyTransactions = [
            { id: 1, name: "Bolo de brigadeiro", amount: -20 },
            { id: 2, name: "Salário", amount: 300 },
            { id: 3, name: "Torta de frango", amount: -10 },
            { id: 4, name: "Violão", amount: 150 },
        ];

        const addTransactionIntoDOM = (transaction) => {
            const operator = transaction.amount < 0 ? "-" : "+";
            const CSSClass = transaction.amount < 0 ? "minus" : "plus";
            const amountWithoutOperator = Math.abs(transaction.amount);
            const li = document.createElement("li");

            li.classList.add(CSSClass);
            li.innerHTML = `
                ${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span>
                <button class="delete-btn">x</button>
            `;
            transactionUl.prepend(li);

            li.querySelector(".delete-btn").addEventListener("click", () => {
                transactionUl.removeChild(li);
                // Lógica para remover a transação do array, se implementado
                updateBalanceValues(); // Atualiza os valores após remoção
            });
        };

        const calculateTotalExpenses = (transactions) => {
            return transactions
                .filter(transaction => transaction.amount < 0) // Filtra despesas
                .reduce((total, transaction) => total + Math.abs(transaction.amount), 0) // Soma as despesas
                .toFixed(2); // Formata para duas casas decimais
        };

        const updateBalanceValues = () => {
            const transactionsAmounts = dummyTransactions.map(transaction => transaction.amount);

            const total = transactionsAmounts.reduce((acc, transaction) => acc + transaction, 0).toFixed(2);
            const income = transactionsAmounts.filter(value => value > 0).reduce((acc, value) => acc + value, 0).toFixed(2);
            const expenses = calculateTotalExpenses(dummyTransactions); // Chama a função para calcular despesas

            document.getElementById("balance").innerText = `R$ ${total}`;
            document.getElementById("money-plus").innerText = `+ R$ ${income}`;
            document.getElementById("money-minus").innerText = `- R$ ${expenses}`;
        };

        const init = () => {
            dummyTransactions.forEach(addTransactionIntoDOM);
            updateBalanceValues();
        };

        init();
