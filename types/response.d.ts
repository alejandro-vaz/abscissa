//
//  FEATURES
//

// FEATURES -> CREATE
type FeaturesCreateResponse = Record<string, never>;

// FEATURES -> GET
type FeaturesGetResponse = {
    features: {
        Fid: number,
        Fname: string,
        Ftext: string,
        Fvotes: number
    }[]
}


//
//  MATHSYS
//

// MATHSYS -> COMPILE
type MathsysCompileResponse = {
    output: string
};