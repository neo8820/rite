/**
 *   object of lang
 *   @author  neo.zj.cn@gmail.com
 */

(function (R,undefined) {

    var host = this,
        TRUE = true,
        EMPTY = '',
        ObjectCreate = Object.create,
        //error in navtive ie6,7,8
        hasEnumBug = !({toString:1}).propertyIsEnumerable('toString'),
        enumProperties = [
           'constructor',
           'hasOwnProperty',
           'isPrototypeOf',
           'propertyIsEnumerable',
           'toLocaleString',
           'toString',
           'valueOf'
        ];
        
    R.mix(R, {
        keys:function(o){
            var result = [], p, i;
            for (p in o) {
                result.push(p);
            }
            if (hasEnumBug) {
                for (i = enumProperties.length - 1; i >= 0; i--) {
                    p = enumProperties[i];
                    if (o.hasOwnProperty(p)) {
                        result.push(p);
                    }
                }
            }
            return result;
        },
        mix: function (r,s,ov,wl,deep) {
            _mix(r, s, ov, wl, deep);
            return r;
        },
        merge: function (_args) {
            /// <summary>合并所有提供的对象</summary>
            _arg = R.makeArray(arguments);
            var o = {},
                i,
                l = _args.length;
            for (i = 0; i < l; i++) {
                R.mix(o,_args[i]);
            }
            return o;
        },
        extend: function (r, s, px, sx) {
            /// <summary>Description</summary>
            if (!s || !r) {
                return r;
            }

            var sp = s.prototype;
            rp;

            rp = createObject(sp, r);
            r.prototype = R.mix(rp, r.prototype);
            r.superclass = createObject(sp, s);

            //add prototype overrides
            if (px) {
                R.mix(rp,px);
            }

            //add object overrides
            if (sx) {
                R.mix(r, sx);
            }
            return r;
        },
        namespace: function () {
            /// <summary>指定命名空间，如果它不存在创建它.</summary>
            var args = R.makeArray(arguments),
                l = args.length,
                o = null,
                i, j, p,
                global = (args[l - 1] ===TRUE && l--);

            for (i = 0; i < l; i++) {
                p = (EMPTY + args[i]).split('.');
                o = global ? host : this;
                for (j = (host[p[0]] === o) ? 1 : 0; j < p.length; ++j) {
                    o = o[p[j]] = o[p[j]] || {};
                }
            }

            return o;

        }
    });
        
    function Empty() { };
    function createObject(proto, constructor) {
        /// <summary>创建对象</summary>
        /// <param name="proto" type="Object">原型对象</param>
        /// <param name="constructor" type="Object">构造函数</param>
        var newProto;
        if (ObjectCreate) {
            newProto = ObjectCreate(proto);
        } else {
            Empty.prototype = proto;
            newProto = new Empty();
        }
        newProto.constructor = constructor;
        return newProto;
    }
    function _mix(r, s, ov, wl, deep) {

        var len,
            target,
            src,
            i = 0;

        if (!r || !s) {
            return r;
        }

        if (ov === undefined) {
            ov = TRUE;
        }

        if (wl !== undefined) {
            len = wl.length;
            src = s,
            target = r;

            for (; i < len; i++) {
                p = wl[i];

                if (deep && R.isPlainObject(src)) {
                    mixInternal(p,target, src, ov, wl, deep);
                } else {
                    target[p] = src[p];
                }

            }

        } else {

            var keys, len, i;
            i = 0;
            keys = R.keys(s);
            len = keys.length;
            src = [];

            for (; i < len; i++) {
                p = keys[i];
                if (deep && R.isPlainObject(src)) {
                    _mixInternal(p, target, src, ov, wl, deep);
                } else {
                    target[p] = src[p];
                }
            }

        }

    }
    function _mixInternal(p, r, s, ov, wl, deep) {

        if (!r || !s) {
            return r;
        }

        if (ov == undefined) {
            ov = TRUE;
        }
 
        var target,src,clone;

        src=s[p];
        clone = (p in r) ? r[p] : R.isArray(src) ? [] : {};
        r[p] = clone;
        _mix(clone, src, ov, wl, deep);
    }

})(RITE);
