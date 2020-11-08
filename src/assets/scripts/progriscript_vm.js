var quads;
var funcs;
var constTable;
var programName;
var instructionPointer = 0;
var globalMemory;

const fs = require('fs');

// Starting dirs for each type and scope
const GLOBAL_INT = 0;
const GLOBAL_FLOAT = 10000;
const GLOBAL_CHAR = 20000;
const LOCAL_INT = 30000;
const LOCAL_FLOAT = 40000;
const LOCAL_CHAR = 50000;
const TEMP_INT = 60000;
const TEMP_FLOAT = 70000;
const TEMP_CHAR = 80000;
const TEMP_BOOL = 90000;
const CONST_INT = 100000;
const CONST_FLOAT = 110000;
const CONST_CHAR = 120000;
const CONST_LETRERO = 130000;

// Operation codes
const OP_READ = "read";
const OP_WRITE = "write";
const OP_EQUALS = "equals";
const OP_PLUS = "plus";
const OP_MINUS = "minus";
const OP_TIMES = "times";
const OP_DIVIDE = "divide";
const OP_LESSTHAN = "lessthan";
const OP_GREATERTHAN = "greaterthan";
const OP_LESSTHANEQUAL = "lessthanEqual";
const OP_GREATERTHANEQUAL = "greaterthanEqual";
const OP_ISDIFFERENT = "isDifferent";
const OP_ISEQUAL = "isEqual";
const OP_AND = "and";
const OP_OR = "or";
const OP_GOTO = "goto";
const OP_GOTOF = "gotoF";
const OP_ERA = "era";
const OP_PARAMETER = "parameter";
const OP_GOSUB = "goSub";
const OP_RETURN = "return";
const OP_ENDFUNC = "endFunc";
const OP_END = "end";

class Memory {
    constructor(functionId) {
        this.functionId = functionId;
        this.ints = [];
        this.floats = [];
        this.chars = [];
        this.tempInts = [];
        this.tempFloats = [];
        this.tempChars = [];
        this.tempBools = [];
    }
}

//use with node, remove when using front-end
startVM("test");

function startVM(code) {
    var progriscript_jison = require("./progriscript_jison");
    //var program = code;
    var program = fs.readFileSync("./tests/test.progriscript", "utf8");
    var parseResultObj = progriscript_jison.parse(program);

    quads = parseResultObj.quads;
    funcs = parseResultObj.funcs;
    constTable = parseResultObj.constTable;
    programName = parseResultObj.programName;

    console.log(quads);

    globalMemory = new Memory(programName);
}

function iterateQuads() {
    while (instructionPointer < quads.length) {
        executeQuad(quads[instructionPointer]);
    }
}

function executeQuad(quad) {
    switch(quad.operator){
        case OP_READ:
            //do stuff
            //call async function that will await an input
            break;
        case OP_WRITE:
            //do stuff
            break;
        case OP_EQUALS:
            //do stuff
            break;
        case OP_PLUS:
            //do stuff
            break;
        case OP_MINUS:
            //do stuff
            break;
        case OP_TIMES:
            //do stuff
            break;
        case OP_DIVIDE:
            //do stuff
            break;
        case OP_LESSTHAN:
            //do stuff
            break;
        case OP_GREATERTHAN:
            //do stuff
            break;
        case OP_LESSTHANEQUAL:
            //do stuff
            break;
        case OP_GREATERTHANEQUAL:
            //do stuff
            break;
        case OP_ISDIFFERENT:
            //do stuff
            break;
        case OP_ISEQUAL:
            //do stuff
            break;
        case OP_AND:
            //do stuff
            break;
        case OP_OR:
            //do stuff
            break;
        case OP_GOTO:
            //do stuff
            break;
        case OP_GOTOF:
            //do stuff
            break;
        case OP_ERA:
            //do stuff
            break;
        case OP_PARAMETER:
            //do stuff
            break;
        case OP_GOSUB:
            //do stuff
            break;
        case OP_RETURN:
            //do stuff
            break;
        case OP_ENDFUNC:
            //do stuff
            break;
        case OP_END:
            //do stuff
            break;
    }
}
