'use strict'
const dotenv = require('dotenv')
dotenv.config()

/**
 * Obtém os dados do grupo da sessão corrente
 * @param {object} req
 * @param {object} res
 */
module.exports.get = async function (req, res) {

    res.status(200).send(getSignal());

}

let getSignal = function() {
    return {
        all_signals_id: 1,
        symbol:'BTC/USDT',
        exchange:'BINANCE',
        strategy:'SHORT',
        submissionDate:'March, 14th',
        chartData:{
            stopLoss: {time: "", price: 6905.5, profit: -1.9900497512437831, color: "red"},
            entryMin: {time: "", price: 6800, profit: 0, color: "green"},
            entryMax: {time: "", price: 6963, profit: 0, color: "green"},
            target1: {time: "", price: 6926.63, profit: 1.5024875621890477, color: "#4985e7"},
            target2: {time: "", price: 7090.8963, profit: 2.5175124378109537, color: "#4985e7"},
            target3: {time: "", price: 7155.805263, profit: 3.542687562189051, color: "#4985e7"},
            target4: {time: "", price: 7221.36331563, profit: 4.578114437810954, color: "#4985e7"},
            target5: {time: "", price: 7387.5769487863, profit: 5.6238955821890535, color: "#4985e7"},
            target6: {time: "", price: 7454.452718274163, profit: 6.680134538010951, color: "#4985e7"}
        }
    }
}