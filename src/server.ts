const express = require('express');
const cors = require('cors');
const productsController = require('./controllers/products');

const PORT = 3000;

const app = express();

app.use(cors());

app.get('/products', productsController.getAllWithParams )

app.get('/products/:filter', productsController.getFilteredData )

app.get('/products/:phoneId/:recomended', productsController.getRecomended )

app.listen(process.env.PORT || PORT, () => {
   console.log(`API is ready on http://localhost:${PORT}`);
});
