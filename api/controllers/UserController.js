/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

module.exports = {
  
    createUser: async (req, res) => {
        const user = req.body;
    
        try {
            const result = await User.create(user).fetch();
            if(result.id) {
                return res.redirect('/login')
            }
        } catch (err) {
            let errors = [];
            if(err.name === 'AdapterError') {
                errors.push({msg: 'provided email already exists'})
                return res.view('pages/signup', {errors})
            }
        }
    },

    loginUser: async (req, res) => {
        const user = req.body;
    
        try {
            const result = await User.findOne({email: user.email})
            const compare = await bcrypt.compare(user.password, result.password);
            if(compare) {
                const jwtSecret = "doggo";
                const expiresIn = '7h';
                const userInfoForToken = {
                    id: result.id,
                    password: result.password,
                    email: result.email,
                    role: result.role
                }
                const token = jwt.sign(userInfoForToken, jwtSecret, {
                    expiresIn
                  });
                res.json({"token":token})
            } else {
                res.json({"error":"some error happended"})
            }
        } catch (err) {
            console.log(err);
        }
    }
};

