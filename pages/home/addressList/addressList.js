const app = getApp()
const api = require('../../../config.js')

Page({

  data: {

  },

  onLoad: function (options) {
    let _this = this;
    wx.request({
      url: api.myAddress,
      data: {
        userId: app.globalData.userId,
      },
      success: function (e) {
        console.log(e.data)
        _this.setData({
          param: e.data
        })
      }
    })
  },

})