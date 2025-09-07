//
//  FEATURES
//

// FEATURES -> CREATE
type FeaturesCreateRequest = {
    name: string,
    description: string
}

// FEATURES -> GET
type FeaturesGetRequest = Record<string, never>


//
//  MATHSYS
//

// MATHSYS -> COMPILE
type MathsysCompileRequest = {
    Mcode: string
};