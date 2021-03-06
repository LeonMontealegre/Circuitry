import {ThunkAction} from "redux-thunk";

import {LOAD_CIRCUITS_FINISH_ID, LOAD_CIRCUITS_START_ID,
        LOGIN_ACTION_ID, LOGOUT_ACTION_ID, SET_AUTOSAVE_ACTION_ID} from "./actionTypes";

import {CircuitMetadata} from "core/models/CircuitMetadata";

import {AuthState} from "shared/api/auth/AuthState";
import {QueryUserCircuits} from "shared/api/Circuits";

import {SharedAppState} from "..";


type ThunkResult<R> = ThunkAction<R, SharedAppState, undefined, any>;


export type LoginAction = {
    type: typeof LOGIN_ACTION_ID;
    auth: AuthState;
}
export type LogoutAction = {
    type: typeof LOGOUT_ACTION_ID;
}
export type LoadCircuitsStartAction = {
    type: typeof LOAD_CIRCUITS_START_ID;
}
export type LoadCircuitsFinishAction = {
    type: typeof LOAD_CIRCUITS_FINISH_ID;
    err?: string;
    circuits: CircuitMetadata[];
}
export type SetAutoSaveAction = {
    type: typeof SET_AUTOSAVE_ACTION_ID;
}

export const SetAutoSave = () => ({
    type: SET_AUTOSAVE_ACTION_ID
})

export function Login(auth: AuthState): ThunkResult<Promise<void>> {
    return async (dispatch) => {
        dispatch({ type: LOGIN_ACTION_ID, auth });
        await dispatch(LoadUserCircuits());
    }
}

export const Logout = () => ({ type: LOGOUT_ACTION_ID });

export function LoadUserCircuits(): ThunkResult<Promise<boolean>> {
    return async (dispatch, getState) => {
        const auth = getState().user.auth;
        if (!auth)
            dispatch({ type: LOAD_CIRCUITS_FINISH_ID, err: "Not logged in!", circuits: [] });

        dispatch({ type: LOAD_CIRCUITS_START_ID });
        try {
            const circuits = await QueryUserCircuits(auth);
            dispatch({ type: LOAD_CIRCUITS_FINISH_ID, circuits });

            return true; // Success
        } catch (e) {
            dispatch({ type: LOAD_CIRCUITS_FINISH_ID, err: e, circuits: [] });

            return false; // Failure
        }
    }
}


export type UserInfoActions =
    LoginAction              |
    LogoutAction             |
    LoadCircuitsStartAction  |
    LoadCircuitsFinishAction |
    SetAutoSaveAction;
