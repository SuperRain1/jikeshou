const app = getApp();
const api = require('../../../config.js')
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data: {
    province: '',//省
    city: '',//市
    district: '',//区
    latitude: '',//经度
    longitude: '',//纬度
    site:'',//小区
    floor:''//楼号
  },
  getSite(e){
    this.setData({
      site: e.detail.value
    })
  },
  getFloor(e) {
    this.setData({
      floor: e.detail.value
    })
  },
  update(){
    let city = this.data.province + this.data.city + this.data.district
    let address = this.data.site + this.data.floor
    console.log(city,address)
    wx.request({
      url: api.updateAddress,
      data:{
        city:city,
        address:address,
        userId: app.globalData.userId,
      },
      success:function(e){
        console.log(e)
        if(e.data.status){
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1500,
            success:function(){
              setTimeout(function () {
                wx.redirectTo({
                  url: '/pages/home/addressList/addressList'
                })
              }, 1500)
            }
          })
        }
      }
    })

  },
  onLoad: function () {
    qqmapsdk = new QQMapWX({
      key: 'TVBBZ-A2JHW-NQTRW-ODFOU-GTG6J-HHBPK' //这里自己的key秘钥进行填充
    });
  },
  onShow: function () {
    let vm = this;
    vm.getUserLocation();
  },
  againAdress() {
    wx.showToast({
      title: '正在获取位置',
      icon: 'loading',
      duration: 2000
    })
    this.onShow()
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
          showCancel: false,
          content: '请先打开手机的GPS开关后，再进入此页面',
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
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