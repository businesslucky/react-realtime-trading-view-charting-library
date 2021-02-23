'use strict'
const JSON5 = require('json5')
const dotenv = require('dotenv')
dotenv.config()

let prices = {
   "BTCUSDT" : 6900,
   "ADABTC" : 0.00000466,
   "FETBTC" : 0.00000219,
   "XRPBTC" : 0.00002676, 
   "THETABTC" : 0.00001137
}

/**
 * Obtém os dados do grupo da sessão corrente
 * @param {object} req
 * @param {object} res
 */
module.exports.get = async function (req, res) {

    res.status(200).send(getSignal());

}

/**
 * Obtém os dados do grupo da sessão corrente
 * @param {object} req
 * @param {object} res
 */
module.exports.get = async function (req, res) {

    res.status(200).send(getSignal());
}

module.exports.getSymbols = async function (req, res) {

    res.status(200).send(sandBoxGetSymbolList());
}

module.exports.getExchanges = async function (req, res) {

    res.status(200).send(sandBoxGetExchangeList());
}

module.exports.getTemplates = async function (req, res) {

    res.status(200).send(sandBoxSignalTemplate());
}

module.exports.getTemplate = async function (req, res) {

    let templates = sandBoxSignalTemplate(req.params.type)
    res.status(200).send(templates);
}

let sandBoxGetExchangeList = function() {
    return {
        exchanges: {
            values: ['BINANCE', 'COINBASE', 'KRAKEN', 'BITMEX'],
            selected: 'KRAKEN'
        }
    }
}

let sandBoxGetSymbolList = function() {
    return {
        symbols: ['BTCUSDT', 'ADABTC', 'FETBTC', 'XRPBTC', 'THETABTC'],
        chartSymbols: ['BTC/USDT', 'ADA/BTC', 'FET/BTC', 'XRP/BTC', 'THETA/BTC'],
        selected: 'BTCUSDT'
    }
}

let sandBoxSignalTemplate = function(type = 'long') {

    let btcusdt = {
        symbol: 'BTCUSDT',
        stopLoss: { time:'', price: 0, profit: 0, color: "red"},
        entryMin: { time:'', price: 0, profit: 0,color: "green"},
        entryMax: { time:'', price: 0, profit: 0,color: "green"},
        target1 : { time:'', price: 0, profit: 0,color: "#4985e7"},
        target2 : { time:'', price: 0, profit: 0,color: "#4985e7"},
        target3 : { time:'', price: 0, profit: 0,color: "#4985e7"},
        target4 : { time:'', price: 0, profit: 0,color: "#4985e7"},
        target5 : { time:'', price: 0, profit: 0,color: "#4985e7"},
        target6 : { time:'', price: 0, profit: 0,color: "#4985e7"},
    }

    let templates = {}
    templates['BTCUSDT'] = btcusdt
    templates['BTCUSDT'].entryMin.price = prices['BTCUSDT']
    
    if (type=='long')
        prepareTemplateLong(templates['BTCUSDT'])
    else
        prepareTemplateShort(templates['BTCUSDT'])

    let response = sandBoxGetSymbolList()
    for (const symbol of response.symbols ) {

        if (symbol == 'BTCUSDT') 
            continue

        // Clone
        templates[symbol] = JSON5.parse(JSON5.stringify(btcusdt))
        templates[symbol].symbol = symbol
        templates[symbol].entryMin.price = prices[symbol]
        prepareTemplateLong(templates[symbol])
        if (type=='long')
            prepareTemplateLong(templates[symbol])
        else
            prepareTemplateShort(templates[symbol])

    }
    return templates
    
}

let prepareTemplateShort = function (template) {
    
    template.stopLoss.price = template.entryMin.price * 1.01
    template.entryMax.price = template.entryMin.price * 0.985
    template.target1.price = template.entryMax.price * 0.975
    template.target2.price = template.target1.price * 0.965
    template.target3.price = template.target2.price * 0.955
    template.target4.price = template.target3.price * 0.935
    template.target5.price = template.target4.price * 0.925
    template.target6.price = template.target5.price * 0.915

    // Profit
    let averageBuy = (template.entryMin.price + template.entryMax.price)/2
    template['stopLoss'].profit = ((template['stopLoss'].price / averageBuy) - 1) * 100
    
    for ( let idx = 1; idx <= 6; idx++ ) {
        if ( template['target'+idx] ) 
            template['target'+idx].profit = ((template['target'+idx].price / averageBuy) - 1) * 100
    }

}

let prepareTemplateLong = function (template) {
    
    template.stopLoss.price = template.entryMin.price * 0.985
    template.entryMax.price = template.entryMin.price * 1.01
    template.target1.price = template.entryMax.price * 1.01
    template.target2.price = template.target1.price * 1.01
    template.target3.price = template.target2.price * 1.01
    template.target4.price = template.target3.price * 1.01
    template.target5.price = template.target4.price * 1.01
    template.target6.price = template.target5.price * 1.01

    // Profit
    let averageBuy = (template.entryMin.price + template.entryMax.price)/2
    template['stopLoss'].profit = ((template['stopLoss'].price / averageBuy) - 1) * 100
    
    for ( let idx = 1; idx <= 6; idx++ ) {
        if ( template['target'+idx] ) 
            template['target'+idx].profit = ((template['target'+idx].price / averageBuy) - 1) * 100
    }

}