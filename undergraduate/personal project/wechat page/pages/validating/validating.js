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
    repair: [],
    current_repair: [],
    keyword: '',
    searchStatus: false,
    helpKeyword: [],
    helpKeywordStatus: false,
    orderList: [],
    showType: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
    if (app.globalData.hasLogin) {
        var id = options.id;
        this.setData({
          showType: id,
        });
      this.getCurrentrepair(id);
      console.log(options);
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
    
  },

  switchTab: function (event) {
    let showType = event.currentTarget.dataset.index;
    this.getCurrentrepair(showType);
    console.log(showType);
    this.setData({
      showType: showType,
      searchStatus:false
    });

  },

  // getCurrentrepair(repair_id = '') {
  getCurrentrepair(id) {
    console.log(id)
    // var repairing = [
    //   {
    //     name: "键盘",
    //     number: 12,
    //     id: 0,
    //     image: "/images/baoxiu.png"
    //   },
    //   {
    //     name: "计算机",
    //     number: 12,
    //     id: 1,
    //     image: "/images/baoxiu.png"
    //   },
    //   {
    //     name: "计印机",
    //     number: 12,
    //     id: 2,
    //     image: "/images/baoxiu.png"
    //   },
    //   {
    //     name: "键盘",
    //     number: 12,
    //     id: 3,
    //     image: "/images/baoxiu.png"
    //   },
    //   {
    //     name: "计算机",
    //     number: 12,
    //     id: 4,
    //     image: "/images/baoxiu.png"
    //   },
    //   {
    //     name: "计印机",
    //     number: 12,
    //     id: 5,
    //     image: "/images/baoxiu.png"
    //   },
    // ]
    // var validating = [
    //   {
    //     name: "印钞机",
    //     number: 12,
    //     id: 0,
    //     image: "/images/baoxiu.png"
    //   },
    //   {
    //     name: "车床",
    //     number: 12,
    //     id: 1,
    //     image: "/images/baoxiu.png"
    //   },
    //   {
    //     name: "汽车",
    //     number: 12,
    //     id: 2,
    //     image: "/images/baoxiu.png"
    //   },
    //   {
    //     name: "车窗",
    //     number: 12,
    //     id: 3,
    //     image: "/images/baoxiu.png"
    //   },
    //   {
    //     name: "机器",
    //     number: 12,
    //     id: 4,
    //     image: "/images/baoxiu.png"
    //   },
    //   {
    //     name: "印钞机",
    //     number: 12,
    //     id: 5,
    //     image: "/images/baoxiu.png"
    //   },
    // ]
    if(id == 0){
    // this.setData({
    //   repair: repairing
    // })
    wx.request({
      url: userUrl+'repairing',
      data:{
        'openid':wx.getStorageSync('openid'),
      },
      success:res=>{
        console.log(res.data)
        wx.setStorageSync('repairing', res.data)
        this.setData({
          repair: res.data
        })
      }
    })
    }else {
      // this.setData({
      //   repair: validating
      // })
      wx.request({
        url: userUrl+'repair_validating',
        data: {
          'openid': wx.getStorageSync('openid'),
        },
        success: res => {
          console.log(res);
          wx.setStorageSync('repair_validating', res.data)
           this.setData({
             repair: res.data
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

  clearKeyword: function () {
    this.setData({
      keyword: '',
      searchStatus: false,
      helpKeywordStatus: false
    })
    console.log(this.data.keyword)
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
    // var repair = [
    //   {
    //     name: "键盘",
    //     number: 12,
    //     id: 3,
    //     image: "/images/baoxiu.png"
    //   },
    //   {
    //     name: "计算机",
    //     number: 12,
    //     id: 1,
    //     image: "/images/baoxiu.png"
    //   },
    //   {
    //     name: "计印机",
    //     number: 12,
    //     id: 2,
    //     image: "/images/baoxiu.png"
    //   },
    // ]
    if (this.data.showType == 0) {
      this.setData({
        repair: wx.getStorageSync('repairing')
      })
      
    } else if (this.data.showType == 1) {
      this.setData({
        repair: wx.getStorageSync('repair_validating')
      })
      // 
    }
    var helpKeyword = [];
    for (var i = 0; i < this.data.repair.length; i++) {
      if (this.data.repair[i].equipment.name.search(e) != -1)
        helpKeyword.push(this.data.repair[i].equipment.name);
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
    this.getinputrepair(this.data.keyword)
  },

  getinputrepair(e) {
    // var repair = [
    //   {
    //     name: "键盘",
    //     number: 12,
    //     id: 3,
    //     image: "/images/baoxiu.png"
    //   },
    //   {
    //     name: "计算机",
    //     number: 12,
    //     id: 1,
    //     image: "/images/baoxiu.png"
    //   },
    //   {
    //     name: "计印机",
    //     number: 12,
    //     id: 2,
    //     image: "/images/baoxiu.png"
    //   },
    // ]
    if (this.data.showType == 0) {
      this.setData({
        repair: wx.getStorageSync('repairing')
      })

    } else if (this.data.showType == 1) {
      this.setData({
        repair: wx.getStorageSync('repair_validating')
      })
      // 
    }
    var currentKeyword = [];
    for (var i = 0; i < this.data.repair.length; i++) {
      if (this.data.repair[i].equipment.name.search(e) != -1)
        currentKeyword.push(this.data.repair[i]);
    }
    console.log(currentKeyword)
    this.setData({
      current_repair: currentKeyword,
    });
  },

  goAddrepair() {
    wx.navigateTo({
      url: "/pages/add/addrepair/addrepair"
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // var that = this
    // wx.request({
    //   url: userUrl + 'getDoneQuesCount',
    //   data: {
    //     openid: wx.getStorageSync('jiaoxue_OPENID'),
    //     repairId: repairId
    //   },
    //   success: function (res) {
    //     // console.log(res)
    //     that.setData({
    //       ques_count: res.data.msg
    //     })
    //   }
    // })
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