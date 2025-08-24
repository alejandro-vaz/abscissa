//
//  MATHSYS
//

// MATHSYS -> COMPILE
type MathsysCompileResponse = ArrayBuffer;

// MATHSYS -> VALIDATE
type MathsysValidateResponse = {
   validated: boolean
};

// MATHSYS -> VIEW
type MathsysViewResponse = {
   output: string | null
};


//
//  PROBLEM
//

// PROBLEM -> LOOKUP
type ProblemLookupResponse = {
   Pid: string,
   Uid: number,
   Kid: number,
   Pedited: string,
   Pmeta: {
       calculator: boolean | "basic" | "scientific" | "graphing" | "financial" | "advanced"
   },
   Psolution: {
       value: string,
       error: number
   },
   Pdataen: {
       title: string,
       instructions: string,
       editor: string,
       svg: string | null
   },
   Pdataes: {
       title: string,
       instructions: string,
       editor: string,
       svg: string | null
   } | null,
   Pdatade: {
       title: string,
       instructions: string,
       editor: string,
       svg: string | null
   } | null
};


//
//  SESSION
//

// SESSION -> VALIDATE
type SessionValidateResponse = {
   validated: boolean
};


//
//  USER
//

// USER -> DATA
type UserDataResponse = {
   Uid: number,
   Uname: string,
   Uemail: string,
   Uhashpass: string,
   Ujoined: string,
   Usettings: {},
   Oid: number,
   Urole: number
} | null;

// USER -> LOGIN
type UserLoginResponse = {
   success: boolean
};

// USER -> REGISTER
type UserRegisterResponse = {
   success: boolean
};