%{

    // Maps declarations
    var semCube = new Map();
    var operatorCategories = new Map();
    var functionDirectory = new Map();
    var constTable = new Map();
    var startingDirCodes = new Map();

    var stackOperators = [];
	var stackOperands = [];
	var stackJumps = [];

    var quads = [];
    var quadCount = 0;

    // variables to know current state
    var programName = "";
    var currentFunctionId = "";
    var currentType = "";

    // Counters for each dir section, position for each counter is StartingDir/10000
    var counters = [];

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

    // This sets up the elements of the semantic cube by inserting the combinations and their resulting types.
    // Also initializes values for startingDirCodes map
    function fillMaps(){
        semCube.set("int,int,plus", "int");
        semCube.set("int,int,arithmetic", "int");
        semCube.set("int,float,plus", "float");
        semCube.set("int,float,arithmetic", "float");
        semCube.set("int,letrero,plus", "letrero");
        
        semCube.set("float,int,plus", "float");
        semCube.set("float,int,arithmetic", "float");
        semCube.set("float,float,plus", "float");
        semCube.set("float,float,arithmetic", "float");
        semCube.set("float,letrero,plus", "letrero");
        
        semCube.set("char,letrero,plus", "letrero");
        
        semCube.set("letrero,int,plus", "letrero");
        semCube.set("letrero,float,plus", "letrero");
        semCube.set("letrero,char,plus", "letrero");
        semCube.set("letrero,letrero,plus", "letrero");
        
        semCube.set("int,int,equalComp", "bool");
        semCube.set("int,float,equalComp", "bool");
        semCube.set("float,int,equalComp", "bool");
        semCube.set("float,float,equalComp", "bool");
        
        semCube.set("int,int,numericComp", "bool");
        semCube.set("int,float,numericComp", "bool");
        semCube.set("float,int,numericComp", "bool");
        semCube.set("float,float,numericComp", "bool");
        
        semCube.set("char,char,equalComp", "bool");
        semCube.set("char,letrero,equalComp", "bool");
        semCube.set("letrero,letrero,equalComp", "bool");
        semCube.set("letrero,char,equalComp", "bool");
        
        operatorCategories.set('+', "plus");
        operatorCategories.set('-', "arithmetic");
        operatorCategories.set('*', "arithmetic");
        operatorCategories.set('/', "arithmetic");
        operatorCategories.set('==', "equalComp");
        operatorCategories.set('!=', "equalComp");
        operatorCategories.set('<', "numericComp");
        operatorCategories.set('<=', "numericComp");
        operatorCategories.set('>', "numericComp");
        operatorCategories.set('>=', "numericComp");

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
    function semanticCube(operand1, operand2, operator){
        var opCategory = operatorCategories.get(operator);
        var result = semCube.get(operand1 + "," + operand2 + "," + opCategory);
        //if result == undefined, return Error
        return result;
    }

    // adds a function to the function directory
    function createFunction(id, funcType) {
        if (!functionDirectory.has(id)) {
            functionDirectory.set(id, {type: funcType, varTable: new Map()});
        }
        else {
            // error, re-declaration of function
        }
    }

    // adds a variable to the variable table of a function in the directory
    // and returns the dir of the created variable
    function createVariable(id) {
        var varTable = functionDirectory.get(currentFunctionId).varTable;
        if (!varTable.has(id)) {
            var scope = scopeIsGlobal() ? "global" : "local";
            var generatedDir = generateDir(startingDirCodes.get(scope + "," + currentType));

            varTable.set(id, {type: currentType, dir: generatedDir});
            return generatedDir;
        }
        else {
            // error, re-declaration of variable
        }
    }

    function variableExists(id, funcId) {
        var varTable = functionDirectory.get(funcId).varTable;
        var exists = varTable.has(id);
        if (!exists && !scopeIsGlobal()) {
            varTable = functionDirectory.get(programName).varTable;
            exists = varTable.has(id);
        }
        if (exists) {
            return true;
        }
        else {
            // error, no variable with that id
        }
    }

    // returns a variable, given its id and function id
    function getVariable(id, funcId) {
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
            // error, no variable with that id
        }
    }
    
    // adds a constant to the constTable and returns its dir
    function addConstant(val, startingDir) {
        if (!constTable.has(val)) {
            constTable.set(val, generateDir(startingDir));
        }
        return constTable.get(val);
    }

    function addQuad(operator, dir1, dir2, dir3){
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
        var dirCounter = counters[startingDir / 10000];
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
"!"                    return 'inverse'
"&&"                   return 'and'
"||"                   return 'or'
[a-zA-Z_][a-zA-Z_0-9]* return 'id'
\d+                    return 'cte_int'
\d+\.\d+               return 'cte_float'
\'.\'                  return 'cte_char'
\".*\"                 return 'letrero'
// EOF means "end of file"
<<EOF>>               return 'EOF'

/lex

%start expressions

%% /* language grammar */

expressions
    : PROGRAM EOF;

PROGRAM
    : PROGRAM_NAME semicolon PROGRAM_AUX PROGRAM_AUX2 MAIN;

PROGRAM_NAME
    : program id {
        programName = $2;
        currentFunctionId = programName;
        createFunction(programName, "program");
    };

PROGRAM_AUX
    : VARS | ;

PROGRAM_AUX2
    : FUNCION PROGRAM_AUX2 | ;

MAIN
    : main lparen rparen BLOQUE;

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
        $$ = createVariable($1);
    }
    | id lsqbracket cte_int rsqbracket ID_DECLARE_VAR_AUX;

// [INT] | eps
ID_DECLARE_VAR_AUX
    : lsqbracket cte_int rsqbracket | ;

// id | id[EXP]~[EXP]~
ID_ACCESS_VAR
    : id {
        var dir = functionDirectory.get(currentFunctionId).varTable.get($1).dir;
        stackOperands.push(dir);
        $$ = {dir: dir};
    }
    | id lsqbracket EXP rsqbracket ID_ACCESS_VAR_AUX
    | id lparen PARAMS_LLAMADA_FUNCION rparen
    | id lparen rparen;

PARAMS_LLAMADA_FUNCION
    : EXPRESION PARAMS_LLAMADA_FUNCION_AUX;

PARAMS_LLAMADA_FUNCION_AUX
    : comma EXPRESION PARAMS_LLAMADA_FUNCION_AUX
    | ;

// [EXP] | eps
ID_ACCESS_VAR_AUX
    : lsqbracket EXP rsqbracket | ;

// module void|TIPO id (list[TIPO id ...]); VARS {BLOQUE}
FUNCION
    : module FUNCION_TIPO id lparen FUNCION_PARAM_LIST rparen semicolon VARS BLOQUE;

FUNCION_TIPO
    : void | TIPO;

FUNCION_PARAM_LIST
    : TIPO ID_DECLARE_VAR FUNCION_PARAM_LIST_AUX | ;

FUNCION_PARAM_LIST_AUX
    : comma TIPO ID_DECLARE_VAR FUNCION_PARAM_LIST_AUX | ;

BLOQUE
    : lbracket BLOQUE_AUX rbracket;

BLOQUE_AUX
    : BLOQUE_AUX ESTATUTO | ;

ESTATUTO
    : ASIGNACION | LECTURA | ESCRITURA | DECISION_IF | CONDICIONAL_WHILE | NO_CONDICIONAL_FOR | RETORNO_FUNCION | EXPRESION semicolon;

EXPRESION
    : EXP_COMP EXPRESION_AUX;

EXPRESION_AUX
    : EXPRESION_AUX2 EXP_COMP EXPRESION_AUX | ;

EXPRESION_AUX
    : and {
        pushOperator("and");
        $$ = "and";
    } 
    | or {
        pushOperator("or");
        $$ = "or";
    };

EXP_COMP
    : EXP EXP_COMP_AUX;

EXP_COMP_AUX
    : EXP_COMP_AUX2 EXP EXP_COMP_AUX | ;

EXP_COMP_AUX2
    : lessthan {
        pushOperator("lessthan");
        $$ = "lessthan";
    } 
    | greaterthan {
        pushOperator("greaterthan");
        $$ = "greaterthan";
    } 
    | isDifferent {
        pushOperator("isDifferent");
        $$ = "isDifferent";
    } 
    | isEqual {
        pushOperator("isEqual");
        $$ = "isEqual";
    } 
    | lessthanEqual {
        pushOperator("lessthanEqual");
        $$ = "lessthanEqual";
    } 
    | greaterthanEqual {
        pushOperator("greaterthanEqual");
        $$ = "greaterthanEqual";
    }
    ;

EXP
    : TERMINO EXP_AUX;

EXP_AUX
    : EXP_AUX2 EXP | ;

EXP_AUX2
    : plus {
        pushOperator("plus");
        $$ = "plus";
    } 
    | minus{
        pushOperator("minus");
        $$ = "minus";
    }
    ;

TERMINO
    : FACTOR TERMINO_AUX;

TERMINO_AUX
    : TERMINO_AUX2 TERMINO | ;

TERMINO_AUX2
    : times {
        pushOperator("times");
        $$ = "times";
    } 
    | divide{
        pushOperator("divide");
        $$ = "divide";
    }
    ;

FACTOR
    : FACTOR_AUX | FACTOR_AUX2;

FACTOR_AUX
    : BEGINPAREN EXPRESION rparen;

BEGINPAREN
    : lparen {
        pushOperator("lparen");
    }
    ;

FACTOR_AUX2
    : VAR_CTE_STACK {
        $$ = $1;
    }
    | FACTOR_AUX3 VAR_CTE_STACK {

        var operandDir = $2.dir;
        var resultDir = operandDir;
        
        // check varType of operand  
        operandVarType = getTypeFromDir($2.dir);  

        // if operand type is not int or float, error  
        if (operandVarType != "int" && operandVarType != "float") {
            // error
        }

        // case for unary minus operator
        if ($1 == "minus") {
            // add -1 to constTable
            minusOneDir = addConstant(-1, operandVarType);

            resultType = operandVarType == "int" ? TEMP_INT : TEMP_FLOAT;

            resultDir = generatedDir(resultType);
            
            // addQuad for -1 * operand received
            addQuad("times", minusOneDir, operandDir, resultDir);
            
        }
        
        return resultDir;
    };

VAR_CTE_STACK
    : VAR_CTE {
        pushOperand($1.dir);
        $$ = $1;
    }
    ;

FACTOR_AUX3
    : plus
    | minus {
        // TODO: check errors when VAR_CTE_STACK is not a number or a variable
        $$ = "minus";
    };

VAR_CTE
    : ID_ACCESS_VAR {
        $$ = $1;
    }
    | cte_int {
        var val = Number($1);
        var resultDir = addConstant(val, CONST_INT);
        $$ = {dir: resultDir};
    }
    | cte_float {
        var val = Number($1);
        var resultDir = addConstant(val, CONST_FLOAT);
        $$ = {dir: resultDir};
    }
    | cte_char {
        var resultDir = addConstant($1, CONST_CHAR);
        $$ = {dir: resultDir};
    };

ASIGNACION
    : ID_ACCESS_VAR EQUALSSIGN EXPRESION semicolon {
        if (variableExists($1)) {
            // TODO: pop operands and operator from stacks (?)
            // TODO: corregir este cuadruplo
            addQuad($2, $3, null $1);
        }
    };

EQUALSSIGN
    : equals {
        pushOperator("equals");
        $$ = "equals";
    }
    ;

RETORNO_FUNCION
    : return lparen EXP rparen semicolon;

LECTURA
    : read lparen ID_ACCESS_VAR LECTURA_AUX rparen semicolon;

LECTURA_AUX
    : comma ID_ACCESS_VAR LECTURA_AUX | ;

ESCRITURA
    : write lparen ESCRITURA_AUX ESCRITURA_AUX2 rparen semicolon;

ESCRITURA_AUX
    : EXPRESION 
    | letrero {
        var resultDir = addConstant($1, CONST_LETRERO);
        $$ = {dir: resultDir};
    };

ESCRITURA_AUX2
    : comma ESCRITURA_AUX ESCRITURA_AUX2 | ;

DECISION_IF
    : if lparen EXPRESION rparen then BLOQUE DECISION_IF_AUX;

DECISION_IF_AUX
    : else BLOQUE | ;

CONDICIONAL_WHILE
    : while lparen EXPRESION rparen do BLOQUE;

NO_CONDICIONAL_FOR
    : for id equals EXP to EXP do BLOQUE;