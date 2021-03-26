// pages/auth/register/register.js
const app = getApp();
const userUrl = require('../../../config.js').userUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel:"",
    company:'',
    department:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  addinfo: function(){
    wx.request({
      url: userUrl + 'userinfodetailadd',
      data: {
        'mycompany': this.data.company,
        'mydepartment':this.data.department,
        'tel': this.data.tel,
        'openid': wx.getStorageSync('openid')
      },
      success: function (res) {
        console.log('请求结果成功', res);
        // app.globalData.userInfo = res.userInfo
        app.globalData.hasLogin = true;
        wx.navigateBack({
          delta:2
        })

      }
    })
  },

  changetel:function(e){
    this.setData({
      tel:e.detail.value})
  },

  changecom: function (e) {
    this.setData({
      company: e.detail.value
    })
  },

  changedep: function (e) {
    this.setData({
      department: e.detail.value
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