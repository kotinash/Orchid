const fs = require("fs");
const path = require("path");

const Logger = require("./src/utils/Logger");
const Optimization = require("./src/parser/Optimization");
const Parser = require("./src/parser/Parser");

/**
 * The path where the libraries are stored.
 * 
 * @type {string}
 */
const libraryPath = path.join("src", "library");

/**
 * @param {string} library
 * @returns {library}
 */
function toLibrary(library) {
    return path.join(".", libraryPath, library);    
}

/**
 * Compiles all files in the specified directory.
 * 
 * @param {string} directory
 * @async
 */
async function compileDirectory(directory) {
    try {
        const files = fs.readdirSync(directory);

        for (const directoryFile of files) {
            const filePath = path.join(directory, directoryFile);

            if (fs.statSync(filePath).isDirectory()) {
                await compileDirectory(filePath);
            } else if (fs.statSync(filePath).isFile() && path.extname(directoryFile) === ".oc") {
                let contents = (
                    fs.readFileSync(toLibrary("Orchid.oc")) +
                    fs.readFileSync(toLibrary("Colors.oc")) +
                    fs.readFileSync(toLibrary("Math.oc")) +
                    "\n"
                )

                if (filePath.includes(libraryPath)) return;

                Logger.info("Compiling " + directoryFile);

                const fileContents = fs.readFileSync(filePath, "utf8");
                const isMainFile = directoryFile == "main.oc";

                contents = Parser.parse(contents + fileContents.toString());

                if (isMainFile) {
                    contents = "(async function () {" + Parser.parse(contents) + "})();";
                } else {
                    contents = Parser.parse(contents);
                }

                if (!process.argv.includes("--noOptimization")) {
                    contents = await Optimization.optimize(contents, !isMainFile);
                }

                if (process.argv.includes("--bundle")) {
                    contents = contents.replaceAll("module.exports={", `const ${directoryFile.replace(".oc", "")} = {`);
                } else {
                    fs.writeFileSync(filePath.replace(".oc", ".js"), contents);
                    continue;
                }

                fs.writeFileSync("main.js", contents);
            }
        }
    } catch (error) {
        Logger.error(error.stack);
    }
}

/**
 * The main function.
 * 
 * @async
 */
async function main() {
    await compileDirectory(".");
}

main();
