const express = require('express');
const app = express();
const peopleRouter = require('./routes/people');
const authRouter = require('./routes/auth');

app.set('strict routing', false);
app.use(express.static('./methods-public'), express.urlencoded({ extended: true }), express.json());

app.use('/api/people/', peopleRouter);
app.use('/login', authRouter);



app.listen(5000, () => {
    console.log('Server is running on port 5000');
});