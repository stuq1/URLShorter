import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightToBracket, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { Button } from "react-bootstrap"
import { observer } from "mobx-react-lite";

import { userStore } from "./../store/UserStore";
import ModalSignin from "./../components/ModalSingin"
import ModalSignup from "./../components/ModalSignup"

const AppHeader = observer(() => {
    let onClick_user = function () {
        document.getElementById("dialog").showModal();
    }

    const [signinIsShow, setSigninIsShow] = useState(false);

    const signinOnClose = () => {
        setSigninIsShow(false);
    }
    const handleShow = () => setSigninIsShow(true);

    const [signupIsShow, setSignupIsShow] = useState(false);

    const signupOnClose = () => {
        setSignupIsShow(false);
    }
    const handleSignupShow = () => setSignupIsShow(true);

    let userIsAuth = userStore.userIsAuth;
    let username = userStore.username;

    let signin = async (username, password) => await userStore.signin(username, password);
    let signup = async (username, password) => await userStore.signup(username, password);
    let logout = () => userStore.logout();

    const signinOnSubmit = async (username, password) => {
        const success = await signin(username, password);

        if (success) {
            signinOnClose();
            return true;
        } else {
            //
            return false;
        }
    }

    const signupOnSubmit = async (username, password) => {
        const success = await signup(username, password);

        if (success) {
            signupOnClose();
            return true;
        } else {
            //
            return false;
        }
    }

    const onOpenSignin = () => {
        signupOnClose();
        handleShow();
    };

    const onOpenSignup = () => {
        signinOnClose();
        handleSignupShow();
    };

    return (
        <header>
            <div className="wrapper d-flex justify-content-between">
                <div className="header-left d-flex">
                    <div className="header-logo">
                        <img src="./logo.svg" alt="URL Shorter" />
                    </div>
                    <div className="header-title ibm-plex-mono-regular">
                        shorter
                    </div>
                </div>
                <div className="header-right d-flex">
                    {!userIsAuth ?

                        <Button
                            variant="outline-light"
                            className="rounded-circle header-button"
                            onClick={handleShow}
                        >
                            <FontAwesomeIcon className="header-button-icon" icon={faArrowRightToBracket} size="2x" />
                        </Button>

                        :
                        <>
                            <div className="header-title ibm-plex-mono-regular" style={{ marginRight: 8 }}>
                                Привет, {username}!
                            </div>
                            <Button
                                variant="outline-light"
                                className="rounded-circle header-button"
                                onClick={logout}
                            >
                                <FontAwesomeIcon className="header-button-icon" icon={faArrowRightFromBracket} size="2x" />
                            </Button>
                        </>
                    }

                    <div id="user"
                        onClick={onClick_user}>
                    </div>
                </div>
            </div>

            <ModalSignin
                show={signinIsShow}
                onClose={() => setSigninIsShow(false)}
                onSubmit={signinOnSubmit}
                onOpenSignup={onOpenSignup}
            />

            <ModalSignup
                show={signupIsShow}
                onClose={() => setSignupIsShow(false)}
                onSubmit={signupOnSubmit}
                onOpenSignin={onOpenSignin}
            />
        </header>
    );
})

export default AppHeader;
