'use strict';
function getAccount (uri) {
  var url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
  if (!uri){return []}
  var result = url.exec(uri)
  let paramObj = this.getParam(result[5])
  paramObj['account'] = result[4]
  console.log(paramObj)
  return paramObj
}
function getParam(url) {
  let arr = url.split("&")
  var paramObj = {}
  for (var i = 0; i < arr.length; i++){
    let a = arr[i].split("=")
    paramObj[a[0]] = a[1]
  }
  return paramObj
}
module.exports = {
  getAccount,
  getParam,
}