const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const db = require('./models');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

db.sequelize.sync()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database: ', error);
  });


app.get('/', (req, res) => {
    return res.json('From Backend Side');
})

require("./routes/Product.routes")(app);

app.listen(8081, () => {
    console.log('listening');
})