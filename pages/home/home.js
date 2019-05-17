const app = getApp()
Page({

  data: {
    phone:'',
  },

  onLoad: function (options) {
    this.setData({
      phone: app.globalData.phone
    })
  },
})