const express = require('express');
const cors = require('cors');
const { Client } = require('pg')
const url = require('url');

const client = new Client({
        user: "victoria-kovalenko",
        password: "bz0odCuy6msa",
        database: "neondb",
        host: "ep-snowy-pond-231923.eu-central-1.aws.neon.tech",
        ssl: true
    });
client.connect();

const PORT = 3000;

const app = express();

app.use(cors());

app.get('/products', async (req: any, res: { send: (arg0: any) => void; }) => {


  
  const normalizedUrl = new url.URL(req.url, `http://${req.headers.host}`);
  const params = normalizedUrl.searchParams;
  const page = params.get('page');
  const perPage = params.get('perPage');

  const data = await client.query(`SELECT * FROM public."Phones"`);
  
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
  switch (filter) {
    case 'discount': {
      const data = await client.query(`SELECT * 
      FROM public."Phones"
      WHERE public."Phones"."fullPrice" - public."Phones"."price" >= 95`
      );

      res.send(data.rows);

      break;
    }
    case 'new': {
      const data = await client.query(`
        SELECT public."Phones"."year" 
        FROM public."Phones"
        `
      );

      let max = 0; 

      for (const row of data.rows) {
        if (row.year > max) {
          max = row.year;
        }
      }

      const preaperedData = await client.query(
        `SELECT * 
          FROM public."Phones"
          WHERE public."Phones"."year" = '${max}'
          `
      )

      res.send(preaperedData.rows);
      
      break;
    }
    default: {
        const data = await client.query(`
        SELECT * 
        FROM public."phonesDetails"
        WHERE public."phonesDetails"."id" = '${filter}'
        `);

        res.send(data.rows);
    }
  }
  
})



app.get('/products/:productType', async (req: any, res: { send: (arg0: any) => void; }) => {
  const { productType } = req.params;

  if (productType === 'tablets' || productType === 'accessories') {
    res.send([]);

    return;
  }

  // const normalizedUrl = new url.URL(req.url, `http://${req.headers.host}`);
  // const params = normalizedUrl.searchParams;
  // const page = params.get('page');
  // const perPage = params.get('perPage');

  // const data = await client.query(`SELECT * FROM public."Phones"`);
  
  // if (page && perPage) {
  //   const skipCount = +perPage * (+page - 1);
  //   const result = data.rows.slice(skipCount, skipCount + +perPage);

  //   res.send({
  //     data: result,
  //     total: data.rows.length
  //   })

  //   return;
  // }

  // res.send(data.rows);
})

// app.get('/products/:id', async (req: any, res: { send: (arg0: any) => void; }) => {
//   const { id } = req.params;

//   console.log('123');

//   const data = await client.query(`
//   SELECT * 
//   FROM public."phonesDetails"
//   WHERE public."phonesDetails"."id" = '${id}'
//   `);

//   res.send(data.rows);
//  })
// 
// app.get('/phones/:id', async (req, res) => {
//   const data = await read();
//   const {id} = req.params;
//   const foundData = data.find(d => d.id === id);



//   res.send(foundData);
// })

app.listen(process.env.PORT || PORT, () => {
   console.log(`API is ready on http://localhost:${PORT}`);
});
