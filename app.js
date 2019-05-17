//app.js
const api = require('./config.js')
App({
  onLaunch: function () {
    let _this = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: api.codeHandler,
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data:{
            code:res.code
          },
          success:function(e){
            console.log(e.data)
            _this.globalData.userId = e.data.userId
          }
        })
      }
    })
  },
  globalData: {
    host:api.host,
    userId:'',
    phone:'',
  }
})