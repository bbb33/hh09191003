// pages/add/addrepair/addrepair.js
const app = getApp();
const userUrl = require('../../../config.js').userUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        id: 0,
        name: "设备编号",
        placeholder: ""
      },
      {
        id: 1,
        name: "报修内容",
        placeholder: ""
      },
      {
        id: 2,
        name: "负责人",
        placeholder: ""
      },
      {
        id: 3,
        name: "备注",
        placeholder: "无"
      },
    ],
    // showModal: false,
    currentid: 0,
    submit: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var list = that.data.list
    var no = options.no//wx.getStorageSync('equipmentdetail')
    console.log(options)
    list[0].placeholder = no;
    that.setData({
      list: list
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

  },


  change: function (e) {
    for (var i = 0; i < this.data.list.length; i++) {
      if (this.data.list[i].id == e.currentTarget.dataset.id) {
        this.data.list[i].placeholder = e.detail.value
      }
    }
    var newlist = this.data.list;
    this.setData({
      list: newlist
    })
    wx.setStorageSync('list', newlist)
  },

  addrepair: function () {
    var list = this.data.list;
    console.log(list[0].placeholder)
    var repairinfo = {
      'no': '',
      'openid': '',
      'charge':'',
      'program':'',
      'eg': ''
    }

    repairinfo.openid = wx.getStorageSync('openid');
    repairinfo.charge = this.data.list[2].placeholder;
    repairinfo.no = this.data.list[0].placeholder;
    repairinfo.program = this.data.list[1].placeholder;
    repairinfo.eg = this.data.list[3].placeholder;

    wx.setStorageSync('repairinfo', repairinfo)
    console.log(repairinfo)
    wx.request({
      url: userUrl + 'addrepair',
      data: {
        'repairinfo': JSON.stringify(repairinfo),
      },
      success: function (res2) {
        console.log(res2)
        if (res2.data.add) {
          wx.showToast({
            title: res2.data.data,
            icon: 'success',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: res2.data.data,
            icon: 'none',
            duration: 2000
          });
        }
      }
    })
  },


})