
/**
 * 实现的对多个异步函数全部执行完毕之后调用
 * 
 * 
 */

var waitter=function () {
    // 注册了等待对象的容器
    var dfd=[],
    // 成功回调方法的容器
    doneArr=[],
    // 失败回调方法的容器
    failArr=[],
    // 保存this
    that=this;
    // 监控对象的类
    var Primise=function(){
        // 监控对象是否解决成功状态
        this.resolved=false;
        // 监控对象是否解决失败状态
        this.rejected=false;
    }
    // 监控对象的原型方法
    Primise.prototype={
        // 解决成功的方法
        resolve:function(){
            // 设置当前监控对象解决成功
            this.resolved=true;
            // 如果没有监听对象则取消执行
            if(!dfd.length) return;
            // 循环便利所有被监听的对象，如果有一个状态还是没解决或着解决失败的则返回
            if(dfd.filter(function(item,index){
                //          还没解决         解决失败
                if((!item.resolved || item.rejected)){
                    dfd.splice(index,1);
                    return true;
                }else{
                    return false;
                }
            }).length){
                // 只要还有一个没返回就return 
                return;
            }

            // 如果全部都返回的解决并成功了调用解决解决成功的回调方法
            _exec(doneArr);

        },
        // 解决失败的方法
        reject:function(){
            // 设置当前监控的对象解决失败
            this.rejected=true;
            // 如果没有监听对象则取消执行
            if(!dfd.length) return;
            // 清除所有的监控对象
            dfd.splice(0);
            // 执行解决方案失败的回调方法
            _exec(failArr);

        }
    }

    // 创建监控对象
    that.Deferred=function(){
        return new Primise();
    }

    // 回调函数执行
    function _exec(arr){
        if(arr.length){
            arr.forEach(function(item){
                try {
                    item();
                } catch (error) {
                    
                }
            })
        }

    };

    //监控异步方法 参数:监控对象
    that.when=function(){
        dfd=Array.prototype.slice.call(arguments);
        // 清理已解决的监控对象  解决失败 不是监控的对象
        dfd=dfd.filter(function(item){
            return !item.resolved && !item.rejected && (item instanceof Primise);
        });

        return that;

    };

    // 解决成功回调函数添加方法
    that.done=function(){
        doneArr = doneArr.concat(Array.prototype.slice.call(arguments));
        return that;
    };

    // 解决失败回调函数添加方法
    that.fail=function(){
        failArr = failArr.concat(Array.prototype.slice.call(arguments));
        return that;
    };

}

var waitter=new waitter();

var one=function(){
    //创建监听对象
    var pris=waitter.Deferred();
    // 异步执行
    setTimeout(function() {
        console.log('one');
        pris.resolve();
    }, 5000);
    return pris;
}();

var two=function(){
    //创建监听对象
    var pris=waitter.Deferred();
    // 异步执行
    setTimeout(function() {
        console.log('two');
        pris.resolve();
    }, 10000);
    return pris;
}();

waitter
// 添加两个监听的事件
.when(one,two)
// 添加所有成功后的回调
.done(function(){
    console.log('所有成功后的回调1');
},function(){
    console.log('所有成功后的回调2');
}).fail(function(){
    console.log('没有全部成功啊');
})