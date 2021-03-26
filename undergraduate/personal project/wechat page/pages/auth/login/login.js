// pages/auth/login/login.js
const app = getApp();
const userUrl = require('../../../config.js').userUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    password:"",
    userInfo:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  inputChangeUsername: function (e) {
    this.setData({
      username: e.detail.value,
    });
  },
  inputChangePassword: function (e) {
    this.setData({
      password: e.detail.value,
    });
  },

  confirm(){
       console.log(this.data.username);
    for (var i = 0; i < userinfo.length; i++) {
      if (userinfo[i].nickName == this.data.username & userinfo[i].password == this.data.password){
        app.globalData.userInfo= userinfo[i];
        app.globalData.hasLogin= true;
        console.log(app.globalData.userInfo)
        wx.navigateBack({
          delta: 1,
        })
      }   
    }
  },

  getUserInfo: function (e) {
    console.log("JING")
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasLogin: true
    })

  },

  wxLogin(){
    console.log(app.globalData.hasLogin)
    if (app.globalData.hasLogin) {
      console.log("if")
      this.setData({
        userInfo: app.globalData.userInfo,
        hasLogin: true
      })
      console.log(userInfo)
      wx.navigateBack({
        delta: 1
      })
    } else {
      console.log("else")
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          
          wx.request({
            url: userUrl+'weixinadd',
            data: {
              'nickname':res.userInfo.nickName,
              'avatarUrl': res.userInfo.avatarUrl,
              'openid': wx.getStorageSync('openid')
            },
            success: function (res) {
              console.log('请求结果成功', res.data);
              // app.globalData.userInfo = res.userInfo
              app.globalData.hasLogin = true;
              wx.navigateTo({
                url: '/pages/auth/register/register',
              })
            }
          })

        }
      })
     
    }
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