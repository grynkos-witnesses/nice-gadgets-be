const express = require('express');
const cors = require('cors');
const productsServices = require('./services/products');
// const { Client } = require('pg');
const url = require('url');

// const client = new Client({
//         user: "victoria-kovalenko",
//         password: "bz0odCuy6msa",
//         database: "neondb",
//         host: "ep-snowy-pond-231923.eu-central-1.aws.neon.tech",
//         ssl: true
//     });
// client.connect();

const PORT = 3000;

const app = express();

app.use(cors());

app.get('/products', async (req: any, res: { send: (arg0: any) => void; }) => { 
  const normalizedUrl = new url.URL(req.url, `http://${req.headers.host}`);
  const params = normalizedUrl.searchParams;
  let page = params.get('page');
  let perPage = params.get('perPage');
  const sortBy = params.get('sortBy');
  let sortByData: any;

  if (sortBy) {
    sortByData = await productsServices.sortByQuery(sortBy);
  }

  let data;

  if (sortByData) {
    data = sortByData;
  } else {
    data = await productsServices.getAll();
  }
  
  if (page && perPage) {
    const skipCount = +perPage * (+page - 1);
    const result = data.rows.slice(skipCount, skipCount + +perPage);

    res.send({
      data: result,
      total: data.rows.length
    })

    return;
  }

  res.send(data.rows);
})

app.get('/products/:filter', async (req: any, res: { send: (arg0: any) => void; }) => {
  const { filter } = req.params;

  const data = await productsServices.getByFilter(filter);

  if (data.length === 0) {
    res.send([]);

    return;
  }

  res.send(data.rows);
})

app.get('/products/:phoneId/:recomended', async (req: any, res: { send: (arg0: any) => void; }) => {
  const params = req.url.split('/');
  const phoneId  = params[2];

  const data = await productsServices.getForRecomended(phoneId);

  res.send(data.rows);
  })

app.listen(process.env.PORT || PORT, () => {
   console.log(`API is ready on http://localhost:${PORT}`);
});
