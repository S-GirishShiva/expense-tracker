# Expense Tracker Application

This is a feature-rich Expense Tracker Application built using **HTML**, **CSS**, **JavaScript**, and **Chart.js** for data visualization. The app helps users manage and track their expenses, visualize spending patterns, and set monthly budgets.

## Features

### 1. Add, Edit, and Delete Expenses
- Users can add expenses with the following details:
  - **Description**: A brief note about the expense.
  - **Amount**: Expense value in currency.
  - **Category**: Select from predefined categories like Food, Transport, Utilities, etc.
  - **Date**: Date of the expense.
- Edit or delete any previously added expense.

### 2. Monthly Budget Management
- Users can set a monthly budget.
- Automatically calculates the total expenses for the current month.
- Displays the remaining budget.
- Alerts the user when expenses exceed the monthly budget.

### 3. Filter Expenses by Category
- Allows filtering of expenses based on predefined categories to analyze spending.

### 4. Dynamic Charts for Visualization
Using **Chart.js**, the following graphs are displayed:
- **Pie Chart**: Displays category-wise expense distribution.
- **Bar Chart**: Shows monthly expenses over the year.
- **Line Graph**: Plots daily expenses for the current month.

### 5. Dark and Light Mode
- Toggle between light and dark themes for better visual comfort.

### 6. Persistent Data Storage
- Expenses and monthly budget are stored in the browser's **LocalStorage**, ensuring data persists across sessions.

---

## Screenshots

### Dashboard
![Dashboard](screenshot_dashboard.png)

### Dark Mode
![Dark Mode](screenshot_darkmode.png)

### Visualizations
![Charts](screenshot_charts.png)

---

## Installation

1. Clone the repository to your local system:
   ```bash
   git clone https://github.com/yourusername/expense-tracker.git
   ```

2. Navigate to the project folder:
   ```bash
   cd expense-tracker
   ```

3. Open the `index.html` file in any modern web browser:
   ```
   File -> Open -> index.html
   ```

4. Start managing your expenses!

---

## Project Structure

```plaintext
.
├── index.html          # Main HTML file
├── styles.css          # Styling file for layout and design
├── script.js           # Core JavaScript logic
├── README.md           # Documentation file
└── assets/             # Contains any images or assets for the project
```

---

## Usage

1. **Set a Monthly Budget**:
   - Enter the desired monthly budget and click on "Set Budget."

2. **Add Expenses**:
   - Fill out the description, amount, category, and date fields.
   - Click on "Add Expense" to save the record.

3. **View Expenses**:
   - All expenses will appear in a table.
   - Filter expenses by selecting a category from the dropdown.

4. **Visualize Expenses**:
   - View spending insights through interactive charts.

5. **Edit/Delete Expenses**:
   - Use the "Edit" or "Delete" buttons to update/remove records.

6. **Dark/Light Mode**:
   - Toggle between dark and light modes using the switch button.

---

## Dependencies

- [Chart.js](https://www.chartjs.org/): Used for creating interactive and responsive charts.

---

## Technologies Used

- **HTML5**: Markup structure.
- **CSS3**: Styling and responsive layout.
- **JavaScript**: Core logic for expense management.
- **LocalStorage**: Browser-based persistent data storage.
- **Chart.js**: For visualizing expenses with pie, bar, and line charts.

---

## Future Enhancements
- Add user authentication and cloud storage.
- Include currency conversion features.
- Provide PDF export of expense reports.
- Implement income tracking alongside expenses.

---

## Contributing
Contributions are welcome! If you'd like to enhance or fix something, please fork the repository, make changes, and submit a pull request.

1. Fork the repository.
2. Create a new branch for your changes:
   ```bash
   git checkout -b feature-branch
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add a new feature"
   ```
4. Push the changes:
   ```bash
   git push origin feature-branch
   ```
5. Submit a pull request.

---

## License
This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

## Contact
If you have any questions or feedback, feel free to reach out:
- **Email**: yourname@example.com
- **GitHub**: [https://github.com/yourusername](https://github.com/yourusername)

---

Happy Expense Tracking! 🎉

