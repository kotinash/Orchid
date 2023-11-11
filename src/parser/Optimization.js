const terser = require("terser");

const Logger = require("../utils/Logger");

module.exports = {
    /**
     * Optimizes the code passed into the string
     * 
     * @param {string} code 
     * @returns {string}
     */
    async optimize(code) {
        try {
            const result = await terser.minify(code, {
                compress: {
                    dead_code: true,
                    drop_console: false,
                    drop_debugger: false,
                    keep_classnames: false,
                    keep_fargs: false,
                    keep_fnames: false,
                    keep_infinity: false
                },
                mangle: {
                    eval: true,
                    keep_classnames: false,
                    keep_fnames: false,
                    toplevel: false,
                    safari10: false
                },
                module: false,
                sourceMap: false,
                output: {
                    comments: false
                }
            });

            if (result.error) {
                Logger.error("Optimization error: " + result.error);

                return code;
            }

            return result.code;
        } catch (error) {
            Logger.error("Error while optimizing: " + error.stack);

            return code;
        }
    }
};