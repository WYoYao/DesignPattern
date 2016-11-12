
/**
 * 通过深度Copy将多个Object类型合并到一个Object 中从前向后执行 
 */

function Copy() {
    // 判断数据类型
    function _valiteType(value) {
        return {
            '[object Object]': 'Object',
            '[object Array]': 'Array',
            '[object Base]': 'Base',
        }[Object.prototype.toString.call(value)]
    }
    // 执行复制动作
    function _copy(content,item) {
        var type=_valiteType(item);
        if (type == 'Object' || type == 'Array') {
            if(_valiteType(content)!=type){
                // 如果类型不是对应的需要以后面需要copy的类型为准
                if(type=='Array'){
                    content=[];
                }else{
                    content={};
                }
            }
            return _exec(content,item,type);
        } else {
            return item;
        }
    }

    // 复制返回的对应的引用类型
    function _exec(content,obj){
        var key;
        for(key in obj){
            if(obj.hasOwnProperty(key)){
                content[key]=_copy(content[key],obj[key]);
            }
        }
        return content;
    }

    this.copy=function(){
        var argu=Array.prototype.slice.call(arguments);

        argu.forEach(function(item){
            if (Object.prototype.toString.call(item) != '[object Object]') throw new Error('Arguments Error');
        })
        // 循环执行所有的参数
        return argu.reduce(function(content,item){
            return _copy(content,item);
        },{})
    }
}




var demo=new Copy;

var source = {
    name: 'leo',
    age: 24,
    agelist: [1,2,3,4,5],
    like: {
        play: 'JS',
        parter: ['parter'],
        color: {
            red: '99',
        }
    },
    display: ['block', ['parter'], {
        red: '99',
    }]
}

var source1 = {
    name: 'leo',
    age: 25,
    like: {
        play: 'JS',
        parter: ['parter1'],
        color: {
            red: '99',
        }
    },
    display: ['block', ['parter1'], {
        red: '99',
    }]
}

var source2 = {
    name: 'leo',
    age: 25,
    like: {
        play: 'JS',
        parter: ['parter1'],
        color: {
            red: '99',
        }
    },
    display: {
        0:'blockObj',
        1:['parterObj'],
        2:{
            red: '99Obj',
        }
    }
}


var target = demo.copy(source,source1,source2);
console.log(target);
console.log(target.like == source.like);
console.log(target.display == source.display);
console.log(target.like.parter == source.like.parter);
console.log(target.like.color == source.like.color);
console.log(target.display[1] == source.display[1]);
console.log(target.display[2] == source.display[2]);






