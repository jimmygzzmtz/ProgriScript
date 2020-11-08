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
    //switch()
}
