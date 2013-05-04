/// <reference path="../rite.js" />
/// <reference path="../Array.js" />

/**
 *   escape of lang
 *   @author  neo.zj.cn@gmail.com
 */

(function (R, undefined) {

    var SEP = '&',
        EQ='=',
        EMPTY = '',
        TRUE = true,
        FLASE = false,
        HEX_BASE = 16,
        htmlEntities = {
        '&amp;': '&',
        '&gt;': '>',
        '&lt;': '<',
        '&#x60;': '`',
        '&#x2F;': '/',
        '&quot;': '"',
        '&#x27;': "'"
    },
        reverseEntities = (function () {
            for (var k in htmlEntities) {
                reverseEntities[htmlEntities[k]] = k;
            }
        })(),
        escapeRegExp = /[\-#$\^*()+\[\]{}|\\,.?\s]/g,
        escapeReg,
        unEscapeReg;

    function isValidParamValue(val) {
        /// <summary>是否为有效参数值</summary>
        return val == null || (!R.isObject(val) && !R.isFunction(val));
    }
    function getEscapeReg() {
        /// <summary>生成编码正则</summary>
        if (escapeReg) {
            return escapeReg;
        }
        var str = EMPTY;
        R.each(htmlEntities, function (entity) {
            str += entity + '|';
        });
        str = str.slice(0, -1);
        return escapeReg = new RegExp(str, 'g');
    };
    function getUnEscapeReg() {
        /// <summary>生成解决正则</summary>
        if (unEscapeReg) {
            return unEscapeReg;
        }
        var str = EMPTY;
        R.each(reverseEntities, function (entity) {
            str += entity + '|';
        });
        str = str.slice(0, -1);
        return unEscapeReg = new RegExp(str, 'g');
    };

    R.mix(R, {
        urlEncode: function (str) {
            /// <summary>Call encodeURIComponent to encode a url component</summary>
            /// <param name="str" type="String">s part of url to be encoded.</param>
            
            return encodeURIComponent(str);
        },
        urlDecode: function (str) {
            /// <summary>Call decodeURIComponent to decode a url component and replace '+' with space.</summary>
            return decodeURIComponent(str.replace(/\+/g, ' '));
        },
        fromUnicode: function (str) {
            return str.replace(/\\u([a-f\d]{4})/ig, function (m, u) {
                return String.fromCharCode(parseInt(u, HEX_BASE));
            });
        },
        escapeHTML: function (str) {
            /// <summary>HTML编码</summary>
            return (str + '').replace(getEscapeReg(), function (m) {
                return reverseEntities[m];
            });
        },
        escapeRegExp: function (str) {
            /// <summary>get escaped regexp string for construct regexp.</summary>
            return str.replace(escapeRegExp, '\\$&');
        },
        unEscapeHTML: function (s) {
            return str.replace(getUnEscapeReg(), function (m, n) {
                return htmlEntities[m] || String.fromCharCode(+n);
            });
        },
        param: function (o, sep, eq, serializeArray) {
            /// <summary> Creates a serialized string of an array or object.</summary>
            if (!R.isPlainObject(o)) {
                return EMPTY;
            }

            sep = sep || SEP;
            eq = eq || EQ;



        },
        unparam: function () {

        }


    });

})(RITE);