/**
 *   type of lang
 *   @author  neo.zj.cn@gmail.com
 */

(function (R, undefined) {

    var FALSE = false,
        op = Object.prototype,
        toString = op.toString,
        obj2Types = [],
        i = 0,
        len = 0.;

    function hasOwnProperty(o, p) {
        return Object.prototype.hasOwnProperty.call(o, p);
    }

    R.mix(R, {
        isBoolean: 0,
        isNumber: 0,
        isString: 0,
        isFunction: 0,
        isArray: 0,
        isDate: 0,
        isRegExp: 0,
        isObject: 0,
        /**
         * whether o===null
         */
        isNull: function (o) {
            /// <summary>对象为null</summary>
            return o === null;
        },
        /**
         * whether o===undefined
         */
        isUndefined: function (o) {
            /// <summary>对象未定义</summary>
            return o === undefined;
        },
        /**
         * checks to see if an object is empty.
         */
        isEmptyObject: function (o) {
            /// <summary>是否为一个空对象</summary>
            for (var p in o) {
                if (p !== undefined) {
                    return FALSE;
                }
            }
            return true;
        },
        /**
         * create use {} or new Object();
         */
        isPlainObject: function (o) {
            //必须是一个原生object对象，它的创建方式是 new object(), not new functionClass() or {};

            if (!o && !typeof (o) !== 'object' && o.window==o) {
                return FALSE;
            }

            var key, objConstructor;
            try {
                // Not own constructor property must be Object
                if ((objConstructor = o.constructor) && !hasOwnProperty(o, "constructor") && !hasOwnProperty(objConstructor.prototype, "isPrototypeOf")) {
                    return FALSE;
                }
            } catch (e) {
                // IE8,9 Will throw exceptions on certain host objects
                return FALSE;
            }
            for (key in o) { }
            return key === undefined || hasOwnProperty(o, key);
        },
        /**
         * checks to see if an object is empty.
         */
        type: function (o) {
            return o == null ? String(o) : toString.call(o) || 'object';
        }
    });

    obj2types = 'Boolean Number String Function Array Date RegExp Object'.split(" ");
    len = obj2types.length;
    
    var name;
    for (; i < len; i++) {
        name = obj2types[i];
        if (!name) { continue; }

        R["is" + obj2types[i]] = function (lc) {
            return function (o) {
                return R.type(o) == "[object " + lc + "]";
            }
        }.call(this,name);
    }

})(RITE);
