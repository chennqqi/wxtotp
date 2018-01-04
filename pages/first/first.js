const app = getApp()

Page({
  onLoad() {
    wx.checkIsSoterEnrolledInDevice({
      checkAuthMode: 'fingerPrint',
      success(res) {
        wx.startSoterAuthentication({
          requestAuthModes: ["fingerPrint"],
          challenge: "123",
          success: res => {
            wx.redirectTo({
              url: '../index/index'
            })
          }
        })
      },
      fail() {
        wx.redirectTo({
          url: '../index/index'
        })
      }
    })

  }
})