const loginService = require('./services');

exports.userLogin = async (req, res) => {
    loginService.loginuser(req.body, (error, result) => {
        if (error) {
            return res.status(400).json(error);
        }
        res.status(200).json(result);
    });
};



// exports.userRegister = async (req, res) => {
//     loginService.registerUser(req.body, (error, result) => {
//         if (error) {
//             return res.status(400).json(error);
//         }
//         res.status(200).json(result);
//     });
// };