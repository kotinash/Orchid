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
            const line = linesArray[i].trim();

            // "public"/"private"/"public async"/"private async" keywords
            if (!/(let|const|var)\s/.test(line)) {
                if (linesArray[i].includes("public ") && !linesArray[i].includes("*")) {
                    linesArray[i] = linesArray[i].replace("public ", "/* public */ ");
                }

                if (linesArray[i].includes("private ")) {
                    linesArray[i] = linesArray[i].replace("private ", "#");
                }
                
                if (linesArray[i].includes("public async ") && !linesArray[i].includes("*")) {
                    linesArray[i] = linesArray[i].replace("public async ", "/* public */ async");
                }

                if (linesArray[i].includes("private async ")) {
                    linesArray[i] = linesArray[i].replace("private async ", "async #");
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
