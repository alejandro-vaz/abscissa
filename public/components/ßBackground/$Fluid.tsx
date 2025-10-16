//
//  HEAD
//

// HEAD -> TOOLS
import * as ß from "ß";


//
//  BACKGROUND
//

// BACKGROUND -> SOLID
export default function $Fluid(): ß.react.ReactNode {
    return (
        <ß.motion.motion.div 
            className="absolute inset-0 h-screen w-screen -z-10 backdrop-blur-lg"
            animate={{
                background: [
                    "radial-gradient(ellipse at 55% 45%, rgba(30,32,60,0.5) 0%, rgba(10,10,20,0.7) 80%, rgba(0,0,0,0.9) 100%)",
                    "radial-gradient(ellipse at 50% 50%, rgba(30,32,60,0.7) 0%, rgba(10,10,20,0.9) 80%, rgba(0,0,0,1) 100%)",
                    "radial-gradient(ellipse at 45% 55%, rgba(30,32,60,0.3) 0%, rgba(10,10,20,0.5) 80%, rgba(0,0,0,0.7) 100%)",
                    "radial-gradient(ellipse at 55% 45%, rgba(30,32,60,0.5) 0%, rgba(10,10,20,0.7) 80%, rgba(0,0,0,0.9) 100%)"
                ]
            }}
            transition={{
                duration: 60,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop"
            }}
        />
    );
}