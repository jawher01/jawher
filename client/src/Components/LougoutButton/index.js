import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../js/actions/user";
import { useHistory } from "react-router-dom";

export default () => {
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <button
            style={{ marginRight: 32, background: "#ffcdd2" }}
            onClick={() => {
                dispatch(logout());
                history.push("/");
            }}
        >
            Logout
        </button>);
}