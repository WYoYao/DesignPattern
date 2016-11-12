
// 对DOM 事件的封装

var DOM={
    getEvent:function(e){
        // 标准浏览器     IE浏览器
        return e.event || window.event;
    },
    // 阻止冒泡排序
    stopPupo:function(){
        var event=this._getEvent();
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue=false;
        }
    },
    // 获取触发事件的DOM
    getTarget:function(){
        var event=this._getEvent();
        return event.target || event.srcElement;
    },
    event:[],
    // 绑定事件
    addEvent:function(dom,type,fn){
        if(dom.addEventListener){
            // 冒泡阶段触发
            dom.addEventListener(type,fn,false);
        }else if(dom.attachEvent){
            dom.attachEvent('on'+ type.toLowerCase(),fn);
        }else{
            dom['on'+type.toLowerCase()]=function(){
                this.event.forEach(function(item){
                    item();
                })
            }
        }
    }
}