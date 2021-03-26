// pages/add/addsparepart/addsparepart.js
const app = getApp();
const userUrl = require('../../config.js').userUrl;
const imgUrl = require('../../config.js').imgUrl;
var uploadUrl = "http://127.0.0.1/thinkphp_3.2.3_full/Uploads/Picture/"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        id: 0,
        name: "备件姓名",
        pop: false,
        placeholder: ""
      },
      {
        id: 1,
        name: "备件编号",
        pop: false,
        placeholder: ""
      },
      {
        id: 2,
        name: "此备件数量",
        pop: false,
        placeholder: ""
      },
      {
        id: 3,
        name: "备件类型",
        pop: true,
        showimg: true,
        options: [
          {
            name: "办公",
            changeColor: false
          },
          {
            name: "计算机",
            changeColor: false
          },
          {
            name: "硬件",
            changeColor: false
          }
        ],
        selected: ""
      },
      {
        id: 4,
        name: "生产厂商",
        pop: true,
        showimg: true,
        options: [
          {
            name: "xxx工厂",
            changeColor: false,
          },
          {
            name: "xxxx单位",
            changeColor: false,
          },
        ],
        selected: ""
      },
      {
        id: 5,
        name: "供应商",
        pop: true,
        showimg: true,
        options: [
          {
            name: "xxxx公司",
            changeColor: false
          },
        ],
        selected: ""
      },
      {
        id: 6,
        name: "仓库号",
        pop: false,
        placeholder: ""
      },
      {
        id: 7,
        name: "备注",
        pop: false,
        placeholder: "无"
      },
    ],
    sparepartImg: '',
    showModal: false,
    currentid: 0,
    isModify: false,
    sparepartdetail: {},
    submit: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (!this.isNull(options)) {
      let that = this
      var list = that.data.list
      let option = JSON.parse(options.sparepartdetail)
      console.log(option)
      console.log(that.data.list)
      list[0].placeholder = option.name;
      list[1].placeholder = option.no;
      list[2].placeholder = option.number;
      list[3].selected = option.category;
      list[4].selected = option.manufacturer;
      list[5].selected = option.vendor;
      list[6].placeholder = option.place_number;
      list[7].placeholder = option.eg;
      that.setData({
        list: list,
        sparepartImg: option.img,
        sparepartdetail: option,
        isModify: true
      })
      wx.setStorageSync('list', that.data.list)
    }
  },

  isNull: function (obj) {
    if (Object.prototype.toString.call(obj) !== '[object Object]') {
      return 'Type Error'
    }
    return JSON.stringify(obj) === '{}'
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

  chooseImageTap: function () {
    let that = this
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },

  chooseWxImage: function (type) {
    let that = this
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res.tempFilePaths[0]);
        that.setData({
          sparepartImg: res.tempFilePaths[0],
        })
      },
    })
  },

  addsparepart: function () {
    let that = this
    var filePath = that.data.sparepartImg
    console.log(filePath)
    wx.uploadFile({
      url: imgUrl + 'addsparepartImage',//仅为示例，非真实的接口地址//接口连接          
      filePath: filePath,
      name: 'file',
      formData: {
        'user': 'test'
      },
      success: function (res) {
        console.log(res.data)
        var s = res.data
        s = s.slice(1, s.length - 1);
        //do something
        wx.setStorageSync('sparepartImg', uploadUrl + s)
        console.log(wx.getStorageSync('sparepartImg'))
        var list = that.data.list;
        console.log(list[0].placeholder)
        var sparepartinfo = {
          'no': '',
          'openid': '',
          'name': '',
          'number': '',
          'place_number': '',
          'category': '',
          'manufacturer': '',
          'vendor': '',
          'eg': ''
        }
        sparepartinfo.openid = wx.getStorageSync('openid');
        sparepartinfo.name = that.data.list[0].placeholder;
        sparepartinfo.no = that.data.list[1].placeholder;
        sparepartinfo.number = parseInt(that.data.list[2].placeholder)
        sparepartinfo.category = that.data.list[3].selected;
        sparepartinfo.manufacturer = that.data.list[4].selected;
        sparepartinfo.vendor = that.data.list[5].selected;
        sparepartinfo.place_number = that.data.list[6].placeholder;
        sparepartinfo.eg = that.data.list[7].placeholder;

        wx.setStorageSync('sparepartinfo', sparepartinfo)
        console.log(sparepartinfo)
        var sparepartImg = wx.getStorageSync('sparepartImg')
        wx.request({
          url: userUrl + 'addsparepart',
          data: {
            'sparepartinfo': JSON.stringify(sparepartinfo),
            'img': sparepartImg
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
      }
    })
   
  },

  modified: function () {
    let that = this
    that.data.sparepartdetail.name = that.data.list[0].placeholder;
    that.data.sparepartdetail.no = that.data.list[1].placeholder;
    that.data.sparepartdetail.number = parseInt(that.data.list[2].placeholder)
    that.data.sparepartdetail.category = that.data.list[3].selected;
    that.data.sparepartdetail.manufacturer = that.data.list[4].selected;
    that.data.sparepartdetail.vendor = that.data.list[5].selected;
    that.data.sparepartdetail.place_number = that.data.list[6].placeholder;
    that.data.sparepartdetail.eg = this.data.list[7].placeholder;
    wx.request({
      url: userUrl + 'modifysparepart',
      data: {
        'sparepartdetail': JSON.stringify(that.data.sparepartdetail),
      },
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: res.data.data,
          icon: 'success',
          duration: 2000
        });

      }
    })
  }



})