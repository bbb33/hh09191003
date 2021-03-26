// pages/add/addmaintainance/addmaintainance.js
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
        pop: false,
        placeholder: ""
      },
      {
        id: 1,
        name: "保养项目",
        pop: true,
        showimg: true,
        options: [
          {
            name: "定期回访 ",
            changeColor: false,
          },
          {
            name: "质量缺陷处理",
            changeColor: false,
          },
        ],
        selected: ""
      },
      {
        id: 2,
        name: "保养地点",
        pop: false,
        placeholder: "无"
      },
      {
        id: 3,
        name: "负责人",
        pop: false,
        placeholder: "无"
      },
      {
        id: 4,
        name: "备注",
        pop: false,
        placeholder: "无"
      },
    ],
    showModal: false,
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

  showDialogBtn: function (e) {
    var id = e.currentTarget.id;
    console.log(id);
    this.setData({
      showModal: true,
      currentid: id
    })
  }, /** * 弹出框蒙层截断touchmove事件 */

  preventTouchMove: function () { }, /** * 隐藏模态对话框 */

  hideModal: function () {
    this.setData({
      showModal: false
    });
  }, /** * 对话框取消按钮点击事件 */

  onCancel: function () {
    this.hideModal();
  }, /** * 对话框确认按钮点击事件 */

  onConfirm: function () {
    for (var i = 0; i < this.data.list.length; i++) {
      if (this.data.list[i].id == this.data.currentid) {
        var newlist = this.data.list;
        newlist[i].showimg = false;
        this.setData({
          list: newlist
        })
        wx.setStorageSync('list', newlist)
        console.log("onConfirm:" + this.data)
        this.hideModal();
      }
    }
  },

  selectOptions: function (e) {
    for (var i = 0; i < this.data.list.length; i++) {
      if (this.data.list[i].id == this.data.currentid) {
        this.data.list[i].selected = e.currentTarget.dataset.text;
        var newlist = this.data.list;
        this.setData({
          list: newlist
        })
        for (var j = 0; j < this.data.list[i].options.length; j++) {
          if (this.data.list[i].options[j].name == e.currentTarget.dataset.text) {
            this.data.list[i].options[j].changeColor = true;
          } else {
            this.data.list[i].options[j].changeColor = false;
          }

        }
        var newlist = this.data.list;
        this.setData({
          list: newlist
        })
      }
    }
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

  addmaintainance: function () {
    var list = this.data.list;
    console.log(list[0].placeholder)
    var maintainanceinfo = {
      'no': '',
      'openid': '',
      'status':'',
      'charge':'',
      'maintainance_place':'',
      'eg': ''
    }

    maintainanceinfo.openid = wx.getStorageSync('openid');
    maintainanceinfo.status = this.data.list[1].selected;
    maintainanceinfo.no = this.data.list[0].placeholder;
    maintainanceinfo.maintainance_place = this.data.list[2].placeholder;
    maintainanceinfo.charge = this.data.list[3].placeholder;
    maintainanceinfo.eg = this.data.list[4].placeholder;

    wx.setStorageSync('maintainanceinfo', maintainanceinfo)
    console.log(maintainanceinfo)
    wx.request({
      url: userUrl + 'addmaintainance',
      data: {
        'maintainanceinfo': JSON.stringify(maintainanceinfo),
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