progriscript_jison = require("../progriscript_jison");
const fs = require('fs');

var program = fs.readFileSync("test.progriscript", "utf8");
progriscript_jison.parse(program);