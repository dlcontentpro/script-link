/**
 * ModuloBox PACKAGED v1.0.5
 * Touch & responsive multimedia Lightbox
 *
 * @author Themeone [https://theme-one.com/]
 * Copyright © 2016 All Rights Reserved.
 */
!function(){var t=window,e=0;t.requestAnimationFrame=t.requestAnimationFrame||t.webkitRequestAnimationFrame,t.requestAnimationFrame||(t.requestAnimationFrame=function(t){var i=(new Date).getTime(),s=Math.max(0,16-(i-e));return t=setTimeout(t,s),e=i+s,t}),t.cancelAnimationFrame||(t.cancelAnimationFrame=function(t){clearTimeout(t)})}(),function(t,e){"function"==typeof define&&define.amd?define("themeone-utils/utils",e):"object"==typeof module&&module.exports?module.exports=e():t.ThemeoneUtils=e()}(this,function(){var t={},e=window.console;return t.error=function(t){void 0!==e&&e.error(t)},t.extend=function(t,e){if(t)if("object"!=typeof t)this.error("Custom options must be an object");else for(var i in e)e.hasOwnProperty(i)&&t.hasOwnProperty(i)&&(e[i]=t[i]);return e},t.prop=function(t){for(var e=this.createEl(),i=["","Webkit","Moz","ms","O"],s=0,o=i.length;s<o;s++){var n=i[s]?i[s]+t.charAt(0).toUpperCase()+t.slice(1):t;if(void 0!==e.style[n])return n}return""},t.cloneObject=function(t){var e,i={};for(e in t)t.hasOwnProperty(e)&&(i[e]=t[e]);return i},t.createEl=function(t,e){var i=document.createElement(t||"div");return e&&(i.className=e),i},t.camelize=function(t){return t.replace(/-([a-z])/g,function(t){return t[1].toUpperCase()})},t.handleEvents=function(t,e,i,s,o){"object"!=typeof this.event_handlers&&(this.event_handlers={}),this.event_handlers[s]||(this.event_handlers[s]=t[s].bind(t));var n=void 0===o||o?"addEventListener":"removeEventListener";i.forEach(function(t){e[n](t,this.event_handlers[s],!1)}.bind(this))},t.dispatchEvent=function(t,e,i,s,o){i+=e?"."+e:"",e=s?[s].concat(o):[o],t.emitEvent(i,e)},t.throttle=function(t,e){var i=null;return function(){var s=arguments,o=Date.now();(!i||o-i>=e)&&(i=o,t.apply(this,s))}},t.modulo=function(t,e){return(t+e%t)%t},t.classReg=function(t){return new RegExp("(^|\\s+)"+t+"(\\s+|$)")},t.hasClass=function(t,e){return!!t.className.match(this.classReg(e))},t.addClass=function(t,e){this.hasClass(t,e)||(t.className+=(t.className?" ":"")+e)},t.removeClass=function(t,e){this.hasClass(t,e)&&(t.className=t.className.replace(this.classReg(e)," ").replace(/\s+$/,""))},t.translate=function(t,e,i,s){s=s?" scale("+s+","+s+")":"",t.style[this.browser.trans]=this.browser.gpu?"translate3d("+(e||0)+"px, "+(i||0)+"px, 0)"+s:"translate("+(e||0)+"px, "+(i||0)+"px)"+s},t.browser={trans:t.prop("transform"),gpu:!!t.prop("perspective")},t}),function(t,e){"function"==typeof define&&define.amd?define("themeone-event/event",e):"object"==typeof module&&module.exports?module.exports=e():t.ThemeoneEvent=e()}("undefined"!=typeof window?window:this,function(){var t=function(){},e=t.prototype;return e.on=function(t,e){if(!t||!e)return null;var i=this._events=this._events||{};return-1===(i=i[t]=i[t]||[]).indexOf(e)&&i.push(e),this},e.off=function(t,e){var i=this._events&&this._events[t];if(!i||!i.length)return null;var s=i.indexOf(e);return-1!==s&&i.splice(s,1),this},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(!i||!i.length)return null;var s=0,o=i[s];e=e||[];for(var n=this._onceEvents&&this._onceEvents[t];o;){var r=n&&n[o];r&&(this.off(t,o),delete n[o]),o.apply(this,e),o=i[s+=r?0:1]}return this},t}),function(t,e){"function"==typeof define&&define.amd?define("themeone-animate/animate",["themeone-utils/utils","themeone-event/event"],e):"object"==typeof module&&module.exports?module.exports=e(require("themeone-utils"),require("themeone-event")):t.ThemeoneAnimate=e(t.ThemeoneUtils,t.ThemeoneEvent)}(this,function(t,e){var i=function(t,e,i,s){this.element=t,this.defaults=e,this.forces={friction:i||.28,attraction:s||.028},this.resetAnimate()},s=i.prototype=Object.create(e.prototype);return s.updateDrag=function(t){this.move=!0,this.drag=t},s.releaseDrag=function(){this.move=!1},s.animateTo=function(t){this.attraction=t},s.startAnimate=function(){this.move=!0,this.settle=!1,this.restingFrames=0,this.RAF||this.animate()},s.stopAnimate=function(){this.move=!1,this.restingFrames=0,this.RAF&&(cancelAnimationFrame(this.RAF),this.RAF=!1),this.start=t.cloneObject(this.position),this.velocity={x:0,y:0,s:0}},s.resetAnimate=function(){this.stopAnimate(),this.settle=!0,this.drag=t.cloneObject(this.defaults),this.start=t.cloneObject(this.defaults),this.resting=t.cloneObject(this.defaults),this.position=t.cloneObject(this.defaults),this.attraction=t.cloneObject(this.defaults)},s.animate=function(){var e=function(){if(void 0!==this.position){var i=t.cloneObject(this.position);this.applyDragForce(),this.applyAttractionForce(),t.dispatchEvent(this,"toanimate","render",this),this.integratePhysics(),this.getRestingPosition(),this.render(100),this.RAF=requestAnimationFrame(e),this.checkSettle(i)}}.bind(this);this.RAF=requestAnimationFrame(e)},s.integratePhysics=function(){for(var t in this.position)void 0!==this.position[t]&&(this.position[t]+=this.velocity[t],this.position[t]="s"===t?Math.max(.1,this.position[t]):this.position[t],this.velocity[t]*=this.getFrictionFactor())},s.applyDragForce=function(){if(this.move)for(var t in this.drag)void 0!==this.drag[t]&&this.applyForce(t,this.drag[t]-this.position[t]-this.velocity[t])},s.applyAttractionForce=function(){if(!this.move)for(var t in this.attraction)void 0!==this.attraction[t]&&this.applyForce(t,(this.attraction[t]-this.position[t])*this.forces.attraction)},s.getRestingPosition=function(){for(var t in this.position)void 0!==this.position[t]&&(this.resting[t]=this.position[t]+this.velocity[t]/(1-this.getFrictionFactor()))},s.applyForce=function(t,e){this.velocity[t]+=e},s.getFrictionFactor=function(){return 1-this.forces.friction},s.roundValues=function(t,e){for(var i in t)void 0!==t[i]&&(e="s"===i?100*e:e,t[i]=Math.round(t[i]*e)/e)},s.checkSettle=function(e){if(!this.move){var i,s=0;for(i in this.position)if(void 0!==this.position[i]){var o="s"===i?1e4:100;Math.round(this.position[i]*o)===Math.round(e[i]*o)&&++s===Object.keys(this.position).length&&this.restingFrames++}}2<this.restingFrames&&(this.stopAnimate(),this.render(1<this.position.s?10:1),this.settle=!0,JSON.stringify(this.start)!==JSON.stringify(this.position)&&t.dispatchEvent(this,"toanimate","settle",this))},s.render=function(e){this.roundValues(this.position,e),t.translate(this.element,this.position.x,this.position.y,this.position.s)},i}),function(t,e){"function"==typeof define&&define.amd?define(["themeone-utils/utils","themeone-event/event","themeone-animate/animate"],e):"object"==typeof exports&&module.exports?module.exports=e(require("themeone-utils"),require("themeone-event"),require("themeone-animate")):t.ModuloBox=e(t.ThemeoneUtils,t.ThemeoneEvent,t.ThemeoneAnimate)}(this,function(t,e,i){var s=0,o={},n="mobx"+("1.0.5"+Math.random()).replace(/\D/g,""),r={uid:0},a={mediaSelector:".mobx",threshold:5,attraction:{slider:.055,slide:.018,thumbs:.016},friction:{slider:.62,slide:.18,thumbs:.22},rightToLeft:!1,loop:3,preload:1,unload:!1,timeToIdle:4e3,history:!1,mouseWheel:!0,contextMenu:!0,scrollBar:!0,fadeIfSettle:!1,controls:["close"],prevNext:!0,prevNextTouch:!1,counterMessage:"[index] / [total]",caption:!0,autoCaption:!1,captionSmallDevice:!0,thumbnails:!0,thumbnailsNav:"basic",thumbnailSizes:{1920:{width:110,height:80,gutter:10},1280:{width:90,height:65,gutter:10},680:{width:70,height:50,gutter:8},480:{width:60,height:44,gutter:5}},spacing:.1,smartResize:!0,overflow:!1,loadError:"Sorry, an error occured while loading the content...",noContent:"Sorry, no content was found!",prevNextKey:!0,scrollToNav:!1,scrollSensitivity:15,zoomTo:"auto",minZoom:1.2,maxZoom:4,doubleTapToZoom:!0,scrollToZoom:!1,pinchToZoom:!0,escapeToClose:!0,scrollToClose:!1,pinchToClose:!0,dragToClose:!0,tapToClose:!0,shareButtons:"facebook googleplus twitter pinterest linkedin reddit".split(" "),shareText:"Share on",sharedUrl:"deeplink",slideShowInterval:4e3,slideShowAutoPlay:!1,slideShowAutoStop:!1,countTimer:!0,countTimerBg:"rgba(255,255,255,0.25)",countTimerColor:"rgba(255,255,255,0.75)",mediaelement:!1,videoRatio:16/9,videoMaxWidth:1180,videoAutoPlay:!1,videoThumbnail:!1},h=function(e){this.options=t.extend(e,a),this.setVar()};return e=h.prototype=Object.create(e.prototype),e.init=function(){if(this.GUID)return o[this.GUID];this.GUID=++s,o[this.GUID]=this,this.createDOM(),this.setAnimation(),this.getGalleries(),this.openFromQuery()},e.setVar=function(){var t=window,e=document,i=navigator;this.pre="mobx",this.gesture={},this.buttons={},this.slider={},this.slides={},this.cells={},this.states={},this.pointers=[],this.expando=n,this.cache=r,this.dragEvents=this.detectPointerEvents(),this.browser={touchDevice:"ontouchstart"in t||0<i.maxTouchPoints||0<i.msMaxTouchPoints,pushState:"history"in t&&"pushState"in history,fullScreen:this.detectFullScreen(),mouseWheel:"onwheel"in e.createElement("div")?"wheel":void 0!==e.onmousewheel?"mousewheel":"DOMMouseScroll"},this.iframeVideo=this.iframeVideo(),this.socialMedia=this.socialMedia()},e.detectPointerEvents=function(){var t=navigator;return t.pointerEnabled?{start:["pointerdown"],move:["pointermove"],end:["pointerup","pointercancel"]}:t.msPointerEnabled?{start:["MSPointerDown"],move:["MSPointerMove"],end:["MSPointerUp","MSPointerCancel"]}:{start:["mousedown","touchstart"],move:["mousemove","touchmove"],end:["mouseup","mouseleave","touchend","touchcancel"]}},e.detectFullScreen=function(){for(var t=["fullscreenEnabled","webkitFullscreenEnabled","mozFullScreenEnabled","msFullscreenEnabled"],e=0,i=t.length;e<i;e++)if(document[t[e]])return{element:["fullscreenElement","webkitFullscreenElement","mozFullScreenElement","msFullscreenElement"][e],request:["requestFullscreen","webkitRequestFullscreen","mozRequestFullScreen","msRequestFullscreen"][e],change:["fullscreenchange","webkitfullscreenchange","mozfullscreenchange","MSFullscreenChange"][e],exit:["exitFullscreen","webkitExitFullscreen","mozCancelFullScreen","msExitFullscreen"][e]};return t=this.options.controls,-1<(e=t.indexOf("fullScreen"))&&t.splice(e,1),null},e.iframeVideo=function(){return{youtube:{reg:/(?:www\.)?youtu\.?be(?:\.com)?\/?.*?(?:watch|embed)?(?:.*v=|v\/|watch%3Fv%3D|\/)([\w\-_]+)&?/i,url:"https://www.youtube.com/embed/[ID]?enablejsapi=1&rel=0&autoplay=1",share:"https://www.youtube.com/watch?v=[ID]",poster:"https://img.youtube.com/vi/[ID]/maxresdefault.jpg",thumb:"https://img.youtube.com/vi/[ID]/default.jpg",play:{event:"command",func:"playVideo"},pause:{event:"command",func:"pauseVideo"}},vimeo:{reg:/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/)?(\d+)(?:[a-zA-Z0-9_\-]+)?/i,url:"https://player.vimeo.com/video/[ID]?autoplay=1&api=1",share:"https://vimeo.com/[ID]",poster:"https://vimeo.com/api/v2/video/[ID].json",play:{event:"command",method:"play"},pause:{event:"command",method:"pause"}},dailymotion:{reg:/(?:www\.)?(?:dailymotion\.com(?:\/embed)(?:\/video|\/hub)|dai\.ly)\/([0-9a-z]+)(?:[\-_0-9a-zA-Z]+#video=(?:[a-zA-Z0-9_\-]+))?/i,url:"https://dailymotion.com/embed/video/[ID]?autoplay=1&api=postMessage",share:"https://www.dailymotion.com/video/[ID]",poster:"https://www.dailymotion.com/thumbnail/video/[ID]",thumb:"https://www.dailymotion.com/thumbnail/video/[ID]",play:"play",pause:"pause"},wistia:{reg:/(?:www\.)?(?:wistia\.(?:com|net)|wi\.st)\/(?:(?:m|medias|projects)|embed\/(?:iframe|playlists))\/([a-zA-Z0-9_\-]+)/i,url:"https://fast.wistia.net/embed/iframe/[ID]?version=3&enablejsapi=1&html5=1&autoplay=1",share:"https://fast.wistia.net/embed/iframe/[ID]",poster:"https://fast.wistia.com/oembed?url=https://home.wistia.com/medias/[ID].json",play:{event:"cmd",method:"play"},pause:{event:"cmd",method:"pause"}}}},e.socialMedia=function(){return{facebook:"https://www.facebook.com/sharer/sharer.php?u=[url]",googleplus:"https://plus.google.com/share?url=[url]",twitter:"https://twitter.com/intent/tweet?text=[text]&url=[url]",pinterest:"https://www.pinterest.com/pin/create/button/?url=[url]&media=[image]&description=[text]",linkedin:"https://www.linkedin.com/shareArticle?url=[url]&mini=true&title=[text]",reddit:"https://www.reddit.com/submit?url=[url]&title=[text]",stumbleupon:"https://www.stumbleupon.com/badge?url=[url]&title=[text]",tumblr:"https://www.tumblr.com/share?v=3&u=[url]&t=[text]",blogger:"https://www.blogger.com/blog_this.pyra?t&u=[url]&n=[text]",buffer:"https://bufferapp.com/add?url=[url]title=[text]",digg:"https://digg.com/submit?url=[url]&title=[text]",evernote:"https://www.evernote.com/clip.action?url=[url]&title=[text]"}},e.createDOM=function(){this.DOM={};for(var e="holder overlay slider item item-inner ui top-bar bottom-bar share-tooltip counter caption caption-inner thumbs-holder thumbs-inner".split(" "),i=0;i<e.length;i++)this.DOM[t.camelize(e[i])]=t.createEl("div",this.pre+"-"+e[i]);this.appendDOM(this.DOM)},e.appendDOM=function(e){var i=this.options;e.holder.appendChild(e.overlay),e.holder.appendChild(e.slider),e.holder.appendChild(e.ui);for(var s=0;5>s;s++){var o=e.item.cloneNode(!0);o.appendChild(e.itemInner.cloneNode(!0)),e.slider.appendChild(o),this.slides[s]=o}this.slides.length=e.slider.children.length,this.createUI(e,i),e.holder.setAttribute("tabindex",-1),e.holder.setAttribute("aria-hidden",!0),this.DOM.comment=document.createComment(" ModuloBox (v1.0.5) by Themeone "),document.body.appendChild(this.DOM.comment),t.dispatchEvent(this,"modulobox","beforeAppendDOM",e),document.body.appendChild(e.holder),e.topBar.height=e.topBar.clientHeight},e.createUI=function(e,i){var s=i.controls.indexOf("share");if(-1<s){for(var o=i.shareButtons,n=o.length;n--;)this.socialMedia.hasOwnProperty(o[n])||o.splice(n,1);o.length?(e.ui.appendChild(e.shareTooltip),i.shareText&&(e.shareTooltip.appendChild(t.createEl("span")).textContent=i.shareText),this.createButtons(o,e.shareTooltip,"shareOn")):i.controls.splice(s,1)}(i.controls.length||i.counterMessage)&&(s=i.controls.indexOf("play"),e.ui.appendChild(e.topBar),i.counterMessage&&e.topBar.appendChild(e.counter),1>i.slideShowInterval&&-1<s&&i.controls.splice(s,1),i.countTimer&&-1<s&&((s=this.DOM.timer=t.createEl("canvas",this.pre+"-timer")).setAttribute("width",48),s.setAttribute("height",48),e.topBar.appendChild(s)),i.controls.length&&(s=i.controls.slice(),this.createButtons(s.reverse(),e.topBar))),(i.caption||i.thumbnails)&&(e.ui.appendChild(e.bottomBar),i.caption&&e.bottomBar.appendChild(e.caption).appendChild(e.captionInner),i.thumbnails&&e.bottomBar.appendChild(e.thumbsHolder).appendChild(e.thumbsInner)),i.prevNext&&this.createButtons(["prev","next"],e.ui)},e.createButtons=function(e,i,s){for(var o=e.length,n=0;n<o;n++){var r=e[n];this.buttons[r]=t.createEl("BUTTON",this.pre+"-"+r.toLowerCase()),i.appendChild(this.buttons[r]),(r&&"function"==typeof this[r]||s)&&(this.buttons[r].event=s||r,this.buttons[r].action=r,"shareOn"===s&&this.buttons[r].setAttribute("title",r.charAt(0).toUpperCase()+r.slice(1)))}},e.getGalleries=function(){this.galleries={};var e="";if(!(i=this.options.mediaSelector))return!1;try{e=document.querySelectorAll(i)}catch(e){t.error('Your current mediaSelector is not a valid selector: "'+i+'"')}for(var i=0,s=e.length;i<s;i++){var o=e[i],n={};if(n.src="A"===o.tagName?o.getAttribute("href"):null,n.src="IMG"===o.tagName?o.currentSrc||o.src:n.src,n.src=o.getAttribute("data-src")||n.src,n.src&&(this.getMediaAtts(o,n),this.setMediaType(n),n.type)){this.getMediaThumb(o,n),this.getVideoThumb(n),this.getMediaCaption(o,n),this.setMediaCaption(n);var r=this.setGalleryName(o);this.setGalleryFeatures(r,n),n.index=r.length,r.push(n),this.setMediaEvent(o,r.name,n.index)}}t.dispatchEvent(this,"modulobox","updateGalleries",this.galleries)},e.addMedia=function(e,i){if(!i||"object"!=typeof i)return t.error("No media was found to addMedia() in a gallery"),!1;e=""===e?1:e;var s=this.galleries[e];(s=s||(this.galleries[e]=[])).name=e;for(var o=i.length,n=0;n<o;n++){var r=t.cloneObject(i[n]);r.src&&(this.setMediaType(r),this.getVideoThumb(r),this.setMediaCaption(r),this.setGalleryFeatures(s,r),r.index=s.length,s.push(r))}},e.setMediaType=function(t){if(!(-1<["image","video","iframe","HTML"].indexOf(t.type))){t.type=null;var e=t.src?t.src:null,i=(e.split(/[?#]/)[0]||e).substr(2+(~-e.lastIndexOf(".")>>>0));if(/(jpg|jpeg|png|bmp|gif|tif|tiff|jfi|jfif|exif|svg)/.test(i)||-1<["external.xx.fbcdn","drscdn.500px.org"].indexOf(e))t.type="image",t.src=this.getSrc(e);else if(/(mp4|webm|ogv)/.test(i))t.type="video",t.format="html5";else{var s,o=this.iframeVideo;for(s in o)if(o.hasOwnProperty(s)&&(i=e.match(o[s].reg))&&i[1]){e=o[s],t.type="video",t.format=s,t.share=e.share.replace("[ID]",i[1]),t.src=e.url.replace("[ID]",i[1]),t.pause=e.pause,t.play=e.play,this.options.videoThumbnail&&(t.poster=!t.poster&&e.poster?e.poster.replace("[ID]",i[1]):t.poster,t.thumb=!t.thumb&&e.poster?e.poster.replace("[ID]",i[1]):t.thumb);break}}}},e.getSrc=function(t){var e=(t||"").split(/,/),i=e.length,s=0;if(1>=i)return t;for(var o=0;o<i;o++){var n=e[o].replace(/\s+/g," ").trim().split(/ /),r=parseFloat(n[1])||0;("w"===(n[1]?n[1].slice(-1):null)&&screen.width>=r&&r>s||!r||0===o)&&(s=r,t=n[0])}return t},e.getMediaAtts=function(t,e){var i=this.options.autoCaption,s=this.getAttr(t);e.type=e.type?e.type:s.type||t.getAttribute("data-type"),e.title=s.title||t.getAttribute("data-title")||(i?t.getAttribute("title"):null),e.desc=s.desc||t.getAttribute("data-desc")||(i?t.getAttribute("alt"):null),e.thumb=s.thumb||t.getAttribute("data-thumb"),e.poster=this.getSrc(s.poster||t.getAttribute("data-poster")),e.width=s.width||t.getAttribute("data-width"),e.height=s.height||t.getAttribute("data-height"),e.title===e.desc&&(e.desc=null)},e.getMediaThumb=function(t,e){var i=t.getElementsByTagName("img");!e.thumb&&i[0]&&(e.thumb=i[0].src)},e.getVideoThumb=function(t){if(this.options.videoThumbnail&&"video"===t.type&&"html5"!==t.format){var e=t.poster&&-1<t.poster.indexOf(".json"),i=t.thumb&&-1<t.thumb.indexOf(".json");if(e||i){var e=e?t.poster:t.thumb,s=new XMLHttpRequest;s.onload=function(e){e=e.target.responseText,(e=(e=JSON.parse(e)).hasOwnProperty(0)?e[0]:e)&&(t.poster=e.thumbnail_large||e.thumbnail_url,t.dom&&(t.dom.style.backgroundImage='url("'+t.poster+'")'),i&&(e=e.thumbnail_small||e.thumbnail_url,"object"==typeof t.thumb?t.thumb.style.backgroundImage='url("'+e+'")':t.thumb=e))}.bind(this),s.open("GET",encodeURI(e),!0),setTimeout(function(){s.send()},0)}}},e.getMediaCaption=function(t,e){var i=t.nextElementSibling;i&&"FIGCAPTION"===i.tagName&&(i=i.innerHTML,e.title?e.desc||(e.desc=i):e.title=i)},e.setMediaCaption=function(t){t.title=t.title?'<div class="'+this.pre+'-title">'+t.title.trim()+"</div>":"",t.desc=t.desc?'<div class="'+this.pre+'-desc">'+t.desc.trim()+"</div>":"",t.caption=t.title+t.desc},e.getGalleryName=function(t){for(var e=0;t&&2>e;){if((t=t.parentNode)&&"FIGURE"===t.tagName&&t.parentNode)return t.parentNode.getAttribute("id");e++}},e.setGalleryName=function(t){var e=(e=(e=this.getAttr(t).rel||t.getAttribute("data-rel"))||this.getGalleryName(t))?e:Object.keys(this.galleries).length+1;return t=(t=this.galleries[e])?t:this.galleries[e]=[],t.name=e,t},e.setGalleryFeatures=function(t,e){t.zoom||"image"!==e.type||(t.zoom=!0),t.download||"image"!==e.type&&"html5"!==e.format||(t.download=!0)},e.setMediaEvent=function(t,e,i){t.mobxListener&&t.removeEventListener("click",t.mobxListener,!1),t.mobxListener=this.open.bind(this,e,i),t.addEventListener("click",t.mobxListener,!1),"undefined"!=typeof jQuery&&jQuery(t).on("click",t.mobxListener)},e.open=function(e,i,s){return s&&(s.preventDefault(),s.stopPropagation()),!!this.GUID&&(this.galleries.hasOwnProperty(e)?this.galleries[e].length?this.galleries[e][i]?(t.dispatchEvent(this,"modulobox","beforeOpen",e,i),this.slides.index=i,this.gallery=this.galleries[e],this.gallery.name=e,this.gallery.index=i,this.gallery.loaded=!1,this.removeContent(),this.wrapAround(),this.hideScrollBar(),this.setSlider(),this.setThumbs(),this.setCaption(),this.setMedia(this.options.preload),this.updateMediaInfo(),this.replaceState(),this.setControls(),this.bindEvents(!0),this.show(),this.options.videoAutoPlay&&this.appendVideo(),this.options.slideShowAutoPlay&&-1<this.options.controls.indexOf("play")&&(!this.options.videoAutoPlay||"video"!==this.galleries[e][i].type)&&this.startSlideShow(),this.states.zoom=!1,void(this.states.open=!0)):(t.error("Sorry, no media was found for the current media index: "+i),!1):(t.error("Sorry, no media was found for the current gallery."),!1):(t.error('This gallery name : "'+e+'", does not exist!'),!1))},e.openFromQuery=function(){var t=this.getQueryString(window.location.search);t.hasOwnProperty("guid")&&t.hasOwnProperty("mid")&&!1===this.open(decodeURIComponent(t.guid),decodeURIComponent(t.mid)-1)&&this.replaceState(!0)},e.show=function(){var e=this.DOM.holder,i=this.options.rightToLeft?"add":"remove";e.setAttribute("aria-hidden",!1),t.removeClass(e,this.pre+"-idle"),t.removeClass(e,this.pre+"-panzoom"),t.removeClass(e,this.pre+"-will-close"),t[i+"Class"](e,this.pre+"-rtl"),t.addClass(e,this.pre+"-open")},e.close=function(e){e&&e.preventDefault(),e=this.DOM.holder;var i=this.gallery;t.dispatchEvent(this,"modulobox","beforeClose",i?i.name:"undefined",i?i.index:"undefined"),this.states.fullScreen&&(this.exitFullScreen(),t.removeClass(e,this.pre+"-fullscreen")),this.share(),this.stopSlideShow(),this.pauseVideo(),this.bindEvents(!1),this.replaceState(!0),this.hideScrollBar(),e.setAttribute("aria-hidden",!0),t.removeClass(e,this.pre+"-open"),this.states.open=!1},e.setControls=function(){var t=this.gallery,e=this.options,i=this.buttons;this.DOM.counter&&(this.DOM.counter.style.display=1<t.initialLength?"":"none"),-1<e.controls.indexOf("play")&&(i.play.style.display=1<t.initialLength?"":"none"),-1<e.controls.indexOf("zoom")&&(i.zoom.style.display=t.zoom?"":"none"),-1<e.controls.indexOf("download")&&(i.download.style.display=t.download?"":"none"),this.setPrevNextButtons()},e.setPrevNextButtons=function(){if(this.options.prevNext){var t=680>this.slider.width&&this.browser.touchDevice&&!this.options.prevNextTouch;this.buttons.prev.style.display=this.buttons.next.style.display=1<this.gallery.length&&!t?"":"none"}},e.setCaption=function(){this.states.caption=!(!this.options.captionSmallDevice&&(480>=this.slider.width||480>=this.slider.height)),this.DOM.caption.style.display=this.states.caption?"":"none"},e.hideScrollBar=function(){if(!this.options.scrollBar){var t=this.states.open;document.body.style.overflow=document.documentElement.style.overflow="undefined"!==t&&t?"":"hidden"}},e.bindEvents=function(e){var i,s,o=window,n=document,r=this.options,a=this.DOM.holder,h=this.buttons;for(s in h)h.hasOwnProperty(s)&&t.handleEvents(this,"share"!==s?h[s]:o,["click","touchend"],h[s].event,e);t.handleEvents(this,a,this.dragEvents.start,"touchStart",e),t.handleEvents(this,o,["keydown"],"keyDown",e),t.handleEvents(this,o,["resize","orientationchange"],"resize",e),t.handleEvents(this,a,["transitionend","webkitTransitionEnd","oTransitionEnd","otransitionend","MSTransitionEnd"],"opened"),t.handleEvents(this,a,["touchend"],"disableZoom",e),this.browser.fullScreen&&t.handleEvents(this,n,[this.browser.fullScreen.change],"toggleFullScreen",e),r.history&&t.handleEvents(this,o,["mouseout"],"mouseOut",e),0<r.timeToIdle&&t.handleEvents(this,a,["mousemove"],"mouseMove",e),r.contextMenu||t.handleEvents(this,a,["contextmenu"],"contextMenu",e),r.mouseWheel||this.disableScroll(e),r.scrollToZoom?i="scrollToZoom":r.scrollToNav?i="scrollToNav":r.scrollToClose&&(i="scrollToClose"),i&&t.handleEvents(this,a,[this.browser.mouseWheel],i,e)},e.opened=function(e){if("visibility"===e.propertyName&&e.target===this.DOM.holder){e=this.gallery.name;var i=this.gallery.index;this.states.open?t.dispatchEvent(this,"modulobox","afterOpen",e,i):(this.removeContent(),t.dispatchEvent(this,"modulobox","afterClose",e,i))}},e.mouseOut=function(t){(t=(t=t||window.event).relatedTarget||t.toElement)&&"HTML"!==t.nodeName||this.replaceState()},e.mouseMove=function(){var e=this.DOM.holder,i=this.pre+"-idle";clearTimeout(this.states.idle),this.states.idle=setTimeout(function(){t.hasClass(e,this.pre+"-open-tooltip")||t.addClass(e,i)}.bind(this),this.options.timeToIdle),t.removeClass(e,i)},e.contextMenu=function(t){var e=(i=t.target).tagName,i=i.className;("IMG"===e||"VIDEO"===e||-1<i.indexOf(this.pre+"-video")||-1<i.indexOf(this.pre+"-thumb-bg")||i===this.pre+"-thumb")&&t.preventDefault()},e.disableScroll=function(t){var e=document,i=window,s=function(t){if(this.isEl(t)&&(t=t||i.event).preventDefault)return t.preventDefault(),t.returnValue=!1};i.onwheel=i.ontouchmove=i.onmousewheel=e.onmousewheel=e.onmousewheel=t?s.bind(this):null},e.scrollToZoom=function(t){if(this.isEl(t)){var e=this.normalizeWheel(t);if(e&&e.deltaY){var i=(i=this.getCell()).attraction.s||i.position.s,i=Math.min(this.options.maxZoom,Math.max(1,i-Math.abs(e.deltaY)/e.deltaY));this.stopSlideShow(),this.zoomTo(t.clientX,t.clientY,Math.round(10*i)/10)}}},e.scrollToNav=function(t){this.isEl(t)&&(t=this.normalizeWheel(t))&&t.delta&&this[0>t.delta*this.isRTL()?"prev":"next"]()},e.scrollToClose=function(t){this.isEl(t)&&(t.preventDefault(),this.close())},e.disableZoom=function(t){"VIDEO"!==t.target.tagName&&t.preventDefault()},e.resize=function(e){this.DOM.topBar.height=this.DOM.topBar.clientHeight,this.share(),this.setSlider(),this.setThumbsPosition(),this.setCaption(),this.resizeMedia(),this.updateMediaInfo(),this.setPrevNextButtons(),this.states.zoom=!1,t.removeClass(this.DOM.holder,this.pre+"-panzoom"),t.dispatchEvent(this,"modulobox","resize",e)},e.resizeMedia=function(){for(var t=this.slides,e=0;e<t.length&&this.gallery;e++){var i=this.gallery[t[e].media];i&&(i.dom&&i.dom.loaded||i.dom&&-1<["video","iframe","HTML"].indexOf(i.type))&&this.setMediaSize(i,t[e])}},e.isEl=function(t){return t=t.target.className,-1<(t="string"==typeof t?t:t.baseVal).indexOf(this.pre)},e.isZoomable=function(){var t=this.getMedia(),e=!1;return"image"===t.type&&t.dom&&t.dom.size&&1<t.dom.size.scale&&(e=!0),this.DOM.holder.setAttribute("data-zoom",e),e},e.isDownloadable=function(){var t=this.getMedia(),e=!0;return"image"!==t.type&&"html5"!==t.format&&(e=!1),this.DOM.holder.setAttribute("data-download",e),e},e.isRTL=function(){return this.options.rightToLeft?-1:1},e.addAttr=function(t,e){if(void 0===t[this.expando]){var i=this.cache.uid++;t[this.expando]=i,this.cache[i]={}}else i=t[this.expando];for(var s in e)e.hasOwnProperty(s)&&(this.cache[i][s]=e[s])},e.getAttr=function(t){return this.cache[t[this.expando]]||{}},e.getThumbHeight=function(){var t=this.thumbs;return 0<t.height&&0<t.width?t.height+2*Math.min(10,t.gutter):0},e.getMedia=function(){var t=this.gallery;return t?t[t.index]:null},e.getCell=function(){var e=this.slides,e=t.modulo(e.length,e.index);return this.cells[e]},e.removeContent=function(){for(var t=0;t<this.slides.length;t++){var e=this.slides[t];this.unloadMedia(e),this.removeMedia(e),e.index=e.media=null}this.removeMedia(this.DOM.thumbsHolder)},e.getQueryString=function(t){var e={};return t.substr(1).split("&").forEach(function(t){t=t.split("="),e[decodeURIComponent(t[0])]=1<t.length?decodeURIComponent(t[1]):""}),e},e.setQueryString=function(t){var e,i=window.location.search,s=this.getQueryString(i),i=decodeURI(i);for(e in t)if(t.hasOwnProperty(e)){var o=encodeURIComponent(t[e]);if(s.hasOwnProperty(e)){var n=s[e];o?i=i.replace(e+"="+n,e+"="+o):(i=i.replace("&"+e+"="+n,""),i=i.replace(e+"="+n,""))}else i=o?i+(i?"&":"?")+e+"="+o:i.replace(e+"=","")}return t=[location.protocol,"//",location.host,location.pathname].join(""),i=i.substr(1)?i:i.substr(1),encodeURI(t+i)},e.replaceState=function(e){if((this.options.history||e)&&this.browser.pushState&&!this.states.push){var i=window.history.state;if(e={guid:e?"":this.gallery.name,mid:e?"":t.modulo(this.gallery.initialLength,this.gallery.index)+1},!i||i.mid!==e.mid){i=this.setQueryString(e);try{window.history.replaceState(e,"",i)}catch(e){this.options.history=!1,t.error("SecurityError: A history state object with origin 'null' cannot be created. Please run the script on a server.")}}}this.states.push=!1},e.normalizeWheel=function(t){var e,i,s=t||window.event,o=null;return t.preventDefault(),"detail"in s&&(i=-1*s.detail),"wheelDelta"in s&&(i=-1*s.wheelDelta),"wheelDeltaY"in s&&(i=-1*s.wheelDeltaY),"wheelDeltaX"in s&&(e=-1*s.wheelDeltaX),"deltaY"in s&&(i=s.deltaY),"deltaX"in s&&(e=-1*s.deltaX),1===s.deltaMode?(e*=40,i*=40):2===s.deltaMode&&(e*=100,i*=100),t=Math.abs(e)>Math.abs(i)?e:i,t=Math.min(100,Math.max(-100,t)),Math.abs(t)<this.options.scrollSensitivity?(this.states.prevDelta=t,o):(s=+new Date,(Math.abs(t)>Math.abs(this.states.prevDelta)||60<s-this.states.prevScroll)&&(o={deltaX:e,deltaY:i,delta:t}),this.states.prevDelta=t,this.states.prevScroll=s,o)},e.share=function(e){if(!e||"VIDEO"!==e.target.tagName){var i=this.DOM.holder,s=this.pre+"-open-tooltip",o=e?e.target.className:null,n=t.hasClass(i,s)?"remove":"add";("remove"!==n||o===this.pre+"-share"&&e)&&o!==this.pre+"-share"||("add"===n&&this.setShareTooltip(),t[n+"Class"](i,s))}},e.shareOn=function(e){var i=e.target.action,s=this.gallery,o=this.getMedia();if(e="image"===o.type?o.src:o.poster,i=this.socialMedia[i]){"page"===this.options.sharedUrl?s=[location.protocol,"//",location.host,location.pathname].join(""):"deeplink"===this.options.sharedUrl||-1<["iframe","HTML"].indexOf(o.type)?s=this.setQueryString({guid:s.name,mid:s.index+1}):(s=o.src.replace(/\s/g,"").split(",")[0],"video"===o.type&&"html5"!==o.format&&(s=o.share));var n=t.createEl("a");n.href=e,e=n.href,n.href=s,s=n.href,(n=t.createEl("div")).innerHTML=o.caption,o=(n.textContent||n.innerText).replace(/\s+/g," ").trim()||"",(i=i.replace("[url]",encodeURIComponent(s)).replace("[image]",encodeURIComponent(e)).replace("[text]",encodeURIComponent(o||document.title)))&&window.open(i,this.pre+"_share","status=0,resizable=1,location=1,toolbar=0,width=626,height=436,top="+Math.round(window.screenY+(window.outerHeight-436)/2)+",left="+Math.round(window.screenX+(window.outerWidth-626)/2))}else t.error("This social share media does not exist");return!1},e.setShareTooltip=function(){if(-1<this.options.controls.indexOf("share")){var t="right",e=this.DOM.shareTooltip,i=e.clientWidth,s=this.buttons.share.getBoundingClientRect();0>(i=s.left-i+s.width/2+20)&&(t="left",i=s.left+s.width/2-20),e.setAttribute("data-position",t),e.style.top=this.DOM.topBar.height+6+"px",e.style.left=i+"px"}},e.download=function(){if(!this.isDownloadable())return!1;var t=this.getMedia().src.replace(/\s/g,"").split(",")[0],e=document.createElement("a");e.href=t,e.download=(new Date).getTime(),e.setAttribute("target","_blank"),document.body.appendChild(e),e.click(),document.body.removeChild(e)},e.fullScreen=function(){document[this.browser.fullScreen.element]?this.exitFullScreen():this.requestFullScreen()},e.toggleFullScreen=function(){var e=this.DOM.holder,i=document[this.browser.fullScreen.element];i?i===e&&(this.setShareTooltip(),this.states.fullScreen=!0,t.addClass(e,this.pre+"-fullscreen")):(this.share(),this.states.fullScreen=!1,t.removeClass(e,this.pre+"-fullscreen")),this.videoFullScreen()},e.requestFullScreen=function(){var t=this.browser.fullScreen.request;document.documentElement[t]&&this.DOM.holder[t]()},e.exitFullScreen=function(){var t=this.browser.fullScreen.exit;document[t]&&document[t]()},e.play=function(){this.states.play?this.stopSlideShow():this.startSlideShow()},e.startSlideShow=function(){var e=0,i=this.gallery,s=this.options,o=this.states.loop,n=s.slideShowAutoStop,r=Math.max(120,s.slideShowInterval),a=s.countTimer,h=a&&this.DOM.timer?this.DOM.timer.getContext("2d"):null,l=function(t){if(t=t||+new Date,e=e||t,o&&!n||i.index!==i.initialLength-1){if(a&&h){var d=Math.PI/180*Math.min(1,(t-e+r)/r-1)*360;h.clearRect(0,0,48,48),this.timerProgress(h,s.countTimerBg,100),this.timerProgress(h,s.countTimerColor,d)}t>=e+r&&(e=t,this.slideTo(this.slides.index+1,!0)),this.timer=requestAnimationFrame(l)}else this.stopSlideShow()}.bind(this);t.addClass(this.DOM.holder,this.pre+"-autoplay"),this.states.play=!0,this.timer=requestAnimationFrame(l)},e.stopSlideShow=function(){cancelAnimationFrame(this.timer),t.removeClass(this.DOM.holder,this.pre+"-autoplay"),this.states.play=!1},e.timerProgress=function(t,e,i){var s=1.5*Math.PI;t.strokeStyle=e,t.lineWidth=5,t.beginPath(),t.arc(24,24,18,s,s+i,!1),t.stroke()},e.appendVideo=function(){var e=this.getMedia();if("video"===e.type){if(t.addClass(e.dom,this.pre+"-loading"),t.removeClass(e.dom,this.pre+"-playing"),!e.video){if("html5"===e.format){e.video=t.createEl("video"),e.video.setAttribute("controls",""),e.video.setAttribute("autoplay","");for(var i=e.src.replace(/\s/g,"").split(","),s=0;s<i.length;s++){var o=document.createDocumentFragment(),n=t.createEl("source"),r=/^.+\.([^.]+)$/.exec(i[s]);r&&-1<["mp4","webm","ogv"].indexOf(r[1])&&(n.src=i[s],n.setAttribute("type","video/"+("ogv"===r[1]?"ogg":r[1])),o.appendChild(n)),e.video.appendChild(o)}}else e.format&&(e.video=t.createEl("iframe"),e.video.src=e.src,e.video.setAttribute("frameborder",0),e.video.setAttribute("allowfullscreen",""));e.video.setAttribute("width","100%"),e.video.setAttribute("height","100%")}e.dom.firstChild||(e.dom.appendChild(e.video),"html5"!==e.format&&(e.video.loaded=!1)),this.playVideo(e)}},e.onVideoLoaded=function(e){e.video.loaded=!0,t.removeClass(e.dom,this.pre+"-loading"),t.addClass(e.dom,this.pre+"-playing"),this.cloneVideo(e)},e.cloneVideo=function(e){if(this.states.loop&&"html5"===e.format)for(var i=this.gallery,s=i.length,o=i.initialLength,n=t.modulo(o,e.index),r=0;r<s;r++)t.modulo(o,i[r].index)===n&&i[r].index!==e.index&&(i[r].video=e.video)},e.videoFullScreen=function(){var t=this.getMedia(),e=this.states.fullScreen;"video"===t.type&&"html5"!==t.format&&t.video&&t.video[e?"removeAttribute":"setAttribute"]("allowfullscreen","")},e.playVideo=function(e){if(e.video.loaded)if(e.video.getClientRects(),t.removeClass(e.dom,this.pre+"-loading"),t.addClass(e.dom,this.pre+"-playing"),"html5"!==e.format){if(e.play){var i="object"==typeof e.play?JSON.stringify(e.play):String(e.play);e.video.contentWindow.postMessage(i,"*")}}else e.video.error||("function"==typeof MediaElementPlayer&&"undefined"!=typeof jQuery&&this.options.mediaelement?((i="VIDEO"===e.video.tagName?e.video:e.video.getElementsByTagName("video")[0]).player&&i.player.setControlsSize(),i.play()):e.video.play());else{var s=this;"undefined"==typeof jQuery||"function"!=typeof MediaElementPlayer||e.play||!this.options.mediaelement||e.video.player?e.video.onload||(e.video.onload=e.video.onerror=e.video.onloadedmetadata=function(){e.dom.firstChild&&(s.onVideoLoaded(e),s.videoFullScreen())},e.video.src=e.src.replace(/\s/g,"").split(",")[0]):MediaElementPlayer(e.video,{features:"playpause stop current progress duration volume fullscreen".split(" "),videoVolume:"horizontal",startVolume:.8,keyActions:!1,enableKeyboard:!1,iPadUseNativeControls:!0,iPhoneUseNativeControls:!0,AndroidUseNativeControls:!0,success:function(t){t.addEventListener("loadeddata",function(){if(e.video=e.dom.lastChild,e.video){var t=e.video.previousSibling;t&&t.parentNode&&t.parentNode.removeChild(t),s.onVideoLoaded(e)}},e,!1)},error:function(){s.onVideoLoaded(e)}})}},e.pauseVideo=function(){var e=this.getMedia();if(e&&"video"===e.type&&e.video)if(t.removeClass(e.dom,this.pre+"-playing"),e.video.loaded)if("html5"===e.format)"function"==typeof MediaElementPlayer&&"undefined"!=typeof jQuery&&this.options.mediaelement?("VIDEO"===e.video.tagName?e.video:e.video.getElementsByTagName("video")[0]).pause():e.video.pause();else if(e.pause&&"dailymotion"!==e.format){var i="object"==typeof e.pause?JSON.stringify(e.pause):String(e.pause);e.video.contentWindow.postMessage(i,"*")}else e.dom.innerHTML="",e.video=null;else e.dom.innerHTML="",t.removeClass(e.dom,this.pre+"-loading")},e.insertMedia=function(t,e){var i=this.gallery[t];i&&(void 0===i.index&&(i.index=this.gallery.indexOf(i)),this.buildMedia(i),this.appendMedia(i,e),this.loadMedia(i,e))},e.buildMedia=function(e){if(void 0===e.dom){switch(e.type){case"image":e.dom=t.createEl("img",this.pre+"-img"),e.dom.src=e.src;break;case"video":e.dom=t.createEl("div",this.pre+"-video"),e.poster?e.dom.style.backgroundImage='url("'+e.poster+'")':e.dom.loaded=!0;break;case"iframe":e.dom=t.createEl("iframe",this.pre+"-iframe"),e.dom.setAttribute("allowfullscreen",""),e.dom.setAttribute("frameborder",0),e.dom.src=e.src;break;case"HTML":var i=document.querySelector(e.src);e.dom=t.createEl("div",this.pre+"-html"),e.dom.appendChild(t.createEl("div",this.pre+"-html-inner")),e.dom.firstChild.innerHTML=i?i.innerHTML:null,e.src=i||"",e.dom.loaded=!0}e.type&&e.src||(e.dom=t.createEl("div",this.pre+"-error"),e.dom.textContent=this.options.noContent,e.dom.loaded=!0,e.dom.error=!0,t.dispatchEvent(this,"modulobox","noContent",this.gallery.name,parseInt(e.index,10)))}},e.appendMedia=function(e,i){var s=this.slides[i],o=s.firstChild;if(o.childElementCount){var n=o.lastChild,r=o.firstChild;r.style.visibility="",e.dom!==n&&o[1===o.childElementCount?"appendChild":"replaceChild"](e.dom,n)}else n=document.createDocumentFragment(),r=t.createEl("div",this.pre+"-loader"),n.appendChild(r),n.appendChild(e.dom),o.appendChild(n);s.media=e.index},e.loadMedia=function(e,i){if(e.dom.loaded)this.showMedia(e,i);else{var s=this,o="iframe"===e.type?e.dom:e.dom.img=new Image,n=function(){e.dom.error||t.dispatchEvent(s,"modulobox","loadComplete",s.gallery.name,parseInt(e.index,10)),e.dom.loaded="iframe"!==e.type,s.showMedia(e,i)};o.onload=n,o.onerror=function(o){"video"!==e.type&&(e.dom=t.createEl("p",s.pre+"-error"),e.dom.textContent=s.options.loadError,e.dom.error=!0,s.appendMedia(e,i)),t.dispatchEvent(s,"modulobox","loadError",s.gallery.name,parseInt(e.index,10)),n()},o.src="video"===e.type?e.poster:e.src}},e.unloadMedia=function(t){this.gallery&&(t=this.gallery[t.media])&&t.dom&&(!this.options.unload||"image"!==t.type||t.dom.loaded||t.dom.complete||t.dom.naturalWidth?"video"===t.type&&"html5"!==t.format&&t.dom.firstChild&&(t.video=null,t.dom.removeChild(t.dom.firstChild)):(t.dom.onload=null,t.dom.onerror=null,t.dom.src="",t.dom.img&&(t.dom.img.onload=null,t.dom.img.onerror=null,t.dom.img.src="",delete t.dom.img),delete t.dom))},e.removeMedia=function(t){if(t=t.firstChild)for(;t.firstChild;)t.removeChild(t.firstChild)},e.showMedia=function(e,i){s=this.slider;if(!this.options.fadeIfSettle||s.settle||e.dom.revealed){var s=this.slides[i],o=this.gallery,n=s.firstChild.firstChild,r=this.options.preload;this.setMediaSize(e,s),e.index===o.index&&this.isZoomable(),t.addClass(e.dom,this.pre+"-media-loaded"),e.dom.revealed=!0,s.media===e.index&&(n.style.visibility="hidden",o.loaded+=1,o.loaded===r&&4>r&&this.setMedia(r+2)),"iframe"===e.type&&(e.dom.loaded=!1)}},e.setMediaSize=function(t,e){var i=t.dom,s=this.slider,o=i.viewport,n=this.getThumbHeight();i.error||(o&&o.width===s.width&&o.height===s.height-n||(this.getCaptionHeight(t,e),this.getMediaSize(t,e),this.fitMediaSize(t,e),this.setMediaOffset(t,e)),s=i.style,s.width=i.size.width+"px",s.height=i.size.height+"px",s.left=i.offset.left+"px",s.top=i.offset.top+"px")},e.getCaptionHeight=function(t,e){var i=this.DOM.captionInner,s=this.DOM.topBar.height,o=i.innerHTML,n=this.getThumbHeight();this.options.caption&&this.states.caption&&t.caption?(i.innerHTML=t.caption,i.height=Math.max(s,parseInt(i.clientHeight,10))||s,i.innerHTML=o):i.height=n?0:s,e.width=this.slider.width,e.height=this.slider.height-s-i.height-n},e.getMediaSize=function(t,e){var i=t.dom.size={};switch(t.type){case"image":i.width=t.dom.naturalWidth,i.height=t.dom.naturalHeight;break;case"video":i.width=this.options.videoMaxWidth,i.height=i.width/this.options.videoRatio;break;case"iframe":i.width=t.width?t.width:680<e.width?.8*e.width:e.width,i.height=t.height?t.height:e.height;break;case"HTML":i.width=t.width?t.width:e.width,i.height=t.height?t.height:e.height}},e.fitMediaSize=function(t,e){var i,s,o=this.slider,n=this.options,r=n.zoomTo,a=t.dom.size,h=a.width/a.height,l=this.getThumbHeight(),d=480>=o.width||680>=o.height,u=0>["video","iframe","HTML"].indexOf(t.type),p=[e.height];(n.smartResize&&d||n.overflow)&&u&&p.unshift(o.height-l),p.forEach(function(t){(!s||s<o.height-l)&&(i=Math.min(a.width,h*t),i=i>e.width?e.width:Math.round(i),s=Math.ceil(1/h*i),s=2>s%t?t:s)}),d=Number((a.width/i).toFixed(3)),t.dom.size={width:i,height:s,scale:d>=n.minZoom?Math.min(n.maxZoom,"auto"===r?d:r):1}},e.setMediaOffset=function(t,e){var i=t.dom.size,s=this.slider,o=this.DOM.topBar.height,n=this.getThumbHeight(),r=0;i.height<=e.height&&(r=o+.5*(e.height-i.height)),t.dom.offset={top:0>r?0:Math.round(r),left:Math.round(.5*(e.width-i.width))},t.dom.viewport={width:s.width,height:s.height-n}},e.mediaViewport=function(t){if(!(o=this.getMedia()).dom||!o.dom.size)return{top:0,bottom:0,left:0,right:0};var e=o.dom.size,i=o.dom.offset,s=this.slider.height,o=this.slider.width,n=.5*(s-e.height),r=(n=.5*(n-(r=2*i.top-n)))*t-2*n-r,i=e.width/2*(t-1)-i.left,a=e.height*t<=s?n*t:-e.height/2*(t-1)+s-e.height+r,s=e.height*t<=s?n*t:e.height/2*(t-1)+r;return{top:1>=t?0:Math.round(a),bottom:1>=t?0:Math.round(s),left:e.width*t<o?0:Math.round(i),right:e.width*t<o?0:Math.round(-i)}},e.setMedia=function(e){var i,s=this.gallery,o=this.slides,n=this.states.loop,r=this.isRTL(),a=Math.round(-r*this.slider.position.x/o.width),h=s.initialLength-1,l=0,r=[];if(!e&&!s.loaded){for(i=e=0;i<o.length;i++)o[i].firstChild.childElementCount&&e++;e+=2,s.loaded=this.options.preload}switch(e){case 0:case 1:r=[0];break;case 2:case 3:r=[-1,0,1];break;default:e=5,r=[-2,-1,0,1,2]}for(n||(i=a+r[e-1],e=a+r[0],l=0>e?-e:0,l=i>h?h-i:l),r=r.map(function(e){return t.modulo(s.length,e+l+a)}),i=0;i<o.length;i++)h=o[i],e=t.modulo(s.length,h.index),!n&&h.index>e||!(-1<r.indexOf(e))||h.media===e||(this.unloadMedia(h),this.insertMedia(e,i))},e.updateMediaInfo=function(){var e=this.gallery;e.index=t.modulo(e.length,this.slides.index),this.isZoomable(),this.isDownloadable(),this.updateCounter(),this.updateCaption(),this.updateThumbs(),t.dispatchEvent(this,"modulobox","updateMedia",this.getMedia())},e.setThumbs=function(){var e=this.thumbs,i=this.gallery.initialLength,s=this.DOM.thumbsHolder;if(!this.options.thumbnails||2>i)this.DOM.caption.style.bottom=0,s.style.visibility="hidden",s.style.height=0,e.height=e.gutter=0;else{for(var o=this.options.thumbnailSizes,n=Math.max(window.innerWidth,Math.max(screen.width,screen.height)),s=0,r=Object.keys(o).sort(function(t,e){return t-e}),e=0;e<r.length;e++){var a=r[e],h=Math.ceil((e===r.length-1?n:Math.min(n,a))/(o[a].width+o[a].gutter)*2);if(isFinite(h)&&h>s&&(s=h),a>=n)break}for(o=document.createDocumentFragment(),i=50<i?Math.min(s,i):i,e=0;e<i;e++)s=t.createEl("div",this.pre+"-thumb"),o.appendChild(s);this.DOM.thumbsInner.appendChild(o),this.setThumbsPosition()}},e.thumbClick=function(e){e=e.target,t.hasClass(e,this.pre+"-thumb")||(e=e.parentNode),0<=parseInt(e.index,10)&&this.slideTo(e.index)},e.loadThumb=function(e,i){var s=this.gallery[i];if(!s.thumb||"object"!=typeof s.thumb){var o=s.thumb;s.thumb=t.createEl("div",this.pre+"-thumb-bg"),s.thumb.style.backgroundImage=o&&0>o.indexOf(".json")?"url("+o+")":null,"video"===s.type&&(t.addClass(s.thumb,this.pre+"-thumb-video"),t.addClass(s.thumb,this.pre+"-thumb-loaded"))}if(e[e.firstChild?"replaceChild":"appendChild"](s.thumb,e.firstChild),e.media=i,o){var n=new Image;n.onload=function(){t.addClass(s.thumb,this.pre+"-thumb-loaded")}.bind(this),n.src=o}},e.updateThumbs=function(){e=this.gallery;if(this.options.thumbnails&&!(2>e.initialLength)){var e=this.thumbs,i=this.getThumbPosition(e);e.stopAnimate(),i===e.position.x?this.shiftThumbs(e):Math.abs(i-e.position.x)>50*e.size?(this.DOM.thumbsHolder.style.visibility="hidden",e.position.x=i,t.translate(this.DOM.thumbsInner,i,0),this.renderThumbs(e),this.DOM.thumbsHolder.style.visibility=""):(e.startAnimate(),e.releaseDrag(),e.animateTo({x:i}))}},e.updateCaption=function(){if(this.options.caption){var t=(t=this.getMedia()).caption?t.caption:"",e=this.DOM.captionInner;e.innerHTML!==t&&(e.innerHTML=t)}},e.updateCounter=function(){if(this.options.counterMessage){var e=(i=this.gallery).initialLength,i=t.modulo(e,i.index),e=this.options.counterMessage.replace("[index]",i+1).replace("[total]",e);(i=this.DOM.counter).textContent!==e&&(i.textContent=e)}},e.wrapAround=function(){var e=this.options.loop,i=this.gallery,s=i.length;if(i.initialLength||(i.initialLength=s),this.states.loop=!!(e&&e<=s),this.states.loop&&s<this.slides.length)for(var e=Math.ceil(this.slides.length/s)*s-s,o=0;o<e;o++){var n=s+o;i[n]=t.cloneObject(i[t.modulo(s,o)]),i[n].index=n}},e.setSlider=function(){var t=this.slider,e=this.slides;this.setSizes(t,e),this.setSliderPosition(t,e),this.setSlidesPositions(e),this.DOM.overlay.style.opacity=1},e.setSizes=function(t,e){t.width=document.body.clientWidth,t.height=window.innerHeight,e.width=t.width+Math.round(t.width*this.options.spacing)},e.setSlidesPositions=function(t){for(var e=0;e<t.length;e++)t[e].position=null,this.setCellPosition(e);this.shiftSlides()},e.setThumbsPosition=function(){if(this.options.thumbnails&&!(2>this.gallery.initialLength)){for(var e,i=this.thumbs,s=this.slider,o=this.DOM.thumbsHolder,n=this.DOM.thumbsInner,r=this.options.thumbnailSizes,a=this.options.rightToLeft,h=Object.keys(r).sort(function(t,e){return e-t}),l=Math.max.apply(null,h),d=window.innerWidth,u=0;u<h.length;u++)e=Number(h[u]),d<=e&&(l=e);i.width=Number(r[l].width),i.gutter=Number(r[l].gutter),i.height=Number(r[l].height),i.size=i.width+i.gutter,i.length=this.gallery.initialLength,r=i.length*i.size,i.bound={left:0,right:r>s.width?s.width-r:0},a&&(i.bound.right=r>s.width?s.width-i.size:r-i.size,i.bound.left=r-i.size),"centered"===this.options.thumbnailsNav&&(i.bound={left:r>s.width?Math.floor(.5*s.width-.5*i.size):Math.floor(.5*r-.5*i.size),right:r>s.width?Math.ceil(.5*s.width-r+.5*i.size):-Math.ceil(.5*r-.5*i.size)},a&&(i.bound.right=i.bound.left,i.bound.left=i.bound.left+r-i.size)),i.resetAnimate(),h=this.getThumbPosition(i),i.position.x=h,t.translate(n,h,0),h=this.getThumbHeight(),o.style.visibility=h?"":"hidden",o.style.height=h?h+"px":"",n.style.height=h?i.height+Math.min(10,i.gutter)+"px":"",n.style.width=i.length*i.size+"px",n.style.right=r>s.width&&a?"auto":""}},e.getThumbPosition=function(e){var i=this.slider,s=this.gallery,o=this.options.thumbnailsNav,n=this.isRTL(),r=0>n?"right":"left",s=t.modulo(s.initialLength,s.index),i=.5*i.width-.5*e.size,s=e.bound[r]-s*e.size*n,s=e.bound[r]?s+(0>n&&"centered"!==o?-i:0):s+i;return Math.max(e.bound.right,Math.min(e.bound.left,s))},e.setCellPosition=function(e){this.cells[e].resetAnimate(),t.translate(this.slides[e].children[0],0,0,1)},e.setSliderPosition=function(e,i){var s=this.options.rightToLeft,o=-i.index*i.width,o=s?-o:o;e.resetAnimate(),e.position.x=e.attraction.x=o,e.bound={left:0,right:-(this.gallery.length-1)*i.width},s&&(e.bound.left=-e.bound.right,e.bound.right=0),t.translate(this.DOM.slider,o,0)},e.setAnimation=function(){var t=this.DOM.slider,e=this.options.friction,s=this.options.attraction;this.slider=new i(t,{x:0,y:0},Math.min(Math.max(e.slider,0),1),Math.min(Math.max(s.slider,0),1)),this.slider.on("settle.toanimate",this.settleSider.bind(this)),this.slider.on("render.toanimate",this.renderSlider.bind(this));for(var o=(t=t.children).length,n=0;n<o;n++)this.cells[n]=new i(t[n].children[0],{x:0,y:0,s:1},Math.min(Math.max(e.slide,0),1),Math.min(Math.max(s.slide,0),1)),this.cells[n].on("settle.toanimate",this.settleCell.bind(this)),this.cells[n].on("render.toanimate",this.renderCell.bind(this));this.thumbs=new i(this.DOM.thumbsInner,{x:0},Math.min(Math.max(e.thumbs,0),1),Math.min(Math.max(s.thumbs,0),1)),this.thumbs.on("settle.toanimate",this.settleThumbs.bind(this)),this.thumbs.on("render.toanimate",this.renderThumbs.bind(this))},e.settleSider=function(e){if(t.dispatchEvent(this,"modulobox","sliderSettled",e.position),this.states.open&&(this.setMedia(),this.replaceState()),this.options.fadeIfSettle)for(var i=this.slides,s=0;s<i.length;s++)(e=this.gallery[i[s].media]).dom.loaded&&this.showMedia(e,s)},e.settleCell=function(e){var i=this.gesture;i.closeBy&&t.dispatchEvent(this,"modulobox","panYSettled",null,e.position),(i.closeBy&&!1===i.canClose||!i.closeBy)&&t.dispatchEvent(this,"modulobox","panZoomSettled",null,e.position)},e.settleThumbs=function(e){t.dispatchEvent(this,"modulobox","thumbsSettled",null,e.position)},e.renderSlider=function(e){this.shiftSlides();var i=this.isRTL(),s=this.gallery.initialLength;e=t.modulo(s,-i*e.position.x/this.slides.width),t.dispatchEvent(this,"modulobox","sliderProgress",null,Math.min(1,Math.max(0,(e>s-.5?0:e)/(s-1))))},e.renderCell=function(e){if(this.willClose(e),"panY"===this.gesture.type||this.gesture.closeBy||"dragSlider"===this.gesture.type&&0!==e.position.y){var i=1-Math.abs(e.position.y)/(.5*this.slider.height);t.dispatchEvent(this,"modulobox","panYProgress",null,i)}"panY"!==this.gesture.type&&1!==e.position.s&&(i=e.position.s,t.dispatchEvent(this,"modulobox","panZoomProgress",null,i))},e.renderThumbs=function(e){this.shiftThumbs(e),t.dispatchEvent(this,"modulobox","thumbsProgress",null,e.bound.left!==e.bound.right?(e.bound.left-e.position.x)/(e.bound.left-e.bound.right):0)},e.touchStart=function(e){var i=e.target,s=i.tagName,o=i.className;3!==e.which&&i!==this.buttons.play&&this.stopSlideShow(),3===e.which||!this.isEl(e)||-1<["BUTTON","VIDEO","INPUT","A"].indexOf(s)||("IMG"===s&&1<this.gallery.length&&t.addClass(this.DOM.holder,this.pre+"-dragging"),e.preventDefault(),t.hasClass(this.DOM.holder,this.pre+"-open-tooltip")||(this.pointers.length||(this.gesture.canClose=void 0,t.handleEvents(this,window,this.dragEvents.move,"touchMove"),t.handleEvents(this,window,this.dragEvents.end,"touchEnd")),this.addPointer(e),0>o.indexOf("-thumb")?(this.slider.stopAnimate(),e=this.getCell(),(1!=Math.round(100*e.position.s)/100||2===this.pointers.length||this.gesture.closeBy)&&e.stopAnimate()):this.thumbs.stopAnimate(),this.gestures("start")))},e.touchMove=function(e){this.updatePointer(e);var i=this.gesture,s=this.pointers.length,o=this.isSliderSettle();this.switchPointers(),this.gestures("move"),i.type?(this[i.type](e),t.dispatchEvent(this,"modulobox",i.type+"Move",e,i),i.move=!0):(2===s&&o||Math.abs(i.dx)>this.options.threshold||Math.abs(i.dy)>this.options.threshold)&&(i.sx+=i.dx,i.sy+=i.dy,i.canZoom=this.isZoomable(),i.closeBy=!1,i.type=!(Math.abs(i.dx)<Math.abs(i.dy)/2)&&"dragSlider",i.type=this.options.dragToClose&&!i.type&&o?"panY":i.type,i.type=(this.options.pinchToZoom||this.states.zoom)&&i.canZoom&&o&&(2===s||this.states.zoom)?"panZoom":i.type,i.type=this.options.pinchToClose&&1>i.scale&&o&&2===s?"panZoom":i.type,i.type=-1<e.target.className.indexOf("-thumb")?"dragThumbs":i.type,"dragSlider"===i.type&&this.setMedia(),-1<["dragSlider","dragThumbs"].indexOf(i.type)&&((s=this.getCell()).startAnimate(),s.releaseDrag(),s.animateTo({x:0,y:0,s:1})),"dragSlider"!==i.type&&(s=this.slider,o=this.slides,-this.isRTL()*s.position.x!=o.index*o.width&&(s.startAnimate(),s.releaseDrag())),i.type&&(this.pauseVideo(),t.dispatchEvent(this,"modulobox",i.type+"Start",e,i),(1<this.gallery.length||"dragSlider"!==i.type)&&t.addClass(this.DOM.holder,this.pre+"-dragging")))},e.touchEnd=function(e){if(this.deletePointer(e),!this.pointers.length){if(t.removeClass(this.DOM.holder,this.pre+"-dragging"),t.handleEvents(this,window,this.dragEvents.move,"touchMove",!1),t.handleEvents(this,window,this.dragEvents.end,"touchEnd",!1),this.isSliderSettle()){var i=e.target.className;if(t.hasClass(e.target,this.pre+"-video"))this.appendVideo();else if(this.options.tapToClose&&!this.states.zoom&&(i===this.pre+"-item-inner"||i===this.pre+"-top-bar")&&Math.abs(this.gesture.dx)<this.options.threshold)return void this.close();"IMG"===e.target.tagName&&this.doubleTap(e)}this.options.thumbnails&&!this.gesture.move&&this.thumbClick(e),i=this.gesture.type+"End",this.gesture.type&&"function"==typeof this[i]&&(this[i](e),t.dispatchEvent(this,"modulobox",i,e,this.gesture)),this.gesture.type=this.gesture.move=!1,this.states.open&&((e=this.getCell()).settle||(e.startAnimate(),e.releaseDrag()),(e=this.slider).settle||(e.startAnimate(),e.releaseDrag()))}},e.switchPointers=function(){if("panZoom"===this.gesture.type&&1===this.pointers.length&&0!==this.gesture.distance){var t=this.getCell();t.stopAnimate(),t.startAnimate(),this.gesture.move=!1,this.gestures("start"),this.gestures("move")}},e.doubleTap=function(e){e.preventDefault();var i=(e=this.mapPointer(e))[0].clientX,s=e[0].clientY;void 0!==this.tap&&350>+new Date-this.tap.delay&&30>Math.abs(this.tap.deltaX-i)&&30>Math.abs(this.tap.deltaY-s)?(this.states.tapIdle&&clearTimeout(this.states.tapIdle),this.options.doubleTapToZoom&&this.zoomTo(i,s),this.tap=void 0):(this.browser.touchDevice&&this.options.timeToIdle&&!this.states.idle&&(this.states.tapIdle=setTimeout(function(){var e=t.hasClass(this.DOM.holder,this.pre+"-idle")?"remove":"add";t[e+"Class"](this.DOM.holder,this.pre+"-idle")}.bind(this),350)),this.tap={delay:+new Date,deltaX:e[0].clientX,deltaY:e[0].clientY})},e.isSliderSettle=function(){if(this.gesture.type)return!1;var t=this.isRTL(),e=this.slides,i=e.width;return 3>=Math.abs(t*this.slider.position.x+e.index*i)/i*100},e.mapPointer=function(t){return t.touches?t.changedTouches:[t]},e.addPointer=function(t){t=this.mapPointer(t);for(var e=0;e<t.length;e++)if(2>this.pointers.length&&-1===["dragSlider","panY","dragThumbs"].indexOf(this.gesture.type)){var i=t[e],s=void 0!==i.pointerId?i.pointerId:i.identifier;this.getPointer(s)||(this.pointers[this.pointers.length]={id:s,x:Math.round(i.clientX),y:Math.round(i.clientY)})}},e.updatePointer=function(t){t=this.mapPointer(t);for(var e=0;e<t.length;e++){var i=t[e],s=this.getPointer(void 0!==i.pointerId?i.pointerId:i.identifier);s&&(s.x=Math.round(i.clientX),s.y=Math.round(i.clientY))}},e.deletePointer=function(t){t=this.mapPointer(t);for(var e=0;e<t.length;e++)for(var i=t[e],i=void 0!==i.pointerId?i.pointerId:i.identifier,s=0;s<this.pointers.length;s++)this.pointers[s].id===i&&this.pointers.splice(s,1)},e.getPointer=function(t){for(var e in this.pointers)if(this.pointers[e].id===t)return this.pointers[e];return null},e.gestures=function(t){var e=this.gesture;if((s=this.pointers).length){if(e.direction=e.x?s[0].x>e.x?1:-1:0,e.x=s[0].x,e.y=s[0].y,2===s.length){var i=s[1].x,s=s[1].y,o=this.getDistance([e.x,e.y],[i,s]);e.x-=(e.x-i)/2,e.y-=(e.y-s)/2}"start"===t?(e.dx=0,e.dy=0,e.sx=e.x,e.sy=e.y,e.distance=o||0):(e.dx=e.x-e.sx,e.dy=e.y-e.sy,e.scale=o&&e.distance?o/e.distance:1)}},e.getDistance=function(t,e){var i=e[0]-t[0],s=e[1]-t[1];return Math.sqrt(i*i+s*s)},e.panY=function(){var t=this.getCell();t.startAnimate(),t.updateDrag({x:t.position.x,y:t.start.y+this.gesture.dy,s:t.position.s})},e.panYEnd=function(){var t=this.getCell(),e=this.slider.height,i=t.resting.y;.8>1-Math.abs(i)/(.5*e)&&(e=Math.abs(i)<.5*e?Math.abs(i)/i*e*.5:i,this.close(),t.animateTo({x:0,y:e,s:e?t.resting.s:1}),t.startAnimate(),t.releaseDrag())},e.panZoom=function(){var t=this.getCell(),e=this.gesture,i=this.mediaViewport(t.position.s),s=Math.min(1.5*this.options.maxZoom,Math.max(this.options.pinchToClose&&e.canClose?.1:.6,t.start.s*e.scale)),o=t.start.x+e.dx,n=t.start.y+e.dy,r=e.sx-.5*this.slider.width,a=e.sy-.5*this.slider.height;e.canZoom&&(this.options.pinchToZoom||this.states.zoom)||(s=Math.min(1,s)),!this.options.pinchToZoom&&this.states.zoom&&(s=t.position.s),e.move||1!==this.pointers.length||(t.start.x+=o>i.left?o-i.left:o<i.right?o-i.right:0,t.start.y+=n>i.bottom?n-i.bottom:n<i.top?n-i.top:0),o=e.dx+r+s/t.start.s*(t.start.x-r),n=e.dy+a+s/t.start.s*(t.start.y-a),1===this.pointers.length&&(o=o>i.left?.5*(o+i.left):o<i.right?.5*(o+i.right):o,n=n>i.bottom?.5*(n+i.bottom):n<i.top?.5*(n+i.top):n),t.startAnimate(),t.updateDrag({x:o,y:n,s:s}),this.updateZoom(s)},e.panZoomEnd=function(){var t=this.getCell(),e=this.gesture,i=t.resting.s>this.options.maxZoom?this.options.maxZoom:1>t.resting.s?1:t.resting.s,s=this.mediaViewport(i);if(Math.round(10*t.resting.s)/10>this.options.maxZoom){var o=e.distance?e.sx-.5*this.slider.width:0,n=e.distance?e.sy-.5*this.slider.height:0;o=e.dx+o+i/t.start.s*(t.start.x-o),n=e.dy+n+i/t.start.s*(t.start.y-n),o=o>s.left?s.left:o<s.right?s.right:o,n=n>s.bottom?s.bottom:n<s.top?s.top:n}else o=t.resting.x>s.left?s.left:t.resting.x<s.right?s.right:void 0,n=t.resting.y>s.bottom?s.bottom:t.resting.y<s.top?s.top:void 0;this.options.pinchToClose&&.8>t.resting.s&&e.canClose&&(i=.3>t.resting.s?t.resting.s:.15,o=t.resting.x,n=t.resting.y,this.close()),t.animateTo({x:o,y:n,s:i!==t.resting.s?i:void 0}),t.startAnimate(),t.releaseDrag(),this.updateZoom(t.resting.s)},e.dragThumbs=function(){var t=this.thumbs,e=t.bound,i=t.start.x+this.gesture.dx;this.gesture.move||(t.start.x+=i>e.left?i-e.left:i<e.right?i-e.right:0,i=t.start.x+this.gesture.dx),i=i>e.left?.5*(i+e.left):i<e.right?.5*(i+e.right):i,t.startAnimate(),t.attraction.x=void 0,t.updateDrag({x:i})},e.dragThumbsEnd=function(){var t=this.thumbs,e=t.bound,i=t.resting.x;(i=i>e.left?e.left:i<e.right?e.right:i)!==t.resting.x&&t.animateTo({x:i}),t.startAnimate(),t.releaseDrag()},e.dragSlider=function(){if(1!==this.gallery.length){var t=this.slider,e=t.start.x+this.gesture.dx;if(!this.states.loop){var i=t.bound;this.gesture.move||(t.start.x+=e>i.left?e-i.left:e<i.right?e-i.right:0,e=t.start.x+this.gesture.dx),e=e>i.left?.5*(e+i.left):e<i.right?.5*(e+i.right):e}t.startAnimate(),t.updateDrag({x:e})}},e.dragSliderEnd=function(){if(1!==this.gallery.length){var t=this.slider,e=this.slides,i=e.index,s=this.isRTL();this.getRestingIndex(t.position.x,t.resting.x),i!==e.index&&this.updateMediaInfo(),this.slider.animateTo({x:-s*e.index*e.width,y:void 0,s:void 0}),t.startAnimate(),t.releaseDrag()}},e.getRestingIndex=function(t,e){var i=this.gesture.direction,s=this.gallery,o=this.slides,n=this.gesture.dx,r=this.isRTL(),a=Math.round(-r*t/o.width),h=Math.abs(e-t);Math.abs(n)<.5*o.width&&h&&(0<n&&0<i?a-=1*r:0>n&&0>i&&(a+=1*r)),i=Math.max(-1,Math.min(1,a-o.index)),!this.states.loop&&(0>s.index+i||s.index+i>s.length-1)||(o.index+=i)},e.shiftSlides=function(){var e=this.slides,i=this.gallery,s=this.states.loop,o=this.isRTL(),n=o*Math.round(-this.slider.position.x/e.width)-2,r=n+5;for(!s&&r>i.initialLength-1&&(n=i.initialLength-5,r=n+5),!s&&0>n&&(n=0,r=5),i=n;i<r;i++)s=o*i*e.width,n=t.modulo(e.length,i),((n=e[n]).index!==i||n.position!==s)&&(n.index=i,n.position=s,n.style.left=s+"px");this.states.open&&this.setMedia(3)},e.shiftThumbs=function(e){var i=this.DOM.thumbsInner.children,s=this.slider,o=this.gallery,n=this.isRTL(),r=i.length,a=t.modulo(o.initialLength,o.index),h=(u=Math.max(0,Math.round((-n*e.position.x+n*e.size*r*.25)/e.size)-Math.floor(r/2)))+r,l=.5*s.width,d=e.position.x+l,s=e.position.x-s.width-l;for(h>o.initialLength&&(h=o.initialLength,u=h-r),h===o.initialLength-1&&u-h<r&&(u=o.initialLength-r),o=u;o<h;o++){var u=i[t.modulo(r,o)],l=n*o*e.size+.5*e.gutter,p=this.pre+"-active-thumb",m=t.hasClass(u,p);u.index===o&&u.position===l||(u.index=o,u.position=l,u.style.left=l+"px"),this.setThumbSize(u,e),-u.position<=d&&-u.position>=s&&u.media!==o&&this.loadThumb(u,o),m&&a!==o?t.removeClass(u,p):m||a!==o||t.addClass(u,p)}},e.setThumbSize=function(t,e){t.width===e.width&&t.height===e.height&&t.gutter===e.gutter||(t.width=e.width,t.height=e.height,t.gutter=e.gutter,t.style.width=e.width+"px",t.style.height=e.height+"px")},e.willClose=function(e){var i=this.DOM.overlay.style.opacity,s=this.gesture.canClose,o=this.gesture.type,n=this.gesture.closeBy,r="panY"===o||"panY"===n;1.1<e.position.s&&void 0===s?this.gesture.canClose=!1:1>e.position.s&&void 0===s&&(this.gesture.canClose=!0),this.options.pinchToClose&&("panZoom"===o||"panZoom"===n)&&this.gesture.canClose?(i=e.position.s,this.gesture.closeBy="panZoom"):r?(i=1-Math.abs(e.position.y)/(.5*this.slider.height),this.gesture.closeBy="panY"):i&&1>i&&(i=1,this.gesture.closeBy=!1),i=i?Math.max(0,Math.min(1,i)):1,t[(.8>=i||!i?"add":"remove")+"Class"](this.DOM.holder,this.pre+"-will-close"),this.DOM.overlay.style.opacity=i},e.prev=t.throttle(function(){this.gesture.move||this.slideTo(this.slides.index-1*this.isRTL())},120),e.next=t.throttle(function(){this.gesture.move||this.slideTo(this.slides.index+1*this.isRTL())},120),e.slideTo=function(e,i){var s=this.slides,o=this.gallery,n=this.DOM.slider,r=this.isRTL(),a=o.initialLength,h=t.modulo(a,e),o=h-(o=t.modulo(a,o.index)),l=a-Math.abs(o);!this.states.loop&&(0>e||e>this.gallery.initialLength-1)||(this.states.loop&&3>l&&2*l<a&&(o=0>o?l:-l),h===e&&(e=s.index+o),(o=e-s.index)&&(this.states.zoom&&this.zoom(),this.pauseVideo(),this.share(),i||this.stopSlideShow(),s.index=e,a=this.slider,2<Math.abs(o)&&(t.addClass(n,this.pre+"-hide"),this.setSliderPosition(a,s),this.setSlidesPositions(s),a.position.x=a.attraction.x=a.position.x+r*s.width*Math.min(2,Math.abs(o))*Math.abs(o)/o,t.translate(n,a.position.x,0),n.getClientRects()),this.updateMediaInfo(),t.removeClass(n,this.pre+"-hide"),a.startAnimate(),a.releaseDrag(),a.animateTo({x:-r*e*s.width,y:0,s:void 0})))},e.keyDown=function(t){var e=t.keyCode,i=this.options;if(i.prevNextKey&&(37===e?this.prev(t):39===e&&this.next(t)),27===e&&i.escapeToClose&&this.close(),!i.mouseWheel&&-1<[32,33,34,35,36,38,40].indexOf(e))return t.preventDefault(),!1},e.zoom=function(){this.zoomTo()},e.zoomTo=function(t,e,i){if(!(!this.isSliderSettle()||!this.isZoomable()&&1<i)){this.gesture.closeBy=!1;s=this.getMedia();i=i||(this.states.zoom?1:s.dom.size.scale);var s=this.getCell(),o=this.mediaViewport(i);t=t?t-.5*this.slider.width:0,e=e?e-.5*this.slider.height:0,t=1<i?Math.ceil(t+i/s.position.s*(s.position.x-t)):0,e=1<i?Math.ceil(e+i/s.position.s*(s.position.y-e)):0,s.startAnimate(),s.releaseDrag(),s.animateTo({x:t>o.left?o.left:t<o.right?o.right:t,y:e>o.bottom?o.bottom:e<o.top?o.top:e,s:i}),this.updateZoom(i)}},e.updateZoom=function(e){this.states.zoom=1<e,t[this.states.zoom?"addClass":"removeClass"](this.DOM.holder,this.pre+"-panzoom")},e.destroy=function(){if(this.GUID){this.states.open&&this.close();var t=this.options.mediaSelector,e="";try{e=document.querySelectorAll(t)}catch(t){}for(var t=0,i=e.length;t<i;t++){var s=e[t];s.mobxListener&&(s.removeEventListener("click",s.mobxListener,!1),"undefined"!=typeof jQuery&&jQuery(s).off("click",s.mobxListener))}for(this.bindEvents(!1),this.slider.resetAnimate(),t=0;t<this.slides.length;t++)this.cells[t].resetAnimate();this.thumbs&&this.thumbs.resetAnimate(),this.DOM.holder.parentNode.removeChild(this.DOM.holder),this.DOM.comment.parentNode.removeChild(this.DOM.comment),delete o[this.GUID],delete this.GUID}},"undefined"!=typeof jQuery&&function(t){t.ModuloBox=function(t){return new h(t)}}(jQuery),h});
jQuery(document).ready(function($) {
    'use strict';
    var rh_top_gallery = $.ModuloBox( {
        mediaSelector  : '.modulo-lightbox a',
        controls           : ['zoom', 'play', 'fullScreen', 'close'],
        caption : true,
        autoCaption : true,
        thumbnails : true,
        smartResize : true,
        pinchToZoom : true,
        escapeToClose : true
    });
    rh_top_gallery.init();
});
// ProgressBar.js 1.1.0
// https://kimmobrunfeldt.github.io/progressbar.js
// License: MIT

!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.ProgressBar=a()}}(function(){var a;return function(){function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){return e(b[g][1][a]||a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}return a}()({1:[function(b,c,d){!function(b,e){"object"==typeof d&&"object"==typeof c?c.exports=e():"function"==typeof a&&a.amd?a("shifty",[],e):"object"==typeof d?d.shifty=e():b.shifty=e()}(window,function(){return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{enumerable:!0,get:d})},b.r=function(a){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(a,"__esModule",{value:!0})},b.t=function(a,c){if(1&c&&(a=b(a)),8&c)return a;if(4&c&&"object"==typeof a&&a&&a.__esModule)return a;var d=Object.create(null);if(b.r(d),Object.defineProperty(d,"default",{enumerable:!0,value:a}),2&c&&"string"!=typeof a)for(var e in a)b.d(d,e,function(b){return a[b]}.bind(null,e));return d},b.n=function(a){var c=a&&a.__esModule?function(){return a.default}:function(){return a};return b.d(c,"a",c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p="",b(b.s=3)}([function(a,b,c){"use strict";(function(a){function d(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}function e(a){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a})(a)}function f(a){for(var b=1;b<arguments.length;b++){var c=null!=arguments[b]?arguments[b]:{},d=Object.keys(c);"function"==typeof Object.getOwnPropertySymbols&&(d=d.concat(Object.getOwnPropertySymbols(c).filter(function(a){return Object.getOwnPropertyDescriptor(c,a).enumerable}))),d.forEach(function(b){g(a,b,c[b])})}return a}function g(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function h(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},b=new u,c=b.tween(a);return c.tweenable=b,c}c.d(b,"e",function(){return p}),c.d(b,"c",function(){return r}),c.d(b,"b",function(){return s}),c.d(b,"a",function(){return u}),c.d(b,"d",function(){return h});var i=c(1),j="undefined"!=typeof window?window:a,k=j.requestAnimationFrame||j.webkitRequestAnimationFrame||j.oRequestAnimationFrame||j.msRequestAnimationFrame||j.mozCancelRequestAnimationFrame&&j.mozRequestAnimationFrame||setTimeout,l=function(){},m=null,n=null,o=f({},i),p=function(a,b,c,d,e,f,g){var h=a<f?0:(a-f)/e;for(var i in b){var j=g[i],k=j.call?j:o[j],l=c[i];b[i]=l+(d[i]-l)*k(h)}return b},q=function(a,b){var c=a._attachment,d=a._currentState,e=a._delay,f=a._easing,g=a._originalState,h=a._duration,i=a._step,j=a._targetState,k=a._timestamp,l=k+e+h,m=b>l?l:b,n=h-(l-m);m>=l?(i(j,c,n),a.stop(!0)):(a._applyFilter("beforeTween"),m<k+e?(m=1,h=1,k=1):k+=e,p(m,d,g,j,h,k,f),a._applyFilter("afterTween"),i(d,c,n))},r=function(){for(var a=u.now(),b=m;b;){var c=b._next;q(b,a),b=c}},s=function(a){var b=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"linear",c={},d=e(b);if("string"===d||"function"===d)for(var f in a)c[f]=b;else for(var g in a)c[g]=b[g]||"linear";return c},t=function(a){if(a===m)(m=a._next)?m._previous=null:n=null;else if(a===n)(n=a._previous)?n._next=null:m=null;else{var b=a._previous,c=a._next;b._next=c,c._previous=b}a._previous=a._next=null},u=function(){function a(){var b=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;!function(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}(this,a),this._currentState=b,this._configured=!1,this._filters=[],this._timestamp=null,this._next=null,this._previous=null,c&&this.setConfig(c)}var b,c,e;return b=a,(c=[{key:"_applyFilter",value:function(a){var b=!0,c=!1,d=void 0;try{for(var e,f=this._filters[Symbol.iterator]();!(b=(e=f.next()).done);b=!0){var g=e.value[a];g&&g(this)}}catch(a){c=!0,d=a}finally{try{b||null==f.return||f.return()}finally{if(c)throw d}}}},{key:"tween",value:function(){var b=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0,c=this._attachment,d=this._configured;return!b&&d||this.setConfig(b),this._pausedAtTime=null,this._timestamp=a.now(),this._start(this.get(),c),this.resume()}},{key:"setConfig",value:function(){var b=this,c=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},d=c.attachment,e=c.delay,g=void 0===e?0:e,h=c.duration,i=void 0===h?500:h,j=c.easing,k=c.from,m=c.promise,n=void 0===m?Promise:m,o=c.start,p=void 0===o?l:o,q=c.step,r=void 0===q?l:q,t=c.to;this._configured=!0,this._attachment=d,this._isPlaying=!1,this._pausedAtTime=null,this._scheduleId=null,this._delay=g,this._start=p,this._step=r,this._duration=i,this._currentState=f({},k||this.get()),this._originalState=this.get(),this._targetState=f({},t||this.get());var u=this._currentState;this._targetState=f({},u,this._targetState),this._easing=s(u,j);var v=a.filters;for(var w in this._filters.length=0,v)v[w].doesApply(this)&&this._filters.push(v[w]);return this._applyFilter("tweenCreated"),this._promise=new n(function(a,c){b._resolve=a,b._reject=c}),this._promise.catch(l),this}},{key:"get",value:function(){return f({},this._currentState)}},{key:"set",value:function(a){this._currentState=a}},{key:"pause",value:function(){if(this._isPlaying)return this._pausedAtTime=a.now(),this._isPlaying=!1,t(this),this}},{key:"resume",value:function(){if(null===this._timestamp)return this.tween();if(this._isPlaying)return this._promise;var b=a.now();return this._pausedAtTime&&(this._timestamp+=b-this._pausedAtTime,this._pausedAtTime=null),this._isPlaying=!0,null===m?(m=this,n=this,function a(){m&&(k.call(j,a,1e3/60),r())}()):(this._previous=n,n._next=this,n=this),this._promise}},{key:"seek",value:function(b){b=Math.max(b,0);var c=a.now();return this._timestamp+b===0?this:(this._timestamp=c-b,this._isPlaying||q(this,c),this)}},{key:"stop",value:function(){var a=arguments.length>0&&void 0!==arguments[0]&&arguments[0],b=this._attachment,c=this._currentState,d=this._easing,e=this._originalState,f=this._targetState;if(this._isPlaying)return this._isPlaying=!1,t(this),a?(this._applyFilter("beforeTween"),p(1,c,e,f,1,0,d),this._applyFilter("afterTween"),this._applyFilter("afterTweenEnd"),this._resolve(c,b)):this._reject(c,b),this}},{key:"isPlaying",value:function(){return this._isPlaying}},{key:"setScheduleFunction",value:function(b){a.setScheduleFunction(b)}},{key:"dispose",value:function(){for(var a in this)delete this[a]}}])&&d(b.prototype,c),e&&d(b,e),a}();u.setScheduleFunction=function(a){return k=a},u.formulas=o,u.filters={},u.now=Date.now||function(){return+new Date}}).call(this,c(2))},function(a,b,c){"use strict";c.r(b),c.d(b,"linear",function(){return d}),c.d(b,"easeInQuad",function(){return e}),c.d(b,"easeOutQuad",function(){return f}),c.d(b,"easeInOutQuad",function(){return g}),c.d(b,"easeInCubic",function(){return h}),c.d(b,"easeOutCubic",function(){return i}),c.d(b,"easeInOutCubic",function(){return j}),c.d(b,"easeInQuart",function(){return k}),c.d(b,"easeOutQuart",function(){return l}),c.d(b,"easeInOutQuart",function(){return m}),c.d(b,"easeInQuint",function(){return n}),c.d(b,"easeOutQuint",function(){return o}),c.d(b,"easeInOutQuint",function(){return p}),c.d(b,"easeInSine",function(){return q}),c.d(b,"easeOutSine",function(){return r}),c.d(b,"easeInOutSine",function(){return s}),c.d(b,"easeInExpo",function(){return t}),c.d(b,"easeOutExpo",function(){return u}),c.d(b,"easeInOutExpo",function(){return v}),c.d(b,"easeInCirc",function(){return w}),c.d(b,"easeOutCirc",function(){return x}),c.d(b,"easeInOutCirc",function(){return y}),c.d(b,"easeOutBounce",function(){return z}),c.d(b,"easeInBack",function(){return A}),c.d(b,"easeOutBack",function(){return B}),c.d(b,"easeInOutBack",function(){return C}),c.d(b,"elastic",function(){return D}),c.d(b,"swingFromTo",function(){return E}),c.d(b,"swingFrom",function(){return F}),c.d(b,"swingTo",function(){return G}),c.d(b,"bounce",function(){return H}),c.d(b,"bouncePast",function(){return I}),c.d(b,"easeFromTo",function(){return J}),c.d(b,"easeFrom",function(){return K}),c.d(b,"easeTo",function(){return L});var d=function(a){return a},e=function(a){return Math.pow(a,2)},f=function(a){return-(Math.pow(a-1,2)-1)},g=function(a){return(a/=.5)<1?.5*Math.pow(a,2):-.5*((a-=2)*a-2)},h=function(a){return Math.pow(a,3)},i=function(a){return Math.pow(a-1,3)+1},j=function(a){return(a/=.5)<1?.5*Math.pow(a,3):.5*(Math.pow(a-2,3)+2)},k=function(a){return Math.pow(a,4)},l=function(a){return-(Math.pow(a-1,4)-1)},m=function(a){return(a/=.5)<1?.5*Math.pow(a,4):-.5*((a-=2)*Math.pow(a,3)-2)},n=function(a){return Math.pow(a,5)},o=function(a){return Math.pow(a-1,5)+1},p=function(a){return(a/=.5)<1?.5*Math.pow(a,5):.5*(Math.pow(a-2,5)+2)},q=function(a){return 1-Math.cos(a*(Math.PI/2))},r=function(a){return Math.sin(a*(Math.PI/2))},s=function(a){return-.5*(Math.cos(Math.PI*a)-1)},t=function(a){return 0===a?0:Math.pow(2,10*(a-1))},u=function(a){return 1===a?1:1-Math.pow(2,-10*a)},v=function(a){return 0===a?0:1===a?1:(a/=.5)<1?.5*Math.pow(2,10*(a-1)):.5*(2-Math.pow(2,-10*--a))},w=function(a){return-(Math.sqrt(1-a*a)-1)},x=function(a){return Math.sqrt(1-Math.pow(a-1,2))},y=function(a){return(a/=.5)<1?-.5*(Math.sqrt(1-a*a)-1):.5*(Math.sqrt(1-(a-=2)*a)+1)},z=function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375},A=function(a){var b=1.70158;return a*a*((b+1)*a-b)},B=function(a){var b=1.70158;return(a-=1)*a*((b+1)*a+b)+1},C=function(a){var b=1.70158;return(a/=.5)<1?a*a*((1+(b*=1.525))*a-b)*.5:.5*((a-=2)*a*((1+(b*=1.525))*a+b)+2)},D=function(a){return-1*Math.pow(4,-8*a)*Math.sin((6*a-1)*(2*Math.PI)/2)+1},E=function(a){var b=1.70158;return(a/=.5)<1?a*a*((1+(b*=1.525))*a-b)*.5:.5*((a-=2)*a*((1+(b*=1.525))*a+b)+2)},F=function(a){var b=1.70158;return a*a*((b+1)*a-b)},G=function(a){var b=1.70158;return(a-=1)*a*((b+1)*a+b)+1},H=function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375},I=function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?2-(7.5625*(a-=1.5/2.75)*a+.75):a<2.5/2.75?2-(7.5625*(a-=2.25/2.75)*a+.9375):2-(7.5625*(a-=2.625/2.75)*a+.984375)},J=function(a){return(a/=.5)<1?.5*Math.pow(a,4):-.5*((a-=2)*Math.pow(a,3)-2)},K=function(a){return Math.pow(a,4)},L=function(a){return Math.pow(a,.25)}},function(a,b){var c;c=function(){return this}();try{c=c||new Function("return this")()}catch(a){"object"==typeof window&&(c=window)}a.exports=c},function(a,b,c){"use strict";function d(a){return parseInt(a,16)}function e(a){var b=a._currentState;[b,a._originalState,a._targetState].forEach(z),a._tokenData=C(b)}function f(a){var b=a._currentState,c=a._originalState,d=a._targetState,e=a._easing,f=a._tokenData;I(e,f),[b,c,d].forEach(function(a){return D(a,f)})}function g(a){var b=a._currentState,c=a._originalState,d=a._targetState,e=a._easing,f=a._tokenData;[b,c,d].forEach(function(a){return H(a,f)}),J(e,f)}function h(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function i(a){return function(a){if(Array.isArray(a)){for(var b=0,c=new Array(a.length);b<a.length;b++)c[b]=a[b];return c}}(a)||function(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}(a)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function j(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}function k(a,b){if(!b.has(a))throw new TypeError("attempted to get private field on non-instance");var c=b.get(a);return c.get?c.get.call(a):c.value}function l(a,b,c,d,e,f){var g=0,h=0,i=0,j=0,k=0,l=0,m=function(a){return((g*a+h)*a+i)*a},n=function(a){return a>=0?a:0-a};return g=1-(i=3*b)-(h=3*(d-b)-i),j=1-(l=3*c)-(k=3*(e-c)-l),function(a,b){return c=function(a,b){var c,d,e,f,j,k,l;for(e=a,k=0;k<8;k++){if(f=m(e)-a,n(f)<b)return e;if(n(j=(3*g*(l=e)+2*h)*l+i)<1e-6)break;e-=f/j}if((e=a)<(c=0))return c;if(e>(d=1))return d;for(;c<d;){if(f=m(e),n(f-a)<b)return e;a>f?c=e:d=e,e=.5*(d-c)+c}return e}(a,b),((j*c+k)*c+l)*c;var c}(a,function(a){return 1/(200*a)}(f))}c.r(b);var m={};c.r(m),c.d(m,"doesApply",function(){return K}),c.d(m,"tweenCreated",function(){return e}),c.d(m,"beforeTween",function(){return f}),c.d(m,"afterTween",function(){return g});var n,o,p=c(0),q=/(\d|-|\.)/,r=/([^\-0-9.]+)/g,s=/[0-9.-]+/g,t=(n=s.source,o=/,\s*/.source,new RegExp("rgb\\(".concat(n).concat(o).concat(n).concat(o).concat(n,"\\)"),"g")),u=/^.*\(/,v=/#([0-9]|[a-f]){3,6}/gi,w=function(a,b){return a.map(function(a,c){return"_".concat(b,"_").concat(c)})},x=function(a){return"rgb(".concat((b=a,3===(b=b.replace(/#/,"")).length&&(b=(b=b.split(""))[0]+b[0]+b[1]+b[1]+b[2]+b[2]),[d(b.substr(0,2)),d(b.substr(2,2)),d(b.substr(4,2))]).join(","),")");var b},y=function(a,b,c){var d=b.match(a),e=b.replace(a,"VAL");return d&&d.forEach(function(a){return e=e.replace("VAL",c(a))}),e},z=function(a){for(var b in a){var c=a[b];"string"==typeof c&&c.match(v)&&(a[b]=y(v,c,x))}},A=function(a){var b=a.match(s).map(Math.floor);return"".concat(a.match(u)[0]).concat(b.join(","),")")},B=function(a){return a.match(s)},C=function(a){var b,c,d={};for(var e in a){var f=a[e];"string"==typeof f&&(d[e]={formatString:(b=f,c=void 0,c=b.match(r),c?(1===c.length||b.charAt(0).match(q))&&c.unshift(""):c=["",""],c.join("VAL")),chunkNames:w(B(f),e)})}return d},D=function(a,b){var c=function(c){B(a[c]).forEach(function(d,e){return a[b[c].chunkNames[e]]=+d}),delete a[c]};for(var d in b)c(d)},E=function(a,b){var c={};return b.forEach(function(b){c[b]=a[b],delete a[b]}),c},F=function(a,b){return b.map(function(b){return a[b]})},G=function(a,b){return b.forEach(function(b){return a=a.replace("VAL",+b.toFixed(4))}),a},H=function(a,b){for(var c in b){var d=b[c],e=d.chunkNames,f=d.formatString,g=G(f,F(E(a,e),e));a[c]=y(t,g,A)}},I=function(a,b){var c=function(c){var d=b[c].chunkNames,e=a[c];if("string"==typeof e){var f=e.split(" "),g=f[f.length-1];d.forEach(function(b,c){return a[b]=f[c]||g})}else d.forEach(function(b){return a[b]=e});delete a[c]};for(var d in b)c(d)},J=function(a,b){for(var c in b){var d=b[c].chunkNames,e=a[d[0]];a[c]="string"==typeof e?d.map(function(b){var c=a[b];return delete a[b],c}).join(" "):e}},K=function(a){var b=a._currentState;return Object.keys(b).some(function(a){return"string"==typeof b[a]})},L=new p.a,M=p.a.filters,N=function(a,b,c,d){var e=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,f=function(a){for(var b=1;b<arguments.length;b++){var c=null!=arguments[b]?arguments[b]:{},d=Object.keys(c);"function"==typeof Object.getOwnPropertySymbols&&(d=d.concat(Object.getOwnPropertySymbols(c).filter(function(a){return Object.getOwnPropertyDescriptor(c,a).enumerable}))),d.forEach(function(b){h(a,b,c[b])})}return a}({},a),g=Object(p.b)(a,d);for(var i in L._filters.length=0,L.set({}),L._currentState=f,L._originalState=a,L._targetState=b,L._easing=g,M)M[i].doesApply(L)&&L._filters.push(M[i]);L._applyFilter("tweenCreated"),L._applyFilter("beforeTween");var j=Object(p.e)(c,f,a,b,1,e,g);return L._applyFilter("afterTween"),j},O=function(){function a(){!function(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}(this,a),P.set(this,{writable:!0,value:[]});for(var b=arguments.length,c=new Array(b),d=0;d<b;d++)c[d]=arguments[d];c.forEach(this.add.bind(this))}var b,c,d;return b=a,(c=[{key:"add",value:function(a){return k(this,P).push(a),a}},{key:"remove",value:function(a){var b=k(this,P).indexOf(a);return~b&&k(this,P).splice(b,1),a}},{key:"empty",value:function(){return this.tweenables.map(this.remove.bind(this))}},{key:"isPlaying",value:function(){return k(this,P).some(function(a){return a.isPlaying()})}},{key:"play",value:function(){return k(this,P).forEach(function(a){return a.tween()}),this}},{key:"pause",value:function(){return k(this,P).forEach(function(a){return a.pause()}),this}},{key:"resume",value:function(){return k(this,P).forEach(function(a){return a.resume()}),this}},{key:"stop",value:function(a){return k(this,P).forEach(function(b){return b.stop(a)}),this}},{key:"tweenables",get:function(){return i(k(this,P))}},{key:"promises",get:function(){return k(this,P).map(function(a){return a._promise})}}])&&j(b.prototype,c),d&&j(b,d),a}(),P=new WeakMap,Q=function(a,b,c,d,e){var f=function(a,b,c,d){return function(e){return l(e,a,b,c,d,1)}}(b,c,d,e);return f.displayName=a,f.x1=b,f.y1=c,f.x2=d,f.y2=e,p.a.formulas[a]=f},R=function(a){return delete p.a.formulas[a]};c.d(b,"processTweens",function(){return p.c}),c.d(b,"Tweenable",function(){return p.a}),c.d(b,"tween",function(){return p.d}),c.d(b,"interpolate",function(){return N}),c.d(b,"Scene",function(){return O}),c.d(b,"setBezierFunction",function(){return Q}),c.d(b,"unsetBezierFunction",function(){return R}),p.a.filters.token=m}])})},{}],2:[function(a,b,c){var d=a("./shape"),e=a("./utils"),f=function(a,b){this._pathTemplate="M 50,50 m 0,-{radius} a {radius},{radius} 0 1 1 0,{2radius} a {radius},{radius} 0 1 1 0,-{2radius}",this.containerAspectRatio=1,d.apply(this,arguments)};f.prototype=new d,f.prototype.constructor=f,f.prototype._pathString=function(a){var b=a.strokeWidth;a.trailWidth&&a.trailWidth>a.strokeWidth&&(b=a.trailWidth);var c=50-b/2;return e.render(this._pathTemplate,{radius:c,"2radius":2*c})},f.prototype._trailString=function(a){return this._pathString(a)},b.exports=f},{"./shape":7,"./utils":9}],3:[function(a,b,c){var d=a("./shape"),e=a("./utils"),f=function(a,b){this._pathTemplate="M 0,{center} L 100,{center}",d.apply(this,arguments)};f.prototype=new d,f.prototype.constructor=f,f.prototype._initializeSvg=function(a,b){a.setAttribute("viewBox","0 0 100 "+b.strokeWidth),a.setAttribute("preserveAspectRatio","none")},f.prototype._pathString=function(a){return e.render(this._pathTemplate,{center:a.strokeWidth/2})},f.prototype._trailString=function(a){return this._pathString(a)},b.exports=f},{"./shape":7,"./utils":9}],4:[function(a,b,c){b.exports={Line:a("./line"),Circle:a("./circle"),SemiCircle:a("./semicircle"),Square:a("./square"),Path:a("./path"),Shape:a("./shape"),utils:a("./utils")}},{"./circle":2,"./line":3,"./path":5,"./semicircle":6,"./shape":7,"./square":8,"./utils":9}],5:[function(a,b,c){var d=a("shifty"),e=a("./utils"),f=d.Tweenable,g={easeIn:"easeInCubic",easeOut:"easeOutCubic",easeInOut:"easeInOutCubic"},h=function a(b,c){if(!(this instanceof a))throw new Error("Constructor was called without new keyword");c=e.extend({delay:0,duration:800,easing:"linear",from:{},to:{},step:function(){}},c);var d;d=e.isString(b)?document.querySelector(b):b,this.path=d,this._opts=c,this._tweenable=null;var f=this.path.getTotalLength();this.path.style.strokeDasharray=f+" "+f,this.set(0)};h.prototype.value=function(){var a=this._getComputedDashOffset(),b=this.path.getTotalLength(),c=1-a/b;return parseFloat(c.toFixed(6),10)},h.prototype.set=function(a){this.stop(),this.path.style.strokeDashoffset=this._progressToOffset(a);var b=this._opts.step;if(e.isFunction(b)){var c=this._easing(this._opts.easing);b(this._calculateTo(a,c),this._opts.shape||this,this._opts.attachment)}},h.prototype.stop=function(){this._stopTween(),this.path.style.strokeDashoffset=this._getComputedDashOffset()},h.prototype.animate=function(a,b,c){b=b||{},e.isFunction(b)&&(c=b,b={});var d=e.extend({},b),g=e.extend({},this._opts);b=e.extend(g,b);var h=this._easing(b.easing),i=this._resolveFromAndTo(a,h,d);this.stop(),this.path.getBoundingClientRect();var j=this._getComputedDashOffset(),k=this._progressToOffset(a),l=this;this._tweenable=new f,this._tweenable.tween({from:e.extend({offset:j},i.from),to:e.extend({offset:k},i.to),duration:b.duration,delay:b.delay,easing:h,step:function(a){l.path.style.strokeDashoffset=a.offset;var c=b.shape||l;b.step(a,c,b.attachment)}}).then(function(a){e.isFunction(c)&&c()})},h.prototype._getComputedDashOffset=function(){var a=window.getComputedStyle(this.path,null);return parseFloat(a.getPropertyValue("stroke-dashoffset"),10)},h.prototype._progressToOffset=function(a){var b=this.path.getTotalLength();return b-a*b},h.prototype._resolveFromAndTo=function(a,b,c){return c.from&&c.to?{from:c.from,to:c.to}:{from:this._calculateFrom(b),to:this._calculateTo(a,b)}},h.prototype._calculateFrom=function(a){return d.interpolate(this._opts.from,this._opts.to,this.value(),a)},h.prototype._calculateTo=function(a,b){return d.interpolate(this._opts.from,this._opts.to,a,b)},h.prototype._stopTween=function(){null!==this._tweenable&&(this._tweenable.stop(),this._tweenable=null)},h.prototype._easing=function(a){return g.hasOwnProperty(a)?g[a]:a},b.exports=h},{"./utils":9,shifty:1}],6:[function(a,b,c){var d=a("./shape"),e=a("./circle"),f=a("./utils"),g=function(a,b){this._pathTemplate="M 50,50 m -{radius},0 a {radius},{radius} 0 1 1 {2radius},0",this.containerAspectRatio=2,d.apply(this,arguments)};g.prototype=new d,g.prototype.constructor=g,g.prototype._initializeSvg=function(a,b){a.setAttribute("viewBox","0 0 100 50")},g.prototype._initializeTextContainer=function(a,b,c){a.text.style&&(c.style.top="auto",c.style.bottom="0",a.text.alignToBottom?f.setStyle(c,"transform","translate(-50%, 0)"):f.setStyle(c,"transform","translate(-50%, 50%)"))},g.prototype._pathString=e.prototype._pathString,g.prototype._trailString=e.prototype._trailString,b.exports=g},{"./circle":2,"./shape":7,"./utils":9}],7:[function(a,b,c){var d=a("./path"),e=a("./utils"),f="Object is destroyed",g=function a(b,c){if(!(this instanceof a))throw new Error("Constructor was called without new keyword");if(0!==arguments.length){this._opts=e.extend({color:"#555",strokeWidth:1,trailColor:null,trailWidth:null,fill:null,text:{style:{color:null,position:"absolute",left:"50%",top:"50%",padding:0,margin:0,transform:{prefix:!0,value:"translate(-50%, -50%)"}},autoStyleContainer:!0,alignToBottom:!0,value:null,className:"progressbar-text"},svgStyle:{display:"block",width:"100%"},warnings:!1},c,!0),e.isObject(c)&&void 0!==c.svgStyle&&(this._opts.svgStyle=c.svgStyle),e.isObject(c)&&e.isObject(c.text)&&void 0!==c.text.style&&(this._opts.text.style=c.text.style);var f,g=this._createSvgView(this._opts);if(!(f=e.isString(b)?document.querySelector(b):b))throw new Error("Container does not exist: "+b);this._container=f,this._container.appendChild(g.svg),this._opts.warnings&&this._warnContainerAspectRatio(this._container),this._opts.svgStyle&&e.setStyles(g.svg,this._opts.svgStyle),this.svg=g.svg,this.path=g.path,this.trail=g.trail,this.text=null;var h=e.extend({attachment:void 0,shape:this},this._opts);this._progressPath=new d(g.path,h),e.isObject(this._opts.text)&&null!==this._opts.text.value&&this.setText(this._opts.text.value)}};g.prototype.animate=function(a,b,c){if(null===this._progressPath)throw new Error(f);this._progressPath.animate(a,b,c)},g.prototype.stop=function(){if(null===this._progressPath)throw new Error(f);void 0!==this._progressPath&&this._progressPath.stop()},g.prototype.pause=function(){if(null===this._progressPath)throw new Error(f);void 0!==this._progressPath&&this._progressPath._tweenable&&this._progressPath._tweenable.pause()},g.prototype.resume=function(){if(null===this._progressPath)throw new Error(f);void 0!==this._progressPath&&this._progressPath._tweenable&&this._progressPath._tweenable.resume()},g.prototype.destroy=function(){if(null===this._progressPath)throw new Error(f);this.stop(),this.svg.parentNode.removeChild(this.svg),this.svg=null,this.path=null,this.trail=null,this._progressPath=null,null!==this.text&&(this.text.parentNode.removeChild(this.text),this.text=null)},g.prototype.set=function(a){if(null===this._progressPath)throw new Error(f);this._progressPath.set(a)},g.prototype.value=function(){if(null===this._progressPath)throw new Error(f);return void 0===this._progressPath?0:this._progressPath.value()},g.prototype.setText=function(a){if(null===this._progressPath)throw new Error(f);null===this.text&&(this.text=this._createTextContainer(this._opts,this._container),this._container.appendChild(this.text)),e.isObject(a)?(e.removeChildren(this.text),this.text.appendChild(a)):this.text.innerHTML=a},g.prototype._createSvgView=function(a){var b=document.createElementNS("http://www.w3.org/2000/svg","svg");this._initializeSvg(b,a);var c=null;(a.trailColor||a.trailWidth)&&(c=this._createTrail(a),b.appendChild(c));var d=this._createPath(a);return b.appendChild(d),{svg:b,path:d,trail:c}},g.prototype._initializeSvg=function(a,b){a.setAttribute("viewBox","0 0 100 100")},g.prototype._createPath=function(a){var b=this._pathString(a);return this._createPathElement(b,a)},g.prototype._createTrail=function(a){var b=this._trailString(a),c=e.extend({},a);return c.trailColor||(c.trailColor="#eee"),c.trailWidth||(c.trailWidth=c.strokeWidth),c.color=c.trailColor,c.strokeWidth=c.trailWidth,c.fill=null,this._createPathElement(b,c)},g.prototype._createPathElement=function(a,b){var c=document.createElementNS("http://www.w3.org/2000/svg","path");return c.setAttribute("d",a),c.setAttribute("stroke",b.color),c.setAttribute("stroke-width",b.strokeWidth),b.fill?c.setAttribute("fill",b.fill):c.setAttribute("fill-opacity","0"),c},g.prototype._createTextContainer=function(a,b){var c=document.createElement("div");c.className=a.text.className;var d=a.text.style;return d&&(a.text.autoStyleContainer&&(b.style.position="relative"),e.setStyles(c,d),d.color||(c.style.color=a.color)),this._initializeTextContainer(a,b,c),c},g.prototype._initializeTextContainer=function(a,b,c){},g.prototype._pathString=function(a){throw new Error("Override this function for each progress bar")},g.prototype._trailString=function(a){throw new Error("Override this function for each progress bar")},g.prototype._warnContainerAspectRatio=function(a){if(this.containerAspectRatio){var b=window.getComputedStyle(a,null),c=parseFloat(b.getPropertyValue("width"),10),d=parseFloat(b.getPropertyValue("height"),10);e.floatEquals(this.containerAspectRatio,c/d)||(console.warn("Incorrect aspect ratio of container","#"+a.id,"detected:",b.getPropertyValue("width")+"(width)","/",b.getPropertyValue("height")+"(height)","=",c/d),console.warn("Aspect ratio of should be",this.containerAspectRatio))}},b.exports=g},{"./path":5,"./utils":9}],8:[function(a,b,c){var d=a("./shape"),e=a("./utils"),f=function(a,b){this._pathTemplate="M 0,{halfOfStrokeWidth} L {width},{halfOfStrokeWidth} L {width},{width} L {halfOfStrokeWidth},{width} L {halfOfStrokeWidth},{strokeWidth}",this._trailTemplate="M {startMargin},{halfOfStrokeWidth} L {width},{halfOfStrokeWidth} L {width},{width} L {halfOfStrokeWidth},{width} L {halfOfStrokeWidth},{halfOfStrokeWidth}",d.apply(this,arguments)};f.prototype=new d,f.prototype.constructor=f,f.prototype._pathString=function(a){var b=100-a.strokeWidth/2;return e.render(this._pathTemplate,{width:b,strokeWidth:a.strokeWidth,halfOfStrokeWidth:a.strokeWidth/2})},f.prototype._trailString=function(a){var b=100-a.strokeWidth/2;return e.render(this._trailTemplate,{width:b,strokeWidth:a.strokeWidth,halfOfStrokeWidth:a.strokeWidth/2,startMargin:a.strokeWidth/2-a.trailWidth/2})},b.exports=f},{"./shape":7,"./utils":9}],9:[function(a,b,c){function d(a,b,c){a=a||{},b=b||{},c=c||!1;for(var e in b)if(b.hasOwnProperty(e)){var f=a[e],g=b[e];c&&l(f)&&l(g)?a[e]=d(f,g,c):a[e]=g}return a}function e(a,b){var c=a;for(var d in b)if(b.hasOwnProperty(d)){var e=b[d],f="\\{"+d+"\\}",g=new RegExp(f,"g");c=c.replace(g,e)}return c}function f(a,b,c){for(var d=a.style,e=0;e<p.length;++e){d[p[e]+h(b)]=c}d[b]=c}function g(a,b){m(b,function(b,c){null!==b&&void 0!==b&&(l(b)&&!0===b.prefix?f(a,c,b.value):a.style[c]=b)})}function h(a){return a.charAt(0).toUpperCase()+a.slice(1)}function i(a){return"string"==typeof a||a instanceof String}function j(a){return"function"==typeof a}function k(a){return"[object Array]"===Object.prototype.toString.call(a)}function l(a){return!k(a)&&("object"==typeof a&&!!a)}function m(a,b){for(var c in a)if(a.hasOwnProperty(c)){var d=a[c];b(d,c)}}function n(a,b){return Math.abs(a-b)<q}function o(a){for(;a.firstChild;)a.removeChild(a.firstChild)}var p="Webkit Moz O ms".split(" "),q=.001;b.exports={extend:d,render:e,setStyle:f,setStyles:g,capitalize:h,isString:i,isFunction:j,isObject:l,forEachObject:m,floatEquals:n,removeChildren:o}},{}]},{},[4])(4)});
//# sourceMappingURL=progressbar.min.js.map
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.9.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
(function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)})(function(i){"use strict";var e=window.Slick||{};e=function(){function e(e,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(e),appendDots:i(e),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(e),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(e).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,"undefined"!=typeof document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=t++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}var t=0;return e}(),e.prototype.activateADA=function(){var i=this;i.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):o===!0?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&i.options.adaptiveHeight===!0&&i.options.vertical===!1){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),s.options.rtl===!0&&s.options.vertical===!1&&(e=-e),s.transformsEnabled===!1?s.options.vertical===!1?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):s.cssTransitions===!1?(s.options.rtl===!0&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),s.options.vertical===!1?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),s.options.vertical===!1?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this,o=t.getNavTarget();null!==o&&"object"==typeof o&&o.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};e.options.fade===!1?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,e.options.fade===!1?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(i.options.infinite===!1&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1===0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;e.options.arrows===!0&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),e.options.infinite!==!0&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(o.options.dots===!0&&o.slideCount>o.options.slidesToShow){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),e.options.centerMode!==!0&&e.options.swipeToSlide!==!0||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.options.draggable===!0&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>0){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(r.originalSettings.mobileFirst===!1?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),e===!0&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),e===!0&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,e===!0&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||l===!1||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!==0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t,o=this;if(e=o.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var s in e){if(i<e[s]){i=t;break}t=e[s]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),e.options.accessibility===!0&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),e.options.arrows===!0&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),e.options.accessibility===!0&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),e.options.accessibility===!0&&e.$list.off("keydown.slick",e.keyHandler),e.options.focusOnSelect===!0&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>0&&(i=e.$slides.children().children(),i.removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){var e=this;e.shouldClick===!1&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",e.options.fade===!1?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;t.cssTransitions===!1?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;e.cssTransitions===!1?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick","*",function(t){var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&o.is(":focus")&&(e.focussed=!0,e.autoPlay())},0)}).on("blur.slick","*",function(t){i(this);e.options.pauseOnFocus&&(e.focussed=!1,e.autoPlay())})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){var i=this;return i.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(i.options.infinite===!0)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(i.options.centerMode===!0)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),n.options.infinite===!0?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,n.options.vertical===!0&&n.options.centerMode===!0&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!==0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),n.options.centerMode===!0&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:n.options.centerMode===!0&&n.options.infinite===!0?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:n.options.centerMode===!0&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=n.options.vertical===!1?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,n.options.variableWidth===!0&&(o=n.slideCount<=n.options.slidesToShow||n.options.infinite===!1?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=n.options.rtl===!0?o[0]?(n.$slideTrack.width()-o[0].offsetLeft-o.width())*-1:0:o[0]?o[0].offsetLeft*-1:0,n.options.centerMode===!0&&(o=n.slideCount<=n.options.slidesToShow||n.options.infinite===!1?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=n.options.rtl===!0?o[0]?(n.$slideTrack.width()-o[0].offsetLeft-o.width())*-1:0:o[0]?o[0].offsetLeft*-1:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){var e=this;return e.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(e.options.infinite===!1?i=e.slideCount:(t=e.options.slidesToScroll*-1,o=e.options.slidesToScroll*-1,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o,s,n=this;return s=n.options.centerMode===!0?Math.floor(n.$list.width()/2):0,o=n.swipeLeft*-1+s,n.options.swipeToSlide===!0?(n.$slideTrack.find(".slick-slide").each(function(e,s){var r,l,d;if(r=i(s).outerWidth(),l=s.offsetLeft,n.options.centerMode!==!0&&(l+=r/2),d=l+r,o<d)return t=s,!1}),e=Math.abs(i(t).attr("data-slick-index")-n.currentSlide)||1):n.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){var t=this;t.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),t.options.accessibility===!0&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);if(i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),s!==-1){var n="slick-slide-control"+e.instanceUid+s;i("#"+n).length&&i(this).attr({"aria-describedby":n})}}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.options.focusOnChange?e.$slides.eq(s).attr({tabindex:"0"}):e.$slides.eq(s).removeAttr("tabindex");e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;i.options.arrows===!0&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),i.options.accessibility===!0&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;e.options.dots===!0&&e.slideCount>e.options.slidesToShow&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),e.options.accessibility===!0&&e.$dots.on("keydown.slick",e.keyHandler)),e.options.dots===!0&&e.options.pauseOnDotsHover===!0&&e.slideCount>e.options.slidesToShow&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),e.options.accessibility===!0&&e.$list.on("keydown.slick",e.keyHandler),e.options.focusOnSelect===!0&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;i.options.arrows===!0&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),i.options.dots===!0&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&e.options.accessibility===!0?e.changeSlide({data:{message:e.options.rtl===!0?"next":"previous"}}):39===i.keyCode&&e.options.accessibility===!0&&e.changeSlide({data:{message:e.options.rtl===!0?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||r.$slider.attr("data-sizes"),n=document.createElement("img");n.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),r.$slider.trigger("lazyLoaded",[r,e,t])})},n.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),r.$slider.trigger("lazyLoadError",[r,e,t])},n.src=t})}var t,o,s,n,r=this;if(r.options.centerMode===!0?r.options.infinite===!0?(s=r.currentSlide+(r.options.slidesToShow/2+1),n=s+r.options.slidesToShow+2):(s=Math.max(0,r.currentSlide-(r.options.slidesToShow/2+1)),n=2+(r.options.slidesToShow/2+1)+r.currentSlide):(s=r.options.infinite?r.options.slidesToShow+r.currentSlide:r.currentSlide,n=Math.ceil(s+r.options.slidesToShow),r.options.fade===!0&&(s>0&&s--,n<=r.slideCount&&n++)),t=r.$slider.find(".slick-slide").slice(s,n),"anticipated"===r.options.lazyLoad)for(var l=s-1,d=n,a=r.$slider.find(".slick-slide"),c=0;c<r.options.slidesToScroll;c++)l<0&&(l=r.slideCount-1),t=t.add(a.eq(l)),t=t.add(a.eq(d)),l--,d++;e(t),r.slideCount<=r.options.slidesToShow?(o=r.$slider.find(".slick-slide"),e(o)):r.currentSlide>=r.slideCount-r.options.slidesToShow?(o=r.$slider.find(".slick-cloned").slice(0,r.options.slidesToShow),e(o)):0===r.currentSlide&&(o=r.$slider.find(".slick-cloned").slice(r.options.slidesToShow*-1),e(o))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){var i=this;i.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;if(!t.unslicked&&(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),t.options.accessibility===!0&&(t.initADA(),t.options.focusOnChange))){var o=i(t.$slides.get(t.currentSlide));o.attr("tabindex",0).focus()}},e.prototype.prev=e.prototype.slickPrev=function(){var i=this;i.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),r=document.createElement("img"),r.onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),l.options.adaptiveHeight===!0&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),e.options.focusOnSelect===!0&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;return"boolean"==typeof i?(e=i,i=e===!0?0:o.slideCount-1):i=e===!0?--i:i,!(o.slideCount<1||i<0||i>o.slideCount-1)&&(o.unload(),t===!0?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,void o.reinit())},e.prototype.setCSS=function(i){var e,t,o=this,s={};o.options.rtl===!0&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,o.transformsEnabled===!1?o.$slideTrack.css(s):(s={},o.cssTransitions===!1?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;i.options.vertical===!1?i.options.centerMode===!0&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),i.options.centerMode===!0&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),i.options.vertical===!1&&i.options.variableWidth===!1?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):i.options.variableWidth===!0?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();i.options.variableWidth===!1&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,t.options.rtl===!0?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&i.options.adaptiveHeight===!0&&i.options.vertical===!1){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":"undefined"!=typeof arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),i.options.fade===!1?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=i.options.vertical===!0?"top":"left",
    "top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||i.options.useCSS===!0&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&i.animType!==!1&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&i.animType!==!1},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),n.options.centerMode===!0){var r=n.options.slidesToShow%2===0?1:0;e=Math.floor(n.options.slidesToShow/2),n.options.infinite===!0&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=n.options.infinite===!0?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(s.options.fade===!0&&(s.options.centerMode=!1),s.options.infinite===!0&&s.options.fade===!1&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=s.options.centerMode===!0?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));return s||(s=0),t.slideCount<=t.options.slidesToShow?void t.slideHandler(s,!1,!0):void t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(a.animating===!0&&a.options.waitForAnimate===!0||a.options.fade===!0&&a.currentSlide===i))return e===!1&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,a.options.infinite===!1&&a.options.centerMode===!1&&(i<0||i>a.getDotCount()*a.options.slidesToScroll)?void(a.options.fade===!1&&(o=a.currentSlide,t!==!0&&a.slideCount>a.options.slidesToShow?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o))):a.options.infinite===!1&&a.options.centerMode===!0&&(i<0||i>a.slideCount-a.options.slidesToScroll)?void(a.options.fade===!1&&(o=a.currentSlide,t!==!0&&a.slideCount>a.options.slidesToShow?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o))):(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!==0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!==0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=a.getNavTarget(),l=l.slick("getSlick"),l.slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide)),a.updateDots(),a.updateArrows(),a.options.fade===!0?(t!==!0?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight()):void(t!==!0&&a.slideCount>a.options.slidesToShow?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)))},e.prototype.startLoad=function(){var i=this;i.options.arrows===!0&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),i.options.dots===!0&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),o=Math.round(180*t/Math.PI),o<0&&(o=360-Math.abs(o)),o<=45&&o>=0?s.options.rtl===!1?"left":"right":o<=360&&o>=315?s.options.rtl===!1?"left":"right":o>=135&&o<=225?s.options.rtl===!1?"right":"left":s.options.verticalSwiping===!0?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(o.touchObject.edgeHit===!0&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(e.options.swipe===!1||"ontouchend"in document&&e.options.swipe===!1||e.options.draggable===!1&&i.type.indexOf("mouse")!==-1))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,e.options.verticalSwiping===!0&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(l.options.verticalSwiping===!0&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(l.options.rtl===!1?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),l.options.verticalSwiping===!0&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,l.options.infinite===!1&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),l.options.vertical===!1?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,l.options.verticalSwiping===!0&&(l.swipeLeft=e+o*s),l.options.fade!==!0&&l.options.touchMove!==!1&&(l.animating===!0?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;return t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow?(t.touchObject={},!1):(void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,void(t.dragging=!0))},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i,e=this;i=Math.floor(e.options.slidesToShow/2),e.options.arrows===!0&&e.slideCount>e.options.slidesToShow&&!e.options.infinite&&(e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===e.currentSlide?(e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):e.currentSlide>=e.slideCount-e.options.slidesToShow&&e.options.centerMode===!1?(e.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):e.currentSlide>=e.slideCount-1&&e.options.centerMode===!0&&(e.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||"undefined"==typeof s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),"undefined"!=typeof t)return t;return o}});
/*custom script*/
jQuery( document ).ready( function() {
    "use strict";

    /* menu v5 START */
    var menuSelector = ".ftlg-menu";
    if (jQuery(menuSelector).length > 0){
        jQuery(window).resize(function(){
            if (jQuery(window).width() > 800) {
                mobileMenu(menuSelector);
            }
        });
        if (jQuery(window).width() > 800) {
            mobileMenu(menuSelector);
        }
    }
    function mobileMenu(menuSelector){
        jQuery(menuSelector).removeClass('ftlg-menu-mob');
        var windowWidth = jQuery(window).width();
        var menuWidth = jQuery(menuSelector).find(".dl-menu.dl-dropdown-menu").width();
        var logoWidth = jQuery(menuSelector).find(".ft_logo").width();
        var searchBtnWidth = jQuery(menuSelector).find(".ft_search_btn").width();
        if ( (menuWidth+logoWidth+searchBtnWidth+110) > windowWidth ){
            jQuery(menuSelector).find(".dl-menu.dl-dropdown-menu").addClass('ftlg-dnone');
            jQuery(menuSelector).find(".ft_logo").addClass('ftlg-msa');
            jQuery(menuSelector).parent().addClass('ftlg-wrap-p');
            jQuery(menuSelector).find(".ft_burger_btn_ver_2").addClass('ftlg-dflex');
            jQuery(menuSelector).find(".ft_burger_btn_ver_2 svg.not_active").addClass('ftlg-icon');
            jQuery(menuSelector).closest(".containerWrap .wrap").addClass('ftlg-mw100');
            jQuery(menuSelector).addClass('ftlg-menu-mob');
        } else {
            jQuery(menuSelector).removeClass('ftlg-menu-mob');
            jQuery(menuSelector).find(".dl-menu.dl-dropdown-menu").removeClass('ftlg-dnone');
            jQuery(menuSelector).find(".ft_logo").removeClass('ftlg-msa');
            jQuery(menuSelector).parent().removeClass('ftlg-wrap-p');
            jQuery(menuSelector).find(".ft_burger_btn_ver_2").removeClass('ftlg-dflex');
            jQuery(menuSelector).find(".ft_burger_btn_ver_2 svg.not_active").removeClass('ftlg-icon');
            jQuery(menuSelector).closest(".containerWrap .wrap").removeClass('ftlg-mw100');
        }
    }
    /* menu v5 END */

    /* menu v2 */
    jQuery(".ft_header_wrap").on("click", ".ftv2-search-actions", function () {
        jQuery(this).parent().find(".ftlg-search-wrap").toggleClass("ftlg-active");
    });

    jQuery(".ft_header_wrap").on("click", ".ft_burger_btn_ver_2", function () {
        jQuery(".ftlg-search-wrap").removeClass("ftlg-active");
    });
    /* menu v2 END */

    /* Dropdown menu v3 */
    if (jQuery(".dl-menu.dl-dropdown-menu").length > 0){
        jQuery(".dl-menu.dl-dropdown-menu .dl-column").parent().each(function () {
            for (let i = 0; i < 4; i++) {
                let wrapContainer = '<div class="dl-dropdown-column dl-dropdown-column-'+(i+1)+'"></div>'
                jQuery(this).find(".dl-column-"+(i+1)).wrapAll(wrapContainer);
            }
        });

        jQuery(".ft_header_wrap").on("click", ".ft_burger_btn_ver_2", function () {
            jQuery(this).parent().find(".dl-menu.dl-dropdown-menu").toggleClass("dl-menu-active");
        });

        jQuery(".dropdown-menu.dropdown-first-level").each(function (){
            if (jQuery(this).find(".dl-dropdown-column").length > 3){
                jQuery(this).css("left", 0);
                jQuery(this).parent().css("position", "static");
            }
        });
    }

    jQuery(".s-info-show").on("click", function (event) {
        jQuery(this).toggleClass("s-info-display");
        if (jQuery(this).hasClass("s-info-display")){
            jQuery(this).text("Hide Article Statistics");
        } else {
            jQuery(this).text("View Article Statistics");
        }
        jQuery(this).parent().find("ul.s-info-items").toggleClass("s-dn");
        event.preventDefault();
    })

} );

function GetIEVersion() {
    var sAgent = window.navigator.userAgent;
    var Idx = sAgent.indexOf("MSIE");

    // If IE, return version number.
    if (Idx > 0)
        return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)));

    // If IE 11 then look for Updated user agent string.
    else if (!!navigator.userAgent.match(/Trident\/7\./))
        return 11;

    else
        return 0; //It is not IE
}

