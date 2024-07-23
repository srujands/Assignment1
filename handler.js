const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3003;
app.use(express.json(bodyParser));



const loginController = require('./controller');

// app.post('/register', loginController.userRegister);
app.post('/login', loginController.userLogin);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});