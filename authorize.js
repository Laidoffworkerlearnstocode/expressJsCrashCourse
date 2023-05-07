const authorize = (req, res, next) => {
    const { user } = req.query;
    if (user === 'beidi') {
        req.user = { name: 'beidi', id: 3 };
        console.log('authorize');
        next();
    }
    else {
        res.status(401).send('Unauthorized');
    }
}

module.exports = authorize;