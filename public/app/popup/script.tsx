//
//  HEAD
//

// HEAD -> MODULES
/* @ts-ignore */
/* @ts-ignore */import * as $ from "$";
/* @ts-ignore */import * as react from "€react";


// HEAD -> APP POPUP
const origin = await $.connect("AppPopup");


//
//  PRESETS
//

// PRESETS -> AUTH
function $Auth({initialState}: {initialState: boolean}) {
    const [mode, setMode] = react.useState(initialState);
    return (
        <div id="Auth">
            <h2>{mode ? "Log in" : "Register"}</h2>
            <form noValidate onSubmit={async(event: typeof react.FormEvent) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget as HTMLFormElement);
                if (mode) {
                    if (await $.curl("user/login", {
                        Uname: data.get("username"),
                        Uhashpass: data.get("password"),
                    })) {window.location.reload()}
                } else {
                    if (await $.curl("user/register", {
                        Uname: data.get("username"),
                        Uemail: data.get("email"),
                        Uhashpass: data.get("password"),
                    })) {setMode(!mode)}
                }
            }}>
                <input type="text" name="username" placeholder="username..." autoComplete="off" />
                {!mode && (<input type="email" name="email" placeholder="email..." autoComplete="off" />)}
                <input type="password" name="password" placeholder="password..." autoComplete="off" />
                <input
                    type="submit"
                    value={mode ? "Log in" : "Register"}
                    tooltip={mode ? "Log in" : "Register"}
                />
            </form>
            <input
                type="button"
                value={mode ? "Don't have an account?" : "Already have an account?"}
                onClick={() => setMode(!mode)}
                tooltip={mode ? "Register instead" : "Log in instead"}
            />
        </div>
    );
};


//
//  POPUP
//

// POPUP -> CREATE
export async function create(preset: string, ...presetArguments: any[]): Promise<void> {
    let content;
    switch (preset) {
        case "auth": content = <$Auth initialState={presetArguments[0]}/>;
    }
    await $.inject(origin,
        <>
            <div id="Window">
                <div id="Header">
                    <img 
                        src="/public/app/popup/svg/close.svg" 
                        id="Close"
                        onClick={() => remove()}
                        tooltip="Close window"
                    />
                </div>
                {content}
            </div>
        </>
    )
    origin.style.pointerEvents = "auto";
    origin.style.opacity = "1";
}

// POPUP -> REMOVE
export async function remove(): Promise<void> {
    origin.style.opacity = "0";
    origin.style.pointerEvents = "none";
    await $.delay(0.1);
    await $.inject(origin, <></>);
}