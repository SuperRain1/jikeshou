const api = require('../../../config.js')
const app = getApp()
Page({


  data: {
    arr:'',
    host:'',
  },

  
  onLoad: function (e) {
    console.log(e.id)
    let id = e.id
    let _this = this;
    wx.request({
      url: api.banner,
      data:{
        bannerId:id
      },
      success:function(e){
        console.log(e.data)
        if(e.data.status){
          wx.setNavigationBarTitle({
            title: e.data.banner[0].banner_titile
          })
          _this.setData({
            arr:e.data.banner,
            host: app.globalData.host
          })
        }else{
          wx.showToast({
            title: e.data.msg,
            icon:'none',
            duration:2000
          })
        }
      }
    })
  },

})