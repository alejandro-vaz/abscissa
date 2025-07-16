//
//  HEAD
//

// HEAD -> MODULES
// @ts-nocheck
import * as General from "../../../content/general.js";
import React from "react";

// HEAD -> CONNECTIONS
const popup = General.connect("app-popup");


//
//  PRESETS
//

// PRESETS -> AUTH
class $Auth extends React.Component<{initialState: boolean}, {mode: boolean}> {
    state = {mode: this.props.initialState}
    render() {
        return (
            <>
                <h2>{this.state.mode ? "Log in" : "Register"}</h2>
                <input 
                    type="button" 
                    value={this.state.mode ? "Don't have an account?" : "Already have an account?"} 
                    onClick={() => this.setState({mode: !this.state.mode})}
                />
                <form noValidate onSubmit={async (event: React.FormEvent) => {
                    event.preventDefault();
                    const data = new FormData(event.currentTarget as HTMLFormElement);
                    if (this.state.mode) {
                        if (await General.curl("user/login", {
                            Uname: data.get("username"),
                            Uhashpass: data.get("password"),
                        })) {
                            await General.redirect("/dashboard");
                            remove();
                        }
                    } else {
                        if (await General.curl("user/register", {
                            Uname: data.get("username"),
                            Uemail: data.get("email"),
                            Uhashpass: data.get("password"),
                        })) {
                            this.setState({mode: !this.state.mode});
                        }
                    }
                  }}>
                  <input type="text" name="username" placeholder="username..." autoComplete="off"/>
                  {!this.state.mode && (<input type="email" name="email" placeholder="email..." autoComplete="off"/>)}
                  <input type="password" name="password" placeholder="password..." autoComplete="off"/>
                  <input type="submit" value={this.state.mode ? "Log in" : "Register"}/>
                </form>
            </>
        );
    }
}


//
//  POPUP
//

// POPUP -> CREATE
export async function create(preset: string, ...presetArguments: any[]): Promise<void> {
    let content;
    switch (preset) {
        case "auth": content = <$Auth initialState={presetArguments[0]}/>;
    }
    await General.inject(popup,
        <>
            <div id="app-popup-window">
                <img 
                    src="/public/modules/app/popup/svg/close.svg" 
                    id="app-popup-close"
                    onClick={() => remove()}
                />
                <div id="app-popup-content">{content}</div>
            </div>
        </>
    )
    popup.style.pointerEvents = "auto";
    popup.style.opacity = "1";
}

// POPUP -> REMOVE
export async function remove(): Promise<void> {
    popup.style.opacity = "0";
    popup.style.pointerEvents = "none";
    await General.delay(0.1);
    await General.inject(popup, <></>);
}