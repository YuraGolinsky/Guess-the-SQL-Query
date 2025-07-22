 const langPack = {
    en: {
      title: "Guess the SQL Query",
      level: "Level",
      enterQuery: "Enter your SQL query:",
      check: "Check",
      next: "Next Level",
      correct: "✅ Correct! Well done.",
      incorrect: "❌ Incorrect. Try again.",
      queryOptions: "Query options:",
      schemaTitle: "Table schema and data:",
      expectedTitle: "Expected result:",
      scoreText: "Score"
    },
    uk: {
      title: "Вгадай SQL-запит",
      level: "Рівень",
      enterQuery: "Введіть SQL-запит:",
      check: "Перевірити",
      next: "Наступний рівень",
      correct: "✅ Правильно! Молодець.",
      incorrect: "❌ Неправильно. Спробуй ще.",
      queryOptions: "Варіанти запитів:",
      schemaTitle: "Схема таблиці та дані:",
      expectedTitle: "Очікуваний результат:",
      scoreText: "Очки"
    }
  };

  const levels = [
    {
      description: {
        en: "Select all users older than 25.",
        uk: "Вибрати всіх користувачів старше 25 років."
      },
      schema: `CREATE TABLE users (id INTEGER, name TEXT, age INTEGER);\nINSERT INTO users VALUES (1, 'Alice', 30), (2, 'Bob', 22), (3, 'Charlie', 28);`,
      expected: [
        { id: 1, name: 'Alice', age: 30 },
        { id: 3, name: 'Charlie', age: 28 }
      ],
      options: [
        "SELECT * FROM users WHERE age > 25;",
        "SELECT name FROM users WHERE age > 25;",
        "SELECT id, age FROM users;"
      ]
    },
    {
      description: {
        en: "Show product names with price greater than 20.",
        uk: "Показати імена продуктів, ціна яких більше за 20."
      },
      schema: `CREATE TABLE products (id INTEGER, name TEXT, price INTEGER);\nINSERT INTO products VALUES (1, 'Apple', 10), (2, 'Laptop', 999), (3, 'Book', 25);`,
      expected: [
        { name: 'Laptop' },
        { name: 'Book' }
      ],
      options: [
        "SELECT name FROM products WHERE price > 20;",
        "SELECT name FROM products WHERE price >= 25 OR price = 999;"
      ]
    },
    {
      description: {
        en: "Find employees from 'Sales' department.",
        uk: "Знайти працівників з відділу 'Sales'."
      },
      schema: `CREATE TABLE employees (id INTEGER, name TEXT, department TEXT);\nINSERT INTO employees VALUES (1, 'Anna', 'Sales'), (2, 'Mike', 'IT'), (3, 'John', 'Sales');`,
      expected: [
        { id: 1, name: 'Anna', department: 'Sales' },
        { id: 3, name: 'John', department: 'Sales' }
      ],
      options: [
        "SELECT * FROM employees WHERE department = 'Sales';",
        "SELECT name FROM employees WHERE department = 'Sales';"
      ]
    },
    {
      description: {
        en: "Get all orders with amount > 100.",
        uk: "Отримати всі замовлення з сумою більше 100."
      },
      schema: `CREATE TABLE orders (id INTEGER, amount INTEGER);\nINSERT INTO orders VALUES (1, 50), (2, 150), (3, 200);`,
      expected: [
        { id: 2, amount: 150 },
        { id: 3, amount: 200 }
      ],
      options: [
        "SELECT * FROM orders WHERE amount > 100;"
      ]
    },
    {
      description: {
        en: "List customers from 'New York'.",
        uk: "Список клієнтів з 'New York'."
      },
      schema: `CREATE TABLE customers (id INTEGER, name TEXT, city TEXT);\nINSERT INTO customers VALUES (1, 'Sara', 'New York'), (2, 'Tom', 'Chicago');`,
      expected: [
        { id: 1, name: 'Sara', city: 'New York' }
      ],
      options: [
        "SELECT * FROM customers WHERE city = 'New York';"
      ]
    },
    {
      description: {
        en: "Show all products priced below or equal to 50.",
        uk: "Показати всі продукти з ціною нижче або рівною 50."
      },
      schema: `CREATE TABLE products (id INTEGER, name TEXT, price INTEGER);\nINSERT INTO products VALUES (1, 'Pen', 10), (2, 'Notebook', 50), (3, 'Bag', 70);`,
      expected: [
        { id: 1, name: 'Pen', price: 10 },
        { id: 2, name: 'Notebook', price: 50 }
      ],
      options: [
        "SELECT * FROM products WHERE price <= 50;"
      ]
    },
    {
      description: {
        en: "Find names of employees who are not in 'IT'.",
        uk: "Знайти імена працівників, які не в 'IT'."
      },
      schema: `CREATE TABLE employees (id INTEGER, name TEXT, department TEXT);\nINSERT INTO employees VALUES (1, 'Alice', 'IT'), (2, 'Bob', 'HR'), (3, 'Eve', 'Finance');`,
      expected: [
        { name: 'Bob' },
        { name: 'Eve' }
      ],
      options: [
        "SELECT name FROM employees WHERE department <> 'IT';"
      ]
    },
    {
      description: {
        en: "Get orders with amount between 50 and 150.",
        uk: "Отримати замовлення з сумою від 50 до 150."
      },
      schema: `CREATE TABLE orders (id INTEGER, amount INTEGER);\nINSERT INTO orders VALUES (1, 30), (2, 80), (3, 150), (4, 200);`,
      expected: [
        { id: 2, amount: 80 },
        { id: 3, amount: 150 }
      ],
      options: [
        "SELECT * FROM orders WHERE amount BETWEEN 50 AND 150;"
      ]
    },
    {
      description: {
        en: "List distinct cities from customers.",
        uk: "Список унікальних міст серед клієнтів."
      },
      schema: `CREATE TABLE customers (id INTEGER, name TEXT, city TEXT);\nINSERT INTO customers VALUES (1, 'Sara', 'New York'), (2, 'Tom', 'Chicago'), (3, 'Mike', 'New York');`,
      expected: [
        { city: 'New York' },
        { city: 'Chicago' }
      ],
      options: [
        "SELECT DISTINCT city FROM customers;"
      ]
    },
    {
      description: {
        en: "Show all employees ordered by name ascending.",
        uk: "Показати всіх працівників, відсортованих за іменем за зростанням."
      },
      schema: `CREATE TABLE employees (id INTEGER, name TEXT);\nINSERT INTO employees VALUES (1, 'Zoe'), (2, 'Adam'), (3, 'Mike');`,
      expected: [
        { id: 2, name: 'Adam' },
        { id: 3, name: 'Mike' },
        { id: 1, name: 'Zoe' }
      ],
      options: [
        "SELECT * FROM employees ORDER BY name ASC;"
      ]
    },
    {
      description: {
        en: "Count how many products cost more than 20.",
        uk: "Порахувати, скільки продуктів коштують більше 20."
      },
      schema: `CREATE TABLE products (id INTEGER, name TEXT, price INTEGER);\nINSERT INTO products VALUES (1, 'Pen', 10), (2, 'Notebook', 50), (3, 'Bag', 70);`,
      expected: [
        { count: 2 }
      ],
      options: [
        "SELECT COUNT(*) as count FROM products WHERE price > 20;"
      ]
    },
    {
      description: {
        en: "Show employees whose names start with 'A'.",
        uk: "Показати працівників, чиї імена починаються на 'A'."
      },
      schema: `CREATE TABLE employees (id INTEGER, name TEXT);\nINSERT INTO employees VALUES (1, 'Alice'), (2, 'Bob'), (3, 'Anna');`,
      expected: [
        { id: 1, name: 'Alice' },
        { id: 3, name: 'Anna' }
      ],
      options: [
        "SELECT * FROM employees WHERE name LIKE 'A%';"
      ]
    },
    {
      description: {
        en: "Find products with price not equal to 50.",
        uk: "Знайти продукти, ціна яких не дорівнює 50."
      },
      schema: `CREATE TABLE products (id INTEGER, name TEXT, price INTEGER);\nINSERT INTO products VALUES (1, 'Pen', 10), (2, 'Notebook', 50), (3, 'Bag', 70);`,
      expected: [
        { id: 1, name: 'Pen', price: 10 },
        { id: 3, name: 'Bag', price: 70 }
      ],
      options: [
        "SELECT * FROM products WHERE price != 50;"
      ]
    },
    {
      description: {
        en: "Get names and departments of employees.",
        uk: "Отримати імена та відділи працівників."
      },
      schema: `CREATE TABLE employees (id INTEGER, name TEXT, department TEXT);\nINSERT INTO employees VALUES (1, 'Alice', 'IT'), (2, 'Bob', 'HR');`,
      expected: [
        { name: 'Alice', department: 'IT' },
        { name: 'Bob', department: 'HR' }
      ],
      options: [
        "SELECT name, department FROM employees;"
      ]
    },
    {
      description: {
        en: "Show all orders sorted by amount descending.",
        uk: "Показати всі замовлення, відсортовані за сумою за спаданням."
      },
      schema: `CREATE TABLE orders (id INTEGER, amount INTEGER);\nINSERT INTO orders VALUES (1, 100), (2, 200), (3, 150);`,
      expected: [
        { id: 2, amount: 200 },
        { id: 3, amount: 150 },
        { id: 1, amount: 100 }
      ],
      options: [
        "SELECT * FROM orders ORDER BY amount DESC;"
      ]
    }
  ];
