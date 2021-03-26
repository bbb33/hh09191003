// pages/add/addequipment/addequipment.js
const app = getApp();
const userUrl = require('../../../config.js').userUrl;
const imgUrl = require('../../../config.js').imgUrl;
var uploadUrl = "http://127.0.0.1/thinkphp_3.2.3_full/Uploads/Picture/"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        id : 0,
        name : "设备姓名",
        pop: false,
        placeholder:""
      },
      {
        id : 1,
        name: "设备编号",
        pop: false,
        placeholder: ""
      },
      {
        id: 2,
        name: "规格型号",
        pop: false,
        placeholder: ""
      },
      {
        id: 3,
        name: "操作人员",
        pop: false,
        placeholder: ""
      },
      {
        id: 4,
        name: "设备类型",
        pop: true,
        showimg: true,
        options:[
          {
            name:"办公",
            changeColor:false
          },
          {
            name:"计算机",
            changeColor: false
          },
          {
            name: "硬件",
            changeColor: false
          }
        ],
        selected:""
      },
      {
        id: 5,
        name: "使用部门",
        pop: true,
        showimg: true,
        options: [
          {
            name: "设计部",
            changeColor: false
          },
          {
            name: "办公室",
            changeColor: false
          },
          {
            name: "研发部",
            changeColor: false
          }
        ],
        selected: ""
      },
      {
        id: 6,
        name:"使用状况",
        pop: true,
        showimg: true,
        options: [
          {
            name: "合格",
            changeColor: false
          },
          {
            name: "良好",
            changeColor: false
          },
          {
            name: "优秀",
            changeColor: false
          }
        ],
        selected: ""
      },
      {
        id: 7,
        name: "生成厂商",
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
        selected:""
      },
      {
        id: 8,
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
        id: 9,
        name: "摆放位置",
        pop: false,
        placeholder: ""
      },
      {
        id: 10,
        name: "开始使用时间",
        pop: false,
        placeholder: ""
      },
      {
        id: 11,
        name: "备件",
        pop: false,
        placeholder: "无"
      },
      {
        id: 12,
        name: "备注",
        pop: false,
        placeholder: "无"
      },
    ],
    equipmentImg:'',
    showModal: false,
    currentid : 0,
    isModify:false,
    equipmentdetail:{},
    submit:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (!this.isNull(options)){
    let that = this
    var list = that.data.list
    let option = JSON.parse(options.equipmentdetail)
    console.log(option)
    console.log(that.data.list)
    list[0].placeholder = option.name;
    list[1].placeholder = option.no;
    list[2].placeholder = option.model;
    list[3].placeholder = option.worker;
    list[4].selected = option.category;
    list[5].selected = option.department;
    list[6].selected = option.conditions;
    list[7].selected = option.manufacturer;
    list[8].selected = option.vendor;
    list[9].placeholder = option.place;
    list[10].placeholder = option.usage_date;
    list[11].placeholder = option.eg;
    that.setData({
      list:list,
      equipmentImg: option.image,
      equipmentdetail:option,
      isModify:true
    })
    wx.setStorageSync('list', that.data.list)
    }
  },

   isNull:function(obj) {
    if(Object.prototype.toString.call(obj) !== '[object Object]') {
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
    var id  = e.currentTarget.id;
    console.log(id);
    this.setData({ 
      showModal: true ,
      currentid :id
    }) 
    }, /** * 弹出框蒙层截断touchmove事件 */
  
  preventTouchMove: function () { }, /** * 隐藏模态对话框 */

  hideModal:function () { 
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
          list:newlist
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
          }else{
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

  change:function(e){
    for(var i = 0; i < this.data.list.length; i++){
      if (this.data.list[i].id == e.currentTarget.dataset.id){
        this.data.list[i].placeholder = e.detail.value
      }
    }
    var newlist = this.data.list;
    this.setData({
      list: newlist
    })
    wx.setStorageSync('list', newlist)
  },

  chooseImageTap:function(){
    let that = this
    wx.showActionSheet({
      itemList: ['从相册中选择','拍照'],
      itemColor:"#f7982a",
      success:function(res){
        if(!res.cancel){
          if(res.tapIndex == 0){
            that.chooseWxImage('album')
          }else if(res.tapIndex == 1){
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },

  chooseWxImage:function(type){
    let that = this
    wx.chooseImage({
      sizeType:['original','compressed'],
      sourceType:[type],
      success: function(res) {
        console.log(res.tempFilePaths[0]);
        that.setData({
          equipmentImg:res.tempFilePaths[0],
        })
      },
    })
  },

  addequipment:function(){
    var filePath = this.data.equipmentImg
    console.log(filePath)
    wx.uploadFile({
      url: imgUrl + 'addequipmentImage',//接口地址//接口连接          
      filePath: filePath,          
      name: 'file',          
      formData: {
        'user': 'test'
      },          
      success: function (res) {            
        console.log(res.data)  
        var s = res.data
        s = s.slice(1, s.length - 1);//保留中间的内容，去除收尾字符
        wx.setStorageSync('equipmentImg', uploadUrl+s)
        console.log(wx.getStorageSync('equipmentImg'))
      }        
    })
    var list = this.data.list;
    console.log(list[0].placeholder)
    var equipmentinfo = {
      'no': '',
      'openid': '', 
      'name':'', 
      'model': '',
      'place': '',
      'worker': '',
      'category': '',
      'department': '',
      'conditions': '',
      'manufacturer': '',
      'vendor': '',
      'usage_date': '',
      'sparepart_no':'',
      'eg': ''
    }
    equipmentinfo.openid= wx.getStorageSync('openid');
    equipmentinfo.name=this.data.list[0].placeholder;
    equipmentinfo.no=this.data.list[1].placeholder;
    equipmentinfo.model= this.data.list[2].placeholder;

    equipmentinfo.worker = this.data.list[3].placeholder;
    equipmentinfo.category = this.data.list[4].selected;
    equipmentinfo.department= this.data.list[5].selected;
    equipmentinfo.conditions=this.data.list[6].selected;
    equipmentinfo.manufacturer=this.data.list[7].selected;
    equipmentinfo.vendor= this.data.list[8].selected;
    equipmentinfo.place = this.data.list[9].placeholder;
    equipmentinfo.usage_date= this.data.list[10].placeholder;
    equipmentinfo.sparepart_no = this.data.list[11].placeholder;
    equipmentinfo.eg=this.data.list[12].placeholder;
    
    wx.setStorageSync('equipmentinfo', equipmentinfo)
    console.log(equipmentinfo)
    var equipmentImg = wx.getStorageSync('equipmentImg')
    wx.request({
      url: userUrl+'addequipment',
      data:{
        'equipmentinfo': JSON.stringify(equipmentinfo),
        'image': equipmentImg
      },
      success: function (res2) {
        console.log(res2)
        if(res2.data.add){
          wx.showToast({
            title: res2.data.data,
            icon: 'success',
            duration: 2000
          }); 
          // let list1 = wx.getStorageSync(list);
          // for(var i = 0; i < list1.length ; i++){
          //   if(list[i].pop){
          //     list[i].selected = ''
          //   }else{
          //     list[i].placeholder = ''
          //   }
          // }
          // let that = this
          // that.setData({
          //   list:list
          // })
        }else{
          wx.showToast({
            title: res2.data.data,
            icon: 'none',
            duration: 2000
          });
        }
      }
    })
  },

  modified:function(){
    let that = this

    that.data.equipmentdetail.name = that.data.list[0].placeholder;
    that.data.equipmentdetail.no = that.data.list[1].placeholder;
    that.data.equipmentdetail.model = that.data.list[2].placeholder;

    that.data.equipmentdetail.worker = that.data.list[3].placeholder;
    that.data.equipmentdetail.category = that.data.list[4].selected;
    that.data.equipmentdetail.department = that.data.list[5].selected;
    that.data.equipmentdetail.conditions = that.data.list[6].selected;
    that.data.equipmentdetail.manufacturer = that.data.list[7].selected;
    that.data.equipmentdetail.vendor = that.data.list[8].selected;
    that.data.equipmentdetail.place = that.data.list[9].placeholder;
    that.data.equipmentdetail.usage_date = that.data.list[10].placeholder;
    that.data.equipmentdetail.sparepart_no = that.data.list[11].placeholder;
    that.data.equipmentdetail.eg = that.data.list[12].placeholder;
    wx.request({
      url: userUrl + 'modify',
      data: {
        'equipmentdetail': JSON.stringify(that.data.equipmentdetail),
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