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
    : program id semicolon PROGRAM_AUX PROGRAM_AUX2 MAIN;

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
    : int | float | char;

// id | id[INT]~[INT]~
ID_DECLARE_VAR
    : id | id lsqbracket cte_int rsqbracket ID_DECLARE_VAR_AUX;

// [INT] | eps
ID_DECLARE_VAR_AUX
    : lsqbracket cte_int rsqbracket | ;

// id | id[EXP]~[EXP]~
ID_ACCESS_VAR
    : id
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
    : ESTATUTO BLOQUE_AUX | ;

ESTATUTO
    : ASIGNACION | LECTURA | ESCRITURA | DECISION_IF | CONDICIONAL_WHILE | NO_CONDICIONAL_FOR | RETORNO_FUNCION | EXPRESION semicolon | ID_ACCESS_VAR semicolon;

EXPRESION
    : EXP EXPRESION_AUX;

EXPRESION_AUX
    : EXPRESION_AUX2 EXP EXPRESION_AUX | ;

EXPRESION_AUX2
    : lessthan | greaterthan | isDifferent | isEqual | and | or | lessthanEqual | greaterthanEqual;

EXP
    : TERMINO EXP_AUX;

EXP_AUX
    : EXP_AUX2 EXP | ;

EXP_AUX2
    : plus | minus;

TERMINO
    : FACTOR TERMINO_AUX;

TERMINO_AUX
    : TERMINO_AUX2 TERMINO | ;

TERMINO_AUX2
    : times | divide;

FACTOR
    : FACTOR_AUX | FACTOR_AUX2;

FACTOR_AUX
    : lparen EXPRESION rparen;

FACTOR_AUX2
    : FACTOR_AUX3 VAR_CTE;

FACTOR_AUX3
    : plus | minus | ;

VAR_CTE
    : ID_ACCESS_VAR | cte_int | cte_float | cte_char;

ASIGNACION
    : ID_ACCESS_VAR equals EXPRESION semicolon;

RETORNO_FUNCION
    : return lparen EXP rparen semicolon;

LECTURA
    : read lparen ID_ACCESS_VAR LECTURA_AUX rparen semicolon;

LECTURA_AUX
    : comma ID_ACCESS_VAR LECTURA_AUX | ;

ESCRITURA
    : write lparen ESCRITURA_AUX ESCRITURA_AUX2 rparen semicolon;

ESCRITURA_AUX
    : EXPRESION | letrero;

ESCRITURA_AUX2
    : comma ESCRITURA_AUX ESCRITURA_AUX2 | ;

DECISION_IF
    : if lparen DECISION_IF_AUX EXPRESION rparen then BLOQUE DECISION_IF_AUX2;

DECISION_IF_AUX
    : ! | ;

DECISION_IF_AUX2
    : else BLOQUE | ;

CONDICIONAL_WHILE
    : while lparen EXPRESION rparen do BLOQUE;

NO_CONDICIONAL_FOR
    : for id equals EXP to EXP do BLOQUE;