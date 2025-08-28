//
//  MATHSYS
//

// MATHSYS -> COMPILE
type MathsysCompileRequest = {
  Mcode: string;
};

//
//  PROBLEM
//

// PROBLEM -> LOOKUP
type ProblemLookupRequest = {
  Pid: string;
};

//
//  USER
//

// USER -> LOGIN
type UserLoginRequest = {
  Uhashpass: string;
  Uname: string;
};

// USER -> REGISTER
type UserRegisterRequest = {
  Uemail: string;
  Uhashpass: string;
  Uname: string;
};
