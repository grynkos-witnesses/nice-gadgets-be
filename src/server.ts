const express = require('express');
const cors = require('cors');
const { Client } = require('pg')
const client = new Client({
        user: "victoria-kovalenko",
        password: "bz0odCuy6msa",
        database: "neondb",
        host: "ep-snowy-pond-231923.eu-central-1.aws.neon.tech",
        ssl: true
    });
client.connect();

const PORT = 5000;

const app = express();

app.use(cors());

app.get('/phones', async ( res:any) => {
  const data = await client.query(`SELECT * FROM public."Phones"`);

  console.log(data.rows)

  res.send(data.rows);
})

// app.get('/phones/:id', async (req, res) => {
//   const data = await read();
//   const {id} = req.params;
//   const foundData = data.find(d => d.id === id);



//   res.send(foundData);
// })

app.listen(process.env.PORT || PORT, () => {
   console.log(`API is ready on http://localhost:${PORT}`);
});
