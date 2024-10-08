import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

class APIWrapper {
    constructor() {
        this.db = null;
        this.initDB();
    }

    // Connect to SQLite database in android/app/src/main/assets
    async initDB() {
        try {
            this.db = await SQLite.openDatabase(
                { name: 'abdullahtraders.db', createFromLocation: 1 }, // createFromLocation: 1 tells the app to use the bundled database
                () => {
                    console.log('Database opened successfully');
                },
                (error) => {
                    console.log('Error opening database:', error);
                }
            );
        } catch (error) {
            console.error('Error Setup database:', error);
        }
    }

    // -------------------------- Product CRUD OPERATIONS ---------------------------- //

    async getAllProduct() {
        try {
            const query = `
                SELECT 
                    p.id AS product_id, 
                    p.nameEnglish AS product_nameEnglish, 
                    p.nameUrdu AS product_nameUrdu, 
                    p.description AS product_description, 
                    c.id AS category_id, 
                    c.nameEnglish AS category_nameEnglish, 
                    c.nameUrdu AS category_nameUrdu
                FROM 
                    Product p
                LEFT JOIN 
                    Category c 
                ON 
                    p.category_id = c.id;
            `;
            const [results] = await this.db.executeSql(query);
            const products = [];
            for (let i = 0; i < results.rows.length; i++) {
                products.push(results.rows.item(i));
            }
            return { result: products, status: true, error: null };
        } catch (error) {
            console.error('Error fetching products:', error);
            return {result: [], status: false, error: error };
        }
    }

    async getProductByID(id) {
        try {
            const query = `
                SELECT 
                    p.id AS product_id, 
                    p.nameEnglish AS product_nameEnglish, 
                    p.nameUrdu AS product_nameUrdu, 
                    p.description AS product_description, 
                    c.id AS category_id, 
                    c.nameEnglish AS category_nameEnglish, 
                    c.nameUrdu AS category_nameUrdu
                FROM 
                    Product p
                LEFT JOIN 
                    Category c 
                ON 
                    p.category_id = c.id
                WHERE p.id = ?;
            `;
            const [results] = await this.db.executeSql(query, [id]);
            if (results.rows.length > 0) {
                return { result: results.rows.item(0), status: true, error: null };
            } else {
                return {result: [], status: false, error: 'No Records' };
            }
        } catch (error) {
            console.error(`Error fetching product with ID ${id}:`, error);
            return {result: [], status: false, error: error };
        }
    }

    async addNewProduct(productData) {
        const { nameEnglish, nameUrdu, description, category_id } = productData;
        try {
            const query = `
                INSERT INTO Product (nameEnglish, nameUrdu, description, category_id) 
                VALUES (?, ?, ?, ?);
            `;
            const [result] = await this.db.executeSql(query, [nameEnglish, nameUrdu, description, category_id]);
            if (result.insertId) {
                return { result: result.insertId, status: true, error: null };
            } else {
                console.error('Error: Insert failed');
                return {result: null, status: false, error: 'Error: Insert failed'   };
            }
        } catch (error) {
            console.error('Error adding new product:', error);
            return {result: null, status: false, error: error };
        }
    }

    async updateProduct(productData) {
        const { id, nameEnglish, nameUrdu, description, category_id } = productData;
        try {
            const query = `
                UPDATE Product 
                SET nameEnglish = ?, nameUrdu = ?, description = ?, category_id = ? 
                WHERE id = ?;
            `;
            await this.db.executeSql(query, [nameEnglish, nameUrdu, description, category_id, id]);
            console.log('Product updated successfully');
            return {result: null,status: true, error: ''  };
        } catch (error) {
            console.error(`Error updating product with ID ${id}:`, error);
            return {result: null, status: false, error: error };
        }
    }

    async deleteProduct(id) {
        try {
            const query = `
                DELETE FROM Product WHERE id = ?;
            `;
            await this.db.executeSql(query, [id]);
            console.log('Product deleted successfully');
            return {result: null,status: true, error: ''  };
        } catch (error) {
            console.error(`Error deleting product with ID ${id}:`, error);
            return {result: null,status: false, error: error  };
        }
    }


    // -------------------------- Generic CRUD OPERATIONS ---------------------------- //

