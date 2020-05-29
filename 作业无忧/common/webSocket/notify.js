/*
 * @Author: your name
 * @Date: 2020-05-21 21:33:31
 * @LastEditTime: 2020-05-21 21:43:15
 * @LastEditors: Please set LastEditors
 * @Description: 创建webSocket连接，弹出通知
 * @FilePath: \homeworkUnless\作业无忧\common\webSocket\notify.js
 */


function connect() {
  var socketOpen = false;
  var socketMsgQueue = [];

  uni.connectSocket({
    url: 'wss://www.example.com/socket'
  });

  uni.onSocketOpen(function (res) {
    socketOpen = true;
    for (var i = 0; i < socketMsgQueue.length; i++) {
      sendSocketMessage(socketMsgQueue[i]);
    }
    socketMsgQueue = [];
  });

  uni.onSocketError(function (res) {
    console.log('WebSocket连接打开失败，请检查！');
  });
}

function sendSocketMessage(msg) {
  if (socketOpen) {
    uni.sendSocketMessage({
      data: msg
    });
  } else {
    socketMsgQueue.push(msg);
  }
}
