"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
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
app.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const normalizedUrl = new url.URL(req.url, `http://${req.headers.host}`);
    const params = normalizedUrl.searchParams;
    let page = params.get('page');
    let perPage = params.get('perPage');
    const sortBy = params.get('sortBy');
    let sortByData;
    if (sortBy) {
        switch (sortBy) {
            case 'name':
                {
                    sortByData = yield client.query(`
          SELECT * 
          FROM public."Phones"
          ORDER BY public."Phones"."name"
        `);
                    break;
                }
            case 'price':
                {
                    sortByData = yield client.query(`
          SELECT * 
          FROM public."Phones"
          ORDER BY public."Phones"."price"
        `);
                    break;
                }
            case 'year':
                {
                    sortByData = yield client.query(`
          SELECT * 
          FROM public."Phones"
          ORDER BY public."Phones"."year" desc
        `);
                    break;
                }
        }
    }
    let data;
    if (sortByData) {
        data = sortByData;
    }
    else {
        data = yield client.query(`SELECT * FROM public."Phones"`);
    }
    // if ((!page || !perPage )&& sortByData) {
    //   res.send({
    //     data: sortByData.rows,
    //     total: sortByData.rows.length
    //   }
    //   )
    //   return;
    // }
    if (page && perPage) {
        const skipCount = +perPage * (+page - 1);
        const result = data.rows.slice(skipCount, skipCount + +perPage);
        res.send({
            data: result,
            total: data.rows.length
        });
        return;
    }
    res.send(data.rows);
}));
app.get('/products/:filter', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter } = req.params;
    switch (filter) {
        case 'discount': {
            const data = yield client.query(`SELECT * 
      FROM public."Phones"
      WHERE public."Phones"."fullPrice" - public."Phones"."price" >= 95`);
            res.send(data.rows);
            break;
        }
        case 'new': {
            const data = yield client.query(`
        SELECT public."Phones"."year" 
        FROM public."Phones"
        `);
            let max = 0;
            for (const row of data.rows) {
                if (row.year > max) {
                    max = row.year;
                }
            }
            const preaperedData = yield client.query(`SELECT * 
          FROM public."Phones"
          WHERE public."Phones"."year" = '${max}'
          `);
            res.send(preaperedData.rows);
            break;
        }
        default: {
            const data = yield client.query(`
        SELECT * 
        FROM public."phonesDetails"
        WHERE public."phonesDetails"."id" = '${filter}'
        `);
            res.send(data.rows);
        }
    }
}));
app.get('/products/:productType', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
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
