/**
 *   array of lang
 *   @author  neo.zj.cn@gmail.com
 */

(function (R, undefined) {

    var TRUE = true,
        AP = Array.prototype,
        indexOf = AP.indexOf,
        lastIndexOf = AP.lastIndexOf,
        filter = AP.filter,
        ever = AP.every,
        some = AP.some,
        map = AP.map,
        FLASE = false,
        TRUE = true;

    R.mix(R, {

        indexOf: function (item,arr) {
            /// <summary>Search for a specified value with  in  an array</summary>
            /// <param name="item" type="String">individual item to be searched</param>
            /// <param name="arr" type="Array">arr the array of items where item will be search</param>

            if (!AP.indexOf) {
                AP.indexOf = function (elt/*,from*/) {
                    var len = this.length >>> 0;
                    var from = Number(arguments[1]) || 0;
                    from = (from < 0) ? Math.ceil(from) : Math.floor(from);

                    if (from < 0) {
                        from += len;
                    }

                    for (; from < len; from++) {
                        if (from in this && this[from] == elt) {
                            return from;
                        }
                    }
                    return -1;
                }
            }
            AP.indexOf.call(arr, item);
        },

        lastIndexOf: function (item, arr) {
            /// <summary>Returns the index of the last item in the array that contains the specified value, -1 if the value isn't found</summary>
            /// <param name="item" type="String">individual item to be searched</param>
            /// <param name="arr" type="Array">arr the array of items where item will be search</param>

            if (!AP.lastIndexOf) {
                AP.lastIndexOf = function (elt/*,from*/) {
                    var len = this.length >>> 0;
                    var from = Number(arguments[1]) || 0;
                    var lastFrom = -1;

                    from = (from < 0) ? Math.ceil(from) : Math.floor(from);

                    if (from < 0) {
                        from += len;
                    }

                    for (; from < len; from++) {
                        if (from in this && this[from] == elt) {
                            lastFrom = from;
                        }
                    }
                    return lastFrom;
                }
            }
            AP.lastIndexOf.call(arr, item);
        },

        each: function (fun,arr/*,thisp*/) {
            /// <summary>Executes the supplied function on each item in the array.</summary>
            /// <param name="arr" type="Array">each item</param>
            /// <param name="fun" type="Function">the function to execute on each item.</param>

            if (!AP.forEach) {

                AP.forEach = function (fun/*,thisp*/) {
                    var len = this.length >>> 0;
                    if (typeof (fun) != "function") {
                        throw new TypeError();
                    }

                    var thisp = arguments[1],
                        i = 0;

                    for (; i < len; i++) {
                        if (i in this) {
                            fun.call(thisp, this[i], i, this);
                        }
                    }
                }
            }

            var thisp = arguments[2];
            AP.forEach.call(arr, fun, thisp);

        },

        map: function (fun, arr/*,thisp*/) {
            /// <summary>map</summary>

            if (!AP.map) {
                AP.map = function (fun/*,thisp*/) {
                    var len = this.length >>> 0;
                    if (typeof (fun) !== "function") {
                        throw new TypeError();
                    }

                    var res = new Array(len);
                    var thisp = arguments[1];

                    for (var i = 0; i < len; i++) {
                        if (i in this) {
                            var val=this[i];
                            res.push(fun.call(thisp, val, i, this));
                        }
                    }

                };
            }
            var thisp = arguments[2];
            AP.map.call(arr, fun, thisp);
        },

        filter: function (fun, arr/*,thisp*/) {
            /// <summary>filter</summary>

            if (!AP.filter) {
                AP.map = function (fun/*,thisp*/) {
                    var len = this.length >>> 0;
                    if (typeof (fun) !== "function") {
                        throw new TypeError();
                    }

                    var res = new Array(len);
                    var thisp = arguments[1];

                    for (var i = 0; i < len; i++) {
                        if (i in this) {
                            var val=this[i];
                            if (fun.call(thisp, val, i, this)) {
                                res.push(val);
                            }
                        }
                    }
                };
            }
            var thisp = arguments[2];
            AP.filter.call(arr, fun, thisp);
        },

        every: function (fun, arr/*,thisp*/) {
            /// <summary>every</summary>

            if (!AP.every) {

                AP.every = function (fn/*,thisp*/) {
                    var len = this.length >>> 0,
                        i = 0;

                    for (i; i < len; i++) {
                        if (i in this && !fun.call(thisp,this[i], i, this)) {
                            return FLASE;
                        }
                    }
                    return TRUE;
                }
            }

            var thisp=arguments[2];
            return AP.every.call(this,fun,thisp);

        },

        some: function (fn, arr/*,thisp*/) {
            /// <summary>some</summary>

            if (!AP.some) {
                AP.some = function (fn/*,thisp*/) {

                    var len = this.length >>> 0,
                        i = 0;

                    for (i; i < len; i++) {
                        if (i in this && fun.call(thisp, this[i], i, this)) {
                            return TRUE;
                        }
                    }
                    return FLASE;
                }
            }

            var thisp = arguments[2];

            return AP.some.call(this,fun,thisp);
        },

        makeArray: function (o) {
            /// <summary>Converts object to a TRUE array.</summary>
            /// <param name="o" type="Object">array like object or array</param>

            if (o == null) { return []; }
            if (R.isArray(o)) { return o; }

            if (typeof o.length !== 'number'
                || o.alert
                || typeof o == 'string'
                || R.isFunction(o)) {
                return [o];
            }

            var ret = [];
            for (var i = 0, l = o.length; i < l; i++) {
                ret[i] = o[i];
            }
            return ret;

        },

        unique: function () {
            /// <summary>Returns a copy of the array with the duplicate entries removed.</summary>

            throw new Error("no implement function 'unique'!");
        }

    });

})(RITE);
