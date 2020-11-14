var quads;
var funcs;
var constTable;
var programName;
var instructionPointer = 0;
var globalMemory;
var executionStack = [];
var codeInOut = {input: "", output: []};
var willRead = false;
const outputLimit = 100000;
var funcCallsJumps = [];
var memoryToBePushed;

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
const OP_VER = "ver";
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
const ERROR_TYPE_MISMATCH = 3;
const ERROR_EMPTY_INPUT = 4;
const ERROR_OUTPUT_LIMIT_EXCEEDED = 5;
const ERROR_INDEX_OUT_OF_BOUNDS = 6;

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
        case ERROR_TYPE_MISMATCH:
            message = "Type Mismatch";
            break;
        case ERROR_EMPTY_INPUT:
            message = "Empty Input";
            break;
        case ERROR_OUTPUT_LIMIT_EXCEEDED:
            message = "Output limit exceeded";
            break;
        case ERROR_INDEX_OUT_OF_BOUNDS:
            message = "Array index out of bounds";
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
        this.callCounters = new Map();
        this.alreadySeenEras = new Set();
    }
}

//use with node, remove when using front-end
//startVM("test");

function resetVariables(){
    instructionPointer = 0;
    executionStack = [];
    codeInOut = {input: "", output: []};
    willRead = false;
    funcCallsJumps = [];
    memoryToBePushed = null;
}

function getTypeFromDir(dir) {
    //depending on range get type
    if ((dir >= GLOBAL_INT && dir < GLOBAL_FLOAT) || (dir >= LOCAL_INT && dir < LOCAL_FLOAT) 
        || (dir >= TEMP_INT && dir < TEMP_FLOAT) || (dir >= CONST_INT && dir < CONST_FLOAT)) {
            return "int";
    }
    if ((dir >= GLOBAL_FLOAT && dir < GLOBAL_CHAR) || (dir >= LOCAL_FLOAT && dir < LOCAL_CHAR) 
        || (dir >= TEMP_FLOAT && dir < TEMP_CHAR) || (dir >= CONST_FLOAT && dir < CONST_CHAR)) {
            return "float";
    }
    if ((dir >= GLOBAL_CHAR && dir < LOCAL_INT) || (dir >= LOCAL_CHAR && dir < TEMP_INT) 
        || (dir >= TEMP_CHAR && dir < TEMP_BOOL) || (dir >= CONST_CHAR && dir < CONST_LETRERO)) {
            return "char";
    }
    if (dir >= TEMP_BOOL && dir < CONST_INT){
            return "bool";
    }
    if (dir >= CONST_LETRERO) {
        return "letrero";
    }
}

export function startVM(code, inout) {
    resetVariables();
    codeInOut = inout;

    var progriscript_jison = require("./progriscript_jison");
    var program = code;
    //var program = fs.readFileSync("./tests/test.progriscript", "utf8");
    var parseResultObj;

    try{
        parseResultObj = progriscript_jison.parse(program);
    }
    catch(error){
        throw new Error(error.message);
    }

    quads = parseResultObj.quads;
    funcs = parseResultObj.funcs;
    //funcs.get(id).returnDirs
    constTable = parseResultObj.constTable;
    programName = parseResultObj.programName;

    console.log(quads);

    globalMemory = new Memory(programName);
    executionStack.push(globalMemory);

    //console.log(constTable);

    iterateQuads();
}

export function sendRead(inout){
    codeInOut = inout;
    iterateQuads();
}

function iterateQuads() {
    while (instructionPointer < quads.length) {
        executeQuad(quads[instructionPointer]);
        if(willRead == true){
            codeInOut.input = "willRead";
            return;
        }
    }
}

function top(stack) {
    return stack[stack.length - 1];
}

function getPreviousMemory() {
    return executionStack[executionStack.length - 2];
}

function getFromMemory(dir, getFromPrev=false) {

    var currentMemory;
    if (getFromPrev) {
        currentMemory = getPreviousMemory();
    }
    else{
        currentMemory = top(executionStack);
    }
    
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
            returningVar = executionStack[0].ints[dir - delta];
            break;
        case 10000:
            returningVar = executionStack[0].floats[dir - delta];
            break;
        case 20000:
            returningVar = executionStack[0].chars[dir - delta];
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
        console.log("IP: " + instructionPointer);
        flagError(ERROR_UNDEFINED_VARIABLE);
    }

    return returningVar;
}

