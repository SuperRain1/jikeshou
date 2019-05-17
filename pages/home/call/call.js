Page({


  data: {
    phone:'028-82677404',
  },
  call(){
    wx.makePhoneCall({
      phoneNumber: this.data.phone
    })
  }
 
})