const User = require('../models/User');
const jwt = require('jsonwebtoken');
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    if (err.code == 11000) {
        errors.email = 'that email is already in use!';
        return errors;
    }

    if (err.message.includes('user validation failed') && err.errors) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })

    }
    return errors;
}
const maxAge = 3 * 24 * 60 *60;
const createToken = (id) =>{
    return jwt.sign({id}, 'secret message', {expiresIn: maxAge})
}

module.exports.signup_get = (req, res) => {
    res.render('signup')
}
module.exports.login_get = (req, res) => {
    res.render('login')
}

module.exports.signup_post = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})

        res.status(201).json({user: user._id})

    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors })

    }
    console.log(email, password)
    // res.send('new signup')
}
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log(email, password);
        console.log(req.body);
        res.send('user login');
    } catch (error) {
        console.log(error);
        res.status(500).send('Login error');
    }
};
