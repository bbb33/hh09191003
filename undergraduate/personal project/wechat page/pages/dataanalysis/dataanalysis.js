// pages/dataanalysis/dataanalysis.js
import uCharts from '../ucharts/u-charts.js';
const app = getApp();
const chartUrl = require('../../config.js').chartUrl;
var _self;
var canvaLineA = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    showType: 0,
    cWidth: '',
    cHeight: '',
    
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let that = this
    try {
      var id = options.id;
      this.setData({
        showType: id
      });
    } catch (e) { }

    _self = this;
    this.cWidth = wx.getSystemInfoSync().windowWidth - 30;
    this.cHeight = 500 / 750 * wx.getSystemInfoSync().windowWidth;
    // if(options.id == 0){
    this.getServerData1(options.id);
    // } else if (options.id == 1){
    //   this.getServerData2();
    // }else{
    //   this.getServerData3();
    // }

  },

  getServerData1: function (id) {
    var chart = '';
    if(id == 0){
      chart = 'equipment'
    }else if(id == 1){
      chart = 'repair'
    }else{
      chart = 'maintainance'
    }
    wx.request({
      url: chartUrl +'analysis_chartnum',
      data: {
        'openid' : wx.getStorageSync('openid'),
        'chart':chart
      },
      success: function (res) {
        console.log(res)
        let LineA = { categories: [], series: [] };
        //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
        LineA.categories = res.data.categories;
        LineA.series = res.data.series;
        var max = _self.max(parseInt(res.data.max))
        console.log(max)
        _self.showLineA(LineA,max);
      },
      fail: () => {
        console.log("请点击右上角【详情】，启用不校验合法域名");
      },
    });
  },

  showLineA(chartData,max) {
    canvaLineA = new uCharts({
      $this: _self,
      canvasId: "canvasLineA",
      type: 'line',
      fontSize: 11,
      legend: true,
      dataLabel: true,
      dataPointShape: true,
      background: '#FFFFFF',
      pixelRatio: 1,
      categories: chartData.categories,
      series: chartData.series,
      animation: true,
      enableScroll: true,//开启图表拖拽功能
      xAxis: {
        disableGrid: false,
        type: 'grid',
        gridType: 'dash',
        itemCount: 4,
        scrollShow: true,
        scrollAlign: 'left',
        scrollBackgroundColor:'#F7F7FF',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条背景颜色,默认为 #EFEBEF
        scrollColor:'#DEE7F7',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条颜色,默认为 #A6A6A6
      },
      yAxis: {
        //disabled:true
        gridType: 'line',
        splitNumber: 10,
        min: 0,
        max: max,
        format: (val) => { return val.toFixed(0) + '个' }//如不写此方法，Y轴刻度默认保留两位小数
      },
      width: _self.cWidth,
      height: _self.cHeight,
      extra: {
        line: {
          type: 'straight'
        }
      },
    });

  },
  touchLineA(e) {
    canvaLineA.scrollStart(e);
  },
  moveLineA(e) {
    canvaLineA.scroll(e);
  },
  touchEndLineA(e) {
    canvaLineA.scrollEnd(e);
    //下面是toolTip事件，如果滚动后不需要显示，可不填写
    // canvaLineA.showToolTip(e, {
    //   format: function (item, category) {
    //     return category + ' ' + item.name + ':' + item.data
    //   }
    // });
  },

  switchTab: function (event) {
    let showType = event.currentTarget.dataset.index;
    this.setData({
      showType: showType,
    });
    // if (event.currentTarget.dataset.index == 0) {
      this.getServerData1(event.currentTarget.dataset.index);
    // } else if (event.currentTarget.dataset.index == 1) {
    //   this.getServerData2();
    // } else {
    //   this.getServerData3();
    // }
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

  max:function(max){
    // var max = 19.00;
    var ge = max - ((Math.floor(max / 10)) * 10);
    var shi = (max - ((Math.floor(max / 100)) * 100) - ge) / 10;
    var bai = (max - ((Math.floor(max / 1000)) * 1000) - (shi * 10) - ge) / 100;
    var qian = (max - ((Math.floor(max / 10000)) * 10000) - (bai * 100) - (shi * 10) - ge) / 1000;
    var wan = (max - ((Math.floor(max / 100000)) * 100000) - (qian * 1000) - (bai * 100) - (shi * 10) - ge) / 10000;
    var shiwan = (max - ((Math.floor(max / 1000000)) * 1000000) - (wan * 10000) - (qian * 1000) - (bai * 100) - (shi * 10) - ge) / 100000;
    var baiwan = (max - ((Math.floor(max / 10000000)) * 10000000) - (shiwan * 100000) - (wan * 10000) - (qian * 1000) - (bai * 100) - (shi * 10) - ge) / 1000000;
    var qianwan = (max - ((Math.floor(max / 100000000)) * 100000000) - (baiwan * 1000000) - (shiwan * 100000) - (wan * 10000) - (qian * 1000) - (bai * 100) - (shi * 10) - ge) / 10000000;

    var maxval;
    if (qianwan != 0) {
      console.log('qianwan',qianwan)
        maxval = parseInt((qianwan + 1) + '0000000');

    }else if (baiwan != 0) {
      console.log('baiwan',baiwan)
        maxval = parseInt((baiwan + 1) + '000000');
    }else if (shiwan != 0) {
      console.log('shiwan',shiwan)
        maxval = parseInt((shiwan + 1) + '00000');
    }else if (wan != 0) {
      console.log('wan',wan)
        maxval = parseInt((wan + 1) + '0000');
    }else if (qian != 0) {
      console.log('qian',qian)
        maxval = parseInt((qian + 1) + '000');
    }else if (bai != 0) {
      console.log('bai',bai)
        maxval = parseInt((bai + 1) + '00');
    }else if (shi != 0) {
      console.log('shi',shi)
      maxval = parseInt((shi + 1) + '0'); 
    }else {
      console.log('ge',ge)
      maxval = 10;
    }
    return maxval;
  }


})