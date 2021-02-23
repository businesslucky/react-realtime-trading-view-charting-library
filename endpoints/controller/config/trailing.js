"use strict";
const dotenv = require("dotenv");
const ConfigTrailingTakeProfit = require("../../model/InputConfigTrailingTakeProfit");
dotenv.config();

/**
 * Gets the UI data
 * @param {object} req
 * @param {object} res
 */
module.exports.get = async function(req, res) {
  res.status(200).send(getParams());
};

/**
 * Valida e salva os dados do grupo
 * @param {object} req
 * @param {object} res
 */
module.exports.post = async function(req, res) {
  let config = new ConfigTrailingTakeProfit(
    req.params.context,
    req.params.id,
    req.body
  );

  console.log('req.body', req.body)
  console.log('config', config)

  res.status(200).send(config);
};

let getParams = function() {
  return {
    takeProfit: {
      balanceSource: {
        values: ["amountBought", "amountRemaining"],
        selected: "amountBought"
      },
      orderType: {
        values: ["limit", "market"],
        selected: "market"
      },
      fractions: {
        values: [
          { "5pct": 0.05 },
          { "10pct": 0.1 },
          { "15pct": 0.15 },
          { "20pct": 0.2 },
          { "25pct": 0.25 },
          { "30pct": 0.3 },
          { "35pct": 0.35 },
          { "40pct": 0.4 }
        ],
        selected: ["5pct", "10pct", "15pct", "25pct"]
      }
    },
    trailingStop: {
      trigger: {
        values: ["target", "percent"],
        selected: "percent"
      },
      startingPoint: {
        values: [
          { target1: 1 },
          { target2: 2 },
          { target3: 3 },
          { target4: 4 },
          { target5: 5 }
        ],
        selected: "target1"
      },
      startingPointPercent: {
        values: [
          { "05pct": 0.005 },
          { "10pct": 0.01 },
          { "15pct": 0.015 },
          { "20pct": 0.02 },
          { "25pct": 0.025 }
        ],
        selected: "15pct"
      },
      interval: {
        values: [{ "1target": 1 }, { "2target": 2 }, { "3target": 3 }],
        selected: "1target"
      },
      intervalPercent: {
        values: [
          { "05pct": 0.005 },
          { "10pct": 0.01 },
          { "15pct": 0.015 },
          { "20pct": 0.02 },
          { "25pct": 0.025 }
        ],
        selected: "05pct"
      }
    }
  };
};
