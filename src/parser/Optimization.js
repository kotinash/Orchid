const terser = require("terser");

const Logger = require("../utils/Logger");

module.exports = {
    /**
     * Optimizes the code passed into the `code` parameter.
     * 
     * @param {string} code - The code to optimize.
     * @param {boolean} [safe] - If true, retains class and function names during optimization.
     * @returns {string} - The optimized JavaScript code.
     * @throws {Error} - If an error occurs during the optimization process.
     */
    async optimize(code, safe = false) {
        try {
            const result = await terser.minify(code, {
                compress: {
                    dead_code: safe,
                    drop_console: false,
                    drop_debugger: false,
                    keep_classnames: !safe,
                    keep_fargs: false,
                    keep_fnames: !safe,
                    keep_infinity: false
                },
                mangle: {
                    eval: true,
                    keep_classnames: !safe,
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
                Logger.error("Terser error: " + result.error);
            }

            return result.code;
        } catch (error) {
            Logger.error("Error while optimizing: " + error.stack);
        }
    }
};
