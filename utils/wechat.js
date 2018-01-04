function setStorage(key, value){
  return new Promise((resolve, reject) => {
    wx.setStorage({ key: key, data: value, success:resolve, fail: reject })
  })
}
function getStorage(key) {
  return new Promise((resolve, reject) => {
    wx.getStorage({ key: key, success: resolve, fail: reject })
  })
}

module.exports = {
  setStorage,
  getStorage
}