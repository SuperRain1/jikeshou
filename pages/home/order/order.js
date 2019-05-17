const app = getApp()
const api = require('../../../config.js')

Page({

  data: {
    param:'',
  },

  onLoad: function (options) {
    let _this = this;
    wx.request({
      url: api.myOrder,
      data:{
        userId: app.globalData.userId
      },
      success: function (e) {
        console.log(e.data)
        if(e.data.status){
          _this.setData({
            param: e.data
          })
        }else{
          wx.showToast({
            title: e.data.msg,
            icon:'none',
            duration:2000,
          })
        }
        
        
      }
    })
  },
  call(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone 
    })
  },
  goComment(e){
    wx.navigateTo({
      url: '/pages/home/order/comment/comment?id='+e.currentTarget.dataset.id
    })
  },
  cancelOrder(e){
    let _this = this;
    let index = e.currentTarget.dataset.index;
    wx.request({
      url: api.cancelOrder,
      data:{
        orderno: e.currentTarget.dataset.id
      },
      success:function(e){
        if(e.data.msg){
          wx.showToast({
            title: e.data.msg,
            icon: 'none',
            duration: 2000,
          })
          _this.setData({
            ['param.orderBeanList[' + index + '].status']: 6
          })
        }else{
          wx.showToast({
            title: e.data.msg,
            icon: 'none',
            duration: 2000,
          })
        }
       
      }
    })
  }

})