// ==UserScript==
// @name         Select All Checkboxes
// @name:zh-CN   多选框伴侣
// @name:zh-TW   多選框伴侶
// @namespace    hoothin
// @version      0.3
// @description  A mate for checkbox, select all checkboxes by press Ctrl+Alt+mouse1, or select checkboxes with mouse over by press Alt, or select checkboxes between 2 marks by press Shift.
// @description:zh-CN Ctrl+Alt点击全选多选框，Alt加鼠标悬停选择多选框，Shift选择两个多选框之间的所有多选框
// @description:zh-TW Ctrl+Alt點擊全選多選框，Alt加鼠標懸停選擇多選框，Shift選擇兩個多選框之間的所有多選框
// @author       Hoothin
// @include      http*://*/*
// @require      http://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js
// @grant       GM_registerMenuCommand
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=rixixi@sina.com&item_name=Greasy+Fork+donation
// @contributionAmount 1
// ==/UserScript==

(function() {
    'use strict';
    var type=navigator.appName;
    var lang = null;
    if (type=="Netscape"){
        lang = navigator.language;
    }else{
        lang = navigator.userLanguage;
    }
    var langStr = lang.substr(0,2);
    if (langStr == "zh"){
        langStr = "全选";
    }else{
        langStr = "SelectAll";
    }
    GM_registerMenuCommand(langStr, selectAll);

    function selectAll(){
        $("input:checkbox:enabled").click();
    }

    var selectObj = $("input:checkbox:enabled");
    var preObj;
    selectObj.mousedown(function (event) {
        if(!event.shiftKey&&event.altKey&&event.ctrlKey){
            selectObj.click();
            this.click();
        }else if(event.shiftKey&&!event.altKey&&!event.ctrlKey){
            var curParent=this;
            var preParent=preObj;
            for(var i=0;i<5;i++){
                curParent=curParent.parentNode;
                preParent=preParent.parentNode;
                if(!curParent||!preParent)return;
                if(curParent==preParent){
                    var target=this;
                    var find=false;
                    $(curParent).find("input:checkbox:enabled").each(function(){
                        if(this==preObj||this==target){
                            if(find){
                                find=false;
                                return;
                            }
                            find=true;
                        }else if(find){
                            this.click();
                        }
                    });
                    break;
                }
            }
        }
        preObj=this;
    });
    selectObj.mouseover(function (event) {
        if(!event.shiftKey&&event.altKey&&!event.ctrlKey){
            this.click();
        }
    });
})();