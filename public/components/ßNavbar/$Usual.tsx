//
//  HEAD
//

// HEAD -> TOOLS
import * as $ from "$";
import * as ß from "ß";


//
//  NAVBAR
//

// NAVBAR -> ITEM
function $Item({children, redirect}: {
    children: ß.react.ReactNode,
    redirect: string
}): ß.react.ReactNode {
    return (
        <ß.motion.motion.div
            className="h-full w-fit rounded-full hover:cursor-pointer flex justify-center items-center text-center"
            onClick={() => $.redirect(redirect, false)}
            onContextMenu={() => $.redirect(redirect, true)}
        >
            {children}
        </ß.motion.motion.div>
    )
}

// NAVBAR -> USUAL
export default function $Usual({children}: {
    children: ß.react.ReactNode
}): ß.react.ReactNode {
    // USUAL -> RETURN
    return (
        <div className="absolute h-screen w-screen flex flex-col">
            <div className="top-0 left-0 h-20 flex-none flex items-center justify-center p-4">
                <ß.motion.motion.div
                    className="h-full w-fit min-w-12 rounded-full backdrop-blur-md bg-gray-950/50 flex flex-row p-2 items-center justify-center gap-8 pr-8"
                >
                    <$Item redirect="/">
                        <img src="/public/svg/logoLight.svg" className="h-full aspect-square"/>
                    </$Item>
                    <$Item redirect="/playground">
                        <h3 className="text-lg">Playground</h3>
                    </$Item>
                    <$Item redirect="/features">
                        <h3 className="text-lg">Features</h3>
                    </$Item>
                    <$Item redirect="https://docs.abscissa.eu">
                        <h3 className="text-lg">Docs</h3>
                    </$Item>
                </ß.motion.motion.div>
            </div>
            <div className="flex-1 overflow-visible">
                {children}
            </div>
        </div>
    );
}