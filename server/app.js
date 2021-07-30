const app = require('./index')
const {db} = require('./models')

const force = true;
db.sync({ force })
    .then(function () {
        app.listen(3001, function () {
            console.log('Server is listening on port 3001!');
        });
    });

