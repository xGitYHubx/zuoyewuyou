(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/square-detail/RWcomment"],{"192d":function(t,e,n){"use strict";n.r(e);var i=n("337e"),a=n("6f0f");for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);n("60f2");var s=n("2877"),c=Object(s["a"])(a["default"],i["a"],i["b"],!1,null,null,null);e["default"]=c.exports},"337e":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},"4d59":function(t,e,n){},"60f2":function(t,e,n){"use strict";var i=n("4d59"),a=n.n(i);a.a},"6f0f":function(t,e,n){"use strict";n.r(e);var i=n("9f7a"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e["default"]=a.a},"9f7a":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{index:-1,imgList:[],modalName:null,textareaAValue:"",task:{},commentId:"",isCommented:0}},onLoad:function(t){this.task=JSON.parse(decodeURIComponent(t.task))},onShow:function(){this.checkLogin()},onBackPress:function(e){var n=this;return 0==this.isCommented?t.showModal({title:"提示",content:"评论尚未发布，确定退出吗？",success:function(e){e.confirm&&t.redirectTo({url:"./RWDetailById?taskId=".concat(n.task.taskId)})}}):t.redirectTo({url:"./RWDetailById?taskId=".concat(n.task.taskId)}),!0},methods:{ChooseImage:function(){var e=this;t.chooseImage({count:4-this.imgList,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(t){0!=e.imgList.length?e.imgList=e.imgList.concat(t.tempFilePaths):e.imgList=t.tempFilePaths}})},checkLogin:function(){var e=t.getStorageSync("account");e&&"custom"==e&&t.showModal({title:"未登录",content:"发布评论需要登陆，点击确定前往登陆或注册",success:function(e){e.confirm?t.navigateTo({url:"../login/login"}):e.cancel&&t.navigateBack({delta:1})}})},sendCommen:function(){var e=this;t.showLoading({title:"评论中...",mask:!0}),this.RWajax.post("/comment/publish",{account:t.getStorageSync("account"),taskId:e.task.taskId,commentText:e.textareaAValue}).then(function(n){1==n.data.success?(e.commentId=n.data.result,e.imgList.length>0?e.uploadImg():(t.hideLoading(),t.showToast({title:"评论发表成功",icon:"success",duration:500}),e.isCommented=1,setTimeout(function(){t.navigateBack({delta:1})},1e3))):(t.hideLoading(),t.showToast({title:"发送失败",icon:"none"}))}).catch(function(e){t.hideLoading(),t.showToast({title:"发送失败",icon:"none"})})},uploadImg:function(){var e=this,n=this.imgList;t.showLoading({title:"评论发表中..."});for(var i=0,a=function(a){t.getImageInfo({src:e.imgList[a],success:function(o){s=o.type,t.uploadFile({url:e.$host+"/file/upload",filePath:n[a],name:"file",formData:{fileName:"comment/"+e.commentId+"/"+a,fileType:s},success:function(n){var o=JSON.parse(n.data);if(1==o.success){var s=o.result;t.request({url:e.$host+"/picture/upload",method:"post",data:JSON.stringify([{linkerId:e.commentId,position:a,url:s}]),success:function(n){i++,i==e.imgList.length&&(t.hideLoading(),t.showToast({title:"评论发表成功",icon:"success",duration:500}),e.isCommented=1,setTimeout(function(){t.navigateBack({delta:1})},1e3))},fail:function(t){i++}})}},fail:function(e){t.showModal({content:e.errMsg,showCancel:!1})}})}})},o=0;o<this.imgList.length;o++){var s;a(o)}},ViewImage:function(e){t.previewImage({urls:this.imgList,current:e.currentTarget.dataset.url})},DelImg:function(e){var n=this;t.showModal({title:"召唤师",content:"确定要删除这段回忆吗？",cancelText:"再看看",confirmText:"再见",success:function(t){t.confirm&&n.imgList.splice(e.currentTarget.dataset.index,1)}})},textareaAInput:function(t){this.textareaAValue=t.detail.value}}};e.default=n}).call(this,n("6e42")["default"])},c07b:function(t,e,n){"use strict";(function(t){n("85c2"),n("921b");i(n("66fd"));var e=i(n("192d"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])}},[["c07b","common/runtime","common/vendor"]]]);