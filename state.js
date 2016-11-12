/**
 * 根据状态执行的对用的变化的
 * 
 * 
 */

var Marry=function () {
    var _currentState=[],
    state={
        jump:function(){
            console.log('跳一下');
        },
        move:function(){
            console.log('走一下');
        },
        shoot:function(){
            console.log('A一下');
        }
    },
    Action={
        // 可以一次性传入多个动作
        changeState:function(){
            var arg=Array.prototype.slice.call(arguments);
            if(arg.length){
                arg.reduce(function(content,item){
                    if(state[item]){
                        content.push(item);
                    }
                    return content;
                },_currentState)
            }
            return this;
        },
        execute:function(){
            if(_currentState.length){
                _currentState.forEach(function(item){
                    state[item] && state[item]();
                })
            }
            _currentState=[];
            return this;
        }
    }
    return {
        changeState:Action.changeState,
        execute:Action.execute,
    }
}

Marry().changeState('jump','shoot').changeState('move').execute().changeState('shoot').changeState('move').execute();
