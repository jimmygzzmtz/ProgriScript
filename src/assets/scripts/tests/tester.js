//import defaultExport from "./progriscript_jison";

progriscript_jison = require("../progriscript_jison");

var program = "program test;\
var int j;\
main ( ){\
    3 * 7 + 6 / 5 * 4;\
}";
    
progriscript_jison.parse(program);
//console.log(text);
