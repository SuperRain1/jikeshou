Page({


  data: {
    phone:'',
  },

  onLoad: function (e) {
    console.log(e)
    this.setData({
      phone: e.phone
    })
  },
})