//app.js

const userUrl = require('./config.js').userUrl
// const appid = require('./config.js').appid
App({
  onLaunch: function () {
////初始化云服务
    wx.cloud.init({
      env: 'svnandhjz-cqpoj', traceUser: true
    })
    //隐藏系统tabbar
    wx.hideTabBar();
    //获取设备信息
    this.getSystemInfo();
   
        // var openid = res.result.openId;
        // that.setData({
        //   openid: openid
        // })
        // wx.request({
        //   url: wxUrl + 'code_to_openid',
        //   data: {
        //     'openid': wx.getStorageSync('openid')
        //   },
        //   success: function (res1) {
        //     console.log(res1)
        //     // if(res1 == null){
        //     //   var login = true;
        //     // }else{
        //     //   var login = false;
        //     // }
        //     if (res1.data.is_register) {
        //       wx.showModal({
        //         title: '提示',
        //         content: '请先登录',
        //         showCancel: false,
        //         confirmText: "确定",
        //         success: function (res) {
        //           wx.navigateTo({
        //             url: '/pages/auth/login/login',
        //           })
        //         }
        //       })
        //     }else{
        //         /////神奇的globalData
        //       console.log(res1.data.data)
        //       getApp().globalData.hasLogin = true;
        //       //没有这一步index中的onShow的app.globalData.userInfo==null所以会使头像和nickname没有
        //       getApp().globalData.userInfo = res1.data.data
        //       wx.setStorageSync('userInfo', res1.data.data)
        //       if (this.checkLoginReadyCallback) {
        //         this.checkLoginReadyCallback(res);
        //       }
        //       // this.globalData.hasLogin = true;这个不太行
        //       // wx.request({
        //       //   url: userUrl + 'testselect',
        //       //   data: {
        //       //     'openid': wx.getStorageSync('openid'),
        //       //   },
        //       //   success: function (res1) {
        //         // },
        //       // })
        //     }
        //   },
        // })
      // }
    // })

    //后台获取openid
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     wx.request({
    //       url: wxUrl + 'code_to_openid',
    //       data: {
    //         'code': res.code,
    //         'from': appid
    //       },
    //       success: function (res) {
    //         console.log(res.data)
    //         //将SESSIONID保存到本地storage
    //         wx.setStorageSync('UserOPENID', res.data.openid)
    //         wx.request({
    //           url: userUrl + 'testselect',
    //           data: {
    //             'openid': res.data.openid,
    //           },
    //           success: function (res1) {
    //             wx.setStorageSync('userInfo', res1.data.data)
    //           },
    //         })
    //         if (!res.data.is_register) {
    //           wx.showModal({
    //             title: '提示',
    //             content: '请先登录',
    //             showCancel: false,
    //             confirmText: "确定",
    //             success: function (res) {
    //               wx.navigateTo({
    //                 url: '/pages/auth/login/login',
    //               })
    //             }
    //           })
    //         }
    //       },
    //       fail: function (res) {
    //         console.log('res' + res)
    //       }
    //     })
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function () {
    //隐藏系统tabbar
    wx.hideTabBar();
  },
  getSystemInfo: function () {
    let t = this;
    wx.getSystemInfo({
      success: function (res) {
        t.globalData.systemInfo = res;
      }
    });
  },


  editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },
  globalData: {
    systemInfo: null,//客户端设备信息
    userInfo: null,
    hasLogin:false,
    tabBar: {
      "backgroundColor": "#ffffff",
      "color": "#979795",
      "selectedColor": "#1c1c1b",
      "list": [
        {
          "pagePath": "/pages/index/index",
          "iconPath": "icon/shouye2.png",
          "selectedIconPath": "icon/shouye1.png",
          "text": "首页"
        },
        {
          "pagePath": "/pages/equipment/equipment",
          "iconPath": "icon/shebeiguanli2.png",
          "selectedIconPath": "icon/shebeiguanli1.png",
          "text": "设备"
        },
        {
          "pagePath": "/pages/middle/middle",
          "iconPath": "icon/erweima.png",
          "isSpecial": true,
          "text": "扫码"
        },
        {
          "pagePath": "/pages/spareparts/spareparts",
          "iconPath": "icon/beijianguanli1.png",
          "selectedIconPath": "icon/beijianguanli2.png",
          "text": "备件"
        },
        {
          "pagePath": "/pages/mine/mine",
          "iconPath": "icon/wode2.png",
          "selectedIconPath": "icon/wode1.png",
          "text": "我的"
        }
      ]
    }
  },

})