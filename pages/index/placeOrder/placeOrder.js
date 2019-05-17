const app = getApp();
// var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
const api = require("../../../config.js")
var qqmapsdk;
Page({
  data: {
    province: '',
    city: '',
    district:'',
    latitude: '',
    longitude: '',
    array: ['08:00-10:00', '10:00-12:00', '14:00-16:00', '16:00-18:00'],
    index:0,
    site:'',
    address:'',
    time:'08:00-10:00',
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value,         this.data.array[e.detail.value])
    let time = this.data.array[e.detail.value];
    this.setData({
      index: e.detail.value,
      time:time,
    })
  },
  getSite(e){
    this.setData({
      site: e.detail.value
    })
  },
  getAddress(e){
    this.setData({
      address: e.detail.value
    })
  },
  submitBtn(){
    let city = this.data.province + this.data.city + this.data.district;
    let site = this.data.site;
    let address = this.data.address;
    let time = this.data.time;
    console.log(city,site,address,time)
    wx.request({
      url: api.addOrder,
      data:{
        userId: app.globalData.userId,
        startDate:time,
        city:city,
        site:site,
        address:address,
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success:function(e){
        console.log(e)
        if(e.data.status){
          wx.redirectTo({
            url: '/pages/index/placeOrder/tjSuc/tjSuc?phone='+e.data.phone,
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
  },

  onLoad: function (options) {
    var myDate = new Date();
    let hours = myDate.getHours();
    let minus = myDate.getMinutes();
    if (hours<10){
      hours='0'+hours
    }
    if (minus < 10) {
      minus = '0' + minus
    }
    let nowTime = hours+':'+minus;
    console.log(nowTime)
    let array = ['08:00-10:00', '10:00-12:00', '14:00-16:00', '16:00-18:00']
    array.splice(0, 0, nowTime);
    this.setData({
      array:array
    })
    let vm = this;
    if (options.city != null && options.name != '') {
      //设置变量 address 的值
      console.log(options)
      this.setData({
        city: options.city,
        site:options.name
      });
    }else{
      wx.getStorage({
        key: 'city',
        success(res) {
          console.log(res.data)
          vm.setData({
            city: res.data,
          });
        }
      })
      wx.getStorage({
        key: 'site',
        success(res) {
          console.log(res.data)
          vm.setData({
            site: res.data,
          });
        }
      })
      wx.getStorage({
        key: 'address',
        success(res) {
          console.log(res.data)
          vm.setData({
            address: res.data,
          });
        }
      })
      
    }
    
  },
  againAdress(){
    wx.navigateTo({
      url: "/pages/index/placeOrder/map/map"
    });
  },
  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        }
        else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        vm.getLocal(latitude, longitude)
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
        wx.showModal({
          showCancel:false,
          content: '请先打开手机的GPS开关后，再进入此页面',
          success(res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/index/index',
              })
              
            } 
          }
        })
      }
    })
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        let district = res.result.ad_info.district
        vm.setData({
          province: province,
          city: city,
          district: district,
          latitude: latitude,
          longitude: longitude
        })

      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  }
})