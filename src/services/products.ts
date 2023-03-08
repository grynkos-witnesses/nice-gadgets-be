const { Client } = require('pg');
const client = new Client({
        user: "victoria-kovalenko",
        password: "bz0odCuy6msa",
        database: "neondb",
        host: "ep-snowy-pond-231923.eu-central-1.aws.neon.tech",
        ssl: true
    });
client.connect();

function sortByQuery(sortBy: string) {
  let sortByData;
    switch (sortBy) {
      case 'name': {
        sortByData = client.query(`
          SELECT * 
          FROM public."Phones"
          ORDER BY public."Phones"."name"
        `);
        break;
      }   
      case 'cheep': {
        sortByData = client.query(`
          SELECT * 
          FROM public."Phones"
          ORDER BY public."Phones"."price"
        `);
        
          break;
      }  
      case 'expensive':{
        sortByData = client.query(`
          SELECT * 
          FROM public."Phones"
          ORDER BY public."Phones"."price" desc
        `);
        
        break;
      } 
      case 'newest':{
        sortByData = client.query(`
          SELECT * 
          FROM public."Phones"
          ORDER BY public."Phones"."year" desc
        `);
        
          break;
        }       
        case 'oldest':{
        sortByData = client.query(`
          SELECT * 
          FROM public."Phones"
          ORDER BY public."Phones"."year" 
        `);
        
        break;
      }
    }
  
  return sortByData;
}

function getAll() {
  return client.query(`SELECT * FROM public."Phones"`);
}

async function getByFilter(filter: string) {
  switch (filter) {
    case 'discount': {
      const data = client.query(`SELECT * 
      FROM public."Phones"
      WHERE public."Phones"."fullPrice" - public."Phones"."price" >= 95`
      );

      return data;

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

      const preaperedData = client.query(
        `SELECT * 
          FROM public."Phones"
          WHERE public."Phones"."year" = '${max}'
          `
      )

      return preaperedData;
      
      break;
    }   
    case 'accessories': {
      return [];

      break;
    }      
    case 'tablets': {
      return [];

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
}

function getForRecomended(phoneId:string) {
  if (phoneId === 'tablets' || phoneId === 'discount' || phoneId === 'new' || phoneId === 'accessories') {
    return [];
  }

  return client.query(`SELECT * FROM public."Phones" LIMIT 8`);
}

module.exports = {
  sortByQuery, getAll, getByFilter, getForRecomended
};
