

/**
 * 惰性执行的
 * 为了兼容多种浏览器需要添加多个分支的判断，但是不用每次都进行的多次分支的判断.
 * 
 */

A.on=function(dom,type,fn){
    if(dom.addEventListener){
        A.on=function(dom,type,fn){
            dom.addEventListener(type,fn,false);
        }
    }else if(dom.attachEvent){
        A.on=function(dom,type,fn){
            dom.attachEvent('on'+type,fn);
        }
    }else{
        A.on=function(dom,type,fn){
            dom['on'+type]=fn;
        }
    }

    A.on(dom,type,fn);
}