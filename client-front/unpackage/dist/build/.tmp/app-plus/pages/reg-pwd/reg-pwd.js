(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/reg-pwd/reg-pwd"],{"08ba":function(e,t,n){},"627c":function(e,t,n){"use strict";(function(e){n("af20"),n("921b");o(n("66fd"));var t=o(n("62fb"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},"62fb":function(e,t,n){"use strict";n.r(t);var o=n("e2c0"),c=n("7a15");for(var a in c)"default"!==a&&function(e){n.d(t,e,function(){return c[e]})}(a);n("ae08"),n("a096");var s=n("2877"),i=Object(s["a"])(c["default"],o["a"],o["b"],!1,null,"0f3c7d2e",null);t["default"]=i.exports},7446:function(e,t,n){},"7a15":function(e,t,n){"use strict";n.r(t);var o=n("86ca"),c=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,function(){return o[e]})}(a);t["default"]=c.a},"86ca":function(e,t,n){"use strict";(function(e,o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=n("f567"),a={data:function(){return{isAgreeItem:!1,index_subject:0,code:"",codeText:"获取验证码",index:0,picker:["学生","老师"],codeDis:!1,password:"",modalName:null,phone:"",checkbox:[{value:0,name:"语文",checked:!1,hot:!1},{value:1,name:"数学",checked:!0,hot:!1},{value:2,name:"英语",checked:!0,hot:!0},{value:3,name:"物理",checked:!1,hot:!0},{value:4,name:"化学",checked:!1,hot:!1},{value:5,name:"生物",checked:!1,hot:!1},{value:6,name:"政治",checked:!1,hot:!1},{value:7,name:"历史",checked:!1,hot:!1},{value:8,name:"地理",checked:!1,hot:!1}]}},methods:{handleAgree:function(){this.isAgreeItem=!this.isAgreeItem},phoneChange:function(e){this.phone=e.detail.value},ChooseCheckbox:function(e){for(var t=this.checkbox,n=e.currentTarget.dataset.value,o=0,c=t.length;o<c;++o)if(t[o].value==n){t[o].checked=!t[o].checked;break}},hideModal:function(e){this.modalName=null},showModal:function(e){this.modalName=e.currentTarget.dataset.target},codeChange:function(e){this.code=e.detail.value},PickerChange:function(e){this.index=e.detail.value},passwordChange:function(e){this.password=e.detail.value},PickerChangeSubject:function(e){this.index_subject=e.detail.value},formSubmit:function(t){var n=this;if(!this.isAgreeItem)return e.showToast({title:"请同意协议后再进行相关操作",icon:"none"}),!1;var a=[{name:"account",checkType:"phoneno",checkRule:"",errorMsg:"请输入正确的手机号"},{name:"password",checkType:"string",checkRule:"8,16",errorMsg:"密码由8-16位，数字、字母或数字字母组合"},{name:"password_again",checkType:"same",checkRule:this.password,errorMsg:"两次输入的密码不同"}],s=t.detail.value,i=c.check(s,a);if(i){e.showToast({title:"test",icon:"loading"});for(var u=[],r=0;r<this.checkbox.length;r++)1==this.checkbox[r].checked&&u.push(this.checkbox[r].value);var h={account:this.phone,password:this.password,role:this.index,code:this.code,goodAt:u.join("-")};e.request({url:n.$host+"/user/msg/check",method:"POST",data:h,success:function(t){console.log(o(t," at pages\\reg-pwd\\reg-pwd.vue:258")),e.showToast({title:"注册成功",icon:"success"}),e.navigateTo({url:"../login/login"})},fail:function(t){e.showToast({title:"注册失败,请重试",icon:"none"})}})}else e.showToast({title:c.error,icon:"none"})},getPhoneCode:function(){var t=this;if(!this.codeDis)if(11==this.phone.length){var n=60,c=this;this.codeDis=!0,this.codeText="请"+n+"秒后重试";var a=setInterval(function(){if(0===n)return clearInterval(a),c.codeDis=!1,void(c.codeText="获取验证码");c.codeDis=!0,c.codeText="请"+n+"秒后重试",n--},1e3);e.request({url:c.$host+"/user/msg/get",method:"POST",data:{account:this.phone},success:function(e){console.log(o(e.data," at pages\\reg-pwd\\reg-pwd.vue:315")),t.text="request success"},fail:function(t){e.showToast({title:t,icon:"none"})}})}else e.showToast({title:"请输入正确的电话号码!",icon:"none"})},formReset:function(e){console.log(o("清空数据"," at pages\\reg-pwd\\reg-pwd.vue:327")),this.chosen=""}}};t.default=a}).call(this,n("6e42")["default"],n("0de9")["default"])},a096:function(e,t,n){"use strict";var o=n("7446"),c=n.n(o);c.a},ae08:function(e,t,n){"use strict";var o=n("08ba"),c=n.n(o);c.a},e2c0:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c},c=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return c})}},[["627c","common/runtime","common/vendor"]]]);