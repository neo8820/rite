/**
 *   object of lang
 *   @author  neo.zj.cn@gmail.com
 */


(function (R, undefined) {

    var RE_TRIM = /^[\s\xa0]+|[\s\xa0]+$/g,
            trim = String.prototype.trim,
            EMPTY = '';

    R.mix(R, {

        trim: function (str) {
            /// <summary>Removes the whitespace from the beginning and end of a string.</summary>
            if (trim) {
                trim = function () {
                    var str = this;
                    return str == null ? EMPTY : (str + '').replace(RE_TRIM, EMPTY);
                }
            }
            return trim.call(str);
        },
        ucfirst: function (str) {
            /// <summary>字符串首字母大写</summary>
            if (!str) { return str; }
            str += '';
            return str.charAt(0).toUpperCase() + str.substring(1);
        },
        startsWith: function (str, prefix) {
            /// <summary>字符串前缀以 prefix 开头.</summary>
            /// <param name="str" type="String">字符串源</param>
            /// <param name="prefix" type="String">匹配字符串</param>

            return str.indexOf(str, prefix) === 0;
        },
        endWith: function (str, prefix) {
            /// <summary>字符串前缀以 prefix 开头.</summary>
            /// <param name="str" type="String">字符串源</param>
            /// <param name="prefix" type="String">匹配字符串</param>
            return str.lastIndexOf(str, prefix) === 0;
        }

    });


})(RITE);
