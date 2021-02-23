'use strict'
const dotenv = require('dotenv')
//const mediatorServices = require('../../services/mediatorServices')
//const dbTechnicalAnalysis = require('../../db/controller/TechnicalAnalysis')
const InputTechnicalAnalysis = require('../../model/InputTechnicalAnalysis')

dotenv.config()

/**
 * Gets the UI data
 * @param {object} req
 * @param {object} res
 */
module.exports.new = async function (req, res) {

    res.status(200).send(sandBoxResponse());
}

/**
 * Gets the UI data
 * @param {object} req
 * @param {object} res
 */
module.exports.update = async function (req, res) {

    let response = sandBoxResponse()
    response.technicaAnalysis.name = "Test 1"

    res.status(200).send(response);
}

let sandBoxResponse = function() {
    return {
        technicaAnalysis : {
            name: "",
            intent: {
                values: [ 'buy','sell'],
                selected: 'buy'
            },
            indicators: {
                buyIntents: [ 'agulhadahigh', 'rsi1h14p',
                              'volume25decrease', 'volume25increase'],
                sellIntents: [
                    'agulhadalow', 'volume25decrease', 'volume50decrease'
                ],
                selected: ['agulhadahigh']
            }
        }
    }

}

/**
 * Obtém os dados do grupo da sessão corrente
 * @param {object} req
 * @param {object} res
 */
module.exports.getIndicators = async function (req, res) {

    let user = req.session.user
    
    let response = await dbTechnicalAnalysis.getPreConfiguredIndicators()
    
    if ( ! response.code ) {
        res.status(500).send('error')
        return
    }
    
    let result = []
    for ( const indicator of response.indicators ) {
        result.push({[indicator.descriptionkey] : indicator.description})
    }

    res.status(200).send(result);
}

/**
 * Obtém os dados do grupo da sessão corrente
 * @param {object} req
 * @param {object} res
 */
module.exports.getAnalysis = async function (req, res) {

    let user = req.session.user
    
    let response = await dbTechnicalAnalysis.getPreConfiguredIndicators()
    
    if ( ! response.code ) {
        res.status(500).send('error')
        return
    }
    
    res.status(200).send(response.indicators);
}

/**
 * Creates a new technical analysis
 * @param {object} req
 * @param {object} res
 */
module.exports.newOrUpdate = async function (req, res) {

    log('controller/technicalAnalysis|newOrUpdate', `REST API request received: ${req.method} ${req.url}`, { body: req.body });

    //let user = req.session.user
    let user = {userId:135}
    console.log('user', req.session)

    let technicalAnalysis = new InputTechnicalAnalysis(user.userId, req.body)
 
    // Prepara dados para enviar requisição de registro de sinal
    let payload = {
        user: user,
        technicalAnalysis: technicalAnalysis
    }

    return res.status(200).send({result:'success'});

}
