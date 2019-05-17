//index.js
//获取应用实例
const app = getApp()
const api = require('../../config.js')
Page({
  data: {
    param:'',
    indicatorDots: true,
    autoplay: true,
    circular:true,
    interval: 4000,
    duration: 700,
    orderCount:'',
    host:'',
    phone:'',
    scene:'',
  },
  isPhone(){
    if (app.globalData.phone){
      wx.navigateTo({
        url: '/pages/index/placeOrder/placeOrder',
      })
    }else{
      wx.navigateTo({
        url: '/pages/index/register/register',
      })
    }
  },
  onLoad: function (e) {
    let _this = this;
    console.log(e,111)
    if (e.scene) {
      let scene = decodeURIComponent(e.scene);
      _this.setData({
        scene: scene
      })
    }
    
    wx.request({
      url: api.index,
      success:function(e){
        console.log(e.data)
        console.log(app.globalData.host)
        _this.setData({
          host: app.globalData.host,
          param:e.data
        })
      }
    })
    this.init()
	},
  init(){
    let _this = this;
    var n = setInterval(function () {
      if(app.globalData.userId){
        wx.request({
          url: api.getUser,
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            userId: app.globalData.userId,
            consigneeId: _this.data.scene
          },
          success: function (e) {
            console.log(e.data)
            wx.setStorage({
              key: 'city',
              data: e.data.userList[0].city
            })
            wx.setStorage({
              key: 'site',
              data: e.data.userList[0].site
            })
            wx.setStorage({
              key: 'address',
              data: e.data.userList[0].address
            })
            _this.setData({
              orderCount: e.data.orderCount,
              phone: e.data.userList[0].phone,
            })
            app.globalData.phone = e.data.userList[0].phone
          }
        })
        clearInterval(n)
      }else{
        console.log('等usierId获取后重新调用方法')
        return
      }
    }, 1000)

    
  },
  goOrder(){
    wx.navigateTo({
      url: '/pages/home/order/order',
    })
  }


})
