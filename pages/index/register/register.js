const api = require('../../../config.js')
const app = getApp();
Page({

  data: {
    codeName:'获取验证码',
    codeSec:60,
    isCode:false,
    phone:'',
    name:'',
    code:'',
  },

  onLoad: function (options) {

  },
  getName(e){
    console.log(e.detail.value)
    this.setData({
      name:e.detail.value
    })
  },
  code(e) {
    console.log(e.detail.value)
    this.setData({
      code: e.detail.value
    })
  },
  getPhone(e) {
    console.log(e.detail.value)
    this.setData({
      phone: e.detail.value
    })
  },
  submitBtn(){
    let oName = this.data.name;
    let oPhone = this.data.phone;
    let oCode = this.data.code;
    let userId = app.globalData.userId;
    console.log(oName, oPhone, oCode, userId)
    var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test(this.data.phone)) {
      wx.showModal({
        content: '请确认手机号是否填写正确',
        showCancel: false
      })
      return false;
    } else {
      if (oCode || oPhone || oName) {
        wx.request({
          url: api.addUser,
          data:{
            userId:userId,
            name:oName,
            phone:oPhone,
            code:oCode,
          },
          success:function(e){
            console.log(e)
            if(e.data.status){
              app.globalData.phone = oPhone
              wx.showModal({
                content: '绑定成功',
                showCancel: false,
                success(res) {
                  if (res.confirm) {
                    wx.redirectTo({
                      url: '/pages/index/placeOrder/placeOrder',
                    })
                  }
                }
              })
            }else{
              wx.showModal({
                content: e.data.msg,
                showCancel: false,
              })
            }
          }
        })
      }
    }
  },
  getCode(){
    let _this = this;
    this.setData({
      isCode: true,
    })
    wx.request({
      url: api.getSmsCode,
      data:{
        phone:_this.data.phone
      },
      success:function(e){
        console.log(e)
        if(e.data.status){
          wx.showToast({
            title: e.data.msg,
            icon: 'loading',
            duration: 1000,
            mask: true,
          })
        }else{
          wx.showModal({
            content: e.data.msg,
            showCancel: false,
          })
          _this.setData({
            codeSec: 60,
            codeName: '重新获取',
            isCode: false,
          })
        }
      }
    })
    
    let num = this.data.codeSec;
    let codeV = setInterval(function(){
      if(num<=0){
        clearInterval(codeV);
        _this.setData({
          codeSec: 60,
          codeName:'重新获取',
          isCode: false,
        })
        return
      }else{
        num--;
        _this.setData({
          codeSec: num,
          isCode: true,
        })
      }
    },1000)
    
  },
})