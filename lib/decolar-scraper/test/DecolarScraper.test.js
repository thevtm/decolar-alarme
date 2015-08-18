/*jshint -W030 */
var chai = require("chai"),
    assert = chai.should(),
    chaiAsPromised = require("chai-as-promised"),
    path = require('path');
    fs = require('fs'),
    Q = require('q'),
    DecolarScraper = require('../decolar-scraper');

chai.use(chaiAsPromised);

describe('DecolarScraper', function () {

  describe('getDecolarDataURL', function () {
    it('Deve adicionar o prefixo "http://" quando necessario.', function () {
      var DECOLAR_URL = 'www.decolar.com/shop/flights/results/oneway/POA/SAO/2015-08-16/1/0/0';
      var DECOLAR_DATA_URL = 'http://www.decolar.com/shop/flights/data/search/oneway/POA/SAO/2015-08-16/1/0/0/FARE/ASCENDING/NA/NA/NA/NA';
      DecolarScraper.getDecolarDataURL(DECOLAR_URL).should.be.equal(DECOLAR_DATA_URL.toLowerCase());
    });

    it('Throw URLDecolarInvalidaError quando receber URL invalida.', function () {
      DecolarScraper.getDecolarDataURL.bind(null, 'DECOLAR_URL').should.throw(DecolarScraper.URLDecolarInvalidaError);
    });

    it('Throw retornar URLDecolarInvalidaError quando receber URL com host diferente de "www.decolar.com".', function () {
      var BECOLAR_URL = 'http://www.Becolar.com/shop/flights/results/oneway/POA/SAO/2015-08-16/1/0/0';
      DecolarScraper.getDecolarDataURL.bind(null, BECOLAR_URL).should.throw(DecolarScraper.URLDecolarInvalidaError);
    });

    it('Deve ser Case-insensitive.', function () {
      var DECOLAR_URL = 'HTtP://wWW.Decolar.cOM/sHoP/fLiGHTs/reSULTS/ONeWay/Sao/POA/2016-08-16/1/0/0';
      var DECOLAR_DATA_URL = 'http://www.decolar.com/shop/flights/data/search/oneway/SAO/POA/2016-08-16/1/0/0/FARE/ASCENDING/NA/NA/NA/NA';
      DecolarScraper.getDecolarDataURL(DECOLAR_URL).should.be.equal(DECOLAR_DATA_URL.toLowerCase());
    });

    it('Deve retornar a url de dados correta.', function () {
      var DECOLAR_URL = 'http://www.decolar.com/shop/flights/results/oneway/POA/SAO/2015-08-16/1/0/0';
      var DECOLAR_DATA_URL = 'http://www.decolar.com/shop/flights/data/search/oneway/POA/SAO/2015-08-16/1/0/0/FARE/ASCENDING/NA/NA/NA/NA';
      DecolarScraper.getDecolarDataURL(DECOLAR_URL).should.be.equal(DECOLAR_DATA_URL.toLowerCase());
    });

  });

  describe('fetchDecolarData', function () {

    it('Throw erro quando url invalida.', function () {
      return DecolarScraper.fetchDecolarData('DECOLAR_DATA_URL')
        .should.be.rejected;
    });

    it('Throw RequestStatusNotOKError quando url invalida.', function () {
      this.timeout(5000);
      var DECOLAR_DATA_URL_ANTIGA = 'http://www.decolar.com/shop/flights/data/search/oneway/POA/SAO/2014-08-16/1/0/0/FARE/ASCENDING/NA/NA/NA/NA';
      return DecolarScraper.fetchDecolarData(DECOLAR_DATA_URL_ANTIGA)
        .should.be.rejectedWith(DecolarScraper.RequestStatusNotOKError);
    });
    
    
  });

  describe('getDecolarPreco', function () {
    it('Deve retornar corretamente.', function () {
      var DATA_PATH = 'data/DecolarData.json';
      var PRECO_RESULTADO = [ { raw: { code: 'BRL', amount: 545 }, formatted: { code: 'BRL', amount: '545', mask: 'R$' } } ];

      // Carrega dados do arquivo
      var DecolarDataPath = path.resolve(__dirname, DATA_PATH);
      var readFile = Q.nfbind(fs.readFile);
      var precoData = readFile(DecolarDataPath, "utf-8")
        .then(JSON.parse)
        .then(DecolarScraper.getDecolarPreco)
        .then(JSON.stringify);

      return precoData.should.eventually.be
        .equal(JSON.stringify(PRECO_RESULTADO));
    });
  });

});