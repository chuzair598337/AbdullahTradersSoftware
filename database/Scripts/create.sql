-- 1. Create Staff Table
CREATE TABLE Staff (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES Role(id)
);

-- 2. Create Role Table
CREATE TABLE Role (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role_name TEXT NOT NULL
);

-- 3. Create Customer Table
CREATE TABLE Customer (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    phone TEXT
);

-- 4. Create Supplier Table
CREATE TABLE Supplier (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    contact_info TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Create Product Table
CREATE TABLE Product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nameEnglish TEXT NOT NULL,
    nameUrdu TEXT,
    description TEXT,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES Category(id)
);

-- 6. Create Category Table
CREATE TABLE Category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nameEnglish TEXT NOT NULL,
    nameUrdu TEXT
);

-- 7. Create Purchase Table
CREATE TABLE Purchase (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    supplier_id INTEGER,
    purchase_date DATE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES Supplier(id)
);

-- 8. Create Purchase Details Table
CREATE TABLE Purchase_Details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    purchase_id INTEGER,
    product_id INTEGER,
    quantity INTEGER NOT NULL,
    purchase_price_per_unit DECIMAL(10, 2) NOT NULL,
    description TEXT,
    status TEXT NOT NULL CHECK (status IN ('Paid', 'Unpaid', 'Partial_Paid')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (purchase_id) REFERENCES Purchase(id),
    FOREIGN KEY (product_id) REFERENCES Product(id)
);

-- 9. Create Sale Table
CREATE TABLE Sale (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    sale_date DATE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customer(id)
);

-- 10. Create Sale Details Table
CREATE TABLE Sale_Details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sale_id INTEGER,
    product_id INTEGER,
    quantity DECIMAL(10, 2) NOT NULL,
    sale_price_per_unit DECIMAL(10, 2) NOT NULL,
    description TEXT,
    status TEXT NOT NULL CHECK (status IN ('Paid', 'Unpaid', 'Partial_Paid')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sale_id) REFERENCES Sale(id),
    FOREIGN KEY (product_id) REFERENCES Product(id)
);

-- 11. Create Stock Table
CREATE TABLE Stock (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    quantity INTEGER NOT NULL,
    purchase_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Product(id)
);

-- 12. Create Expense Table
CREATE TABLE Expense (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    expense_type TEXT NOT NULL,
    expense_amount DECIMAL(10, 2) NOT NULL,
    expense_date DATE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 13. Create Customer_Payments Table
CREATE TABLE Customer_Payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    payment DECIMAL(10, 2) NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('positive', 'negative')),
    description TEXT,
    FOREIGN KEY (customer_id) REFERENCES Customer(id)
);

-- 14. Create Supplier_Payments Table
CREATE TABLE Supplier_Payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    supplier_id INTEGER,
    payment DECIMAL(10, 2) NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('positive', 'negative')),
    description TEXT,
    FOREIGN KEY (supplier_id) REFERENCES Supplier(id)
);