function setOnMemory(dir, res, mem=null) {
    var currentMemory;
    if (mem != null) {
        currentMemory = mem;
    }
    else {
        currentMemory = top(executionStack);
    }
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
            executionStack[0].ints[dir - delta] = res;
            break;
        case 10000:
            executionStack[0].floats[dir - delta] = res;
            break;
        case 20000:
            executionStack[0].chars[dir - delta] = res;
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

function parenDirVal(dir){
    if (dir != null && dir[0] == "(") {
        dir = Number(dir.slice(1,-1));
        return getFromMemory(dir);
    }
    else{
        return dir;
    }
}

function executeQuad(quad) {
    var dir1 = quad.dir1;
    var dir2 = quad.dir2;
    var dir3 = quad.dir3;

    dir1 = parenDirVal(dir1);
    dir2 = parenDirVal(dir2);
    dir3 = parenDirVal(dir3);
    
    switch(quad.operator) {
        case OP_READ:
            if(willRead == false){
                willRead = true;
                return;
            }
            else{
                willRead = false;
                var res = codeInOut.input;
                //cast to correct type
                var type = getTypeFromDir(dir1);
                if(res == ""){
                    flagError(ERROR_EMPTY_INPUT);
                }
                if(type == "int"){
                    res = Math.floor(Number(res));
                    if(isNaN(res)){
                        flagError(ERROR_TYPE_MISMATCH);
                    }
                }
                if(type == "float"){
                    res = Number(res);
                    if(isNaN(res)){
                        flagError(ERROR_TYPE_MISMATCH);
                    }
                }
                if(type == "char"){
                    if(res.length > 1){
                        flagError(ERROR_TYPE_MISMATCH);
                    }
                }
                setOnMemory(dir1, res);
                codeInOut.input = "";
            }
            break;
        case OP_WRITE:
            if(codeInOut.output.length > outputLimit){
                flagError(ERROR_OUTPUT_LIMIT_EXCEEDED);
            }
            codeInOut.output.push(getFromMemory(dir1));
            break;
        case OP_VER:
            if (getFromMemory(dir1) < getFromMemory(dir2) || getFromMemory(dir1) >= getFromMemory(dir3)) {
                flagError(ERROR_INDEX_OUT_OF_BOUNDS);
            }
            break;
        case OP_EQUALS:
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
            //create memory here, will be pushed in OP_GOSUB
            memoryToBePushed = new Memory(dir2);
            var currentMemory = top(executionStack);

            // dir2 in OP_ERA contains the functionId of the called function
            // callCounters is a map containing the number of calls of each function
            // alreadySeenEras contains the quad number of eras that were already processed in the respective memory
            // Add 1 to callCounters only when the OP_ERA being processed is new
            if (currentMemory.callCounters.has(dir2) && !currentMemory.alreadySeenEras.has(instructionPointer)) {
                currentMemory.callCounters.set(dir2, currentMemory.callCounters.get(dir2) + 1);
            }
            else {
                currentMemory.alreadySeenEras.add(instructionPointer);
                currentMemory.callCounters.set(dir2, 0);
            }

            break;
        case OP_PARAMETER:
            //assign to the parameter variables the sent directions
            //var previousMemory = getFromMemory(dir1, true);
            //console.log("in param quad, dir1 value: " + getFromMemory(dir1));

            setOnMemory(dir3, getFromMemory(dir1), memoryToBePushed);
            //console.log("in param quad, dir3 value in memoryToBePushed: " + getFromMemory(dir3));
            break;
        case OP_GOSUB:
            executionStack.push(memoryToBePushed);
            funcCallsJumps.push(instructionPointer + 1);
            instructionPointer = dir2 - 1;
            break;
        case OP_RETURN:
            var currentFunctionId = top(executionStack).functionId;
            var previousMemory = getPreviousMemory();
            
            // get the conrresponding returnDir where the return value will be saved
            var funcCallCounter = previousMemory.callCounters.get(currentFunctionId);
            var arrReturnDirs = funcs.get(currentFunctionId).returnDirs.get(previousMemory.functionId);
            var returnDir = arrReturnDirs[funcCallCounter];
            
            setOnMemory(returnDir, getFromMemory(dir1), previousMemory);
            break;
        case OP_ENDFUNC:
            //pop execution stack
            instructionPointer = funcCallsJumps.pop() - 1;
            executionStack.pop();
            break;
        case OP_END:
            //do nothing since code ends
            break;
    }
    instructionPointer++;
}
