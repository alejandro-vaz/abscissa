//
//  HEAD
//

// HEAD -> MODULES
import * as $ from "$";
import * as ß from "ß";

// HEAD -> COMPONENTS
import $Button from "ßButton";
import $Form from "ßForm";
import $InputEmail from "ßInputEmail";
import $InputPassword from "ßInputPassword";
import $InputSubmit from "ßInputSubmit";
import $InputText from "ßInputText";
import $SVGIcon from "ßSVGIcon";

// HEAD -> ROOT
const root = await ß.createRoot("AppPopup");


//
//  PRESETS
//

// PRESETS -> WRAPPER
function $Wrapper(
    {children}: {
        children?: ß.ReactNode
    }
): ß.ReactNode {
    return (
        <div id="Window">
            <div id="Header">
                <$SVGIcon
                    path="/public/app/popup/svg/close.svg"
                    id="Close"
                    onClick={() => remove()}
                    data-tooltip="Close window"
                />
            </div>
            {children}
        </div>
    )
}

// PRESETS -> AUTH
function $Auth(
    {initialState}: {
        initialState: boolean
    }
): ß.ReactNode {
    const [mode, setMode] = ß.useState(initialState);
    const [disabled, setDisabled] = ß.useState(false);
    return (
        <div id="Auth">
            <h2 id="Title">{mode ? "Log in" : "Register"}</h2>
            <$Form id="Form" onSubmit={async(event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget as HTMLFormElement);
                setDisabled(true);
                switch (mode) {
                    case true: {
                        $.debug($.SUG.PAT);
                        if (!(
                            $.check(data.get("username") as string, $.SUG.PAT.Uname) &&
                            $.check(data.get("password") as string, $.SUG.PAT.Uhashpass)
                        )) {break}
                        if (await $.curl("user/login", {
                            Uname: data.get("username"),
                            Uhashpass: data.get("password"),
                        })) {
                            window.location.reload();
                        }
                    }
                    case false: {
                        if (!(
                            $.check(data.get("username") as string, $.SUG.PAT.Uname) &&
                            $.check(data.get("email") as string, $.SUG.PAT.Uemail) &&
                            $.check(data.get("password") as string, $.SUG.PAT.Uhashpass)
                        )) {break}
                        if (await $.curl("user/register", {
                            Uname: data.get("username"),
                            Uemail: data.get("email"),
                            Uhashpass: data.get("password"),
                        })) {
                            setMode(!mode);
                        }
                    }
                }
                setDisabled(false);
            }}>
                <$InputText id="Username" name="username" placeholder/>
                {!mode && <$InputEmail id="Email" name="email" placeholder/>}
                <$InputPassword id="Password" name="password" placeholder/>
                <$InputSubmit 
                    id="Submit" 
                    text={mode ? "Log in" : "Register"} 
                    data-tooltip={mode ? "Log in" : "Register"}
                    disabled={disabled}
                />
                {!mode && <p><a id="Agreement" href="https://www.termsfeed.com/live/76431b8a-3dd4-49ce-a030-9ed43aeb7300">By signing up you accept our privacy policy.</a></p>}
            </$Form>
            <$Button
                text={mode ? "Don't have an account?" : "Already have an account?"}
                id="Change"
                onClick={() => setMode(!mode)}
                data-tooltip={mode ? "Register instead" : "Log in instead"}
            />
        </div>
    )
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
    await ß.inject(root, <$Wrapper>{content}</$Wrapper>)
    root.node.style.pointerEvents = "auto";
    root.node.style.opacity = "1";
}

// POPUP -> REMOVE
export async function remove(): Promise<void> {
    root.node.style.opacity = "0";
    root.node.style.pointerEvents = "none";
    await $.delay(0.1);
    await ß.clean(root);
}