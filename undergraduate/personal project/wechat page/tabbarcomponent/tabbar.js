// tabBarComponent/tabBar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      value: {
        "backgroundColor": "#ffffff",
        "color": "#979795",
        "selectedColor": "#1c1c1b",
        "list": [
          {
            "pagePath": "pages/index/index",
            "iconPath": "icon/icon_home.png",
            "selectedIconPath": "icon/icon_home_HL.png",
            "text": "首页"
          },
          {
            "pagePath": "pages/equipment/equipment",
            "iconPath": "/icon/shebeiguanli2.png",
            "selectedIconPath": "/icon/shebeiguanli1.png",
            "text": "设备"
          },
          {
            "pagePath": "pages/middle/middle",
            "iconPath": "/icon/erweima.png",
            "isSpecial": true,
            "text": "扫码"
          },
          {
            "pagePath": "pages/spareparts/spareparts",
            "iconPath": "/icon/beijianguanli1.png",
            "selectedIconPath": "/icon/beijianguanli2.png",
            "text": "备件"
          },
          {
            "pagePath": "pages/mine/mine",
            "iconPath": "/icon/wode2.png",
            "selectedIconPath": "/icon/wode1.png",
            "text": "我的"
          }
        ]
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIphoneX: app.globalData.systemInfo.model.search('iPhone X') != -1 ? true : false
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
