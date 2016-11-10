/**
 * inherit
 * JS类中的继承
 * 需求：
 * 将A类中的共有属性继承到B类的共有属性中
 * 私有的属性全部继承到B类私有属性中
 */


function inherit(SonClass,ParentClass){
    // 共有部分
    // 创建一个过渡用的空类用来转换对应的Prototype 上面的属性
    var fn=function(){};
    fn.prototype=ParentClass.prototype;
    // 这里绑定的是新创建的实例，因此并不影响原来之前的父类的consrtuctor 的指向
    var o=new fn();
    // o.constructor=SonClass;
    // SonClass.prototype=o;

    //私有部分
    fn=SonClass;
    SonClass=function(){
        ParentClass.call(this);
        fn.call(this);
    };
    //绑定公有部分
    o.constructor=SonClass;
    SonClass.prototype=o;

    return SonClass;
}


/**
 * 测试代码
 * 
 */

function Parent(){
    this.parentname="leo";
}

Parent.prototype.parentSay=function(){
    console.log(this.parentname);
}

function Son(){
    this.sonname="Tom";
}

Son.prototype.sonSay=function(){
    console.log(this.sonname);
}


var Result = inherit(Son,Parent);

var test=new Result;
