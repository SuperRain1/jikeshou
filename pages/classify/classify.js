const api = require('../../config.js')
const app = getApp()
Page({


  data: {
    type: [],//一级菜单
    active:0,
    goods:[],//二级菜单
    host: '',
    describe:'',
  },

 
  onLoad(options) {
    let _this = this;
    wx.request({
      url: api.getCategory,
      success:function(e){
        console.log(e.data)
        _this.getGoods(e.data.goods[0].category_id)
        _this.setData({
          host: app.globalData.host,
          type: e.data.goods
        })
      }
    })
    
  },
  getGoods(id){
    let _this = this;
    wx.request({
      url: api.getGoods,
      data:{
        categoryId:id
      },
      success:function(e){
        console.log(e.data)
        _this.setData({
          describe: e.data.category,
          goods: e.data.goods
        })
      }
    })
  },
  getType(e){
    this.getGoods(e.currentTarget.dataset.id)
    this.setData({
      active: e.currentTarget.dataset.index
    })
  }

})