const api = require('../../../../config.js')
Page({

  data: {
    active:0,
    id:'',
    nr:'',
  },
  changeBq(e){
    this.setData({
      active: e.currentTarget.dataset.type
    })
  },
  pl(e){
    console.log(e.detail.value)
    this.setData({
      nr: e.detail.value
    })
  },
  submitBtn(){
    let score;
    if (this.data.active == 0) {
      score = '5'
    }
    if (this.data.active == 1) {
      score = '3'
    }
    if (this.data.active == 2) {
      score = '-5'
    }
    wx.request({
      url: api.addScore,
      data:{
        score:score,
        orderId:this.data.id,
        detail:this.data.nr,
      },
      success:function(e){
        console.log(e.data)
        if(e.data.status){
          wx.redirectTo({
            url: '/pages/home/order/plSuc/plSuc',
          })
        }
      }
    })
  },
  onLoad: function (e) {
    console.log(e)
    this.setData({
      id:e.id
    })
  },
})