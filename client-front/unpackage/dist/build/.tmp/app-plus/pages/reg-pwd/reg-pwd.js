(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/reg-pwd/reg-pwd"],{"0dcd":function(e,t,n){"use strict";n.r(t);var o=n("7339"),c=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,function(){return o[e]})}(a);t["default"]=c.a},2677:function(e,t,n){},"39d1":function(e,t,n){"use strict";var o=n("f08f"),c=n.n(o);c.a},"3b2a":function(e,t,n){"use strict";var o=n("2677"),c=n.n(o);c.a},"42ad":function(e,t,n){"use strict";n.r(t);var o=n("8e3b"),c=n("0dcd");for(var a in c)"default"!==a&&function(e){n.d(t,e,function(){return c[e]})}(a);n("3b2a"),n("39d1");var i=n("2877"),s=Object(i["a"])(c["default"],o["a"],o["b"],!1,null,"2112745a",null);t["default"]=s.exports},"5f18":function(e,t,n){"use strict";(function(e){n("85c2"),n("921b");o(n("66fd"));var t=o(n("42ad"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},7339:function(e,t,n){"use strict";(function(e,o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=n("8191"),a={data:function(){return{isAgreeItem:!1,index_subject:0,code:"",codeText:"获取验证码",index:0,picker:["学生","老师"],codeDis:!1,password:"",modalName:null,phone:"",checkbox:[{value:0,name:"语文",checked:!1,hot:!1},{value:1,name:"数学",checked:!1,hot:!1},{value:2,name:"英语",checked:!1,hot:!1},{value:3,name:"物理",checked:!1,hot:!1},{value:4,name:"化学",checked:!1,hot:!1},{value:5,name:"生物",checked:!1,hot:!1},{value:6,name:"政治",checked:!1,hot:!1},{value:7,name:"历史",checked:!1,hot:!1},{value:8,name:"地理",checked:!1,hot:!1}]}},methods:{handleAgree:function(){this.isAgreeItem=!this.isAgreeItem},phoneChange:function(e){this.phone=e.detail.value},ChooseCheckbox:function(e){for(var t=this.checkbox,n=e.currentTarget.dataset.value,o=0,c=t.length;o<c;++o)if(t[o].value==n){t[o].checked=!t[o].checked;break}},hideModal:function(e){this.modalName=null},showModal:function(e){this.modalName=e.currentTarget.dataset.target},codeChange:function(e){this.code=e.detail.value},PickerChange:function(e){this.index=e.detail.value},passwordChange:function(e){this.password=e.detail.value},PickerChangeSubject:function(e){this.index_subject=e.detail.value},formSubmit:function(t){if(!this.isAgreeItem)return e.showToast({title:"请同意协议后再进行相关操作",icon:"none"}),!1;var n=[{name:"account",checkType:"phoneno",checkRule:"",errorMsg:"请输入正确的手机号"},{name:"password",checkType:"string",checkRule:"8,16",errorMsg:"密码由8-16位，数字、字母或数字字母组合"},{name:"password_again",checkType:"same",checkRule:this.password,errorMsg:"两次输入的密码不同"}],o=t.detail.value,a=c.check(o,n);if(a){e.showToast({title:"test",icon:"loading"});for(var i=[],s=0;s<this.checkbox.length;s++)1==this.checkbox[s].checked&&i.push(this.checkbox[s].value);var u={account:this.phone,password:this.password,role:this.index,code:this.code,goodAt:i.join("-")};this.RWajax.post("/user/code/check",u).then(function(t){e.showToast({title:"注册成功",icon:"success"}),e.navigateTo({url:"../login/login"})}).catch(function(t){e.showToast({title:"注册失败,请重试",icon:"none"})})}else e.showToast({title:c.error,icon:"none"})},getPhoneCode:function(){var t=this;if(!this.codeDis)if(11==this.phone.length){var n=60,c=this;this.codeDis=!0,this.codeText="请"+n+"秒后重试";var a=setInterval(function(){if(0===n)return clearInterval(a),c.codeDis=!1,void(c.codeText="获取验证码");c.codeDis=!0,c.codeText="请"+n+"秒后重试",n--},1e3);this.RWajax.post("/user/code/get",{account:this.phone}).then(function(e){t.text="request success"}).catch(function(t){e.showToast({title:t,icon:"none"})}).finally(function(e){console.log(o(e," at pages\\reg-pwd\\reg-pwd.vue:309"))})}else e.showToast({title:"请输入正确的电话号码!",icon:"none"})},formReset:function(e){this.chosen=""}}};t.default=a}).call(this,n("6e42")["default"],n("0de9")["default"])},"8e3b":function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c},c=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return c})},f08f:function(e,t,n){}},[["5f18","common/runtime","common/vendor"]]]);