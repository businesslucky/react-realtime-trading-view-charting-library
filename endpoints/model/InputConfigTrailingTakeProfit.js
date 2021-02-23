'use strict'

class ConfigTrailingTakeProfit {

  constructor(context, id, reqBody) {

    this.context = context
    this.id = id

    this.takeProfit = {
      target1: reqBody.takeprofit_target1,
      target2: reqBody.takeprofit_target2,
      target3: reqBody.takeprofit_target3,
      target4: reqBody.takeprofit_target4,
      target5: reqBody.takeprofit_target5,
      target6: reqBody.takeprofit_target6,
      orderType: reqBody.takeprofit_order_type,
      balanceSource: reqBody.takeprofit_balance_source
    }

    this.trailingStop = {
      startingPointMethod: reqBody.trailing_starting_point_method,
      startingPoint: reqBody.trailing_starting_point,
      interval: reqBody.trailing_interval
    }

  }

}

module.exports = ConfigTrailingTakeProfit