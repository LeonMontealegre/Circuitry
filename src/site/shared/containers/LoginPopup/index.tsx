import {Fragment, useRef} from "react";
import {connect} from "react-redux";
import {NoAuthState} from "shared/api/auth/NoAuthState";
import {Popup} from "shared/components/Popup";
import {SharedAppState} from "shared/state";
import {CloseHeaderPopups} from "shared/state/Header/actions";
import {HeaderPopups} from "shared/state/Header/state";
import {Login} from "shared/state/UserInfo/actions";

import "./index.scss";


type OwnProps = {}
type StateProps = {
    curPopup: HeaderPopups;
}
type DispatchProps = {
    Login: typeof Login;
    CloseHeaderPopups: typeof CloseHeaderPopups;
}

type Props = StateProps & DispatchProps & OwnProps;
const _LoginPopup = ({curPopup, Login, CloseHeaderPopups}: Props) => {
    const input = useRef<HTMLInputElement>();

    return (
        <Popup title="Login"
               className="login__popup"
               isOpen={(curPopup === "login")}
               close={CloseHeaderPopups}>
            {(process.env.REACT_APP_AUTH_TYPES ?? "").split(" ").map((s, i) => (
                <Fragment key={`login-popup-auth-${s}`}>
                    {s !== "no_auth" ? (<div></div>) :
                    <div>
                        <div className="login__popup__label">NoAuth Login</div>
                        <div><input ref={input} type="text" placeholder="username" /></div>
                        <button onClick={() => {
                            const val = input.current.value.trim();
                            if (val === "") {
                                alert("User name must not be blank!")
                                return;
                            }
                            Login(new NoAuthState(val));
                            CloseHeaderPopups();
                        }}>
                            Submit
                        </button>
                    </div>}
                    <hr />
                </Fragment>
            ))}
        </Popup>
    );
}

export const LoginPopup = connect<StateProps, DispatchProps, OwnProps, SharedAppState>(
    (state) => ({ curPopup: state.header.curPopup }),
    { Login, CloseHeaderPopups } as any
)(_LoginPopup);