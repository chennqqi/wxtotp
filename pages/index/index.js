//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tokens: [],
    secretList: [],
    timeSec: "",
  },

  //扫描二维码
  scanQrcode () {
    wx.scanCode({
      success: res => {
        if (res.scanType == "QR_CODE"){
          console.log(res)
          this.saveTotpLink(unescape(decodeURI(res.result)))
        }
      }
    })
  },
  //存数据
  saveTotpLink (link) {
    link = unescape(link)
    let paramObj = app.uri.getAccount(link)
    if (paramObj != null){
      let secretdata = {
        secret: paramObj.secret,
        account: paramObj.account,
        issuer: paramObj.issuer
      }
      this.setData({ secretList: this.data.secretList.concat(secretdata) })

      app.wechat.setStorage("secretdata", this.data.secretList).then(
        res => {
          console.log(res)
        }
      )
    }
  },

  //清除数据
  clearStorage () {
    wx.clearStorage()
    console.log("清除成功")
  },
  testStorage () {
    app.wechat.getStorage("secretdata").then(
      res => {
        console.log(res)
      },
      fail => {
        console.log(fail)
      }
    )
  },
  updateToken () {    
    let tokens = []
    let digits = []
    tokens = this.data.secretList
    console.log(tokens)
    for (let i = 0; i < tokens.length; i++) {
      let secret = app.totp.now(tokens[i].secret)
      let digit_obj = {
        secret: secret,
        account: tokens[i].account
      }
      digits.push(digit_obj)
    }
    this.setData({
      tokens: digits
    })
  },
  //onload
  onLoad: function () {
    app.wechat.getStorage("secretdata").then(
      r => {
        this.setData({ secretList: this.data.secretList.concat(r.data) })
        this.updateToken()
      }
    )
  },

  onShow: function (options) {
    let self = this
    // 每秒更新百分比
    setInterval(function () {
      let i = app.util.getSeconds() % 30 + 1
      let timesec = 30 - i
      self.setData({
        timeSec: timesec,
      })
      if (1 == i) {
        self.updateToken(self)
      }
    }, 1000)

    self.updateToken(self)
  },
})