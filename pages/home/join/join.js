const api = require('../../../config.js')
Page({


  data: {
    type:1,
    region: [],
    name:'',
    phone:'',
  },

  onLoad(options) {

  },
  newType(e){
    this.setData({
      type: e.currentTarget.dataset.type
    })
  },
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  newP(){
    let name = this.data.name;
    let phone = this.data.phone;
    let city = this.data.region[0] + this.data.region[1] + this.data.region[2];
    let type = this.data.type;
    console.log(name,phone,city,type)
    var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test(phone)) {
      wx.showModal({
        content: '请确认手机号是否填写正确',
        showCancel: false
      })
      return false;
    } else {
      if (name || phone || city || type) {
        wx.request({
          url: api.addCollector,
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data:{
            phone:phone,
            city:city,
            name:name,
            type:type
          },
          success:function(e){
            console.log(e.data)
            if(e.data.status){
              wx.showModal({
                content: e.data.msg,
                showCancel: false,
                success(res) {
                  if (res.confirm) {
                    wx.switchTab({
                      url: '/pages/home/home'
                    })
                  } 
                }
              })
            }else{
              wx.showToast({
                title: e.data.msg,
                icon: 'none',
                duration:2000
              })
            }
          }
        })
      } else {
        wx.showModal({
          content: '请确认信息是否填写完整',
          showCancel: false
        })
      }
    }
    
  },
})