-- Insert records into Role Table
INSERT INTO Role (role_name) VALUES 
('Admin'),
('Manager'),
('Salesperson'),
('Stock Manager'),
('Cashier');

-- Insert records into Staff Table
INSERT INTO Staff (name, username, password_hash, role_id) VALUES
('John Doe', 'johndoe', 'hash_password_1', 1),
('Jane Smith', 'janesmith', 'hash_password_2', 2),
('David Johnson', 'davidjohnson', 'hash_password_3', 3),
('Emily Davis', 'emilydavis', 'hash_password_4', 4),
('Michael Brown', 'michaelbrown', 'hash_password_5', 5);

-- Insert records into Customer Table
INSERT INTO Customer (name, description, phone) VALUES
('Farm Fresh Ltd.', 'Customer specializing in organic animal feeds', '123-456-7890'),
('Green Pastures', 'Wholesale buyer of bulk animal feed', '987-654-3210'),
('Healthy Animals Co.', 'Distributor of animal nutrition products', '555-123-4567'),
('Cattle Care Inc.', 'Cattle feed buyer', '333-222-1111'),
('Livestock Supplies', 'Supplier of various animal feed products', '888-999-7777');

-- Insert records into Supplier Table
INSERT INTO Supplier (name, contact_info, description, created_at, updated_at) VALUES
('Feed Master', 'info@feedmaster.com', 'Supplier of premium animal feed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Agri Supplies', 'sales@agrisupplies.com', 'Bulk supplier of farm and feed products', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Farm Feeds Ltd.', 'contact@farmfeeds.com', 'Supplier of organic animal feed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Livestock Essentials', 'support@livestockessentials.com', 'Supplier of essential animal feed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Animal Nutrition Co.', 'orders@animalnutritionco.com', 'Specialized in animal nutrition supplements', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert records into Category Table
INSERT INTO Category (nameEnglish, nameUrdu) VALUES
('Cattle Feed', 'گائے کا چارہ'),
('Poultry Feed', 'مرغیوں کا چارہ'),
('Sheep Feed', 'بھیڑ کا چارہ'),
('Horse Feed', 'گھوڑے کا چارہ'),
('Goat Feed', 'بکری کا چارہ');

-- Insert records into Product Table
INSERT INTO Product (nameEnglish, nameUrdu, description, category_id) VALUES
('Premium Cattle Feed', 'اعلیٰ معیار کا گائے کا چارہ', 'High-nutrition feed for dairy cattle', 1),
('Poultry Grain Mix', 'مرغیوں کے لیے اناج کا مکس', 'Grain mix for poultry nutrition', 2),
('Sheep Grain Blend', 'بھیڑ کے لیے اناج کا مرکب', 'Balanced grain blend for sheep', 3),
('Horse Oats Mix', 'گھوڑوں کے لیے جَو کا مکس', 'Oats-based feed mix for horses', 4),
('Goat Pellet Feed', 'بکری کے لیے چھرے والا چارہ', 'Pelleted feed for goats', 5);

-- Insert records into Purchase Table
INSERT INTO Purchase (supplier_id, purchase_date, description, created_at, updated_at) VALUES
(1, '2024-01-01', 'Bulk purchase of cattle feed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, '2024-01-05', 'Poultry feed order', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, '2024-01-10', 'Organic sheep feed order', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, '2024-01-12', 'Horse feed procurement', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, '2024-01-15', 'Goat feed from Animal Nutrition Co.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert records into Purchase Details Table
INSERT INTO Purchase_Details (purchase_id, product_id, quantity, purchase_price_per_unit, description, status, created_at, updated_at) VALUES
(1, 1, 500, 30.00, 'Cattle feed bags', 'Paid', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 200, 20.00, 'Poultry feed bags', 'Unpaid', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 3, 150, 25.00, 'Sheep feed in bulk', 'Partial_Paid', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 4, 100, 35.00, 'Horse oats mix bags', 'Paid', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 5, 250, 22.50, 'Goat pellet feed bags', 'Paid', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert records into Sale Table
INSERT INTO Sale (customer_id, sale_date, description, created_at, updated_at) VALUES
(1, '2024-01-20', 'Sold cattle feed to Farm Fresh', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, '2024-01-22', 'Poultry feed sale to Green Pastures', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, '2024-01-25', 'Sheep feed sale to Healthy Animals Co.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, '2024-01-28', 'Horse feed sale to Cattle Care Inc.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, '2024-02-01', 'Goat feed sale to Livestock Supplies', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert records into Sale Details Table
INSERT INTO Sale_Details (sale_id, product_id, quantity, sale_price_per_unit, description, status, created_at, updated_at) VALUES
(1, 1, 100, 40.00, 'Cattle feed sale', 'Paid', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 50, 25.00, 'Poultry feed sale', 'Unpaid', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 3, 75, 28.00, 'Sheep feed sale', 'Partial_Paid', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 4, 30, 45.00, 'Horse feed sale', 'Paid', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 5, 60, 27.00, 'Goat feed sale', 'Paid', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert records into Stock Table
INSERT INTO Stock (product_id, quantity, purchase_price, created_at, updated_at) VALUES
(1, 400, 30.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 150, 20.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 100, 25.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 70, 35.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 190, 22.50, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert records into Expense Table
INSERT INTO Expense (expense_type, expense_amount, expense_date, description, created_at, updated_at) VALUES
('Rent', 1500.00, '2024-01-01', 'Monthly warehouse rent', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Electricity Bill', 300.00, '2024-01-05', 'Electricity bill for warehouse', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Transport', 500.00, '2024-01-10', 'Transport for animal feed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Assets', 2500.00, '2024-01-15', 'New storage containers', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Miscellaneous', 200.00, '2024-01-20', 'Office supplies', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert records into Customer_Payments Table
INSERT INTO Customer_Payments (customer_id, payment, status, description) VALUES
(1, 1000.00, 'positive', 'Initial payment for cattle feed'),
(2, 500.00, 'positive', 'Advance payment for poultry feed'),
(3, 750.00, 'positive', 'Partial payment for sheep feed'),
(4, 1200.00, 'positive', 'Full payment for horse feed'),
(5, 600.00, 'positive', 'Full payment for goat feed');

-- Insert records into Supplier_Payments Table
INSERT INTO Supplier_Payments (supplier_id, payment, status, description) VALUES
(1, 1500.00, 'positive', 'Full payment for cattle feed'),
(2, 700.00, 'positive', 'Partial payment for poultry feed'),
(3, 1000.00, 'positive', 'Payment for organic sheep feed'),
(4, 1300.00, 'positive', 'Payment for horse oats mix'),
(5, 850.00, 'positive', 'Payment for goat pellet feed');
