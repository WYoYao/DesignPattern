

; (function () {


    var getUrl = function (moduleName) {
        /**
         * 例如 lib/ajax.js    lib/ajax
         */
        return String(moduleName).replace(/\.js$/g, '') + '.js';
    };


    var loadScript = function (src) {
        var _script = document.createElement('script');
        _script.type = 'text/JavaScript';
        _script.charset = 'UTF-8';
        _script.async = true;
        _script.src = src;
        document.getElementsByTagName('body')[0].appendChild(_script);
    }

    var modulesCache = {};

    /**
     *  进行单个模块的加载
     * url: 模块的路径
     * callback  单个模块执行完成加载后执行的回掉，
     * 在 请求的模块的方法中已经设置
     */
    var loadModule = function (url, callback) {
        // 依赖模块
        var _module;
        // 如果该模块已经进行过加载
        if(modulesCache[url]){
            // 变量保存简写
            _module=modulesCache[url];
            // 已经完成加载了执行一部执行回调
            if(_module.status=='loaded'){
                // 直接异步进行执行
                setTimeout(callback(_module.exports),0);
            }else{
                // 还没有进行完成加载 将回调函数进行缓存 等待加载完成后执行
                _module.onload.push(callback);
            }
        }else{
            modulesCache[url]={
                exports:null,
                status:'loadding',
                onload:[callback],
            }

            // 然后执行加载文件
            loadScript(getUrl(url));
        }
    }

    /**
     * 设置模块跟开始的声明调用模块非常的相似, 只不过依赖的模块已经得从需要加载的字符串路径转变成为模块加载完毕之后的返回的对象
     * 
     */
    setModule=function (url, params, callback){
        var _module,fn;
        // 如果该模块被依赖过 将依赖的回调全部执行
        if(modulesCache[url]){
            _module=modulesCache[url];
            _module.status='loaded';
            // 保存整个模块执行完成之后的返回值 
            _module.exports=callback?callback.apply(_module,params):null;
            // 循环将依赖执行的方法全部的执行
            while(fn=_module.onload.shift()){
                fn(_module.exports);
            }

        }else{

            // 没有被任何模块依赖的模块 (执行的主程序)
            callback && callback.apply(null,params);

        }
    }



    window.L = {
        /**
         * 模块声明部分，如果有依赖的模块进行模块调用
         * uri:请求的模块地址
         * params:依赖的模块数组
         * callback:依赖模块执行完毕之后执行的主函数(主函数中的参数是请求模块中的exports 对象);
         */
        module: function (uri, modDeps, callback) {
            var argu = Array.prototype.slice.call(arguments),
                // 获取函数最后面部分为函数的调用的完毕执行的函数
                main = argu.pop(),
                // 获取依赖的模块
                needs = (argu[argu.length-1] && argu[argu.length-1] instanceof Array) ? argu.pop() : [],
                //获取Url
                url=uri.length?argu.pop():null,
                // 获取依赖模块的长度
                len = needs.length,
                // 未加载的模块数量
                needLoadCount = 0,
                // 依赖的模块
                params = [],
                i = 0;

            // 如果含有依赖的模块则进行加载
            if (len) {
                while (i < len) {
                    // 闭包保存I
                    needLoadCount++;
                    ; (function (i) {
                        // 将依赖模块添加到加载模块中   单个模块加载完成后的回调
                        loadModule(needs[i], function (exports) {
                            // **重点** 这里通过闭包保存了 加载时候的顺序，做到了 跟传入的依赖模块的顺序的统一
                            params[i] = exports;
                            // 加载完成一个就减少一个未加载的函数  **这个地方的needLoadCount 因为没有受到闭包的作用因此显示的是最后的值**
                            needLoadCount--;
                            // 所有以来模块全部加载完成后 将整个模块进行定义
                            if (needLoadCount == 0) {
                                // 在模块的缓存器中修改模块的状态
                                setModule(url, params, main);
                            }
                        })

                    })(i);
                    i++;
                }
            } else {
                // 没有依赖模块的时候直接在缓存器中设置该模块,并进行该模块的,并执行构造函数
                setModule(url, params, main);
            }

        }
    }
})();