function set_level_height(class_tree) {
    var max_h = 0;
    jQuery(class_tree).each(function (index) {
        if (jQuery(this).height() > max_h) {
            max_h = jQuery(this).height();
        }
    });
    jQuery(class_tree).css('height', max_h);
}

jQuery(document).ready(function ($) {

    /* toggle */
    $("h3.wpsm-toggle-trigger").click(function(){
        $(this).toggleClass("active").next().slideToggle("fast");return false;
    });

    if ($('.wpsm-tooltip-sw').length > 0) {
        $(".wpsm-tooltip-sw").tipsy({gravity: "sw", fade: true, html: true });
    }


    if ($('.product_cart_block').length > 0) {
    } else {
        $("a[href*='#']:not([href='#'])").click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                || location.hostname == this.hostname) {

                var target = $(this.hash),
                    headerHeight = ($('#main_header').height() + 40);

                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

                if (target.length) {
                    /*$('html,body').animate({
                        scrollTop: target.offset().top - headerHeight
                    }, 500);*/
                    return false;
                }
            }
        });
    }

    set_level_height('.vab_list_of_posts_horizontal .vab_list_of_posts_item .vab_list_of_posts_text');
    if ($('.advanced_block_one.design_two').length > 0) {
        var max_h = 0;
        $(".advanced_block_one.design_two").each(function (index) {
            var h = $(this).children('.subterms').outerHeight() + $(this).children('.posts').outerHeight();
            if (h > max_h) {
                max_h = h;
            }
        });
        $(".advanced_block_one.design_two").each(function (index) {
            $(this).children('.posts').css('height', (max_h - $(this).children('.subterms').outerHeight()));
        });
    }


    $('.ft_search_btn').click(function () {
        $(this).toggleClass('active');
        $('.ft_search').toggleClass('active');

        $('.ft_submenu_box_mask').hide();
        $('.submenu_box').removeClass('active');
        $('.ft_menu .menu_list_item.has_submenu').removeClass('active');

        $('.ft_menu_mobile_ver_2').removeClass('active');
        $('.ft_burger_btn_ver_2').removeClass('active');

        $('.ftlg-menu .ftlg-search-wrap').toggleClass('ftlg-active');
        $("body").css("overflow", "auto");
    });



    $(".ft_menu .menu_list_item.has_submenu").hover(
        function () {
            if ($(window).width() > 768) {
                $('.ft_submenu_box_mask').show();
            }
            $('.ft_menu_wrap').css('max-height', ($(window).height() - $('.ft_header_wrap').height() + 2));
        }, function () {
            $('.ft_submenu_box_mask').hide();
        }
    );

    $('.ft_menu .menu_list_item.has_submenu').click(function () {
        $('.ft_search_btn').removeClass('active');
        $('.ft_search').removeClass('active');
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $(this).children('.submenu_box').addClass('active');
            $('.ft_submenu_box_mask').show();
        } else {
            $(this).children('.submenu_box').removeClass('active');
            $('.ft_submenu_box_mask').hide();
        }

    });

    $('.ft_menu .avb_submenu_item > a, .ft_menu .ft_submenu_item > .a').click(function (e) {
        if ($(window).width() < 640) {
            if ($(this).parent().hasClass('active')) {

            } else {
                e.preventDefault();
                $(this).parent().addClass('active');
                return false;
            }
        }
    });

    $('.ft_burger_btn_ver_2').click(function (event) {
        if ($(this).hasClass('active')) {
            $('.ft_menu_mobile_ver_2').removeClass('active');
            $('.ft_burger_btn_ver_2').removeClass('active');
            $("body").css("overflow", "auto");
        } else {
            $('.ft_menu_mobile_ver_2').addClass('active');
            $('.ft_burger_btn_ver_2').addClass('active');
            $("body").css("overflow", "hidden");
        }
        $('.ft_search').removeClass('active');
        $('.ft_search_btn').removeClass('active');
    });
    $('.ft_menu_mobile_ver_2 .close').click(function (event) {
        $('.ft_menu_mobile_ver_2').removeClass('active');
        $('.ft_burger_btn_ver_2').removeClass('active');
        $("body").css("overflow", "auto");
    });

    if (GetIEVersion() > 0) {
        jQuery(".img-object-fit-contain").removeClass('active');
        jQuery(".img-object-fit-contain").each(function () {
            var img_obj = jQuery(this).children('img');
            var src = img_obj.attr('src');
            jQuery(this).css('left', img_obj.css('left'));
            jQuery(this).css('top', img_obj.css('top'));
            jQuery(this).css('width', img_obj.css('width'));
            jQuery(this).css('height', img_obj.css('height'));
            jQuery(this).css('background-image', 'url("' + src + '")');
            jQuery(this).addClass('active');
        });
        jQuery(".img-object-fit-cover").removeClass('active');
        jQuery(".img-object-fit-cover").each(function () {
            var img_obj = jQuery(this).children('img');
            var src = img_obj.attr('src');
            jQuery(this).css('left', img_obj.css('left'));
            jQuery(this).css('top', img_obj.css('top'));
            jQuery(this).css('width', img_obj.css('width'));
            jQuery(this).css('height', img_obj.css('height'));
            jQuery(this).css('background-image', 'url("' + src + '")');
            jQuery(this).addClass('active');
        });
    }

    jQuery('.rating-hint-btn').on('click', function (event) {
        let currHint = jQuery(this).parent().find('.rating-hint');
        if (currHint.hasClass('sr-dblock')){
            currHint.removeClass('sr-dblock');
        } else {
            currHint.addClass('sr-dblock');
        }
        event.preventDefault();
        event.stopPropagation();
    })
    jQuery(window).on('click', function () {
        if (jQuery('.rating-hint').hasClass('sr-dblock')){
            jQuery('.rating-hint').removeClass('sr-dblock');
        }
    });

    /*** TFS Table ***/
    if (jQuery('.ftv-header-sidebar').length > 0) {
        var widgetArea = jQuery('.ftv-header-sidebar');
        if (jQuery('.widget.ins-widget').length > 0) {
            var infoWidget = jQuery('.widget.ins-widget').clone();
            jQuery('.widget.ins-widget').remove();
            widgetArea.append(infoWidget);
        }
    }
    /*** ***/

    /* Buying Guide */
    if (jQuery(".vc_row.wpb_row .fa.fa-book").length > 0){
        let buyingGuideTitle = "Buying Guide";
        if (jQuery(".vc_row.wpb_row .fa.fa-book").parent().text().trim().toLowerCase() == buyingGuideTitle.trim().toLowerCase()){
            jQuery(".vc_row.wpb_row .fa.fa-book").closest(".vc_row.wpb_row").addClass("dl-buying-guide");
        }
    }

    /*** Cards equal height ***/
    if (jQuery(".product_table_design_2").length > 0){
        let productCardSelector = ".product_table_design_2 .tr";
        jQuery(window).resize(function(){
            if (jQuery(window).width() > 640 && jQuery(window).width() < 801) {
                equalCardHeight(productCardSelector);
            }
        });
        if (jQuery(window).width() > 625 && jQuery(window).width() < 801) {
            equalCardHeight(productCardSelector);
        }
    }

    function equalCardHeight(itemSelector){
        //console.log("equalCardHeight")
        let highest = 0;
        let highestTitle = 0;

        jQuery(itemSelector).each(function(){
            let currHeight = jQuery(this).height();

            if(currHeight > highest) {
                highest = currHeight;
            }
            if(jQuery(this).find(".heading").height() > highestTitle) {
                highestTitle = jQuery(this).find(".heading").height();
            }
        });

        jQuery(itemSelector).each(function(){
            let currItemHeight = jQuery(this).height();

            if(currItemHeight < highest) {
                let currTitleHeight = jQuery(this).find(".heading").height();
                let titlePadding = 0;
                if (currTitleHeight < highestTitle){
                    titlePadding = Math.trunc((highestTitle - currTitleHeight)/2);
                }

                let currHeight = highest - currItemHeight;
                jQuery(this).find(".product-image-wrap")
                    .css("padding-top", Math.trunc(currHeight/2)+titlePadding+14);
                jQuery(this).find(".product-image-wrap")
                    .css("padding-bottom", Math.trunc(currHeight/2)+titlePadding+14);

            } else { console.log("currHeight else");
                let currTitleHeight = jQuery(this).find(".heading").height();
                if (currTitleHeight < highestTitle){
                    let titlePadding = Math.trunc((highestTitle - currTitleHeight)/2);
                    jQuery(this).find(".product-image-wrap")
                        .css("padding-top", titlePadding+14);
                    jQuery(this).find(".product-image-wrap")
                        .css("padding-bottom", titlePadding+14);
                }
            }
        });
    }

    /*** Card label padding ***/
    function processProductLabelPadding() {
        jQuery(".product_table_design_2 .tr").each(function () {
            let titleHeight = jQuery(this).find(".td-2 .heading").outerHeight();
            jQuery(this).css('padding-top', titleHeight);
            jQuery(this).find(".td-3 .progresbarWrap").css('top', titleHeight+6);
            jQuery(this).find(".td-3 .rating-hint-wrap").css('top', titleHeight+72+4);
        });
    }

    if (jQuery(".product_table_design_2").length > 0){
        jQuery(window).resize(function(){
            if (jQuery(window).width() < 801) {
                processProductLabelPadding();
            }
        });
        if (jQuery(window).width() < 801) {
            processProductLabelPadding();
        }
    }


    /*** Vertical table ***/
    if (jQuery('.tfs-table-wrap').length > 0){
        jQuery(window).resize(function(){
            if (jQuery(window).width() < 992) {
                mobImageResize();
            }
        });
        if (jQuery(window).width() < 992) {
            mobImageResize();
        }

    }

    function mobImageResize(){
        if (jQuery('.tfs-head').length > 0){
            jQuery('.tfs-head').each(function(){
                var titleHeight = jQuery(this).find('.tfs-title').height();
                var buttonsHeight = jQuery(this).find('.tfs-links-wrap').height();
                var marginBottom = 12+28;
                jQuery(this).find('.tfs-image').css('max-height', titleHeight + buttonsHeight + marginBottom + 'px');
            });
        }
    }
    /*** Vertical table END ***/

    /**
     * Product detail card fix
     */
    if (jQuery('.product_cart_block').length > 0 && jQuery('.wpsm_arrowlist.wpsm_pretty_list.small_gap_list').length > 0) {
        jQuery(".wpsm_arrowlist.wpsm_pretty_list.small_gap_list li a").each(function (index) {
            var p = jQuery(this);
            var name = p.html();
            name = name.replace("’", "");
            name = name.replace("'", "");
            jQuery(".product_cart_block h2").each(function (index2) {
                var c = jQuery(this);
                var product_name = c.children('a').html();
                if (c.children('.product_label').length > 0) {
                    var product_nomination = c.children('.product_label').html();
                    product_nomination = product_nomination.replace("’", "");
                    product_nomination = product_nomination.replace("'", "");
                    if (product_nomination.length > 0) {
                        if (name == product_nomination) {
                            p.append('<span class="dl-menu-subtitle" style="display: block;">' + product_name + '</span>');
                        }
                    }
                }
            });
        });
    }

    /**
     * Comparation post type tables
     */
    /*задать равную ширину таблице, если у нее 4 колонки*/
    jQuery('.table-kpa').each(function(){
        var mytd = jQuery(this).find('table tr:first td');
        var oldtd = jQuery(this).find('table tr td');
        var colCount = mytd.length;
        if (colCount == 4) {
            mytd.addClass('td_width');
            oldtd.addClass('td_width');

        }
    });

    /**
     * Visual composer accordion fix
     */
    jQuery('.vc_tta.vc_general .vc_tta-panel').addClass('vc_active');
    jQuery('.wpb-js-composer .vc_tta.vc_general .vc_tta-panel-title>a').click(function (e) {
        e.preventDefault();
        return false;
    });
});
jQuery(window).resize(function () {
    if (GetIEVersion() > 0) {
        jQuery(".img-object-fit-contain").removeClass('active');
        jQuery(".img-object-fit-contain").each(function () {
            var img_obj = jQuery(this).children('img');
            var src = img_obj.attr('src');
            jQuery(this).css('left', img_obj.css('left'));
            jQuery(this).css('top', img_obj.css('top'));
            jQuery(this).css('width', img_obj.css('width'));
            jQuery(this).css('height', img_obj.css('height'));
            jQuery(this).css('background-image', 'url("' + src + '")');
            jQuery(this).addClass('active');
        });
        jQuery(".img-object-fit-cover").removeClass('active');
        jQuery(".img-object-fit-cover").each(function () {
            var img_obj = jQuery(this).children('img');
            var src = img_obj.attr('src');
            jQuery(this).css('left', img_obj.css('left'));
            jQuery(this).css('top', img_obj.css('top'));
            jQuery(this).css('width', img_obj.css('width'));
            jQuery(this).css('height', img_obj.css('height'));
            jQuery(this).css('background-image', 'url("' + src + '")');
            jQuery(this).addClass('active');
        });
    }
});

