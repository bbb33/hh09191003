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
    equipment: [],
    current_equipment:[],
    keyword: '',
    searchStatus: false,
    helpKeyword:[],
    helpKeywordStatus:false,
    showDialog: false,
    no :''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
    if(app.globalData.hasLogin){
       this.getCurrentequipment();
    }else{
       wx.navigateTo({
      url: "/pages/auth/login/login"
    });
    }
  },
  
// getCurrentequipment(equipment_id = '') {
  getCurrentequipment(){
    wx.request({
      url: userUrl + 'equipmentselect',
      data: {
        'openid': wx.getStorageSync('openid'),
      },
      success: res => {
        console.log('res1', res)
        this.setData({
          equipment: res.data
        })
        wx.setStorageSync('equipment', res.data)
      }
    })
    // this.setData({
    //   equipment: equipment
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
    var equipment = wx.getStorageSync('equipment')
    var helpKeyword=[];
    for(var i = 0; i<equipment.length ;i++){
      if(equipment[i].name.search(e) != -1) {
        helpKeyword.push(equipment[i].name);
      }

    }
    console.log(helpKeyword)
        this.setData({
          helpKeyword: helpKeyword,
          helpKeywordStatus:true
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

  confirmSearch(){
    this.setData({
      searchStatus: true,
      // keyword: event.currentTarget.dataset.keywords,
      helpKeywordStatus: false
    });
    this.getinputequipment(this.data.keyword)
  },

  getinputequipment(e) {
    var equipment = wx.getStorageSync('equipment')
    console.log
    var currentKeyword = [];
    for (var i = 0; i < equipment.length; i++) {
      if (equipment[i].name.search(e) != -1)
        currentKeyword.push(equipment[i]);
    }
    console.log(currentKeyword)
    this.setData({
      current_equipment: currentKeyword,
    });
  },

  goAddequipment(){
    wx.navigateTo({
      url: "/pages/add/addequipment/addequipment"
    });
  },

  delequipment:function(e){
    this.data.no = e.currentTarget.dataset.no
    console.log(e.currentTarget.dataset.no)
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  confirmdel:function(){
    var no = this.data.no
    this.setData({
      showDialog: !this.data.showDialog
    });
    wx.request({
      url: userUrl + 'equipmentdel',
      data: {
        'openid': wx.getStorageSync('openid'),
        'no': no
      },
      success: res => {
        wx.request({
          url: userUrl + 'equipmentselect',
          data: {
            'openid': wx.getStorageSync('openid'),
          },
          success: res => {
            this.setData({
              equipment: res.data
            })
            wx.setStorageSync('equipment', res.data)
            var current_equipment = [];
            for(var i = 0; i < this.data.equipment.length ; i++){
              if (this.data.equipment[i].no != no){
                current_equipment.push(this.data.equipment[i])
              }
            }
            this.setData({
              current_equipment: current_equipment
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
  canceldel:function(){
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
      url: userUrl + 'equipmentselect',
      data: {
        'openid': wx.getStorageSync('openid'),
      },
      success: res => {
        console.log('res1', res)
        this.setData({
          equipment: res.data
        })
        wx.setStorageSync('equipment', res.data)
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})