import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import UglifyJS from "uglify-js";
import CleanCSS from "clean-css";

const cwd = process.cwd();

const header = readFileSync(
  resolve(cwd, "UserScriptHeader.txt"),
  "utf8"
).trim();

const styles = readFileSync(resolve(cwd, "styles.css"), "utf8");

const script = readFileSync(resolve(cwd, "searchEngineJump.user.js"), "utf8");

const stylesMin = new CleanCSS({}).minify(styles);
const scriptMin = UglifyJS.minify(script);

// writeFileSync("dist/searchEngineJump.user.js", `${header}\n\n${scriptMin.code}`);
writeFileSync(
  "dist/searchEngineJump.user.js",
  `${header}\n\n${scriptMin.code.replace(
    `"GLOBAL_STYLE_TO_BE_REPLACED"`,
    "`" + stylesMin.styles + "`"
  )}`
);
