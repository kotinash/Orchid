/**
 * Log a message to the console.
 * 
 * @param {string} type - The log type (e.g., 'info', 'warn', 'error').
 * @param {number} color - The ANSI color code.
 * @param {string} message - The message to be logged.
 */
function log(type, color, message) {
    console[type](`\x1b[${color}m${type.toUpperCase()}\x1b[0m | ${message}`);
}

module.exports = {
    /**
     * Log an informational message.
     * 
     * @param {string} message - The message to log.
     */
    info(message) {
        log("info", 32, message);
    },

    /**
     * Log a warning message.
     * 
     * @param {string} message - The message to log.
     */
    warn(message) {
        log("warn", 33, message);
    },

    /**
     * Log an error message.
     * 
     * @param {string} message - The message to log.
     */
    error(message) {
        log("error", 31, message);
    }
}