//Scroll To top
var pretimer;
jQuery(window).scroll(function(){
    'use strict';

    var postheight = jQuery('.post-inner').height() + jQuery('#main_header').height() - 100;
    if (jQuery(this).scrollTop() > 500) {
        clearTimeout(pretimer);
        jQuery('#topcontrol, #float-posts-nav, #rh_social_panel_footer').addClass('scrollvisible');
        var refresh=function(){jQuery('#topcontrol, #float-posts-nav').removeClass('scrollvisible');}
        pretimer=setTimeout(refresh,15000);

    } else {
        jQuery('#topcontrol').removeClass('scrollvisible');
        jQuery('#float-posts-nav').removeClass('scrollvisible');
    }
    if (jQuery(this).scrollTop() > postheight) {
        jQuery('#float-posts-nav').addClass('openedprevnext');
    } else {
        jQuery('#float-posts-nav').removeClass('openedprevnext');
    }

    if (jQuery('.footer-bottom').length > 0) {
        if (jQuery('#re-compare-panel').length > 0) {
            if(isVisibleOnScroll(jQuery('.footer-bottom'))) {
                jQuery('#re-compare-panel').addClass('collapsed-onscroll');
            }
            else {
                jQuery('#re-compare-panel').removeClass('collapsed-onscroll');
            }
        }
    }

});

