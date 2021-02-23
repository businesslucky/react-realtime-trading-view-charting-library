'use strict';

/**
 * Retorna uma string com apenas a primeira letra das palavras em maiusculo
 * @param {String} str
 */
module.exports.capitalize = function (str) {
    if (str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
}