//index.js
//获取应用实例
const app = getApp();
const userUrl = require('../../config.js').userUrl;
const wxUrl = require('../../config.js').wxUrl


Page({
  data: {
    userInfo:{},
    tabbar: {},
    hasLogin: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list1:[{
      id: 0,
      name: '设备数量统计',
      annotation:'部门所有数量的统计',
      },
      {
        id:1,
        name:'设备故障统计',
        annotation: '部门所有数量的统计',
      },
      {
        id:2,
        name:'设备计划项目统计',
        annotation: '部门所有数量的统计',
      }
    ]

  },
  
  onLoad: function () {
   var that = this;
    console.log(wx.getStorageSync('userInfo'));
    
    app.editTabbar();
    wx.cloud.callFunction({
      name: 'getOpenid', complete: res => {
        wx.setStorageSync('openid', res.result.openid)
        wx.request({
          url: wxUrl + 'code_to_openid',
          data: {
            'openid': wx.getStorageSync('openid')
          },
          success: function (res1) {
            if (res1.data) {
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
            } else {
              wx.request({
                url: userUrl +'userinfoselect',
                data: {
                  'openid': wx.getStorageSync('openid')
                },
                success: function (res2) {
                  console.log(res2.data)
                  getApp().globalData.userInfo = res2.data
                  wx.setStorageSync('userInfo', res2.data);
                  getApp().globalData.hasLogin = true;
                  that.onShow();
                }
              })

              //没有这一步index中的onShow的app.globalData.userInfo==null所以会使头像和nickname没有
            }
          },
        })

      }
    })

  },

    bindtest: function(){
    wx.request({
      url: userUrl +'test',
      data:{
        'openid': wx.getStorageSync('openid')
      },
      success : function(res){
        console.log('请求结果',res)
      }
    })
  },

  onShow: function () {
    if (app.globalData.hasLogin) {
      // console.log(app.globalData.userInfo)
      // console.log(app.globalData.userInfo.repair_validating)
      // let userInfo = app.globalData.userInfo;
      // this.setData({
      //   userInfo: userInfo,
      //   sum: 10,
      //   todaynumber: 1,
      //   monthnumber: 5
      // });
      let that = this
      wx.request({
        url: userUrl + 'maintainCompare',
        data: {
          'openid': wx.getStorageSync('openid')
        },
        success: function (res) {
          let userInfo = app.globalData.userInfo;
          console.log('请求结果', res)
          that.setData({
            userInfo: userInfo,
            sum: res.data.sum,
            todaynumber: res.data.todaynum,
            monthnumber: res.data.monthnum
          });
        }
      })
    };
  },

  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },

  goAddequipment() {
    if(getApp().globalData.hasLogin){
      wx.navigateTo({
        url: "/pages/add/addequipment/addequipment"
      });
    }else{
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
  },

  goAddmaintainance() {
    if (getApp().globalData.hasLogin) {
      wx.navigateTo({
        url: "/pages/add/addmaintainance/addmaintainance"
      })
    }else{
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
  },

  goAddrepair() {
    if (getApp().globalData.hasLogin) {
      wx.navigateTo({
        url: "/pages/add/addrepair/addrepair"
      })
    }else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
  },


  goInformation() {
    if (getApp().globalData.hasLogin) {
      wx.navigateTo({
        url: "/pages/information/information"
      })
    }else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
  },

  goLogin(){
    if (!getApp().globalData.hasLogin) {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      })
    }
  },
//  kindToggle: function (e) {
//     var id = e.currentTarget.id, list = this.data.list;
//     for (var i = 0, len = list.length; i < len; ++i) {
//       if (list[i].id == id) {
//         list[i].open = !list[i].open
//       } else {
//         list[i].open = false
//       }
//     }
//     this.setData({
//       list: list
//     });
//   }
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    wx.request({
      url: userUrl + 'userinfoselect',
      data: {
        'openid': wx.getStorageSync('openid')
      },
      success: function (res2) {
        getApp().globalData.userInfo = res2.data
        wx.setStorageSync('userInfo', res2.data);
        getApp().globalData.hasLogin = true;
        that.onShow();
      }
    })

  },


})
