/**
 * 创建一个类需要使其有以下应该具备的特征：
 * 私有属性 保存实例内部，外部不可直接改变
 * 私有方法 保存实例内部，外部不可直接调用
 * 
 * 对象公有属性 每个实例化后各自都有各自的方法
 * 对象公有方法
 * 
 * 特权方法 外界通过特权方法来访问内部的私有变量和方法
 * 
 * 类的静态方法 通过类直接调用不用通过实例调用
 * 类的静态属性
 * 
 * 共有属性 所有的实例共享方法和属性
 * 共有方法
 * 
 */

var Book=function(id,name){
    // 私有属性
    var num=1;
    // 私有方法
    function checkId(){}

    //公有属性
    this.id=id;
    //公有方法
    this.say=function(){
        console.log('book');
    }
    // 特权方法
    this.setBookNum=function(val){
        num=val;
    }
}

// 类的静态属性
Book.type="书";
Book.sale=function(){
    console.log('卖书啦');
}

// 实例的共有属性
Book.prototype.isBook=true;
Book.prototype.display=function(){};

var JS=new Book('1','红宝书');
var C=new Book('2','入门到放弃');
JS.num//undefind
JS.id===C.id//false
JS.isBook==C.isBook//true




