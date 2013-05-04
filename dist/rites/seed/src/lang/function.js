/**
 *   function of lang
 *   @author  neo.zj.cn@gmail.com
 */

(function (R, undefined) {

    R.mix(R, {
        later: function (fn, when, periodic,thisp,data) {
            /// <summary>
            /// Executes the supplied function in the context of the supplied.object 'when' milliseconds later.
            /// 函数定时执行
            /// </summary>
            /// <param name="fn type="Function|String">supplied function</param>
            /// <param name="when" type="Number">the number of milliseconds to wait until the method to execute.</param>
            /// <param name="periodic" type="Boolean">if 'TRUE' , alone exectue</param>
            /// <param name="thisp" type="object">call context.</param>
            /// <param name="data" type="Object|Array">is provided to the function.</param>

            when = when || 0;

            var m = fn,
                d = R.markArray(data),
                f,
                p,
                r;

            if (R.isString(fn)) {
                m=thisp[fn];
            }

            if (!m) {
                R.error("method undefined!!");
            }

            p = R.isBoolean(periodic) ? periodic : false;

            f = function () {
                m.apply(thisp,d);
            }
            r = p ? setInterval(f, when) : setTimeout(f, when);

            return {
                timer: r,
                interval: p,
                cancel: function () {
                    if (this.interval) {
                        clearInterval(r);
                    } else {
                        clearTimeout(r);
                    }
                }
            };
        },
        throttle: function (fn, ms, thisp) {
            /// <summary>
            /// throttle a call to a method based on the time between calls.
            /// 压制调整方法在一定时间后执行.
            /// </summary>
            /// <param name="fn" type="Function">the function call to throttle</param>
            /// <param name="ms" type="Number">The number of milliseconds to throttle the method call.[ms]</param>
            /// <param name="thisp" type="object">call context.</param>
            
            ms = ms || 150;

            var f;

            if (msg = -1) {
                return function () {
                    fn.apply(thisp || this, arguments);
                }
            }

            var last = R.now();

            return function () {
                var now = R.now();
                if (now - last > ms) {
                    last = now;
                    fn.apply(thisp||this,arguments);
                }
            };
        },
        buffer: function (fn, ms, thisp) {
            /// <summary>缓存一个固定的时间调用函数</summary>
            /// <param name="fn" type="Function">调用函数</param>
            /// <param name="ms" type="Number">执行数量</param>
            /// <param name="thisp" type="Object">执行上下文</param>

            ms = ms || 150;

            if (R.isFunction(fn)) {
                R.error("function undefined!!!");
            }

            if (ms == -1) {
                return function () {
                    fn.apply(thisp||this,arguments);
                };
            }

            var bufferTimer = null;

            function f() {
                f.stop();
                bufferTimer = R.later(fn,ms,false,thisp||this,arguments);
            }
            f.stop = function () {
                if (bufferTimer) {
                    bufferTimer.cancel();
                    bufferTimer = 0;
                }
            }

        }
    });

})(RITE);
 