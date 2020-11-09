%{

    // Maps declarations
    var semCube = new Map();
    var functionDirectory = new Map();
    var constTable = new Map();
    var startingDirCodes = new Map();

    var stackOperators = [];
	var stackOperands = [];
	var stackJumps = [];

    var quads = [];
    var quadCount = 0;

    // for variables lists
    var forVars = [];
    // for function calls
    var calledFuncs = [];
    // for function signature and parameter type checking 
    var calledParams = [];

    // variables to know current state
    var programName = "";
    var currentFunctionId = "";
    var currentType = "";
    var lastReadId = "";

    // 14 counters for each dir section, position for each counter is StartingDir/10000
    var counters = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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
    const ERROR_TYPE_MISMATCH = 1;
    const ERROR_VAR_REDECLATION = 2;
    const ERROR_FUNC_REDECLARATION = 3;
    const ERROR_UNKNOWN_VARIABLE = 4;
    const ERROR_NO_RETURN_STATEMENT = 5;
    const ERROR_ARITHMETIC_NON_NUMBER = 6;
    const ERROR_UNKNOWN_FUNCTION = 7;
    const ERROR_WRONG_NUM_PARAMS = 8;
    const ERROR_EXP_PAREN = 9;

    // Return error to front-end
    function flagError(errorCode, lineNumber) {
        var message = "";
        switch (errorCode) {
            case ERROR_TYPE_MISMATCH:
                message = "Type Mismatch";
                break;
            case ERROR_VAR_REDECLATION:
                message = "Variable Redeclaration";
                break;
            case ERROR_FUNC_REDECLARATION:
                message = "Function Redeclaration";
                break;
            case ERROR_UNKNOWN_VARIABLE:
                message = "Unknown Variable";
                break;
            case ERROR_NO_RETURN_STATEMENT:
                message = "No return statement";
                break;
            case ERROR_ARITHMETIC_NON_NUMBER:
                message = "Arithmetic operation with non-numbers";
                break;
            case ERROR_UNKNOWN_FUNCTION:
                message = "Unknown Function";
                break;
            case ERROR_WRONG_NUM_PARAMS:
                message = "Wrong number of parameters in function call";
                break;
            case ERROR_EXP_PAREN:
                message = "Error in expression inside parenthesis";
                break;
        }

        throw new Error("Compilation error on line " + lineNumber + ": " + message);
    }

    // This sets up the elements of the semantic cube by inserting the combinations and their resulting types.
    // Also initializes values for startingDirCodes map
    function fillMaps(){
        semCube.set("int,int,plus", "int");
        semCube.set("int,int,minus", "int");
        semCube.set("int,int,times", "int");
        semCube.set("int,int,divide", "int");
        semCube.set("int,float,plus", "float");
        semCube.set("int,float,minus", "float");
        semCube.set("int,float,times", "float");
        semCube.set("int,float,divide", "float");
        semCube.set("int,letrero,plus", "letrero");
        
        semCube.set("float,int,plus", "float");
        semCube.set("float,int,minus", "float");
        semCube.set("float,int,times", "float");
        semCube.set("float,int,divide", "float");
        semCube.set("float,float,plus", "float");
        semCube.set("float,float,minus", "float");
        semCube.set("float,float,times", "float");
        semCube.set("float,float,divide", "float");
        semCube.set("float,letrero,plus", "letrero");
        
        semCube.set("char,letrero,plus", "letrero");
        
        semCube.set("letrero,int,plus", "letrero");
        semCube.set("letrero,float,plus", "letrero");
        semCube.set("letrero,char,plus", "letrero");
        semCube.set("letrero,letrero,plus", "letrero");
        
        // int/float equal comparisons
        semCube.set("int,int,isEqual", "bool");
        semCube.set("int,int,isDifferent", "bool");
        semCube.set("int,float,isEqual", "bool");
        semCube.set("int,float,isDifferent", "bool");
        semCube.set("float,int,isEqual", "bool");
        semCube.set("float,int,isDifferent", "bool");
        semCube.set("float,float,isEqual", "bool");
        semCube.set("float,float,isDifferent", "bool");

        // int/float numeric comparisons        
        semCube.set("int,int,lessthan", "bool");
        semCube.set("int,int,greaterthan", "bool");
        semCube.set("int,int,lessthanEqual", "bool");
        semCube.set("int,int,greaterthanEqual", "bool");
        semCube.set("int,float,lessthan", "bool");
        semCube.set("int,float,greaterthan", "bool");
        semCube.set("int,float,lessthanEqual", "bool");
        semCube.set("int,float,greaterthanEqual", "bool");
        semCube.set("float,int,lessthan", "bool");
        semCube.set("float,int,greaterthan", "bool");
        semCube.set("float,int,lessthanEqual", "bool");
        semCube.set("float,int,greaterthanEqual", "bool");
        semCube.set("float,float,lessthan", "bool");
        semCube.set("float,float,greaterthan", "bool");
        semCube.set("float,float,lessthanEqual", "bool");
        semCube.set("float,float,greaterthanEqual", "bool");
        
        // char/letrero equal comparisons
        semCube.set("char,char,isEqual", "bool");
        semCube.set("char,char,isDifferent", "bool");
        semCube.set("char,letrero,isEqual", "bool");
        semCube.set("char,letrero,isDifferent", "bool");
        semCube.set("letrero,letrero,isEqual", "bool");
        semCube.set("letrero,letrero,isDifferent", "bool");
        semCube.set("letrero,char,isEqual", "bool");
        semCube.set("letrero,char,isDifferent", "bool");

        // assignment
        semCube.set("int,int,equals", "int");
        semCube.set("float,float,equals", "float");
        semCube.set("char,char,equals", "char");
        semCube.set("letrero,letrero,equals", "letrero");
        semCube.set("float,int,equals", "float");

        // logic operations
        semCube.set("bool,bool,and", "bool");
        semCube.set("bool,bool,or", "bool");
        semCube.set("bool,null,not", "bool");

        startingDirCodes.set("global,int", GLOBAL_INT);
        startingDirCodes.set("global,float", GLOBAL_FLOAT);
        startingDirCodes.set("global,char", GLOBAL_CHAR);
        startingDirCodes.set("local,int", LOCAL_INT);
        startingDirCodes.set("local,float", LOCAL_FLOAT);
        startingDirCodes.set("local,char", LOCAL_CHAR);
        startingDirCodes.set("temp,int", TEMP_INT);
        startingDirCodes.set("temp,float", TEMP_FLOAT);
        startingDirCodes.set("temp,char", TEMP_CHAR);
        startingDirCodes.set("temp,bool", TEMP_BOOL);
        startingDirCodes.set("const,int", CONST_INT);
        startingDirCodes.set("const,float", CONST_FLOAT);
        startingDirCodes.set("const,char", CONST_CHAR);
        startingDirCodes.set("const,letrero", CONST_LETRERO);
    }

    fillMaps();

    // returns the resulting type of an operation
    function semanticCube(operand1, operand2, operator) {
        var typeOperand1 = getTypeFromDir(operand1);
        var typeOperand2 = getTypeFromDir(operand2);
        var result = semCube.get(typeOperand1 + "," + typeOperand2 + "," + operator);
        return result;
    }

    // adds a function to the function directory
    function createFunction(id, funcType, lineNumber) {
        if (!functionDirectory.has(id)) {
            currentFunctionId = id;
            var countersCopy = counters.slice(0);
            functionDirectory.set(id, {type: funcType, varTable: new Map(), params: [], quadCounter: 0, paramCounter: 0, 
            initialCounters: countersCopy, tempVarsUsed: 0, foundReturnStatement: false, returnDirs: []});
        }
        else {
            flagError(ERROR_FUNC_REDECLARATION, lineNumber);
        }
    }

    // adds a variable to the variable table of a function in the directory
    // and returns the dir of the created variable
    function createVariable(id, lineNumber) {
        var varTable = functionDirectory.get(currentFunctionId).varTable;
        if (!varTable.has(id)) {
            var scope = scopeIsGlobal() ? "global" : "local";
            var generatedDir = generateDir(startingDirCodes.get(scope + "," + currentType));

            varTable.set(id, {type: currentType, dir: generatedDir});
            return generatedDir;
        }
        else {
            flagError(ERROR_VAR_REDECLATION, lineNumber);
        }
    }

    function variableExists(name, lineNumber) {
        var varTable = functionDirectory.get(currentFunctionId).varTable;
        var exists = varTable.has(name);
        if (!exists && !scopeIsGlobal()) {
            varTable = functionDirectory.get(programName).varTable;
            exists = varTable.has(name);
        }
        if (exists) {
            return true;
        }
        else {
            flagError(ERROR_UNKNOWN_VARIABLE, lineNumber);
        }
    }

    // returns a variable, given its id and function id
    function getVariable(id, funcId, lineNumber) {
        var varTable = functionDirectory.get(funcId).varTable;
        if (varTable.has(id)) {
            return varTable.get(id);
        }
        else if (!scopeIsGlobal()) {
            varTable = functionDirectory.get(programName).varTable;
            if (varTable.has(id)) {
                return varTable.get(id);
            }
        }
        else {
            flagError(ERROR_UNKNOWN_VARIABLE, lineNumber);
        }
    }
    
    // adds a constant to the constTable and returns its dir
    function addConstant(val, startingDir) {
        if (!constTable.has(val)) {
            constTable.set(val, generateDir(startingDir));
        }
        return constTable.get(val);
    }

    function printStacks(){
        console.log("stacks:");
        console.log(stackOperands);
        console.log(stackOperators);
    }

    function fillQuad(quadToFill) {
        quads[quadToFill].dir2 = quadCount;
    }

    function addQuad(lineNumber) {
        // pops
        var dirRight = stackOperands.pop();
        var dirLeft = stackOperands.pop();
        var operator = stackOperators.pop();
        
        // use semantic cube to generate the direction for the temporary var
        var resultType = semanticCube(dirLeft, dirRight, operator);

        if (resultType == undefined) {
            flagError(ERROR_TYPE_MISMATCH, lineNumber);
        }

        var dirTemp = generateDir(startingDirCodes.get("temp," + resultType));

        // push new quad
        pushQuad(operator, dirLeft, dirRight, dirTemp);

        // add dir of temporary var to operand stack
        pushOperand(dirTemp);
        return dirTemp;
    }

    function pushQuad(operator, dir1, dir2, dir3) {
        quads.push({operator: operator, dir1: dir1, dir2: dir2, dir3: dir3});
        quadCount++;
    }

    function pushOperator(operator){
        stackOperators.push(operator);
    }

    function pushOperand(operand){
        stackOperands.push(operand);
    }

    function generateDir(startingDir) {
        // make copy of counter of direction type, and then add to counter
        var dirCounter = startingDir + counters[startingDir / 10000];
        counters[startingDir / 10000]++;
        // return counter copy
        return dirCounter;
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

    function scopeIsGlobal() {
        return currentFunctionId == programName;
    }

    function top(stack) {
        return stack[stack.length - 1];
    }

    function printMap(map) {
        console.log("{");
        for (let key of map.keys()) {
            var value = map.get(key);
            console.log(key + ": " + JSON.stringify(map.get(key)) + ",");
            if (map.get(key).varTable) {
                console.log("VarTable of " + key + ":");
                var varTable = map.get(key).varTable;
                printMap(varTable);
            }
        }
        console.log("}");
    }

    // reset variables
    function resetVariables(){
        functionDirectory.clear();
        constTable.clear();
        stackOperands = [];
        stackOperands = [];
        stackJumps = [];
        quads = [];
        quadCount = 0;
        programName = "";
        currentFunctionId = "";
        currentType = "";
        counters = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        forVars = [];
        calledFuncs = [];
        calledParams = [];
        lastReadId = "";
    }

%}

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
"var"                  return 'var'
"int"                  return 'int'
"float"                return 'float'
"char"                 return 'char'
"void"                 return 'void'
"program"              return 'program'
"main"                 return 'main'
"module"               return 'module'
"if"                   return 'if'
"then"                 return 'then'
"else"                 return 'else'
"return"               return 'return'
"write"                return 'write'
"read"                 return 'read'
"while"                return 'while'
"for"                  return 'for'
"to"                   return 'to'
"do"                   return 'do'
"=="                   return 'isEqual'
"="                    return 'equals'
":"                    return 'colon'
";"                    return 'semicolon'
","                    return 'comma'
"{"                    return 'lbracket'
"}"                    return 'rbracket'
"["                    return 'lsqbracket'
"]"                    return 'rsqbracket'
"("                    return 'lparen'
")"                    return 'rparen'
"+"                    return 'plus'
"+"                    return 'plus'
"-"                    return 'minus'
"*"                    return 'times'
"/"                    return 'divide'
"<="                   return 'lessthanEqual'
">="                   return 'greaterthanEqual'
"<"                    return 'lessthan'
">"                    return 'greaterthan'
"!="                   return 'isDifferent'
"!"                    return 'not'
"&&"                   return 'and'
"||"                   return 'or'
[a-zA-Z_][a-zA-Z_0-9]* return 'id'
\d+\.\d+               return 'cte_float'
\d+                    return 'cte_int'
\'.\'                  return 'cte_char'
\".*\"                 return 'letrero'
// EOF means "end of file"
<<EOF>>               return 'EOF'

/lex

%start EXPRESSIONS

%% /* language grammar */

EXPRESSIONS
    : PROGRAM EOF {
        pushQuad(OP_END, null, null, null);

        //console.log("quads:");
        //console.log(quads);

        // create funcDirectory for VM, that only sends data needed by VM
        var vmFuncs = new Map();

        for (let key of functionDirectory.keys()) {
            var value = functionDirectory.get(key);
            vmFuncs.set(key, {tempVarsUsed: value.tempVarsUsed, varsTableKeyLength: value.varTable.size,
                returnDirs: value.returnDirs});
        }

        // create constTable for VM, that uses dir as the key
        var vmConsts = {int: [], float: [], char: [], letrero: []};

        for (let key of constTable.keys()) {
            var dir = constTable.get(key);
            if (dir >= CONST_INT && dir < CONST_FLOAT) {
                vmConsts.int[dir - CONST_INT] = key;
            }
            else if (dir >= CONST_FLOAT && dir < CONST_CHAR) {
                vmConsts.float[dir - CONST_FLOAT] = key; 
            }
            else if (dir >= CONST_CHAR && dir < CONST_LETRERO) {
                vmConsts.char[dir - CONST_CHAR] = key; 
            }
            else if (dir >= CONST_LETRERO) {
                vmConsts.letrero[dir - CONST_LETRERO] = key; 
            }
        }
        
        // data sent to VM
        var returnObj = {
            quads: quads,
            funcs: vmFuncs,
            constTable: vmConsts,
            programName: programName
        };

        // Resets variables and releases Memory
        resetVariables();

        return returnObj;
    };

PROGRAM
    : PROGRAM_NAME semicolon PROGRAM_AUX PROGRAM_AUX2 MAIN;

PROGRAM_NAME
    : program id {
        pushQuad(OP_GOTO, null, null, null);
        stackJumps.push(quadCount - 1);

        programName = $2;
        //currentFunctionId = programName;
        createFunction(programName, "program", @2.first_line);
        calledFuncs.push(programName);
    };

PROGRAM_AUX
    : VARS | ;

PROGRAM_AUX2
    : FUNCION PROGRAM_AUX2 | ;

MAIN
    : MAIN_WRAPPER BLOQUE;

MAIN_WRAPPER
    : main lparen rparen {
        var posGotoMain = stackJumps.pop();
        fillQuad(posGotoMain);
    };

VARS
    : var VARS_AUX;

VARS_AUX
    : TIPO ID_DECLARE_VAR VARS_AUX2 semicolon VARS_AUX | ;

VARS_AUX2
    : comma ID_DECLARE_VAR VARS_AUX2 | ;

TIPO
    : int {
        currentType = "int";
    }
    | float {
        currentType = "float";
    }
    | char {
        currentType = "char";
    };

// id | id[INT]~[INT]~
ID_DECLARE_VAR
    : id {
        $$ = createVariable($1, @1.first_line);
    }
    | id lsqbracket cte_int rsqbracket ID_DECLARE_VAR_AUX;

// [INT] | eps
ID_DECLARE_VAR_AUX
    : lsqbracket cte_int rsqbracket | ;

// id | id[EXP]~[EXP]~
ID_ACCESS_VAR
    : ID_WRAPPER ID_SIMPLE_VAR
    | ID_WRAPPER lsqbracket EXP rsqbracket ID_ACCESS_VAR_AUX
    | ID_WRAPPER lparen ID_LLAMADA_FUNCION PARAMS_LLAMADA_FUNCION rparen {
        if (top(calledParams).params.length != top(calledParams).paramCounter) {
            flagError(ERROR_WRONG_NUM_PARAMS, @1.first_line);
        }

        // generate quad(gosub, procedure-name, initial-address (quad in which func starts))
        pushQuad(OP_GOSUB, top(calledFuncs), functionDirectory.get(top(calledFuncs)).quadCounter, null);

        // generate temp dir for return value of the called function
        var returnType = functionDirectory.get(top(calledFuncs)).type;
        if (returnType != "void") {
            var returnTemp = generateDir(startingDirCodes.get("temp," + returnType));
            stackOperands.push(returnTemp);

            functionDirectory.get(top(calledFuncs)).returnDirs.push(returnTemp);
            $$ = {dir: returnTemp};
        }
        else {
            // return invalid dir in the case of void
            $$ = {dir: -1};
        }

        calledParams.pop();
        calledFuncs.pop();
    };
    //| id lparen rparen;

ID_WRAPPER
    : id {
        lastReadId = $1;
    };

ID_SIMPLE_VAR
    : {
        if (variableExists(lastReadId, @1.first_line)) {
            var dir = getVariable(lastReadId, currentFunctionId, @1.first_line).dir;
            pushOperand(dir);
            $$ = {name: lastReadId, dir: dir};
        }
    };

ID_LLAMADA_FUNCION
    : {
        // check that function id exists in functionDirectory
        if (!functionDirectory.has(lastReadId)) {
            flagError(ERROR_UNKNOWN_FUNCTION, @1.first_line);
        }

        calledFuncs.push(lastReadId);
        calledParams.push({params: functionDirectory.get(lastReadId).params, paramCounter: 0})

        // generate ERA size quad
        var size = functionDirectory.get(lastReadId).varTable.size + functionDirectory.get(lastReadId).tempVarsUsed;
        pushQuad(OP_ERA, size, null, null);
    };

PARAMS_LLAMADA_FUNCION
    : PARAM PARAMS_LLAMADA_FUNCION_AUX | ;

PARAMS_LLAMADA_FUNCION_AUX
    : comma PARAM PARAMS_LLAMADA_FUNCION_AUX
    | ;

PARAM
    : EXPRESION {
        var dir = stackOperands.pop();
        // stretch: cast int from EXPRESION to float, in order to match param type, if its the case
        var params = top(calledParams).params;
        var paramCounter = top(calledParams).paramCounter;
        if (paramCounter >= params.length) {
            flagError(ERROR_WRONG_NUM_PARAMS, @1.first_line);
        }
        if (getTypeFromDir(dir) != params[paramCounter]) {
            flagError(ERROR_TYPE_MISMATCH, @1.first_line);
        }

        pushQuad(OP_PARAMETER, dir, paramCounter, null);

        top(calledParams).paramCounter++;
    };

// [EXP] | eps
ID_ACCESS_VAR_AUX
    : lsqbracket EXP rsqbracket | ;

// module void|TIPO id (list[TIPO id ...]); VARS {BLOQUE}
FUNCION
    : module FUNCION_ID_WRAPPER lparen FUNCION_PARAM_LIST rparen VARS_FUNC BLOQUE {
        // punto 7
        // check if non-void function has a return statement
        if (functionDirectory.get(currentFunctionId).type != "void" && !functionDirectory.get(currentFunctionId).foundReturnStatement) {
            flagError(ERROR_NO_RETURN_STATEMENT, @1.first_line);
        }

        // save number of temporal variables used
        var numberTemporalVarsUsed = 0;
        for (var i = 6; i <= 9; i++) {
            numberTemporalVarsUsed += (counters[i] - functionDirectory.get(currentFunctionId).initialCounters[i]);
        } 
        functionDirectory.get(currentFunctionId).tempVarsUsed = numberTemporalVarsUsed;

        // release dirs for local variables, temps. Consts are NOT released
        var counterTemps = [counters[10], counters[11], counters[12], counters[13]];
        counters = functionDirectory.get(currentFunctionId).initialCounters.slice(0);
        counters[10] = counterTemps[0];
        counters[11] = counterTemps[1];
        counters[12] = counterTemps[2];
        counters[13] = counterTemps[3];

        pushQuad(OP_ENDFUNC, null, null, null);

        // change currentFunctionId back to the previous function
        calledFuncs.pop();
        currentFunctionId = top(calledFuncs);
    };

// wrapper de id = punto 1
// checar que no existe la function id en la funcTable, ya lo hace createFunction
// cuando hagamos agregar a funcTable, tenemos que cambiar currentfunctionid, ya lo hace createFunction
// hacer copia de los counters, lo hace createFunction
FUNCION_ID_WRAPPER
    : FUNCION_TIPO id {
        createFunction($2, $1, @2.first_line);
        calledFuncs.push($2);
    };

// wrapper de VARS = punto 5 y 6
VARS_FUNC
    : VARS_FUNC_AUX {
        // el punto 5 es mamada
        // punto 6
        functionDirectory.get(currentFunctionId).quadCounter = quadCount;
    };

VARS_FUNC_AUX
    : VARS | ;

FUNCION_TIPO
    : void | TIPO;

// wrapper de id_declare_var = punto 2 y 3
VAR_FUNC_PARAM
    : TIPO ID_DECLARE_VAR {
        // pushear a params de la funcion el tipo
        functionDirectory.get(currentFunctionId).params.push($1);
    };
    
FUNCION_PARAM_LIST
    : VAR_FUNC_PARAM FUNCION_PARAM_LIST_AUX | ;

FUNCION_PARAM_LIST_AUX
    : comma VAR_FUNC_PARAM FUNCION_PARAM_LIST_AUX | ;

BLOQUE
    : lbracket BLOQUE_AUX rbracket;

BLOQUE_AUX
    : BLOQUE_AUX ESTATUTO | ;

ESTATUTO
    : ASIGNACION | LECTURA | ESCRITURA | DECISION_IF | CONDICIONAL_WHILE | NO_CONDICIONAL_FOR | RETORNO_FUNCION | EXPRESION semicolon;

EXPRESION
    : EXP_AND EXPRESION_AUX;

EXPRESION_AUX
    : EXPRESION_AUX2 EXPRESION | ;

EXPRESION_AUX2
    : or {
        pushOperator(OP_OR);
        $$ = OP_OR;
    };

EXP_AND
    : EXP_NOT_WRAPPER EXP_AND_AUX {
        if (top(stackOperators) == OP_OR) {
            addQuad(@1.first_line);
        }
    };

EXP_AND_AUX
    : EXP_AND_AUX2 EXP_AND | ;

EXP_AND_AUX2
    : and {
        pushOperator(OP_AND);
        $$ = OP_AND;
    };

EXP_NOT_WRAPPER
    : EXP_NOT {
        if (top(stackOperators) == OP_AND) {
            addQuad(@1.first_line);
        }
    };

EXP_NOT
    : EXP_COMP | EXP_NOT_AUX EXP_COMP;

EXP_NOT_AUX
    : not {
        pushOperator(OP_NOT);
        $$ = OP_NOT;
    };

EXP_COMP
    : EXP EXP_COMP_AUX {
        if (top(stackOperators) == OP_NOT) {
            var operator = stackOperators.pop();
            var operandDir = stackOperands.pop();

            // use semantic cube to generate the direction for the temporary var
            var resultType = semCube.get(getTypeFromDir(operandDir) + ",null," + operator);

            if (resultType == undefined) {
                flagError(ERROR_TYPE_MISMATCH, @1.first_line);
            }

            var dirTemp = generateDir(startingDirCodes.get("temp," + resultType));

            pushQuad(operator, operandDir, dirTemp, null);
            pushOperand(dirTemp);
        }
    };

EXP_COMP_AUX
    : EXP_COMP_AUX2 EXP_COMP | ;

EXP_COMP_AUX2
    : lessthan {
        pushOperator(OP_LESSTHAN);
        $$ = OP_LESSTHAN;
    } 
    | greaterthan {
        pushOperator(OP_GREATERTHAN);
        $$ = OP_GREATERTHAN;
    } 
    | isDifferent {
        pushOperator(OP_ISDIFFERENT);
        $$ = OP_ISDIFFERENT;
    } 
    | isEqual {
        pushOperator(OP_ISEQUAL);
        $$ = OP_ISEQUAL;
    } 
    | lessthanEqual {
        pushOperator(OP_LESSTHANEQUAL);
        $$ = OP_LESSTHANEQUAL;
    } 
    | greaterthanEqual {
        pushOperator(OP_GREATERTHANEQUAL);
        $$ = OP_GREATERTHANEQUAL;
    }
    ;

EXP
    : TERMINO EXP_AUX {
        if (top(stackOperators) == OP_LESSTHAN || top(stackOperators) == OP_GREATERTHAN
            || top(stackOperators) == OP_ISDIFFERENT || top(stackOperators) == OP_ISEQUAL
            || top(stackOperators) == OP_LESSTHANEQUAL || top(stackOperators) == OP_GREATERTHANEQUAL) {
                addQuad(@1.first_line);
        }
    };

EXP_AUX
    : EXP_AUX2 EXP | ;

EXP_AUX2
    : plus {
        pushOperator(OP_PLUS);
        $$ = OP_PLUS;
    } 
    | minus{
        pushOperator(OP_MINUS);
        $$ = OP_MINUS;
    }
    ;

TERMINO
    : FACTOR_WRAPPER TERMINO_AUX {
        if (top(stackOperators) == OP_PLUS || top(stackOperators) == OP_MINUS) {
            addQuad(@1.first_line);
        }
    };

TERMINO_AUX
    : TERMINO_AUX2 TERMINO | ;

TERMINO_AUX2
    : times {
        pushOperator(OP_TIMES);
        $$ = OP_TIMES;
    } 
    | divide{
        pushOperator(OP_DIVIDE);
        $$ = OP_DIVIDE;
    }
    ;

FACTOR_WRAPPER
    : FACTOR {
        if (top(stackOperators) == OP_TIMES || top(stackOperators) == OP_DIVIDE) {
            addQuad(@1.first_line);
        }
    };

FACTOR
    : FACTOR_AUX | FACTOR_AUX2;

FACTOR_AUX
    : BEGINPAREN EXPRESION rparen {
        var topOp = stackOperators.pop();
        if (topOp != "lparen") {
            flagError(ERROR_EXP_PAREN, @1.first_line);
        }
    };

BEGINPAREN
    : lparen {
        pushOperator("lparen");
    }
    ;

FACTOR_AUX2
    : VAR_CTE {
        $$ = $1;
    }
    | minus VAR_CTE {
        var operandDir = stackOperands.pop();
        
        // check varType of operand  
        operandVarType = getTypeFromDir(operandDir);  
        // if operand type is not int or float, error  
        if (operandVarType != "int" && operandVarType != "float") {
            flagError(ERROR_ARITHMETIC_NON_NUMBER, @1.first_line);
        }

        // add -1 to constTable
        minusOneDir = addConstant(-1, operandVarType == "int" ? CONST_INT : CONST_FLOAT);
    
        // use semantic cube to generate the direction for the temporary var
        var resultType = semanticCube(minusOneDir, operandDir, "times");
        if (resultType == undefined) {
            flagError(ERROR_TYPE_MISMATCH, @1.first_line);
        }

        var dirTemp = generateDir(startingDirCodes.get("temp," + resultType));

        // push quad for -1 * operand received
        pushQuad(OP_TIMES, minusOneDir, operandDir, dirTemp);

        // add dir of temporary var to operand stack
        pushOperand(dirTemp);
        $$ = {dir: dirTemp};
    };

VAR_CTE
    : ID_ACCESS_VAR {
        $$ = $1;
    }
    | cte_int {
        var val = Number($1);
        var resultDir = addConstant(val, CONST_INT);
        pushOperand(resultDir);
        $$ = {dir: resultDir};
    }
    | cte_float {
        var val = Number($1);
        var resultDir = addConstant(val, CONST_FLOAT);
        pushOperand(resultDir);
        $$ = {dir: resultDir};
    }
    | cte_char {
        var resultDir = addConstant($1, CONST_CHAR);
        pushOperand(resultDir);
        $$ = {dir: resultDir};
    };

ASIGNACION
    : ID_ACCESS_VAR EQUALSSIGN EXPRESION semicolon {
        //printStacks();
        // pops
        var dirRight = stackOperands.pop();
        var dirLeft = stackOperands.pop();
        var operator = stackOperators.pop();
        
        // checar si el tipo de el temp es el mismo (o compatible) que el de la variable
        if (semanticCube(dirLeft, dirRight, "equals") == undefined) {
            flagError(ERROR_TYPE_MISMATCH, @1.first_line);
        }

        // push new quad
        pushQuad(operator, dirRight, dirLeft, null);
    };

EQUALSSIGN
    : equals {
        pushOperator(OP_EQUALS);
        $$ = OP_EQUALS;
    }
    ;

RETORNO_FUNCION
    : return lparen EXP rparen semicolon {
        functionDirectory.get(currentFunctionId).foundReturnStatement = true;
        
        var exp = stackOperands.pop();
        
        // Check that the type of the returned exp is the same as the function type
        if (functionDirectory.get(currentFunctionId).type != getTypeFromDir(exp)) {
            flagError(ERROR_TYPE_MISMATCH, @1.first_line);
        }

        // If exp is not a temp, generate a temporary copy (to not use the variable dir, as its value may change)
        if (exp < 60000 || exp > 99999) {
            var dirTemp = generateDir(startingDirCodes.get("temp," + getTypeFromDir(exp)));
            pushQuad(OP_EQUALS, exp, dirTemp, null);

            exp = dirTemp;
        }

        // push new quad
        pushQuad(OP_RETURN, exp, null, null);
    };

LECTURA
    : read lparen ID_ACCESS_VAR_LECTURA LECTURA_AUX rparen semicolon;

LECTURA_AUX
    : comma ID_ACCESS_VAR_LECTURA LECTURA_AUX | ;

ID_ACCESS_VAR_LECTURA
    : ID_ACCESS_VAR {
        // pop operand
        var dirOperand = stackOperands.pop();

        // push write quad with dir for each argument
        pushQuad(OP_READ, dirOperand, null, null);
    };

ESCRITURA
    : write lparen ESCRITURA_AUX_WRAPPER ESCRITURA_AUX2 rparen semicolon;

ESCRITURA_AUX_WRAPPER
    : ESCRITURA_AUX {
        // pop operand
        var dirOperand = stackOperands.pop();

        // push write quad with dir for each argument
        pushQuad(OP_WRITE, dirOperand, null, null);
    };

ESCRITURA_AUX
    : EXPRESION 
    | letrero {
        var resultDir = addConstant($1, CONST_LETRERO);
        pushOperand(resultDir);
        $$ = {dir: resultDir};
    };

ESCRITURA_AUX2
    : comma ESCRITURA_AUX_WRAPPER ESCRITURA_AUX2 | ;

DECISION_IF
    : if EXPRESION_IF then BLOQUE DECISION_IF_AUX {
        var end = stackJumps.pop();
        //end es el num del quad que vamos a rellenar
        //quadcount es hacia donde va saltar (lo que va rellenar en el quad)
        fillQuad(end);
        //quads[end].dir2 = quadCount;
        //end = pjumps.pop;
        //fill(end, quadcount);
    };

EXPRESION_IF
    : lparen EXPRESION rparen {
        // check que expresion sea bool
        var dirExpressionIf = stackOperands.pop();
        if (getTypeFromDir(dirExpressionIf) == "bool") {
            
            // dir2 of the gotof quad is the quad we will goto, will be filled later
            pushQuad(OP_GOTOF, dirExpressionIf, null, null);
            //cuando llegas al else o al final del if, llamamos una funcion que hace pop del stackjumps y lo llena, usando la posicion de quadcount - 1
            // push quadCount of the gotof quad 
            stackJumps.push(quadCount - 1);
        }
        else {
            flagError(ERROR_TYPE_MISMATCH, @1.first_line);
        }
    };

DECISION_IF_AUX
    : ELSE_START BLOQUE | ;

ELSE_START
    : else {
        pushQuad(OP_GOTO, null, null, null);
        var posGotoF = stackJumps.pop();
        stackJumps.push(quadCount - 1);
        fillQuad(posGotoF);
    };

CONDICIONAL_WHILE
    : WHILE_START EXPRESION_IF do BLOQUE{
        var endJump = stackJumps.pop();
        var returnJump = stackJumps.pop();
        pushQuad(OP_GOTO, returnJump, null, null);
        fillQuad(endJump);
    };

WHILE_START
    : while {
        stackJumps.push(quadCount);
    };

NO_CONDICIONAL_FOR
    : for ID_WRAPPER CHECK_IS_NUMBER equals FOR_EXP1 to FOR_EXP2 do BLOQUE {
        // get for control variable
        var vControl = top(forVars).vControl;

        pushQuad(OP_PLUS, vControl, addConstant(1, CONST_INT), vControl);
        var quadGotoFFor = stackJumps.pop();
        var quadComparisonFor = stackJumps.pop();

        pushQuad(OP_GOTO, quadComparisonFor, null, null);
        quads[quadGotoFFor].dir2 = quadCount;

        // pop control variable from array of control variables
        forVars.pop();
    };

CHECK_IS_NUMBER
    : ID_SIMPLE_VAR {
        if (getTypeFromDir($1.dir) != "int" && getTypeFromDir($1.dir) != "float") {
            flagError(ERROR_TYPE_MISMATCH, @1.first_line);
        }
    };

FOR_EXP1
    : EXP {
        var exp = stackOperands.pop();
        if (getTypeFromDir(exp) != "int" && getTypeFromDir(exp) != "float") {
            flagError(ERROR_TYPE_MISMATCH, @1.first_line);
        }
        else {
            // pop control variable from operand stack and save it internally
            var vControl = stackOperands.pop();
            forVars.push({vControl: vControl, vFinal: null});

            // check that control variable and exp are of compatible data types
            var resultType = semanticCube(vControl, exp, "equals");
            if (resultType == undefined) {
                flagError(ERROR_TYPE_MISMATCH, @1.first_line);
            }
            pushQuad(OP_EQUALS, exp, vControl, null);
        }
    };

FOR_EXP2
    : EXP {
        var exp = stackOperands.pop();
        if (getTypeFromDir(exp) != "int" && getTypeFromDir(exp) != "float") {
            flagError(ERROR_TYPE_MISMATCH, @1.first_line);
        }
        else {
            var vControl = top(forVars).vControl;

            // use semantic cube to generate the direction for the temporary var
            var resultType = semanticCube(vControl, exp, "lessthan");
            if (resultType == undefined) {
                flagError(ERROR_TYPE_MISMATCH, @1.first_line);
            }
            var dirTemp = generateDir(startingDirCodes.get("temp," + resultType));

            // quad for comparison in for loop
            pushQuad(OP_LESSTHAN, vControl, exp, dirTemp);

            stackJumps.push(quadCount - 1);
            pushQuad(OP_GOTOF, dirTemp, null, null);
            stackJumps.push(quadCount - 1);
        }
    };
