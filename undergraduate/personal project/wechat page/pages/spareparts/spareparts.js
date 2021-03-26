// pages/middle/middle.js
const app = getApp();
const userUrl = require('../../config.js').userUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //tabbar
    tabbar: {},
    sparepart: [],
    current_sparepart: [],
    keyword: '',
    searchStatus: false,
    helpKeyword: [],
    helpKeywordStatus: false,
    showDialog: false,
    no: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
    if (app.globalData.hasLogin) {
      this.getCurrentsparepart();
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
  },

  // getCurrentsparepart(sparepart_id = '') {
  getCurrentsparepart() {
    wx.request({
      url: userUrl + 'sparepartselect',
      data: {
        'openid': wx.getStorageSync('openid'),
      },
      success: res => {
        console.log('res1', res)
        this.setData({
          sparepart: res.data
        })
        wx.setStorageSync('sparepart', res.data)
      }
    })
    // this.setData({
    //   sparepart: sparepart
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  clearKeyword: function () {
    this.setData({
      keyword: '',
      searchStatus: false,
      helpKeywordStatus: false
    })
  },

  inputChange: function (e) {
    this.setData({
      keyword: e.detail.value,
      searchStatus: false,
      helpKeywordStatus: false
    });

    if (e.detail.value) {
      this.getHelpKeyword(e.detail.value);
    }

  },
  getHelpKeyword: function (e) {
    var sparepart = wx.getStorageSync('sparepart')
    var helpKeyword = [];
    for (var i = 0; i < sparepart.length; i++) {
      if (sparepart[i].name.search(e) != -1) {
        helpKeyword.push(sparepart[i].name);
      }

    }
    console.log(helpKeyword)
    this.setData({
      helpKeyword: helpKeyword,
      helpKeywordStatus: true
    });


  },
  inputFocus: function () {
    this.setData({
      searchStatus: false,
      helpKeywordStatus: false
    });

    if (this.data.keyword) {
      this.getHelpKeyword(this.data.keyword);
    }
  },

  pop(event) {
    this.setData({
      searchStatus: false,
      keyword: event.currentTarget.dataset.keywords,
      helpKeywordStatus: false
    });
    // this.getSearchResult(event.detail.value);
  },

  confirmSearch() {
    this.setData({
      searchStatus: true,
      // keyword: event.currentTarget.dataset.keywords,
      helpKeywordStatus: false
    });
    this.getinputsparepart(this.data.keyword)
  },

  getinputsparepart(e) {
    var sparepart = wx.getStorageSync('sparepart')
    console.log
    var currentKeyword = [];
    for (var i = 0; i < sparepart.length; i++) {
      if (sparepart[i].name.search(e) != -1)
        currentKeyword.push(sparepart[i]);
    }
    console.log(currentKeyword)
    this.setData({
      current_sparepart: currentKeyword,
    });
  },

  goAddsparepart() {
    wx.navigateTo({
      url: "/pages/information/information"
    });
  },

  delsparepart: function (e) {
    this.data.no = e.currentTarget.dataset.no
    console.log(e.currentTarget.dataset.no)
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  confirmdel: function () {
    var no = this.data.no
    this.setData({
      showDialog: !this.data.showDialog
    });
    wx.request({
      url: userUrl + 'sparepartdel',
      data: {
        'openid': wx.getStorageSync('openid'),
        'no': no
      },
      success: res => {
        wx.request({
          url: userUrl + 'sparepartselect',
          data: {
            'openid': wx.getStorageSync('openid'),
          },
          success: res => {
            this.setData({
              sparepart: res.data
            })
            wx.setStorageSync('sparepart', res.data)
            var current_sparepart = [];
            for (var i = 0; i < this.data.sparepart.length; i++) {
              if (this.data.sparepart[i].no != no) {
                current_sparepart.push(this.data.sparepart[i])
              }
            }
            this.setData({
              current_sparepart: current_sparepart
            })
            console.log(this.data.searchStatus)
            wx.showToast({
              title: '设备已删除',
              icon: 'success',
              duration: 2000
            });
          }
        })
      }
    })
  },
  canceldel: function () {
    this.setData({
      showDialog: !this.data.showDialog
    });
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
    wx.request({
      url: userUrl + 'sparepartselect',
      data: {
        'openid': wx.getStorageSync('openid'),
      },
      success: res => {
        console.log('res1', res)
        this.setData({
          equipment: res.data
        })
        wx.setStorageSync('sparepart', res.data)
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})