    // CREATE (INSERT) Operation
    async createRecord(tableName, recordData) {
        console.log('createRecord');
        console.log(tableName);
        console.log(recordData);

        // Extract the keys (columns) and values from the recordData object
        const columns = Object.keys(recordData);
        const values = Object.values(recordData);

        // Prepare the placeholders for values (e.g., ?, ?, ?)
        const placeholders = columns.map(() => '?').join(', ');

        // Construct the SQL query
        const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`;

        // Debugging: Log the query and the values
        console.log('Executing SQL:', query);
        console.log('With values:', values);

        try {
            // Execute the SQL query
            const [result] = await this.db.executeSql(query, values);

            // Check if `result.insertId` exists and return it, otherwise return null or handle it appropriately
            if (result && result.insertId !== undefined) {
                return { id: result.insertId };
            } else {
                console.error('Error: insertId not found in result:', result);
                return { id: null }; // or handle the case where insertId is not returned
            }
        } catch (err) {
            console.error('Error inserting record:', err);
            throw err;
        }
    }



    // READ Operation (Select all)
    async readAll(tableName) {
        const query = `SELECT * FROM ${tableName}`;
        try {
            const [results] = await this.db.executeSql(query);
            const rows = [];
            for (let i = 0; i < results.rows.length; i++) {
                rows.push(results.rows.item(i));
            }
            return rows;
        } catch (err) {
            console.error('Error reading records:', err);
            throw err;
        }
    }

    // READ Operation (Select by ID)
    async readById(tableName, id) {
        const query = `SELECT * FROM ${tableName} WHERE id = ?`;
        try {
            const [results] = await this.db.executeSql(query, [id]);
            if (results.rows.length > 0) {
                return results.rows.item(0);
            }
            return null;
        } catch (err) {
            console.error('Error reading record by ID:', err);
            throw err;
        }
    }

    // UPDATE Operation
    async updateRecord(tableName, id, updates) {
        // Generate the SET clause by mapping over the keys of the updates object
        const setClause = Object.keys(updates)
            .map((col) => `${col} = ?`) // Create column = ? format
            .join(', '); // Join with commas

        // Extract the values of the updates and append the ID for the WHERE clause
        const values = [...Object.values(updates), id]; // values now is an array of the updated field values + id for WHERE

        // Construct the SQL query properly using actual template literals
        const query = `UPDATE ${tableName} SET ${setClause} WHERE id = ?`;

        // Debugging: Log the query and the values to verify
        console.log('Executing SQL:', query);
        console.log('With values:', values);

        try {
            // Execute the SQL query
            const [result] = await this.db.executeSql(query, values);
            return { changes: result.rowsAffected }; // Return number of affected rows
        } catch (err) {
            console.error('Error updating record:', err); // Log error if any
            throw err;
        }
    }


    // DELETE Operation
    async deleteRecord(tableName, id) {
        const query = `DELETE FROM ${tableName} WHERE id = ?`;
        try {
            const [result] = await this.db.executeSql(query, [id]);
            return { changes: result.rowsAffected };
        } catch (err) {
            console.error('Error deleting record:', err);
            throw err;
        }
    }

    // ----------------------- SPECIFIC OPERATIONS ---------------------------- //

    // Specific example for Product: Get all products in a specific category
    async getProductsByCategory(categoryId) {
        const query = 'SELECT * FROM Product WHERE category_id = ?';
        try {
            const [results] = await this.db.executeSql(query, [categoryId]);
            const rows = [];
            for (let i = 0; i < results.rows.length; i++) {
                rows.push(results.rows.item(i));
            }
            return rows;
        } catch (err) {
            console.error('Error fetching products by category:', err);
            throw err;
        }
    }

    // Specific example for Purchase: Get purchase details for a specific purchase
    async getPurchaseDetails(purchaseId) {
        const query = 'SELECT * FROM Purchase_Details WHERE purchase_id = ?';
        try {
            const [results] = await this.db.executeSql(query, [purchaseId]);
            const rows = [];
            for (let i = 0; i < results.rows.length; i++) {
                rows.push(results.rows.item(i));
            }
            return rows;
        } catch (err) {
            console.error('Error fetching purchase details:', err);
            throw err;
        }
    }

    // Specific example for Sale: Get sale details for a specific sale
    async getSaleDetails(saleId) {
        const query = 'SELECT * FROM Sale_Details WHERE sale_id = ?';
        try {
            const [results] = await this.db.executeSql(query, [saleId]);
            const rows = [];
            for (let i = 0; i < results.rows.length; i++) {
                rows.push(results.rows.item(i));
            }
            return rows;
        } catch (err) {
            console.error('Error fetching sale details:', err);
            throw err;
        }
    }
}

export default APIWrapper;
