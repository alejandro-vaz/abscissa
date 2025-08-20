//
//  MATHSYS
//

// MATHSYS -> COMPILE
type MathsysCompileRequest = {
    Mcode: string
};

// MATHSYS -> VALIDATE
type MathsysValidateRequest = {
    Mcode: string
};

// MATHSYS -> VIEW
type MathsysViewRequest = {
    Mcode: string
};


//
//  PROBLEM
//

// PROBLEM -> LOOKUP
type ProblemLookupRequest = {
    Pid: string
};


//
//  SESSION
//

// SESSION -> VALIDATE
type SessionValidateRequest = {};


//
//  USER
//

// USER -> DATA
type UserDataRequest = {}

// USER -> LOGIN
type UserLoginRequest = {
    Uhashpass: string,
    Uname: string
}

// USER -> REGISTER
type UserRegisterRequest = {
    Uemail: string,
    Uhashpass: string,
    Uname: string
}