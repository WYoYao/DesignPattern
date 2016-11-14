L.module('lib/dom',function(){
    return {
        // 获取元素
        g:function(id){
            return document.getElementById(id);
        },
        // 获取设置元素内容的方法
        html:function(id,html){
            if(html)
                this.g(id).innerHTML=html;
            else
                return this.g(id).innerHTML;
        }
    }
})