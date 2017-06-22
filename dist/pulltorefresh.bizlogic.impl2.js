/**
 * pulltorefresh-h5-iscroll - 一款基于IScroll5的H5下拉刷新实现，包括多种皮肤的实现
 * @version v3.0.0
 * @author 
 */
!function(e,t){!function(){e.dataProcessFn=[],e.dataProcess=function(t,o){o=o||{},"string"==typeof o.dataPath&&(o.dataPath=[o.dataPath]);var n=[].slice.call(arguments),s={code:0,message:"",data:null,status:0,debugInfo:{type:"未知数据格式"}},i=o.isDebug||!1,l=o.dataPath,a=e.dataProcessFn,r=a.length,u=l.length,c=!1;if(!t)return s.message="接口返回数据为空!",s;n.push(s);for(var p=0;!c&&p<u;p++){n[1]=l[p];for(var f=0;!c&&f<r;f++){var g=a[f],d=g.apply(this,n);if(null!=d&&(1==d.code||p==u-1)){c=!0,s=d;break}}}return c||(s.message="没有数据处理函数或者接口数据返回格式不符合要求!",s.debugInfo.data=t),i||(s.debugInfo=void 0),s}}(),function(){function o(e,o,n){if(!(o&&e&&e.ReturnInfo&&e.BusinessInfo))return null;var s={type:"v6数据格式:"+o},i=e.ReturnInfo,l=e.BusinessInfo;e.UserArea;if("1"==i.Code)if("1"==l.Code){var a=t.getNameSpaceObj(e,o);a?(n.code=1,n.data=a):(n.code=0,n.message=n.message||"指定路径下没有找到数据",n.data=null,s.errorType="3")}else s.errorType="2",n.code=0,n.message=l.Description||"接口请求错误,后台业务逻辑处理出错!";else s.errorType="1",n.code=0,n.message=i.Description||"接口请求错误,后台程序处理出错!";return n.debugInfo=s,n}e.dataProcessFn.push(o)}(),function(){function o(e,o,n){if(!(o&&e&&e.status&&e.custom))return null;var s={type:"v7数据格式:"+o},i=e.status;if(n.status=i.code||0,n.message=i.text,"200"==i.code){var l=t.getNameSpaceObj(e,o);l?(n.code=1,n.data=l):(n.code=0,n.message=n.message||"指定路径下没有找到数据",n.data=null,s.errorType="3")}else n.code=0,s.errorType="2",n.message=n.message||"status状态错误";return n.debugInfo=s,n}e.dataProcessFn.push(o)}(),t.namespace("bizlogic.dataProcess",e.dataProcess)}({},PullToRefreshTools),function(e,t){function o(e){if(null==e||"string"!=typeof e)return null;var t,o=document.createElement("div"),n=document.createDocumentFragment();for(o.innerHTML=e;t=o.firstChild;)n.appendChild(t);return n}function n(e){var t=this;e.element=document.getElementById(e.bizlogic.pullrefreshId),e.down&&(e.down.callback=function(){t.pullDownCallback()}),e.up&&(e.up.callback=function(){t.pullUpCallback()}),t.options=e,t.pullRefreshContainer=e.element,t.respnoseEl=document.getElementById(e.bizlogic.listdataId),t.isShouldNoMoreData=!0,t.currPage=t.options.bizlogic.defaultInitPageNum,t.options.up&&t.options.up.auto&&t.currPage--,t.initAllEventListeners(),t.pullToRefreshInstance=s.initPullToRefresh(e)}var s,i=t.bizlogic.dataProcess,l="ontouchstart"in document,a=l?"tap":"click",r={isDebug:!1,down:{height:75,contentdown:"下拉可以刷新",contentover:"释放立即刷新",contentrefresh:"正在刷新",contentrefreshsuccess:"刷新成功",contentrefresherror:"刷新失败",isSuccessTips:!0},up:{auto:!0,offset:100,show:!0,contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"},bizlogic:{defaultInitPageNum:0,getLitemplate:null,getUrl:null,getRequestDataCallback:null,changeResponseDataCallback:null,successRequestCallback:null,errorRequestCallback:null,refreshCallback:null,itemClickCallback:null,targetListItemClickStr:"li",listdataId:"listdata",pullrefreshId:"pullrefresh",delayTime:300,ajaxSetting:{requestType:"POST",requestTimeOut:15e3,accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:"application/json",xml:"application/xml, text/xml",html:"text/html",text:"text/plain"},contentType:"application/x-www-form-urlencoded",headers:null},isRendLitemplateAuto:!0}};n.prototype.pullDownCallback=function(){var e=this;e.loadingDown||(e.isPullDown=!0,e.loadingDown=!0,e.currPage=e.options.bizlogic.defaultInitPageNum,setTimeout(function(){e.ajaxRequest()},e.options.bizlogic.delayTime),e.options.bizlogic.refreshCallback&&e.options.bizlogic.refreshCallback(!0))},n.prototype.pullUpCallback=function(){var e=this;e.loadingUp||(e.isPullDown=!1,e.loadingUp=!0,e.currPage++,setTimeout(function(){e.ajaxRequest()},e.delayTime))},n.prototype.initAllEventListeners=function(){var e=this;e.setElemListeners()},n.prototype.setElemListeners=function(){var e=this;e.options.bizlogic.itemClickCallback&&mui("#"+e.options.bizlogic.listdataId).on(a,e.options.bizlogic.targetListItemClickStr,e.options.bizlogic.itemClickCallback)},n.prototype.refresh=function(){var e=this;e.options.up&&e.pullToRefreshInstance.enablePullUp?e.loadingUp||(e.clearResponseEl(),e.currPage=e.options.bizlogic.defaultInitPageNum-1,e.loadingMore()):(e.clearResponseEl(),e.pullDownCallback())},n.prototype.loadingMore=function(e){var t=this;t.loadingMoreSuccess=e,t.pullToRefreshInstance.finished&&(t.pullToRefreshInstance.refresh(!0),t.isShouldNoMoreData=!0),t.pullToRefreshInstance.pullupLoading()},n.prototype.disablePullupToRefresh=function(){this.pullToRefreshInstance.disablePullupToRefresh()},n.prototype.enablePullupToRefresh=function(){this.pullToRefreshInstance.enablePullupToRefresh()},n.prototype.ajaxRequest=function(){var e=this;if(!e.options.bizlogic.getUrl)return e.options.isDebug&&console.error("error***url无效,无法访问"),void e.errorRequest(null,null,"请求url为空!");var t=function(t){var o="";o="function"==typeof e.options.bizlogic.getUrl?e.options.bizlogic.getUrl():e.options.bizlogic.getUrl,mui.ajax(o,{data:t,dataType:"json",timeout:e.options.bizlogic.requestTimeOut,type:e.options.bizlogic.ajaxSetting.requestType,accepts:e.options.bizlogic.ajaxSetting.accepts,headers:e.options.bizlogic.ajaxSetting.headers,contentType:e.options.bizlogic.ajaxSetting.contentType,success:function(t){e.successRequest(t)},error:function(t,o){e.errorRequest(t,o,"请求失败!")}})};if(e.options.bizlogic.getRequestDataCallback){var o=e.options.bizlogic.getRequestDataCallback(e.currPage,function(e){t(e)});void 0!==o&&t(o)}else e.options.isDebug&&console.warn("warning***请注意getData不存在,默认数据为空"),t()},n.prototype.errorRequest=function(e,t,o){var n=this;n.isShouldNoMoreData=!1,n.refreshState(!1),n.currPage--,n.currPage=n.currPage>=n.defaultInitPageNum?n.currPage:n.defaultInitPageNum,n.options.bizlogic.errorRequestCallback&&n.options.bizlogic.errorRequestCallback(e,t,o)},n.prototype.successRequest=function(e,t){var n=this;if(!e)return n.options.isDebug&&console.log("warning***返回的数据为空,请注意！"),n.isShouldNoMoreData=!1,void n.refreshState(!1);if(n.options.isDebug&&console.log("下拉刷新返回数据:"+JSON.stringify(e)),e=n.options.bizlogic.changeResponseDataCallback?n.options.bizlogic.changeResponseDataCallback(e):n.defaultChangeResponseData(e),n.options.bizlogic.isRendLitemplateAuto){n.isPullDown&&n.clearResponseEl();var s=0;if(window.Mustache)if(e&&Array.isArray(e)&&e.length>0){for(var i="",l=0;l<e.length;l++){var a=e[l],r="";n.options.bizlogic.getLitemplate&&("string"==typeof n.options.bizlogic.getLitemplate?r=n.options.bizlogic.getLitemplate:"function"==typeof n.options.bizlogic.getLitemplate&&(r=n.options.bizlogic.getLitemplate(a)));var u=Mustache.render(r,a);i+=u,s++}""!=i&&n.respnoseEl.appendChild(o(i))}else n.isShouldNoMoreData=!1;else n.isShouldNoMoreData=!1,1==n.options.isDebug&&console.error("error***没有包含mustache.min.js,无法进行模板渲染")}n.options.bizlogic.successRequestCallback&&"function"==typeof n.options.bizlogic.successRequestCallback&&n.options.bizlogic.successRequestCallback(e,n.isPullDown||n.currPage==n.options.bizlogic.defaultInitPageNum),t||n.refreshState(!0,s)},n.prototype.defaultChangeResponseData=function(e){var t=i(e,{dataPath:["custom.infoList","custom.list","UserArea.InfoList"]});return t.data},n.prototype.refreshState=function(e,t){var o=this;t=t||0,o.pullToRefreshInstance.setSuccessTips&&o.pullToRefreshInstance.setSuccessTips("更新"+t+"条数据"),o.isPullDown&&(o.pullToRefreshInstance.endPullDownToRefresh(e),o.pullToRefreshInstance.finished&&(o.pullToRefreshInstance.refresh(!0),o.isShouldNoMoreData=!0)),o.isShouldNoMoreData?o.pullToRefreshInstance.endPullUpToRefresh(!1,e):o.pullToRefreshInstance.endPullUpToRefresh(!0,e),o.loadingDown=!1,o.loadingUp=!1},n.prototype.clearResponseEl=function(){var e=this;e.options.bizlogic.isRendLitemplateAuto&&e.respnoseEl&&(e.respnoseEl.innerHTML="")},e.initPullDownRefresh=function(e,o){if(e=t.extend(!0,{},r,e),!e.targetPullToRefresh&&!e.skin)return void console.error("错误:传入的下拉刷新皮肤错误,超出范围!");s=e.targetPullToRefresh||e.skin;var i=new n(e);return o&&o(i),i},"undefined"!=typeof module&&module.exports?module.exports=e:"function"==typeof define&&(define.amd||define.cmd)&&define(function(){return e}),t.namespace("bizlogic.initPullDownRefresh",e.initPullDownRefresh),t.namespace("bizlogic.init",e.initPullDownRefresh)}({},PullToRefreshTools);