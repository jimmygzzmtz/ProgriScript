var quads;
var funcs;
var constTable;
var programName;
var instructionPointer = 0;
var globalMemory;
var executionStack = [];

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
const OP_NOT = "not";
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

// Error codes
const ERROR_DIVISION_BY_ZERO = 1;
const ERROR_UNDEFINED_VARIABLE = 2;

// Return error to front-end
function flagError(errorCode) {
    var message = "";
    switch (errorCode) {
        case ERROR_DIVISION_BY_ZERO:
            message = "Division by Zero";
            break;
        case ERROR_UNDEFINED_VARIABLE:
            message = "Trying to use variable with undefined value";
            break;
    }

    throw new Error("Execution error: " + message);
}

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
    executionStack.push(globalMemory);

    //console.log(constTable);

    iterateQuads();
}

function iterateQuads() {
    while (instructionPointer < quads.length) {
        executeQuad(quads[instructionPointer]);
    }
}

function top(stack) {
    return stack[stack.length - 1];
}

function getFromMemory(dir) {
    var currentMemory = top(executionStack);
    var delta = 0;
    
    //depending on range get delta to subtract to dir
    for (var dirBase = CONST_LETRERO; dirBase > 0; dirBase -= 10000) {
        //console.log("dirBase in for: " + dirBase);
        if ((dir / dirBase) >= 1) {
            delta = dirBase;
            break;
        } 
    }

    var returningVar;

    switch(delta){
        // GLOBAL
        case 0:
            returningVar = currentMemory.ints[dir - delta];
            break;
        case 10000:
            returningVar = currentMemory.floats[dir - delta];
            break;
        case 20000:
            returningVar = currentMemory.chars[dir - delta];
            break;
        // LOCAL
        case 30000:
            returningVar = currentMemory.ints[dir - delta];
            break;
        case 40000:
            returningVar = currentMemory.floats[dir - delta];
            break;
        case 50000:
            returningVar = currentMemory.chars[dir - delta];
            break;
        // TEMP
        case 60000:
            returningVar = currentMemory.tempInts[dir - delta];
            break;
        case 70000:
            returningVar = currentMemory.tempFloats[dir - delta];
            break;
        case 80000:
            returningVar = currentMemory.tempChars[dir - delta];
            break;
        case 90000:
            returningVar = currentMemory.tempBools[dir - delta];
            break;
        // CONST
        case 100000:
            returningVar = constTable.int[dir - delta];
            break
        case 110000:
            returningVar = constTable.float[dir - delta];
            break;
        case 120000:
            returningVar = constTable.char[dir - delta];
            break;
        case 130000:
            returningVar = constTable.letrero[dir - delta];
            break;
    }

    if (returningVar == undefined) {
        flagError(ERROR_UNDEFINED_VARIABLE);
    }
}

function setOnMemory(dir, res) {
    var currentMemory = top(executionStack);
    var delta = 0;
    
    //depending on range get delta to subtract to dir
    for (var dirBase = CONST_LETRERO; dirBase > 0; dirBase -= 10000) {
        //console.log("dirBase in for: " + dirBase);
        if ((dir / dirBase) >= 1) {
            delta = dirBase;
            break;
        } 
    }

    switch(delta){
        // GLOBAL
        case 0:
            currentMemory.ints[dir - delta] = res;
            break;
        case 10000:
            currentMemory.floats[dir - delta] = res;
            break;
        case 20000:
            currentMemory.chars[dir - delta] = res;
            break;
        // LOCAL
        case 30000:
            currentMemory.ints[dir - delta] = res;
            break;
        case 40000:
            currentMemory.floats[dir - delta] = res;
            break;
        case 50000:
            currentMemory.chars[dir - delta] = res;
            break;
        // TEMP
        case 60000:
            currentMemory.tempInts[dir - delta] = res;
            break;
        case 70000:
            currentMemory.tempFloats[dir - delta] = res;
            break;
        case 80000:
            currentMemory.tempChars[dir - delta] = res;
            break;
        case 90000:
            currentMemory.tempBools[dir - delta] = res;
            break;
        // CONST
        case 100000:
            constTable.int[dir - delta] = res;
            break;
        case 110000:
            constTable.float[dir - delta] = res;
            break;
        case 120000:
            constTable.char[dir - delta] = res;
            break;
        case 130000:
            constTable.letrero[dir - delta] = res;
            break;
    }
}

function executeQuad(quad) {
    var dir1 = quad.dir1;
    var dir2 = quad.dir2;
    var dir3 = quad.dir3;
    
    switch(quad.operator) {
        case OP_READ:
            //do stuff
            //call async function that will await an input
            //var res = readFromFrontEnd();
            //setOnMemory(dir1, res);
            break;
        case OP_WRITE:
            //do stuff
            //podemos hacer un console.log para usarlo
            console.log(getFromMemory(dir1));
            //sendtoFrontEnd(getFromMemory(dir1));
            break;
        case OP_EQUALS:
            //do stuff
            setOnMemory(dir3, getFromMemory(dir1));
            break;
        case OP_PLUS:
            var res = getFromMemory(dir1) + getFromMemory(dir2);
            setOnMemory(dir3, res);
            break;
        case OP_MINUS:
            var res = getFromMemory(dir1) - getFromMemory(dir2);
            setOnMemory(dir3, res);
            break;
        case OP_TIMES:
            var res = getFromMemory(dir1) * getFromMemory(dir2);
            setOnMemory(dir3, res);
            break;
        case OP_DIVIDE:
            var divisor = getFromMemory(dir2);
            if (divisor == 0) {
                flagError(ERROR_DIVISION_BY_ZERO);
            }
            var res = getFromMemory(dir1) / divisor;
            setOnMemory(dir3, res);
            break;
        case OP_LESSTHAN:
            var res = getFromMemory(dir1) < getFromMemory(dir2);
            setOnMemory(dir3, res);
            break;
        case OP_GREATERTHAN:
            var res = getFromMemory(dir1) > getFromMemory(dir2);
            setOnMemory(dir3, res);
            break;
        case OP_LESSTHANEQUAL:
            var res = getFromMemory(dir1) <= getFromMemory(dir2);
            setOnMemory(dir3, res);
            break;
        case OP_GREATERTHANEQUAL:
            var res = getFromMemory(dir1) >= getFromMemory(dir2);
            setOnMemory(dir3, res);
            break;
        case OP_ISDIFFERENT:
            var res = getFromMemory(dir1) != getFromMemory(dir2);
            setOnMemory(dir3, res);
            break;
        case OP_ISEQUAL:
            var res = getFromMemory(dir1) == getFromMemory(dir2);
            setOnMemory(dir3, res);
            break;
        case OP_NOT:
            var res = !getFromMemory(dir1);
            setOnMemory(dir3, res);
            break;
        case OP_AND:
            var res = getFromMemory(dir1) && getFromMemory(dir2);
            setOnMemory(dir3, res);
            break;
        case OP_OR:
            var res = getFromMemory(dir1) || getFromMemory(dir2);
            setOnMemory(dir3, res);
            break;
        case OP_GOTO:
            // -1 to take into account ++ after switch
            instructionPointer = dir3 - 1;
            break;
        case OP_GOTOF:
            if (getFromMemory(dir1) == false) {
                instructionPointer = dir3 - 1;
            }
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
            //do nothing
            break;
    }
    instructionPointer++;
}
