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
const productsServices = require('../services/products');
const url = require('url');
function getAllWithParams(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const normalizedUrl = new url.URL(req.url, `http://${req.headers.host}`);
        const params = normalizedUrl.searchParams;
        let page = params.get('page');
        let perPage = params.get('perPage');
        const sortBy = params.get('sortBy');
        let sortByData;
        if (sortBy) {
            sortByData = yield productsServices.sortByQuery(sortBy);
        }
        let data;
        if (sortByData) {
            data = sortByData;
        }
        else {
            data = yield productsServices.getAll();
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
            });
            return;
        }
        res.send(data.rows);
    });
}
function getFilteredData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { filter } = req.params;
        const data = yield productsServices.getByFilter(filter);
        if (data.length === 0) {
            res.send([]);
            return;
        }
        if (filter === 'tablets') {
            res.send({
                data: data.rows,
                total: data.rows.length
            });
            return;
        }
        if (data.rows.length === 1) {
            res.send(data.rows[0]);
            return;
        }
        res.send(data.rows);
    });
}
function getRecomended(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = req.url.split('/');
        const phoneId = params[2];
        const data = yield productsServices.getForRecomended(phoneId);
        res.send(data.rows);
    });
}
module.exports = {
    getAllWithParams, getFilteredData, getRecomended
};
