
/**
 * 创建一个变量具有只读属性
 * 
 */

var Config=function (obj) {
    var conf=new Object(obj);

    this.getKey=function(key){
            return conf[key]?conf[key]:void 0;
        }
}

var demo=new Config({
    name:'leo',
    age:23,
})

console.log(demo.getKey('name'));
console.log(demo.getKey('like'));



