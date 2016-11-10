
/**
 * 实现深Copy
 */

function deepCopy(target, source) {
    if (Object.prototype.toString.call(target) != '[object Object]' || Object.prototype.toString.call(source) != '[object Object]') throw new Error('Arguments Error');

    var key;

    for (key in source) {
        if (source.hasOwnProperty(key)) {
            if (Object.prototype.toString.call(source[key]) == '[object Object]') {
                target[key] = {};
                deepCopy(target[key], source[key]);
            } else if (Object.prototype.toString.call(source[key]) == '[object Array]') {
                // target[key]=[];
                target[key] = source[key].map(function (item, index) {
                    var res;

                })
            }
        }
    }

}

console.log(Object.prototype.toString.call([]))

function test(arr) {
    arr.push(1);
}
