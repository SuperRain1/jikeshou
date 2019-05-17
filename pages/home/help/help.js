const api = require('../../../config.js')
Page({

  data: {
    arr:''
  },

  onLoad: function (options) {
    let _this = this;
    wx.request({
      url: api.help,
      success:function(e){
        console.log(e.data)
        _this.setData({
          arr:e.data.helpList
        })
      }
    })
  },

})