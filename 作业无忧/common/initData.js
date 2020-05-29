/*
 * @Author: your name
 * @Date: 2019-12-04 19:58:31
 * @LastEditTime: 2020-05-24 16:46:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \homeworkUnless\作业无忧\common\initData.js
 */
const $host = "http://58.87.100.5:80"


//更新余额
function getBalance() {
	var balance = -1
	uni.request({
		url: $host + '/user/query/coin',
		header: {
			"Authorization": uni.getStorageSync('token')
		},
		method: 'GET',
		data: {
			account: uni.getStorageSync('account')
		},
		success: res => {
			if (res.data.success && res.data.success == true) {
				uni.setStorageSync('balance', res.data.result)
				balance = res.data.result
			} else { //可能是未登录
				// uni.clearStorageSync();
				// uni.setStorageSync('account','custom')
			}
		},
		fail: () => {},
		complete: (res) => {
			return balance
		}
	});
}

//更新用户信息存到storage
function getUserInfo() {
	var _this = this

	return new Promise((resolve, reject) => {
		var token = uni.getStorageSync('token')
		var account = uni.getStorageSync('account')
		if (!account || account == 'custom') {
			reject('false')
		} else {
			uni.request({
				url: $host + "/user/query/info",
				method: "get",
				data: {
					'account': account
				},
				header: {
					'Authorization': token
				},
				success(res) {
					// console.log(res);
					var data = res.data.result
					uni.setStorageSync('userInfo', data)
					resolve(data)
				},
				complete(res) {}
			})
		}
	})


}

function checkLogin() {
	var account = uni.getStorageSync('account')
	if (!account) {
		return false
	} else {
		return true
	}
}


/**
 * 检查是否已经打开过app
 * 用于显示隐私政策文件
 */
function checkOpened() {
	var opened = uni.getStorageSync('opened')
	return opened ? true : false
}



const initData = {
	getBalance: getBalance,
	getUserInfo: getUserInfo,
	checkLogin: checkLogin,
	checkOpened: checkOpened
}
module.exports = initData