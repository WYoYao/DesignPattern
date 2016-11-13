


/**
 * 返回的Object 属性下的某一个属性，如果的不存在就返回undefined
 * 设置Object 多层下的一个属性，如果不存在多级的就自动创建多级
 * content:需要处理的目标对象
 * str:需要访问的属性字符串
 */



var Attr=function(str){
    // 将传入的Str 路径转换成为对应的数组对象
    /**
     *  [{
     *      type:[Object,Array,Base],
     *      key:['key',index]
     * }]
     * 
     */
    if(!str) return void 0;

    // a.sd.asdf.as
    // as.asd.asd[0].da
    var Reg=/(\w+)|(^\[{1}\w+$\]{1})/g,content,_path=str.match(Reg);

    // 获取对象的主体
    // 同时Eval 会过滤掉不存在的元素主体
    try{
        content=eval(_path.shift());
    }catch(e){
        content={};
    }


    // 获取某一个属性
    this.get=function(){

        return _path.reduce(function(content,item){
            return (content==void 0)?(void 0):content[item];
        },content);

    };
    // 设置某一个属性值 
    this.set=function(value,bool){
        return _path.reduce(function(content,item,index,arr){
            if((index==(arr.length-1))){
                content[item]=value;
                return true;
            }else{
                debugger;
                // 当设置属性的时候，中间属性为空 或者原来这个属性不是引用类型的时候强制将其转换成为Object 类型的数据
                if(content[item]==void 0 || !(content[item] instanceof Object)){
                    content[item]={};
                }
                return content[item];
            }
        },content);
    }
}

var obj={
    name:'leo',
    age:24,
    like:{
        play:{
            happy:true,
            get:[1,2,3]
        },
        arr:[1,{
            name:123,
        },3]
    },
    jump:[1,{
        play:{
            like:'fun'
        }
    }]
}

// console.log(new Attr('obj.like').get());
// console.log(new Attr('o2bj.like').get());
// console.log(new Attr('obj.like.play').get());
// console.log(new Attr('obj.like.play.get').get());
// console.log(new Attr('obj.like.play.get[5]').get());
// console.log(new Attr('obj.like.play.get[5]').get());
// console.log(new Attr('obj.like.play.get[5]').get());
// console.log(new Attr('obj.jump[0]').get());
// console.log(new Attr('obj.jump[1]').get());
// console.log(new Attr('obj.jump[1][play][like]').get());
//console.log(new Attr('obj.[jump][1][play][like]').get());
new Attr('obj.[jump][1][play][like][erhuf][fserf][serfres].esrf').set('newSet');
console.log(new Attr('obj.[jump][1][play][like][erhuf][fserf][serfres].esrf').get());
console.log(obj);



