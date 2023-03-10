const productsServices = require('../services/products');
const url = require('url');

async function getAllWithParams(req: any, res: { send: (arg0: any) => void; }) { 
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

  if (!page && perPage) {
    page = 1;
  }

  if (page && !perPage) {
    perPage = 8;
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
}

async function getFilteredData(req: any, res: { send: (arg0: any) => void; }) {
  const { filter } = req.params;

  const data = await productsServices.getByFilter(filter);

  if (data.length === 0) {
    res.send([]);

    return;
  }

  if (filter === 'tablets') {
    res.send({
      data: data.rows,
      total: data.rows.length
    })

    return;
  }

  if (data.rows.length === 1) {
    res.send(data.rows[0]);

    return;
  }

  res.send(data.rows);
}

async function getRecomended(req: any, res: { send: (arg0: any) => void; }) {
  const params = req.url.split('/');
  const phoneId  = params[2];

  const data = await productsServices.getForRecomended(phoneId);

  res.send(data.rows);
  }

module.exports = {
  getAllWithParams, getFilteredData, getRecomended
}
