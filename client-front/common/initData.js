const $host = "http://47.93.22.56:8082"


//更新余额
function getBalance() {
	var balance= -1
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
			// console.log(res);
			if (res.data.success&&res.data.success == true) {
				uni.setStorageSync('balance', res.data.result)
				balance=res.data.result
			}else{//可能是未登录
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
	// console.log("getUserInfo");
	var _this = this
	var token = uni.getStorageSync('token')
	var account = uni.getStorageSync('account')
	// console.log(token);	console.log(account);
	if (!account||account=='custom') {
		return 'false'
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
				uni.setStorageSync('userInfo',data)
			},
			complete(res) {
			}
		})
	}
	
}

function checkLogin() {
	var account=uni.getStorageSync('account')
	if (!account|| account == 'custom') {
		// uni.showToast({
		// 	title:'尚未登录',
		// 	icon:'none'
		// })
		return false
	}
}




const initData = {
	getBalance: getBalance,
	getUserInfo: getUserInfo,
	checkLogin:checkLogin
}
module.exports = initData