jQuery( document ).ready( function() {
    "use strict";

    /*** bottom rating bar ***/
    function addBottomRatingBar(label, title, total){
        if (jQuery(".rate_bar_wrap").length > 0){
        } else {
            var totalTmpl = '';
            if (typeof total != 'undefined' && total){
                totalTmpl = '<span class="overall r_score_9">'+total+'</span> <span class="overall-text">Total Score</span>';
            }
            var review = `<div class="rate_bar_wrap">
                            <div class="review-top">
                                <div class="overall-score">
                                    `+totalTmpl+`
                                </div>
                                <div class="review-text">
                                    <span class="review-header">`+title+' - '+label+`</span>
                                </div>
                            </div>
                        </div>`;
            if (jQuery(".formatBlock").length > 0) {
                jQuery('.formatBlock').append(review);
            } else {
                jQuery('article.post').append(review);
            }

        }
    }

    function verticalTableBottomReview(){
        if (jQuery(".product_cart_block_heading").length > 0){
            var label = jQuery(".product_cart_block_heading").first().find("h2 span.product_label").text();
            var title = jQuery(".product_cart_block_heading").first().find("h2 a").text();
            var total = jQuery(".product_cart_block_info").first().find(".rating").text();

            addBottomRatingBar(label, title, total);
        }
    }

    function euTableBottomReview(){
        if (jQuery(".tss-table").length > 0){
            var label = jQuery(".tss-table.tss-table-carousel .tss-item-carousel.nom-ec .tss-nomination-wrap .nom-label").text();
            var title = jQuery(".tss-table.tss-table-carousel .tss-item-carousel.nom-ec .tss-content .tss-title a.tss-title-link").text();
            var total = jQuery(".tss-table.tss-table-carousel .tss-item-carousel.nom-ec .tss-rating .tss-rating-value").text();

            addBottomRatingBar(label, title, total);
        }
    }

    function tfsTableBottomReview(){
        if (jQuery(".tfs-table").length > 0){
            var label = jQuery(".tfs-table .tfs-head .nom-label").eq(0).text();
            var title = jQuery(".tfs-table .tfs-content .tfs-title-link").eq(0).text();
            var total = jQuery(".tfs-table .tfs-rating .progress_bar .text_value").eq(0).text();

            addBottomRatingBar(label, title, total);
        }
    }

    function fshTableBottomReview(){
        if (jQuery(".fsh-table").length > 0){
            var label = jQuery(".fsh-items .fsh-item:first-child .fsh-lb").text();
            var title = jQuery(".fsh-items .fsh-item:first-child .fsh-link").text();

            label = label.replace(':', '');

            addBottomRatingBar(label, title, false);
        }
    }

    if (jQuery(".product_cart_block_heading").length > 0){
        verticalTableBottomReview();
    } else if (jQuery(".tss-table-wrap").length > 0) {
        euTableBottomReview();
    } else if (jQuery(".tfs-table").length > 0) {
        tfsTableBottomReview();
    } else if (jQuery(".fsh-table").length > 0) {
        //fshTableBottomReview();
    }
    /*** bottom rating bar end ***/

    /*** Load product js ***/
    const POST_TYPE_REGULAR = 2;
    const MENU_POSITION_STICKY = 1;
    const MENU_POSITION_STATIC = 2;

    var loadJS = function(url, implementationCode, location, isAsync){

        var scriptTag = document.createElement('script');
        scriptTag.src = url;
        scriptTag.async = isAsync;

        scriptTag.onload = implementationCode;
        scriptTag.onreadystatechange = implementationCode;

        location.appendChild(scriptTag);
    };
    var loadCSS = function(cssId, stylePath, isPreloaded){

        if (!document.getElementById(cssId))
        {
            var head  = document.getElementsByTagName('head')[0];
            var link  = document.createElement('link');

            if (isPreloaded){
                var prloadLink = document.createElement('link');
                prloadLink.rel  = 'preload';
                prloadLink.as  = 'style';
                prloadLink.type = 'text/css';
                prloadLink.crossorigin  = 'anonymous';
                prloadLink.href = stylePath;
                prloadLink.media = 'all';
                head.appendChild(prloadLink);
            }

            link.id   = cssId;
            link.rel  = 'stylesheet';
            link.type = 'text/css';
            link.href = stylePath;
            link.media = 'all';
            head.appendChild(link);
        }
    };
    var moduloboxCallback = function(){};

    function setupSlider(count_sliders){
        for (var i = 1; i <= count_sliders; i++) {
            jQuery('.product_slickSlider_' + i + ' .image_items').slick({
                arrows: true,
                dots: false,
                autoplay: false,
                autoplaySpeed: 8000,
                fade: true,
                asNavFor: '.product_thumbnails_slickSlider_' + i + ' .image_items',
                responsive: [
                    {
                        breakpoint: 640,
                        settings: {
                            dots: true,
                            arrows: true,
                        }
                    }
                ]
            });
            jQuery('.product_thumbnails_slickSlider_' + i + ' .image_items').slick({
                arrows: false,
                dots: false,
                autoplay: false,
                autoplaySpeed: 8000,
                asNavFor: '.product_slickSlider_' + i + ' .image_items',
                slidesToShow: 4,
                slidesToScroll: 1,
                focusOnSelect: true,
            });

        }
    }
    var slickCallback = function(){
        if (jQuery('.product_cart_block').length > 0) {

            var count_sliders = jQuery('.product_cart_block').length;
            var scrollTop = jQuery(window).scrollTop();

            var isSliderEnabled = false;

            if (jQuery(window).scrollTop() > 10){
                setupSlider(count_sliders);
            } else {
                jQuery(window).scroll(function(){
                    if (!isSliderEnabled){
                        setupSlider(count_sliders);
                        isSliderEnabled = true;
                    }
                });
            }
            jQuery('.thumbnails_slider_prev').click(function () {
                var i = jQuery(this).data('n')
                if (i > 0) {
                    jQuery('.product_slickSlider_' + i + ' .image_items').slick('slickPrev');
                }
            });
            jQuery('.thumbnails_slider_next').click(function () {
                var i = jQuery(this).data('n');
                if (i > 0) {
                    jQuery('.product_slickSlider_' + i + ' .image_items').slick('slickNext');
                }
            });
        }

        if (jQuery('.ft_step_slider').length > 0) {
            function coloring_number(n) {
                jQuery('.ft_step_slider_control_item').removeClass('active');
                for (var i = 1; i <= n; i++) {
                    jQuery('.ft_step_slider_control_item_' + i).addClass('active');
                }
            }

            jQuery('.ft_step_slider_control_item').css('width', (100 / jQuery('.ft_step_slider_control_item').length) + '%');
            /*setTimeout(function () {
                coloring_number(1);
            }, 250);*/
            coloring_number(1);
            jQuery('.ft_step_slider .ft_step_slider_items').slick({
                arrows: false,
                dots: false,
                autoplay: true,
                autoplaySpeed: 8000,
            });
            jQuery('.ft_step_slider .ft_step_slider_items').on('init', function (event, slick) {
                coloring_number(1);
            });
            jQuery('.ft_step_slider .ft_step_slider_items').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                coloring_number(nextSlide + 1);
            });
            jQuery('.ft_step_slider_control_item').click(function () {
                var n = jQuery(this).data('n');
                coloring_number(n);
                jQuery('.ft_step_slider .ft_step_slider_items').slick('slickGoTo', (n - 1));
            });
            jQuery('.ft_step_slider_control_next').click(function () {
                jQuery('.ft_step_slider .ft_step_slider_items').slick('slickNext');
            });
            jQuery('.ft_step_slider_control_prev').click(function () {
                jQuery('.ft_step_slider .ft_step_slider_items').slick('slickPrev');
            });
        }
    }

    var progressbarCallback = function(){
        /**
         * Product Table progress bar
         */
        if (jQuery('.product_table_design_2 .progresbarWrap .progress_bar').length > 0) {
            jQuery('.product_table_design_2 .progresbarWrap .progress_bar').each(function () {
                var o = jQuery(this);
                var id = o.attr('id');
                var value = o.data('value');
                var color = o.data('color');
                var bar = new ProgressBar.Circle('#' + id, {
                    strokeWidth: 6,
                    easing: 'easeInOut',
                    duration: 1400,
                    color: color,
                    trailColor: '#ffffff',
                    trailWidth: 6,
                    value: 20,
                    svgStyle: null
                });
                var gradient = '<linearGradient id="gradient1">'+
                    '<stop id="stop1" offset="0%" ></stop>'+
                    '<stop id="stop2" offset="100%" ></stop>'+
                    '</linearGradient>';
                bar.svg.insertAdjacentHTML('afterbegin', gradient);
                bar.animate(value);
            });
        }

        if (jQuery('.tfs-table-wrap .progresbarWrap .progress_bar').length > 0) {
            jQuery('.tfs-table-wrap .progresbarWrap .progress_bar').each(function () {
                var o = jQuery(this);
                var id = o.attr('id');
                var value = o.data('value');
                var color = o.data('color');
                var bar = new ProgressBar.Circle('#' + id, {
                    strokeWidth: 6,
                    easing: 'easeInOut',
                    duration: 1400,
                    color: color,
                    trailColor: '#ffffff',
                    trailWidth: 6,
                    value: 20,
                    svgStyle: null
                });
                var gradient = '<linearGradient id="gradient1">'+
                    '<stop id="stop1" offset="0%" ></stop>'+
                    '<stop id="stop2" offset="100%" ></stop>'+
                    '</linearGradient>';
                bar.svg.insertAdjacentHTML('afterbegin', gradient);
                bar.animate(value);
            });
        }

        if (jQuery('.tss-table-cards .progresbarWrap .progress_bar').length > 0) {
            jQuery('.tss-table-cards .progresbarWrap .progress_bar').each(function () {
                var o = jQuery(this);
                var id = o.attr('id');
                var value = o.data('value');
                var color = o.data('color');
                var bar = new ProgressBar.Circle('#' + id, {
                    strokeWidth: 6,
                    easing: 'easeInOut',
                    duration: 1400,
                    color: color,
                    trailColor: '#ffffff',
                    trailWidth: 6,
                    value: 20,
                    svgStyle: null
                });
                var gradient = '<linearGradient id="gradient1">'+
                    '<stop id="stop1" offset="0%" ></stop>'+
                    '<stop id="stop2" offset="100%" ></stop>'+
                    '</linearGradient>';
                bar.svg.insertAdjacentHTML('afterbegin', gradient);
                bar.animate(value);
            });
        }
    }
    var pageScrollCallback = function(){
        /**
         * Product detail, comparation table widget scroll
         */
        var pageScrollOffset = 20;
        if (dl_menu_position == MENU_POSITION_STICKY){
            pageScrollOffset = jQuery('.ft_header').height() + 20;
        }
        /*jQuery("a[href*='#']").mPageScroll2id({
            'scrollSpeed': 300,
            'offset': (pageScrollOffset),
            'autoScrollSpeed': true,
            'scrollEasing': 'linear',
            'scrollingEasing': 'linear'

        });*/
    }
    /*loadCSS('modulobox_style', dl_theme_common+'assets/vendor/modulobox/css/modulobox.min.css', true);
    loadCSS('slick_style', dl_theme_common+'assets/vendor/slick/css/slick.min.css', true);
    loadCSS('common_style', dl_theme_common+'css/common/themes/'+dl_theme_style+'.min.css', true);
    if (dl_post_type == POST_TYPE_REGULAR){
        loadJS(dl_theme_common+'assets/vendor/progressbar.min.js', progressbarCallback, document.body, true);
        loadJS(dl_theme_common+'assets/vendor/modulobox/js/modulobox.min.js', moduloboxCallback, document.body, true);
        loadJS(dl_theme_common+'assets/vendor/jquery.malihu.PageScroll2id.min.js', pageScrollCallback, document.body, true);
    }
    loadJS(dl_theme_common+'assets/vendor/slick/js/slick.min.js', slickCallback, document.body, true);*/

    progressbarCallback();
    slickCallback();
    //pageScrollCallback();

} );


