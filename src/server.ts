const express = require('express');
const cors = require('cors');
const { router: productsRouter } = require('./routes/products');

const PORT = 3000;

const app = express();

app.use(cors());
app.use(productsRouter);

app.listen(process.env.PORT || PORT, () => {
   console.log(`API is ready on http://localhost:${PORT}`);
});
