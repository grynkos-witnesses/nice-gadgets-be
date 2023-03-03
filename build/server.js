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
const client = new Client({
    host: 'localhost',
    user: 'postgres',
    database: 'phones',
    password: 'Vv0820132525'
});
client.connect();
const PORT = 3000;
const app = express();
app.use(cors());
app.get('/phones', (res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield client.query(`SELECT * FROM public."Phones"`);
    console.log(data.rows);
    res.send(data.rows);
}));
// app.get('/phones/:id', async (req, res) => {
//   const data = await read();
//   const {id} = req.params;
//   const foundData = data.find(d => d.id === id);
//   res.send(foundData);
// })
app.listen(process.env.PORT || PORT, () => {
    console.log(`API is ready on http://localhost:${PORT} 🚀🚀🚀`);
});