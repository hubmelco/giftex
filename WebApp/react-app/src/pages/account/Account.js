import React from "react";
import "./AccountPage.css"
import "../../App.css";
import AccountComp from "./components/AccountComp";
import {withRouter} from "react-router";

/**
 * This is the container page that returns the account profile component
 * @returns {JSX.Element}
 */
function Account() {

    //TODO: move accountcomp to account
    return (<AccountComp/>)
}

export default withRouter(Account);
