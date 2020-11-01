//import defaultExport from "./progriscript_jison";

progriscript_jison = require("../progriscript_jison");

var program = "program test;\
var int j, f;\
main ( ){\
    f = 6;\
    j = 5;\
    f = f + j - 5 * j;\
}";
    
progriscript_jison.parse(program);
//console.log(text);
