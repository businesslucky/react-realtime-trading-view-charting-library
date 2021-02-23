'use strict'

class TechnicalAnalysis {

  constructor(userId, reqBody) {
    this.userId = userId
    this.action = reqBody.action
    this.description = reqBody.description
    this.descriptionKey = 'userGenerated'
    this.indicatorKeys = reqBody.indicator_keys

    if (this.action == 'update' ) {
      this.techId = reqBody.tech_id
    }
  }

}

module.exports = TechnicalAnalysis
