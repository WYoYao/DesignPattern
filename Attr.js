


/**
 * 返回的Object 属性下的某一个属性，如果的不存在就返回undefined
 * 设置Object 多层下的一个属性，如果不存在多级的就自动创建多级
 * content:需要处理的目标对象
 * str:需要访问的属性字符串
 */



var Attr=function(content,str){
    // 将传入的Str 路径转换成为对应的数组对象
    /**
     *  [{
     *      type:[Object,Array,Base],
     *      key:['key',index]
     * }]
     * 
     */

    // 正则处理后的访问路径数组
    var _path=[];

    // a.sd.asdf.as
    // as.asd.asd[0].da
    var Reg=//
    

    // 将每个分组细化出对应的属性
    function _convertPath(){
        if(!_path.length){

        }
    }

    var path=[];
    // 获取某一个属性
    this.get=function(){
        if(!content) return void 0;

        _convertPath(str.split('.'));
        return 

    };
    // 设置某一个属性
    this.set=function(){
        if(!content) return void 0;

    }
}