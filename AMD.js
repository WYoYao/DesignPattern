
/**
 * 异步模块加载
 * 
 * 
 */

; (function (F) {
    // 模块缓存器
    var moduleCache = {};

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

    /**
     * 
     * moduleName 模块路径ID
     * callback 模块执行完成之后执行的回调
     */
    var loadModule = function (moduleName, callback) {
        // 依赖模块
        var _module;
        // 如果模块被加载过
        if (moduleCache[moduleName]) {
            // 获取该模块信息
            _module = moduleCache[moduleName];
            // 如果模块加载完成
            if (_module.status === 'loaded') {
                // 执行模块加载完成回调函数
                setTimeout(callback(_module.exports), 0);
            } else {
                // 缓存该模块所处文件加载完成回调函数
                _module.onload.push(callback);
            }
        } else {
            // 如果模块一次引用
            moduleCache[moduleName] = {
                moduleName: moduleName,  //模块ID
                status: 'loadding',      // 模块的状态
                exports: null,           // 模块的接口
                onload: [callback],      // 模块文件加载完成之后的回调函数
            };
            loadScript(getUrl(moduleName));
        }
    };

    /**
     *  moduleName 模块ID名称
     *  params 依赖模块
     * callback 模块构造函数
     */
    var setModule = function (moduleName, params, callback) {
        // 模块容器 模块文件加载完成后的回调函数
        var _module, fn;

        if (moduleCache[moduleName]) {
            // 获取该模块信息
            _module = moduleCache[moduleName];
            // 如果模块已经加载完成
            _module.status = 'loaded';
            _module.exports = callback ? callback.apply(_module.params) : null;
            while (fn = _module.onload.shift()) {
                fn(_module.exports);
            }
        }

    };
})((function () {

    /**
 * url 请求的Url
 * modDeps 需要加载的模块[] 依次按顺序加载
 * modCallback 所有的模块加载执行完成后执行的主函数
 */
    return window.F = {
        module: function (url, modDeps, modCallback) {
            var argu = Array.prototype.slice.call(arguments),
                // 取最后一个为Main 函数
                callback = argu.pop(),
                // 获取依赖的模块
                deps = (argu.length && argu[argu.length - 1] && argu[argu.length - 1] instanceof Array) ? argu.pop() : [],
                // 获取依赖模块的Url
                url = argu.length ? argu.pop() : null,
                // 依赖模块的列表
                params = [],
                // 未加载模块的统计
                depsCount = 0,
                // 依赖模块加载顺序中的索引值
                i = 0,
                // 依赖模块的序列长度
                len = deps.length;

            if (len) {
                while (i < len) {
                    //闭包保存i
                    (function () {
                        // 未加载模块的统计增加
                        depsCount++;
                        loadScript(deps[i], function (mod) {
                            // 依赖模块序列中添加依赖模块接口引用
                            params[i] = mod;
                            // 依赖模块加载完成，依赖模块数量统一减减
                            depsCount--;
                            // 所有依赖模块全部加载
                            if (depsCount === 0) {
                                setModule(url, params, callback);
                            }
                        })

                    })(i);
                }
                // 无依赖模块直接执行回调函数
            } else {
                setModule(url, [], callback);
            }
        }
    };


})())


