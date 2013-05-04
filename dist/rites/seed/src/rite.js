/**
 * The Rites global namespace object
 */

var RITE = (function (undefiend) {

    var host = this,
        R,
        guid = 0,
        EMPTY = '';

    R = {
        _BUILD_TIME: '',
        /**
         * RITE Environment
         */
        Evn: {
            host: host
        },
        Config: {
            /**
             * RITE config
             * If load rite.js , Config.debug default to true
             * Else if load rite.min.js,config.debug default to false
             */
            debug: true,
            fns: {}
        },
        version: '',
        config: function (configName, configValue) {
            var cfg,
                r,
                self = this,
                fn,
                Config = R.Config,
                ConfigFns = Config.fns;
        },
        /**
         * Throw error message
         */
        log: function (msg, cat, src) {
            if (R.Config.debug) {
                if (src) {
                    msg = src + ':' + msg;
                }
                if (host['console'] !== undefined && console.log) {
                    console[cat && console[cat] ? cat : 'log'](msg);
                }
            }
        },
        /**
         * Throw error message
         */
        error: function (msg) {
            if (S.Config.debug) {
                // with stack info!
                throw msg instanceof Error ? msg : new Error(msg);
            }
        },
        guid: function (pre) {
            return (pre || EMPTY) + guid++;
        },
        now: function () {
            return Date.now();
        }
    };

    window["R"] = window["RITE"] || R;

    return R;

})();