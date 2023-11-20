/* eslint-disable no-unused-vars */
//makeReq = require("https://rapidapi.p.rapidapi.com/amz/amazon-lookup-product");
const axios = require('axios');
exports.Amazon = class Amazon {
  constructor (options) {

    this.options = options || {};
  }
  async get (id, params) {
    const options = {
      method: 'GET',
      url: 'https://axesso-axesso-amazon-data-service-v1.p.rapidapi.com/amz/amazon-lookup-product',
      params: {url: params.query.url},
      headers: {
        'x-rapidapi-host': 'axesso-axesso-amazon-data-service-v1.p.rapidapi.com',
        'x-rapidapi-key': 'fcef7cf297msh35efe66d37e7d79p1d16a6jsnc0bb050aeb9d'
      }
    };
    let resp;
    await axios.request(options).then(function (response) {
      resp = response.data;
    }).catch(function (error) {
      return error;
    });
    return resp;
  }
};
