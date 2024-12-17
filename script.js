document.addEventListener('DOMContentLoaded', function () {
  const modeToggle = document.getElementById('modeToggle');
  const body = document.body;
  const totalExpenseElement = document.getElementById('totalExpense');
  const monthlyBudgetElement = document.getElementById('monthlyBudget');
  const remainingBudgetElement = document.getElementById('remainingBudget');
  const filterCategory = document.getElementById('filterCategory');
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  let monthlyBudget = JSON.parse(localStorage.getItem('monthlyBudget')) || 0;

  // Initialize Chart Variables
  let expensePieChart, expenseBarChart, expenseLineGraph;

  // Toggle Dark and Light Mode
  modeToggle.addEventListener('click', () => {
      body.classList.toggle('dark');
      modeToggle.textContent = body.classList.contains('dark') ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  });

  // Add Expense
  document.getElementById('addExpenseButton').addEventListener('click', () => {
      const description = document.getElementById('descriptionInput').value.trim();
      const amount = parseFloat(document.getElementById('amountInput').value.trim());
      const category = document.getElementById('categorySelect').value;
      const date = document.getElementById('dateInput').value;

      if (description && !isNaN(amount) && category && date) {
          const parsedDate = new Date(date);
          if (isNaN(parsedDate.getTime())) {
              alert('Invalid date format.');
              return;
          }

          const expense = { id: Date.now(), description, amount, category, date };
          expenses.push(expense);
          saveExpenses();
          renderExpenses();
          updateMonthlyTotal();
          resetForm();
      } else {
          alert('Please fill out all fields correctly.');
      }
  });

  // Save Expenses to LocalStorage
  function saveExpenses() {
      localStorage.setItem('expenses', JSON.stringify(expenses));
  }

  // Render Expenses
  function renderExpenses() {
      const tableBody = document.getElementById('expenseTableBody');
      tableBody.innerHTML = '';
      const selectedCategory = filterCategory.value;
      const filteredExpenses = selectedCategory === 'all' ? expenses : expenses.filter(exp => exp.category === selectedCategory);

      filteredExpenses.forEach(expense => {
          const newRow = document.createElement('tr');
          newRow.innerHTML = `<td>${expense.description}</td>
                              <td>${expense.date}</td>
                              <td>${expense.category}</td>
                              <td>${expense.amount.toFixed(2)}</td>
                              <td>
                                <button onclick="editExpense(${expense.id})">Edit</button>
                                <button onclick="deleteExpense(${expense.id})">Delete</button>
                              </td>`;
          tableBody.appendChild(newRow);
      });
  }

  // Update Monthly Total and Budget Info
  function updateMonthlyTotal() {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const total = expenses.filter(exp => {
          const expDate = new Date(exp.date);
          return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
      }).reduce((sum, exp) => sum + exp.amount, 0);

      totalExpenseElement.textContent = total.toFixed(2);
      const remaining = monthlyBudget - total;
      remainingBudgetElement.textContent = remaining.toFixed(2);

      // Trigger alert if expenses exceed budget
      if (remaining < 0) {
          alert("Warning: Your total expenses have exceeded your monthly budget!");
          remainingBudgetElement.style.color = 'red'; // Highlight exceeded budget
      } else {
          remainingBudgetElement.style.color = 'inherit'; // Reset to default color
      }

      updateCharts();
  }

  // Set Monthly Budget
  document.getElementById('setBudgetButton').addEventListener('click', () => {
      const budget = parseFloat(document.getElementById('budgetInput').value);
      if (!isNaN(budget)) {
          monthlyBudget = budget;
          localStorage.setItem('monthlyBudget', JSON.stringify(monthlyBudget));
          monthlyBudgetElement.textContent = budget.toFixed(2);
          updateMonthlyTotal();
          document.getElementById('budgetInput').value = '';
      }
  });

  // Update Charts (Pie, Bar, and Line Graphs)
  function updateCharts() {
      updatePieChart();
      updateBarChart();
      updateLineGraph();
  }

  // Update Pie Chart using Chart.js
  function updatePieChart() {
      const categories = ['Food', 'Entertainment', 'Transport', 'Utilities', 'Others'];
      const data = categories.map(cat => {
          return expenses.filter(exp => exp.category === cat).reduce((sum, exp) => sum + exp.amount, 0);
      });

      if (expensePieChart) expensePieChart.destroy();
      expensePieChart = new Chart(document.getElementById('expensePieChart'), {
          type: 'pie',
          data: {
              labels: categories,
              datasets: [{ data, backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'] }]
          },
          options: {
              responsive: true,
              maintainAspectRatio: true,
              aspectRatio: 2,
          }
      });
  }

  // Update Bar Chart using Chart.js
  function updateBarChart() {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthlyData = Array(12).fill(0);

      expenses.forEach(exp => {
          const expDate = new Date(exp.date);
          const monthIndex = expDate.getMonth();
          monthlyData[monthIndex] += exp.amount;
      });

      if (expenseBarChart) expenseBarChart.destroy();
      expenseBarChart = new Chart(document.getElementById('expenseBarChart'), {
          type: 'bar',
          data: {
              labels: months,
              datasets: [{
                  label: 'Monthly Expenses',
                  data: monthlyData,
                  backgroundColor: '#36A2EB'
              }]
          },
          options: {
              responsive: true,
              maintainAspectRatio: true,
              aspectRatio: 2,
          }
      });
  }

  // Update Line Graph using Chart.js
  function updateLineGraph() {
      const currentMonth = new Date().getMonth();
      const daysInMonth = new Date(new Date().getFullYear(), currentMonth + 1, 0).getDate();
      const dailyData = Array(daysInMonth).fill(0);

      expenses.forEach(exp => {
          const expDate = new Date(exp.date);
          if (expDate.getMonth() === currentMonth) {
              const day = expDate.getDate();
              dailyData[day - 1] += exp.amount;
          }
      });

      if (expenseLineGraph) expenseLineGraph.destroy();
      expenseLineGraph = new Chart(document.getElementById('expenseLineGraph'), {
          type: 'line',
          data: {
              labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
              datasets: [{
                  label: 'Daily Expenses',
                  data: dailyData,
                  borderColor: '#FF6384',
                  fill: false,
                  tension: 0.1
              }]
          },
          options: {
              responsive: true,
              maintainAspectRatio: true,
              aspectRatio: 2,
          }
      });
  }

  // Delete Expense
  window.deleteExpense = function (id) {
      expenses = expenses.filter(exp => exp.id !== id);
      saveExpenses();
      renderExpenses();
      updateMonthlyTotal();
  };

  // Edit Expense
  window.editExpense = function (id) {
      const expense = expenses.find(exp => exp.id === id);
      if (expense) {
          document.getElementById('descriptionInput').value = expense.description;
          document.getElementById('amountInput').value = expense.amount;
          document.getElementById('categorySelect').value = expense.category;
          document.getElementById('dateInput').value = expense.date;
          deleteExpense(id);
      }
  };

  // Reset Form
  function resetForm() {
      document.getElementById('descriptionInput').value = '';
      document.getElementById('amountInput').value = '';
      document.getElementById('categorySelect').value = '';
      document.getElementById('dateInput').value = '';
  }

  // Initial Render
  renderExpenses();
  updateMonthlyTotal();

  // Filter Expenses by Category
  filterCategory.addEventListener('change', renderExpenses);

  // Load Initial Monthly Budget
  monthlyBudgetElement.textContent = monthlyBudget.toFixed(2);
});
