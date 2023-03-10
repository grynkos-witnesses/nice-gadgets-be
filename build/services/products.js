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
const { Client } = require('pg');
const client = new Client({
    user: "victoria-kovalenko",
    password: "bz0odCuy6msa",
    database: "neondb",
    host: "ep-snowy-pond-231923.eu-central-1.aws.neon.tech",
    ssl: true
});
client.connect();
function sortByQuery(sortBy, category = 'phones') {
    let sortByData;
    switch (sortBy) {
        case 'name': {
            sortByData = client.query(`
          SELECT * 
          FROM public."Phones"
          WHERE public."Phones"."category" = '${category}'
          ORDER BY public."Phones"."name"
        `);
            break;
        }
        case 'cheep': {
            sortByData = client.query(`
          SELECT * 
          FROM public."Phones"
          WHERE public."Phones"."category" = '${category}'
          ORDER BY public."Phones"."price"
        `);
            break;
        }
        case 'expensive': {
            sortByData = client.query(`
          SELECT * 
          FROM public."Phones"
          WHERE public."Phones"."category" = '${category}'
          ORDER BY public."Phones"."price" desc
        `);
            break;
        }
        case 'newest': {
            sortByData = client.query(`
          SELECT * 
          FROM public."Phones"
          WHERE public."Phones"."category" = '${category}'
          ORDER BY public."Phones"."year" desc
        `);
            break;
        }
        case 'oldest': {
            sortByData = client.query(`
          SELECT * 
          FROM public."Phones"
          WHERE public."Phones"."category" = '${category}'
          ORDER BY public."Phones"."year" 
        `);
            break;
        }
    }
    return sortByData;
}
function getAll() {
    return client.query(`SELECT * 
FROM public."Phones"
WHERE public."Phones"."category" = 'phones'`);
}
function getByFilter(filter) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (filter) {
            case 'discount': {
                const data = client.query(`SELECT * 
      FROM public."Phones"
      WHERE public."Phones"."fullPrice" - public."Phones"."price" >= 95`);
                return data;
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
                let nextMax = 0;
                for (const row of data.rows) {
                    if (row.year < max && row.year > nextMax) {
                        nextMax = row.year;
                    }
                }
                const preaperedData = client.query(`SELECT * 
          FROM public."Phones"
          WHERE (public."Phones"."year" <= '${max}') AND (public."Phones"."year" >= '${nextMax}')
          ORDER BY public."Phones"."year" desc
          `);
                return preaperedData;
                break;
            }
            case 'accessories': {
                return [];
                break;
            }
            case 'tablets': {
                const data = client.query(`SELECT * 
FROM public."Phones"
WHERE public."Phones"."category" = 'tablets'`);
                return data;
                break;
            }
            default: {
                const data = client.query(`
        SELECT * 
        FROM public."phonesDetails"
        WHERE public."phonesDetails"."id" = '${filter}'
        `);
                return data;
            }
        }
    });
}
function getForRecomended(phoneId) {
    if (phoneId === 'tablets' || phoneId === 'discount' || phoneId === 'new' || phoneId === 'accessories') {
        return [];
    }
    return client.query(`SELECT * FROM public."Phones" LIMIT 8`);
}
module.exports = {
    sortByQuery, getAll, getByFilter, getForRecomended
};
