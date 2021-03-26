// pages/sparepartdetail/sparepartdetail.js
const app = getApp();
const userUrl = require('../../config.js').userUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sparepartsdetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var sparepart = [
    //   {
    //     name: "键盘",
    //     number: 12,
    //     id: 10000,
    //     img: "/images/baoxiu.png",
    //     manufacturer: "移动",
    //     department: "技术部",
    //     condition: "良好",
    //     place: "电脑前",
    //     category: "dell",
    //     initialdate: "2020.1.1",
    //     originid: "066",
    //     usagedate: "2020.3.1"
    //   },
    //   {
    //     name: "计算机",
    //     number: 12,
    //     id: 10001,
    //     img: "/images/baoxiu.png",
    //     manufacturer: "电信",
    //     department: "设计部",
    //     condition: "老化",
    //     place: "阅览室",
    //     category: "Lenovo",
    //     initialdate: "2000.1.1",
    //     originid: "008",
    //     usagedate: "2007.3.1"
    //   },
    // ]
    // for (var i = 0; i < sparepart.length; i++) {
    //   if (sparepart[i].id == options.id) {
    //     this.setData({
    //       sparepartdetail: sparepart[i]
    //     })
    //   }
    // }
    let that = this
    wx.request({
      url: userUrl + 'sparepartdetail',
      data: {
        'no': options.no,
        'openid': wx.getStorageSync('openid')
      },
      success: res => {
        console.log(res.data)
        that.setData({
          sparepartsdetail: res.data
        })
      }
    })

  },

  modify: function () {
    var sparepartdetail = JSON.stringify(this.data.sparepartsdetail)
    wx.navigateTo({
      url: '/pages/information/information?sparepartdetail=' + sparepartdetail,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})