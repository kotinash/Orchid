module.exports = {
    /**
     * Parses the code passed into the `code` parameter.
     * 
     * @param {string} code - The code to parse
     * @returns {string} The parsed output
     */
    parse(code) {
        let lines = code;

        let linesArray = lines.split("\n");
        let inEnumBlock = false;
        let enumName;

        for (let i = 0; i < linesArray.length; i++) {
            const isInString = (
                linesArray[i].includes("\"") ||
                linesArray[i].includes("'") ||
                linesArray[i].includes("`")
            );

            const line = linesArray[i].trim();

            // "public"/"private" keywords
            if (!isInString) {
                if (linesArray[i].includes("public ") && !linesArray[i].includes("*")) {
                    linesArray[i] = linesArray[i].replace("public ", "/* public */ ");
                }

                if (linesArray[i].includes("private ")) {
                    linesArray[i] = linesArray[i].replace("private ", "#");
                }
            }

            // Enums
            if (inEnumBlock) {
                if (line.includes("=")) {
                    linesArray[i] = `${line.replace("=", ":")}`
                } else if (line.includes("}")) {
                    inEnumBlock = false;
                } else {
                    linesArray[i] = `${line.replace(",", "")}: ${i - 1},`
                }
            } else if (line.startsWith('enum')) {
                inEnumBlock = true;

                enumName = line.replace("enum ", "").replace("{", "").trim();
                linesArray[i] = `const ${enumName} = {`;
            }
        }

        return linesArray.join("\n");
    }
};
