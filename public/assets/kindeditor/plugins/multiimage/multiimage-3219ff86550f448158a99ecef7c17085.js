!function(t){function e(t){this.init(t)}t.extend(e,{init:function(e){function i(e,i){t(".ke-status > div",e).hide(),t(".ke-message",e).addClass("ke-error").show().html(t.escape(i))}var s=this;e.afterError=e.afterError||function(t){alert(t)},s.options=e,s.progressbars={},s.div=t(e.container).html(['<div class="ke-swfupload">','<div class="ke-swfupload-top">','<div class="ke-inline-block ke-swfupload-button">','<input type="button" value="Browse" />',"</div>",'<div class="ke-inline-block ke-swfupload-desc">'+e.uploadDesc+"</div>",'<span class="ke-button-common ke-button-outer ke-swfupload-startupload">','<input type="button" class="ke-button-common ke-button" value="'+e.startButtonValue+'" />',"</span>","</div>",'<div class="ke-swfupload-body"></div>',"</div>"].join("")),s.bodyDiv=t(".ke-swfupload-body",s.div);var n={debug:!1,upload_url:e.uploadUrl,flash_url:e.flashUrl,file_post_name:e.filePostName,button_placeholder:t(".ke-swfupload-button > input",s.div)[0],button_image_url:e.buttonImageUrl,button_width:e.buttonWidth,button_height:e.buttonHeight,button_cursor:SWFUpload.CURSOR.HAND,file_types:e.fileTypes,file_types_description:e.fileTypesDesc,file_upload_limit:e.fileUploadLimit,file_size_limit:e.fileSizeLimit,post_params:e.postParams,file_queued_handler:function(t){t.url=s.options.fileIconUrl,s.appendFile(t)},file_queue_error_handler:function(i,s){var n="";switch(s){case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:n=e.queueLimitExceeded;break;case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:n=e.fileExceedsSizeLimit;break;case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:n=e.zeroByteFile;break;case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:n=e.invalidFiletype;break;default:n=e.unknownError}t.DEBUG&&alert(n)},upload_start_handler:function(e){var i=this,s=t('div[data-id="'+e.id+'"]',i.bodyDiv);t(".ke-status > div",s).hide(),t(".ke-progressbar",s).show()},upload_progress_handler:function(t,e,i){var n=Math.round(100*e/i),o=s.progressbars[t.id];o.bar.css("width",Math.round(80*n/100)+"px"),o.percent.html(n+"%")},upload_error_handler:function(e){if(e&&e.filestatus==SWFUpload.FILE_STATUS.ERROR){var n=t('div[data-id="'+e.id+'"]',s.bodyDiv).eq(0);i(n,s.options.errorMessage)}},upload_success_handler:function(e,n){var o=t('div[data-id="'+e.id+'"]',s.bodyDiv).eq(0),a={};try{a=t.json(n)}catch(l){s.options.afterError.call(this,"<!doctype html><html>"+n+"</html>")}return 0!==a.error?void i(o,t.DEBUG?a.message:s.options.errorMessage):(e.url=a.url,t(".ke-img",o).attr("src",e.url).attr("data-status",e.filestatus).data("data",a),void t(".ke-status > div",o).hide())}};s.swfu=new SWFUpload(n),t(".ke-swfupload-startupload input",s.div).click(function(){s.swfu.startUpload()})},getUrlList:function(){var e=[];return t(".ke-img",self.bodyDiv).each(function(){var i=t(this),s=i.attr("data-status");s==SWFUpload.FILE_STATUS.COMPLETE&&e.push(i.data("data"))}),e},removeFile:function(e){var i=this;i.swfu.cancelUpload(e);var s=t('div[data-id="'+e+'"]',i.bodyDiv);t(".ke-photo",s).unbind(),t(".ke-delete",s).unbind(),s.remove()},removeFiles:function(){var e=this;t(".ke-item",e.bodyDiv).each(function(){e.removeFile(t(this).attr("data-id"))})},appendFile:function(e){var i=this,s=t('<div class="ke-inline-block ke-item" data-id="'+e.id+'"></div>');i.bodyDiv.append(s);var n=t('<div class="ke-inline-block ke-photo"></div>').mouseover(function(){t(this).addClass("ke-on")}).mouseout(function(){t(this).removeClass("ke-on")});s.append(n);var o=t('<img src="'+e.url+'" class="ke-img" data-status="'+e.filestatus+'" width="80" height="80" alt="'+e.name+'" />');n.append(o),t('<span class="ke-delete"></span>').appendTo(n).click(function(){i.removeFile(e.id)});var a=t('<div class="ke-status"></div>').appendTo(n);t(['<div class="ke-progressbar">','<div class="ke-progressbar-bar"><div class="ke-progressbar-bar-inner"></div></div>','<div class="ke-progressbar-percent">0%</div></div>'].join("")).hide().appendTo(a),t('<div class="ke-message">'+i.options.pendingMessage+"</div>").appendTo(a),s.append('<div class="ke-name">'+e.name+"</div>"),i.progressbars[e.id]={bar:t(".ke-progressbar-bar-inner",n),percent:t(".ke-progressbar-percent",n)}},remove:function(){this.removeFiles(),this.swfu.destroy(),this.div.html("")}}),t.swfupload=function(t,i){return new e(t,i)}}(KindEditor),KindEditor.plugin("multiimage",function(t){var e=this,i="multiimage",s=(t.undef(e.formatUploadUrl,!0),t.undef(e.uploadJson,e.basePath+"php/upload_json.php")),n=e.pluginsPath+"multiimage/images/",o=t.undef(e.imageSizeLimit,"1MB"),a=(t.undef(e.imageFileTypes,"*.jpg;*.gif;*.png"),t.undef(e.imageUploadLimit,20)),l=t.undef(e.filePostName,"imgFile"),u=e.lang(i+".");e.plugin.multiImageDialog=function(r){var d=r.clickFn,p=t.tmpl(u.uploadDesc,{uploadLimit:a,sizeLimit:o}),h=['<div style="padding:20px;">','<div class="swfupload">',"</div>","</div>"].join(""),c=e.createDialog({name:i,width:650,height:510,title:e.lang(i),body:h,previewBtn:{name:u.insertAll,click:function(){d.call(e,f.getUrlList())}},yesBtn:{name:u.clearAll,click:function(){f.removeFiles()}},beforeRemove:function(){(!t.IE||t.V<=8)&&f.remove()}}),_=c.div,f=t.swfupload({container:t(".swfupload",_),buttonImageUrl:n+("zh_CN"==e.langType?"select-files-zh_CN.png":"select-files-en.png"),buttonWidth:"zh_CN"==e.langType?72:88,buttonHeight:23,fileIconUrl:n+"image.png",uploadDesc:p,startButtonValue:u.startUpload,uploadUrl:t.addParam(s,"dir=image"),flashUrl:n+"swfupload.swf",filePostName:l,fileTypes:"*.jpg;*.jpeg;*.gif;*.png;*.bmp",fileTypesDesc:"Image Files",fileUploadLimit:a,fileSizeLimit:o,postParams:t.undef(e.extraFileUploadParams,{}),queueLimitExceeded:u.queueLimitExceeded,fileExceedsSizeLimit:u.fileExceedsSizeLimit,zeroByteFile:u.zeroByteFile,invalidFiletype:u.invalidFiletype,unknownError:u.unknownError,pendingMessage:u.pending,errorMessage:u.uploadError,afterError:function(t){e.errorDialog(t)}});return c},e.clickToolbar(i,function(){e.plugin.multiImageDialog({clickFn:function(i){0!==i.length&&(t.each(i,function(t,i){e.afterUpload&&e.afterUpload.call(e,i.url,i,"multiimage"),e.exec("insertimage",i.url,i.title,i.width,i.height,i.border,i.align)}),setTimeout(function(){e.hideDialog().focus()},0))}})})}),function(){window.SWFUpload=function(t){this.initSWFUpload(t)},SWFUpload.prototype.initSWFUpload=function(t){try{this.customSettings={},this.settings=t,this.eventQueue=[],this.movieName="KindEditor_SWFUpload_"+SWFUpload.movieCount++,this.movieElement=null,SWFUpload.instances[this.movieName]=this,this.initSettings(),this.loadFlash(),this.displayDebugInfo()}catch(e){throw delete SWFUpload.instances[this.movieName],e}},SWFUpload.instances={},SWFUpload.movieCount=0,SWFUpload.version="2.2.0 2009-03-25",SWFUpload.QUEUE_ERROR={QUEUE_LIMIT_EXCEEDED:-100,FILE_EXCEEDS_SIZE_LIMIT:-110,ZERO_BYTE_FILE:-120,INVALID_FILETYPE:-130},SWFUpload.UPLOAD_ERROR={HTTP_ERROR:-200,MISSING_UPLOAD_URL:-210,IO_ERROR:-220,SECURITY_ERROR:-230,UPLOAD_LIMIT_EXCEEDED:-240,UPLOAD_FAILED:-250,SPECIFIED_FILE_ID_NOT_FOUND:-260,FILE_VALIDATION_FAILED:-270,FILE_CANCELLED:-280,UPLOAD_STOPPED:-290},SWFUpload.FILE_STATUS={QUEUED:-1,IN_PROGRESS:-2,ERROR:-3,COMPLETE:-4,CANCELLED:-5},SWFUpload.BUTTON_ACTION={SELECT_FILE:-100,SELECT_FILES:-110,START_UPLOAD:-120},SWFUpload.CURSOR={ARROW:-1,HAND:-2},SWFUpload.WINDOW_MODE={WINDOW:"window",TRANSPARENT:"transparent",OPAQUE:"opaque"},SWFUpload.completeURL=function(t){if("string"!=typeof t||t.match(/^https?:\/\//i)||t.match(/^\//))return t;var e=(window.location.protocol+"//"+window.location.hostname+(window.location.port?":"+window.location.port:""),window.location.pathname.lastIndexOf("/"));return path=0>=e?"/":window.location.pathname.substr(0,e)+"/",path+t},SWFUpload.prototype.initSettings=function(){this.ensureDefault=function(t,e){this.settings[t]=void 0==this.settings[t]?e:this.settings[t]},this.ensureDefault("upload_url",""),this.ensureDefault("preserve_relative_urls",!1),this.ensureDefault("file_post_name","Filedata"),this.ensureDefault("post_params",{}),this.ensureDefault("use_query_string",!1),this.ensureDefault("requeue_on_error",!1),this.ensureDefault("http_success",[]),this.ensureDefault("assume_success_timeout",0),this.ensureDefault("file_types","*.*"),this.ensureDefault("file_types_description","All Files"),this.ensureDefault("file_size_limit",0),this.ensureDefault("file_upload_limit",0),this.ensureDefault("file_queue_limit",0),this.ensureDefault("flash_url","swfupload.swf"),this.ensureDefault("prevent_swf_caching",!0),this.ensureDefault("button_image_url",""),this.ensureDefault("button_width",1),this.ensureDefault("button_height",1),this.ensureDefault("button_text",""),this.ensureDefault("button_text_style","color: #000000; font-size: 16pt;"),this.ensureDefault("button_text_top_padding",0),this.ensureDefault("button_text_left_padding",0),this.ensureDefault("button_action",SWFUpload.BUTTON_ACTION.SELECT_FILES),this.ensureDefault("button_disabled",!1),this.ensureDefault("button_placeholder_id",""),this.ensureDefault("button_placeholder",null),this.ensureDefault("button_cursor",SWFUpload.CURSOR.ARROW),this.ensureDefault("button_window_mode",SWFUpload.WINDOW_MODE.WINDOW),this.ensureDefault("debug",!1),this.settings.debug_enabled=this.settings.debug,this.settings.return_upload_start_handler=this.returnUploadStart,this.ensureDefault("swfupload_loaded_handler",null),this.ensureDefault("file_dialog_start_handler",null),this.ensureDefault("file_queued_handler",null),this.ensureDefault("file_queue_error_handler",null),this.ensureDefault("file_dialog_complete_handler",null),this.ensureDefault("upload_start_handler",null),this.ensureDefault("upload_progress_handler",null),this.ensureDefault("upload_error_handler",null),this.ensureDefault("upload_success_handler",null),this.ensureDefault("upload_complete_handler",null),this.ensureDefault("debug_handler",this.debugMessage),this.ensureDefault("custom_settings",{}),this.customSettings=this.settings.custom_settings,this.settings.prevent_swf_caching&&(this.settings.flash_url=this.settings.flash_url+(this.settings.flash_url.indexOf("?")<0?"?":"&")+"preventswfcaching="+(new Date).getTime()),this.settings.preserve_relative_urls||(this.settings.upload_url=SWFUpload.completeURL(this.settings.upload_url),this.settings.button_image_url=SWFUpload.completeURL(this.settings.button_image_url)),delete this.ensureDefault},SWFUpload.prototype.loadFlash=function(){var t,e;if(null!==document.getElementById(this.movieName))throw"ID "+this.movieName+" is already in use. The Flash Object could not be added";if(t=document.getElementById(this.settings.button_placeholder_id)||this.settings.button_placeholder,void 0==t)throw"Could not find the placeholder element: "+this.settings.button_placeholder_id;e=document.createElement("div"),e.innerHTML=this.getFlashHTML(),t.parentNode.replaceChild(e.firstChild,t),void 0==window[this.movieName]&&(window[this.movieName]=this.getMovieElement())},SWFUpload.prototype.getFlashHTML=function(){var t="";return KindEditor.IE&&KindEditor.V>8&&(t=' classid = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"'),['<object id="',this.movieName,'"'+t+' type="application/x-shockwave-flash" data="',this.settings.flash_url,'" width="',this.settings.button_width,'" height="',this.settings.button_height,'" class="swfupload">','<param name="wmode" value="',this.settings.button_window_mode,'" />','<param name="movie" value="',this.settings.flash_url,'" />','<param name="quality" value="high" />','<param name="menu" value="false" />','<param name="allowScriptAccess" value="always" />','<param name="flashvars" value="'+this.getFlashVars()+'" />',"</object>"].join("")},SWFUpload.prototype.getFlashVars=function(){var t=this.buildParamString(),e=this.settings.http_success.join(",");return["movieName=",encodeURIComponent(this.movieName),"&amp;uploadURL=",encodeURIComponent(this.settings.upload_url),"&amp;useQueryString=",encodeURIComponent(this.settings.use_query_string),"&amp;requeueOnError=",encodeURIComponent(this.settings.requeue_on_error),"&amp;httpSuccess=",encodeURIComponent(e),"&amp;assumeSuccessTimeout=",encodeURIComponent(this.settings.assume_success_timeout),"&amp;params=",encodeURIComponent(t),"&amp;filePostName=",encodeURIComponent(this.settings.file_post_name),"&amp;fileTypes=",encodeURIComponent(this.settings.file_types),"&amp;fileTypesDescription=",encodeURIComponent(this.settings.file_types_description),"&amp;fileSizeLimit=",encodeURIComponent(this.settings.file_size_limit),"&amp;fileUploadLimit=",encodeURIComponent(this.settings.file_upload_limit),"&amp;fileQueueLimit=",encodeURIComponent(this.settings.file_queue_limit),"&amp;debugEnabled=",encodeURIComponent(this.settings.debug_enabled),"&amp;buttonImageURL=",encodeURIComponent(this.settings.button_image_url),"&amp;buttonWidth=",encodeURIComponent(this.settings.button_width),"&amp;buttonHeight=",encodeURIComponent(this.settings.button_height),"&amp;buttonText=",encodeURIComponent(this.settings.button_text),"&amp;buttonTextTopPadding=",encodeURIComponent(this.settings.button_text_top_padding),"&amp;buttonTextLeftPadding=",encodeURIComponent(this.settings.button_text_left_padding),"&amp;buttonTextStyle=",encodeURIComponent(this.settings.button_text_style),"&amp;buttonAction=",encodeURIComponent(this.settings.button_action),"&amp;buttonDisabled=",encodeURIComponent(this.settings.button_disabled),"&amp;buttonCursor=",encodeURIComponent(this.settings.button_cursor)].join("")},SWFUpload.prototype.getMovieElement=function(){if(void 0==this.movieElement&&(this.movieElement=document.getElementById(this.movieName)),null===this.movieElement)throw"Could not find Flash element";return this.movieElement},SWFUpload.prototype.buildParamString=function(){var t=this.settings.post_params,e=[];if("object"==typeof t)for(var i in t)t.hasOwnProperty(i)&&e.push(encodeURIComponent(i.toString())+"="+encodeURIComponent(t[i].toString()));return e.join("&amp;")},SWFUpload.prototype.destroy=function(){try{this.cancelUpload(null,!1);var t=null;if(t=this.getMovieElement(),t&&"unknown"==typeof t.CallFunction){for(var e in t)try{"function"==typeof t[e]&&(t[e]=null)}catch(i){}try{t.parentNode.removeChild(t)}catch(s){}}return window[this.movieName]=null,SWFUpload.instances[this.movieName]=null,delete SWFUpload.instances[this.movieName],this.movieElement=null,this.settings=null,this.customSettings=null,this.eventQueue=null,this.movieName=null,!0}catch(n){return!1}},SWFUpload.prototype.displayDebugInfo=function(){this.debug(["---SWFUpload Instance Info---\n","Version: ",SWFUpload.version,"\n","Movie Name: ",this.movieName,"\n","Settings:\n","	","upload_url:               ",this.settings.upload_url,"\n","	","flash_url:                ",this.settings.flash_url,"\n","	","use_query_string:         ",this.settings.use_query_string.toString(),"\n","	","requeue_on_error:         ",this.settings.requeue_on_error.toString(),"\n","	","http_success:             ",this.settings.http_success.join(", "),"\n","	","assume_success_timeout:   ",this.settings.assume_success_timeout,"\n","	","file_post_name:           ",this.settings.file_post_name,"\n","	","post_params:              ",this.settings.post_params.toString(),"\n","	","file_types:               ",this.settings.file_types,"\n","	","file_types_description:   ",this.settings.file_types_description,"\n","	","file_size_limit:          ",this.settings.file_size_limit,"\n","	","file_upload_limit:        ",this.settings.file_upload_limit,"\n","	","file_queue_limit:         ",this.settings.file_queue_limit,"\n","	","debug:                    ",this.settings.debug.toString(),"\n","	","prevent_swf_caching:      ",this.settings.prevent_swf_caching.toString(),"\n","	","button_placeholder_id:    ",this.settings.button_placeholder_id.toString(),"\n","	","button_placeholder:       ",this.settings.button_placeholder?"Set":"Not Set","\n","	","button_image_url:         ",this.settings.button_image_url.toString(),"\n","	","button_width:             ",this.settings.button_width.toString(),"\n","	","button_height:            ",this.settings.button_height.toString(),"\n","	","button_text:              ",this.settings.button_text.toString(),"\n","	","button_text_style:        ",this.settings.button_text_style.toString(),"\n","	","button_text_top_padding:  ",this.settings.button_text_top_padding.toString(),"\n","	","button_text_left_padding: ",this.settings.button_text_left_padding.toString(),"\n","	","button_action:            ",this.settings.button_action.toString(),"\n","	","button_disabled:          ",this.settings.button_disabled.toString(),"\n","	","custom_settings:          ",this.settings.custom_settings.toString(),"\n","Event Handlers:\n","	","swfupload_loaded_handler assigned:  ",("function"==typeof this.settings.swfupload_loaded_handler).toString(),"\n","	","file_dialog_start_handler assigned: ",("function"==typeof this.settings.file_dialog_start_handler).toString(),"\n","	","file_queued_handler assigned:       ",("function"==typeof this.settings.file_queued_handler).toString(),"\n","	","file_queue_error_handler assigned:  ",("function"==typeof this.settings.file_queue_error_handler).toString(),"\n","	","upload_start_handler assigned:      ",("function"==typeof this.settings.upload_start_handler).toString(),"\n","	","upload_progress_handler assigned:   ",("function"==typeof this.settings.upload_progress_handler).toString(),"\n","	","upload_error_handler assigned:      ",("function"==typeof this.settings.upload_error_handler).toString(),"\n","	","upload_success_handler assigned:    ",("function"==typeof this.settings.upload_success_handler).toString(),"\n","	","upload_complete_handler assigned:   ",("function"==typeof this.settings.upload_complete_handler).toString(),"\n","	","debug_handler assigned:             ",("function"==typeof this.settings.debug_handler).toString(),"\n"].join(""))},SWFUpload.prototype.addSetting=function(t,e,i){return this.settings[t]=void 0==e?i:e},SWFUpload.prototype.getSetting=function(t){return void 0!=this.settings[t]?this.settings[t]:""},SWFUpload.prototype.callFlash=function(functionName,argumentArray){argumentArray=argumentArray||[];var movieElement=this.getMovieElement(),returnValue,returnString;try{returnString=movieElement.CallFunction('<invoke name="'+functionName+'" returntype="javascript">'+__flash__argumentsToXML(argumentArray,0)+"</invoke>"),returnValue=eval(returnString)}catch(ex){throw"Call to "+functionName+" failed"}return void 0!=returnValue&&"object"==typeof returnValue.post&&(returnValue=this.unescapeFilePostParams(returnValue)),returnValue},SWFUpload.prototype.selectFile=function(){this.callFlash("SelectFile")},SWFUpload.prototype.selectFiles=function(){this.callFlash("SelectFiles")},SWFUpload.prototype.startUpload=function(t){this.callFlash("StartUpload",[t])},SWFUpload.prototype.cancelUpload=function(t,e){e!==!1&&(e=!0),this.callFlash("CancelUpload",[t,e])},SWFUpload.prototype.stopUpload=function(){this.callFlash("StopUpload")},SWFUpload.prototype.getStats=function(){return this.callFlash("GetStats")},SWFUpload.prototype.setStats=function(t){this.callFlash("SetStats",[t])},SWFUpload.prototype.getFile=function(t){return"number"==typeof t?this.callFlash("GetFileByIndex",[t]):this.callFlash("GetFile",[t])},SWFUpload.prototype.addFileParam=function(t,e,i){return this.callFlash("AddFileParam",[t,e,i])},SWFUpload.prototype.removeFileParam=function(t,e){this.callFlash("RemoveFileParam",[t,e])},SWFUpload.prototype.setUploadURL=function(t){this.settings.upload_url=t.toString(),this.callFlash("SetUploadURL",[t])},SWFUpload.prototype.setPostParams=function(t){this.settings.post_params=t,this.callFlash("SetPostParams",[t])},SWFUpload.prototype.addPostParam=function(t,e){this.settings.post_params[t]=e,this.callFlash("SetPostParams",[this.settings.post_params])},SWFUpload.prototype.removePostParam=function(t){delete this.settings.post_params[t],this.callFlash("SetPostParams",[this.settings.post_params])},SWFUpload.prototype.setFileTypes=function(t,e){this.settings.file_types=t,this.settings.file_types_description=e,this.callFlash("SetFileTypes",[t,e])},SWFUpload.prototype.setFileSizeLimit=function(t){this.settings.file_size_limit=t,this.callFlash("SetFileSizeLimit",[t])},SWFUpload.prototype.setFileUploadLimit=function(t){this.settings.file_upload_limit=t,this.callFlash("SetFileUploadLimit",[t])},SWFUpload.prototype.setFileQueueLimit=function(t){this.settings.file_queue_limit=t,this.callFlash("SetFileQueueLimit",[t])},SWFUpload.prototype.setFilePostName=function(t){this.settings.file_post_name=t,this.callFlash("SetFilePostName",[t])},SWFUpload.prototype.setUseQueryString=function(t){this.settings.use_query_string=t,this.callFlash("SetUseQueryString",[t])},SWFUpload.prototype.setRequeueOnError=function(t){this.settings.requeue_on_error=t,this.callFlash("SetRequeueOnError",[t])},SWFUpload.prototype.setHTTPSuccess=function(t){"string"==typeof t&&(t=t.replace(" ","").split(",")),this.settings.http_success=t,this.callFlash("SetHTTPSuccess",[t])},SWFUpload.prototype.setAssumeSuccessTimeout=function(t){this.settings.assume_success_timeout=t,this.callFlash("SetAssumeSuccessTimeout",[t])},SWFUpload.prototype.setDebugEnabled=function(t){this.settings.debug_enabled=t,this.callFlash("SetDebugEnabled",[t])},SWFUpload.prototype.setButtonImageURL=function(t){void 0==t&&(t=""),this.settings.button_image_url=t,this.callFlash("SetButtonImageURL",[t])},SWFUpload.prototype.setButtonDimensions=function(t,e){this.settings.button_width=t,this.settings.button_height=e;var i=this.getMovieElement();void 0!=i&&(i.style.width=t+"px",i.style.height=e+"px"),this.callFlash("SetButtonDimensions",[t,e])},SWFUpload.prototype.setButtonText=function(t){this.settings.button_text=t,this.callFlash("SetButtonText",[t])},SWFUpload.prototype.setButtonTextPadding=function(t,e){this.settings.button_text_top_padding=e,this.settings.button_text_left_padding=t,this.callFlash("SetButtonTextPadding",[t,e])},SWFUpload.prototype.setButtonTextStyle=function(t){this.settings.button_text_style=t,this.callFlash("SetButtonTextStyle",[t])},SWFUpload.prototype.setButtonDisabled=function(t){this.settings.button_disabled=t,this.callFlash("SetButtonDisabled",[t])},SWFUpload.prototype.setButtonAction=function(t){this.settings.button_action=t,this.callFlash("SetButtonAction",[t])},SWFUpload.prototype.setButtonCursor=function(t){this.settings.button_cursor=t,this.callFlash("SetButtonCursor",[t])},SWFUpload.prototype.queueEvent=function(t,e){void 0==e?e=[]:e instanceof Array||(e=[e]);var i=this;if("function"==typeof this.settings[t])this.eventQueue.push(function(){this.settings[t].apply(this,e)}),setTimeout(function(){i.executeNextEvent()},0);else if(null!==this.settings[t])throw"Event handler "+t+" is unknown or is not a function"},SWFUpload.prototype.executeNextEvent=function(){var t=this.eventQueue?this.eventQueue.shift():null;"function"==typeof t&&t.apply(this)},SWFUpload.prototype.unescapeFilePostParams=function(t){var e,i=/[$]([0-9a-f]{4})/i,s={};if(void 0!=t){for(var n in t.post)if(t.post.hasOwnProperty(n)){e=n;for(var o;null!==(o=i.exec(e));)e=e.replace(o[0],String.fromCharCode(parseInt("0x"+o[1],16)));s[e]=t.post[n]}t.post=s}return t},SWFUpload.prototype.testExternalInterface=function(){try{return this.callFlash("TestExternalInterface")}catch(t){return!1}},SWFUpload.prototype.flashReady=function(){var t=this.getMovieElement();return t?(this.cleanUp(t),void this.queueEvent("swfupload_loaded_handler")):void this.debug("Flash called back ready but the flash movie can't be found.")},SWFUpload.prototype.cleanUp=function(t){try{if(this.movieElement&&"unknown"==typeof t.CallFunction){this.debug("Removing Flash functions hooks (this should only run in IE and should prevent memory leaks)");for(var e in t)try{"function"==typeof t[e]&&(t[e]=null)}catch(i){}}}catch(s){}window.__flash__removeCallback=function(t,e){try{t&&(t[e]=null)}catch(i){}}},SWFUpload.prototype.fileDialogStart=function(){this.queueEvent("file_dialog_start_handler")},SWFUpload.prototype.fileQueued=function(t){t=this.unescapeFilePostParams(t),this.queueEvent("file_queued_handler",t)},SWFUpload.prototype.fileQueueError=function(t,e,i){t=this.unescapeFilePostParams(t),this.queueEvent("file_queue_error_handler",[t,e,i])},SWFUpload.prototype.fileDialogComplete=function(t,e,i){this.queueEvent("file_dialog_complete_handler",[t,e,i])},SWFUpload.prototype.uploadStart=function(t){t=this.unescapeFilePostParams(t),this.queueEvent("return_upload_start_handler",t)},SWFUpload.prototype.returnUploadStart=function(t){var e;if("function"==typeof this.settings.upload_start_handler)t=this.unescapeFilePostParams(t),e=this.settings.upload_start_handler.call(this,t);else if(void 0!=this.settings.upload_start_handler)throw"upload_start_handler must be a function";void 0===e&&(e=!0),e=!!e,this.callFlash("ReturnUploadStart",[e])},SWFUpload.prototype.uploadProgress=function(t,e,i){t=this.unescapeFilePostParams(t),this.queueEvent("upload_progress_handler",[t,e,i])},SWFUpload.prototype.uploadError=function(t,e,i){t=this.unescapeFilePostParams(t),this.queueEvent("upload_error_handler",[t,e,i])},SWFUpload.prototype.uploadSuccess=function(t,e,i){t=this.unescapeFilePostParams(t),this.queueEvent("upload_success_handler",[t,e,i])},SWFUpload.prototype.uploadComplete=function(t){t=this.unescapeFilePostParams(t),this.queueEvent("upload_complete_handler",t)},SWFUpload.prototype.debug=function(t){this.queueEvent("debug_handler",t)},SWFUpload.prototype.debugMessage=function(t){if(this.settings.debug){var e,i=[];if("object"==typeof t&&"string"==typeof t.name&&"string"==typeof t.message){for(var s in t)t.hasOwnProperty(s)&&i.push(s+": "+t[s]);e=i.join("\n")||"",i=e.split("\n"),e="EXCEPTION: "+i.join("\nEXCEPTION: "),SWFUpload.Console.writeLine(e)}else SWFUpload.Console.writeLine(t)}},SWFUpload.Console={},SWFUpload.Console.writeLine=function(t){var e,i;try{e=document.getElementById("SWFUpload_Console"),e||(i=document.createElement("form"),document.getElementsByTagName("body")[0].appendChild(i),e=document.createElement("textarea"),e.id="SWFUpload_Console",e.style.fontFamily="monospace",e.setAttribute("wrap","off"),e.wrap="off",e.style.overflow="auto",e.style.width="700px",e.style.height="350px",e.style.margin="5px",i.appendChild(e)),e.value+=t+"\n",e.scrollTop=e.scrollHeight-e.clientHeight}catch(s){alert("Exception: "+s.name+" Message: "+s.message)}}}(),function(){"function"==typeof SWFUpload&&(SWFUpload.queue={},SWFUpload.prototype.initSettings=function(t){return function(){"function"==typeof t&&t.call(this),this.queueSettings={},this.queueSettings.queue_cancelled_flag=!1,this.queueSettings.queue_upload_count=0,this.queueSettings.user_upload_complete_handler=this.settings.upload_complete_handler,this.queueSettings.user_upload_start_handler=this.settings.upload_start_handler,this.settings.upload_complete_handler=SWFUpload.queue.uploadCompleteHandler,this.settings.upload_start_handler=SWFUpload.queue.uploadStartHandler,this.settings.queue_complete_handler=this.settings.queue_complete_handler||null}}(SWFUpload.prototype.initSettings),SWFUpload.prototype.startUpload=function(t){this.queueSettings.queue_cancelled_flag=!1,this.callFlash("StartUpload",[t])},SWFUpload.prototype.cancelQueue=function(){this.queueSettings.queue_cancelled_flag=!0,this.stopUpload();for(var t=this.getStats();t.files_queued>0;)this.cancelUpload(),t=this.getStats()},SWFUpload.queue.uploadStartHandler=function(t){var e;return"function"==typeof this.queueSettings.user_upload_start_handler&&(e=this.queueSettings.user_upload_start_handler.call(this,t)),e=e===!1?!1:!0,this.queueSettings.queue_cancelled_flag=!e,e},SWFUpload.queue.uploadCompleteHandler=function(t){var e,i=this.queueSettings.user_upload_complete_handler;if(t.filestatus===SWFUpload.FILE_STATUS.COMPLETE&&this.queueSettings.queue_upload_count++,e="function"==typeof i?i.call(this,t)===!1?!1:!0:t.filestatus===SWFUpload.FILE_STATUS.QUEUED?!1:!0){var s=this.getStats();s.files_queued>0&&this.queueSettings.queue_cancelled_flag===!1?this.startUpload():this.queueSettings.queue_cancelled_flag===!1?(this.queueEvent("queue_complete_handler",[this.queueSettings.queue_upload_count]),this.queueSettings.queue_upload_count=0):(this.queueSettings.queue_cancelled_flag=!1,this.queueSettings.queue_upload_count=0)}})}();