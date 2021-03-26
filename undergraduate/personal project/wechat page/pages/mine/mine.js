// pages/mine/mine.js
const app = getApp();
const userUrl = require('../../config.js').userUrl;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //tabbar
    list: [
      {
        id: 0,
        name: '个人中心',
        open: false,
        image:'/tabbarComponent/icon/wode2.png',
        pages: [
          {
            'tel':''
          }
        ]
      },
      {
        id: 1,
        name: '我的工厂',
        open: false,
        image: '/tabbarComponent/icon/wode2.png',
        pages: [
          {
            'mycompany':''
          }
        ]
      },
      {
        id: 2,
        name: '部门管理',
        open: false,
        image: '/tabbarComponent/icon/wode2.png',
        pages: [
          {
            'departments':''
          }
        ]
      }
    ],
    userInfo: {},
    tel:'',
    tabbar: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
    let that = this
    if(app.globalData.hasLogin){
    wx.request({
      url: userUrl + 'userinfodetail',
      data: {
        'openid': wx.getStorageSync('openid')
      },
      success: function (res) {
        let userInfo = app.globalData.userInfo;
        let list = that.data.list;
        list[0].pages.tel = res.data.tel;
        list[1].pages.mycompany = res.data.mycompany;
        list[2].pages.departments = res.data.mydepartment;
        console.log('请求结果', res)
        that.setData({
          userInfo: userInfo,
          list : list
        });
        if(res.data){
          that.setData({
           tel: res.data.tel,
          });
        }
      }
    })
    }else{
      wx.showModal({
        title: '提示',
        content: '请先登录',
        showCancel: false,
        confirmText: "确定",
        success: function (res) {
          wx.navigateTo({
            url: '/pages/auth/login/login',
          })
        }
      })
    }

  },

  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
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