var jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(200).send({
                    message: 'authenitication is failed',
                    success: false
                });
            } else {
                req.body.userId = decode.id;
                next();
            }
        })
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: 'authenication is failed',
            success: false
        })
    }
}