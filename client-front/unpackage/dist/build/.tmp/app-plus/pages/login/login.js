(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"0463":function(e,t,n){},"0ae1":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(n("0f13"));function o(e){return e&&e.__esModule?e:{default:e}}var a={onShow:function(){},data:function(){var t="undefined"!==typeof e;return{username:"",userpwd:"",pwdType:"password",imgInfo:{head:t?"/static/login-reg/head.png":n("4c77"),icon_user:t?"/static/login-reg/icon_user.png":n("2590"),icon_del:t?"/static/login-reg/icon_del.png":n("1226"),icon_pwd:t?"/static/login-reg/icon_pwd.png":n("8dfe"),icon_pwd_switch:t?"/static/login-reg/icon_pwd_switch.png":n("3fa3"),qq:t?"/static/login-reg/qq.png":n("8ebf"),wechat:t?"/static/login-reg/wechat.png":n("6529"),weibo:t?"/static/login-reg/weibo.png":n("6156")}}},onBackPress:function(){return e.showToast({title:"登陆后才能使用哦~",icon:"none",success:function(){}}),!0},methods:{inputUsername:function(e){this.username=e.target.value},inputPwd:function(e){this.userpwd=e.target.value},delUser:function(){this.username=""},switchPwd:function(){this.pwdType="text"===this.pwdType?"password":"text"},loginByCustom:function(){e.showToast({title:"游客浏览...",icon:"loading"}),e.setStorageSync("account","custom"),e.setStorageSync("isLogin",!1),e.switchTab({url:"/pages/tabbar/index/index",complete:function(t){e.hideToast()}})},login:function(){var t=this;if(""!==this.username)if(""!==this.userpwd){this.RWajax.post("/user/login",{account:this.username,password:this.userpwd}).then(function(n){1==n.data.success?(e.showToast({title:"登陆成功",icon:"success"}),e.clearStorageSync(),e.setStorageSync("token",n.data.result),e.setStorageSync("account",t.username),e.setStorageSync("isLogin",!0),i.default.getUserInfo(),i.default.getBalance(),e.switchTab({url:"/pages/tabbar/index/index",complete:function(t){e.hideToast()}})):e.showToast({title:n.data.message,icon:"none"})})}else e.showToast({icon:"none",title:"密码不能为空"});else e.showToast({icon:"none",title:"请输入用户名"})},findPwd:function(){e.navigateTo({url:"/pages/find-pwd/find-pwd"})},goReg:function(){e.navigateTo({url:"/pages/reg-pwd/reg-pwd"})},thirdLogin:function(e){}}};t.default=a}).call(this,n("6e42")["default"])},"1ead":function(e,t,n){"use strict";(function(e){n("85c2"),n("921b");i(n("66fd"));var t=i(n("cff1"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},"59e6":function(e,t,n){"use strict";var i=n("c52f"),o=n.n(i);o.a},"8e01":function(e,t,n){"use strict";var i=n("0463"),o=n.n(i);o.a},a81e:function(e,t,n){"use strict";n.r(t);var i=n("0ae1"),o=n.n(i);for(var a in i)"default"!==a&&function(e){n.d(t,e,function(){return i[e]})}(a);t["default"]=o.a},c52f:function(e,t,n){},cff1:function(e,t,n){"use strict";n.r(t);var i=n("ef9a"),o=n("a81e");for(var a in o)"default"!==a&&function(e){n.d(t,e,function(){return o[e]})}(a);n("59e6"),n("8e01");var s=n("2877"),c=Object(s["a"])(o["default"],i["a"],i["b"],!1,null,"701e8927",null);t["default"]=c.exports},ef9a:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement;e._self._c},o=[];n.d(t,"a",function(){return i}),n.d(t,"b",function(){return o})}},[["1ead","common/runtime","common/vendor"]]]);