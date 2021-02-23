'use strict';

const dotenv = require('dotenv');
dotenv.config();

/**
 * Obtém os dados do usuário da sessão corrente
 * @param {object} req
 * @param {object} res
 */
module.exports.getUser = function (req, res) {
    const user = {
        userFirstName: 'Mike',
        userId: 12345,
        userLanguage: 'en'
    }
    res.status(200).send(user);
}

/**
 * Verifica o email e envia o código de verificação para o usuário
 * @param {object} req
 * @param {object} res
 */
module.exports.postUser = async function (req, res) {

    if (!req.body.email || !req.body.email.includes('@')) {

        res.status(200).send({ error: 'ERROR_EMAIL' });

    } else {
        res.status(200).send();
    }
}
