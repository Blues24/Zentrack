#!/usr/bin/env node 
const { Command } = require('commander');
const Table = require('cli-table3');
const expenses = require('./utils/query.js');

const program = new Command();

program
  .name('expense-tracker')
  .description('A simple offline expense tracker')
  .version('1.0.0');

// init
program
  .command('init')
  .description('Initialize the database')
  .action(() => {
    query.init();
    console.log('Database initialized.');
  });

// add
program
  .command('add <category> <amount> [description] [date]')
  .description('Add a new expense')
  .action((category, amount, description = '', date) => {
    const expenseDate = date || new Date().toISOString().slice(0, 10);
    query.add(category, amount, description, expenseDate, (err, id) => {
      if (err) console.error('Error adding expense:', err.message);
      else console.log(`Expense added with ID: ${id}`);
    });
  });

// list
program
  .command('list')
  .description('List all expenses')
  .action(() => {
    query.getAll((err, rows) => {
      if (err) return console.error(err.message);
      const table = new Table({ head: ['ID', 'Category', 'Amount', 'Description', 'Date'] });
      rows.forEach(r => table.push([r.id, r.category, r.amount, r.description, r.date]));
      console.log(table.toString());
    });
  });

// filter
program
  .command('filter <category>')
  .description('Filter expenses by category')
  .action((category) => {
    query.getByCategory(category, (err, rows) => {
      if (err) return console.error(err.message);
      const table = new Table({ head: ['ID', 'Category', 'Amount', 'Description', 'Date'] });
      rows.forEach(r => table.push([r.id, r.category, r.amount, r.description, r.date]));
      console.log(table.toString());
    });
  });

// delete
program
  .command('delete <id>')
  .description('Delete expense by ID')
  .action((id) => {
    query.delete(id, (err) => {
      if (err) console.error(err.message);
      else console.log(`Expense with ID ${id} deleted.`);
    });
  });

program.parse(process.argv);

