const db = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

exports.loginuser = async (request, callback) => {
    const { EMAIL, PASSWORD } = request;

    if (!EMAIL || !PASSWORD) {
        return callback({ error: "EMAIL AND PASSWORD REQUIRED" });
    }

    try {
        const [rows] = await db.execute('SELECT * FROM loginusers WHERE EMAIL = ?', [EMAIL]);

        if (rows.length === 0) {
            return callback({ error: "User does not exist" });
        }
        if(rows.length>0){
            return callback({ error: "user exist" })
        }

        const user = rows[0];
        console.log('User fetched from DB:', user);

        const isPasswordValid = await bcrypt.compare(PASSWORD, user.PASSWORD);
        console.log('Password comparison result:', isPasswordValid);

        if (!isPasswordValid) {
            return callback({ error: "Invalid credentials" });
        }

        // This message might not be necessary in login flow
        // but added as per your request.
        callback({ message: "User already exists" })

    } catch (error) {
        console.error('Error logging in user:', error.message, error.stack);
        callback({ error: 'Internal server error' });
    }
};
