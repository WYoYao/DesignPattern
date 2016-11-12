
/**
 * 装饰器对原有的方法进行装饰
 * 给原来的方法中添加内容
 * 
 */


var decorator=function(target,source) {
    var oldfn=target;
    target=function(){
        source();
        oldfn();
    }
}
