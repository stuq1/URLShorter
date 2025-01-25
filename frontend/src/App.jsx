import { useState } from "react"
import "./App.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { Button, FloatingLabel, Form, FormGroup, InputGroup, Modal, Table } from "react-bootstrap"
import { observer } from "mobx-react-lite";
import { userStore } from "./store/UserStore";

const App = observer(() => {
    let onClick_user = function () {
        document.getElementById("dialog").showModal();
    }

    const [signinIsShow, setSigninIsShow] = useState(false);
    const [signinUsername, setSigninUsername] = useState("");
    const [signinPassword, setSigninPassword] = useState("");

    const signinOnClose = () => {
        setSigninUsername("");
        setSigninPassword("");
        setSigninIsShow(false);
    }
    const handleShow = () => setSigninIsShow(true);

    const [signupIsShow, setSignupIsShow] = useState(false);
    const [signupUsername, setSignupUsername] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupPasswordRepeat, setSignupPasswordRepeat] = useState("");

    const signupOnClose = () => {
        setSignupUsername("");
        setSignupPassword("");
        setSignupPasswordRepeat("");
        setSignupIsShow(false);
    }
    const handleRegistrationShow = () => setSignupIsShow(true);

    let userIsAuth = userStore.userIsAuth;
    let signin = async (username, password) => await userStore.signin(username, password);
    let signup = async (username, password) => await userStore.signup(username, password);
    let logout = () => userStore.logout();

    const signinOnSubmit = async (e) => {
        e.preventDefault();

        const success = await signin(signinUsername, signinPassword);

        if (success) {
            signinOnClose();
        } else {
            //
        }
    }

    const signupOnSubmit = async (e) => {
        e.preventDefault();

        const success = await signup(signupUsername, signupPassword);

        if (success) {
            signupOnClose();
        } else {
            //
        }
    }

    const loginModalOpen = () => {
        signupOnClose();
        handleShow();
    };

    const registrationModalOpen = () => {
        signinOnClose();
        handleRegistrationShow();
    };

    return (
        <>
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

                            <Button
                                variant="outline-light"
                                className="rounded-circle header-button"
                                onClick={logout}
                            >
                                <FontAwesomeIcon className="header-button-icon" icon={faUser} size="2x" />
                            </Button>

                        }

                        <div id="user"
                            onClick={onClick_user}>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                <div className="main-url">
                    <div className="wrapper" style={{
                        padding: 8
                    }}>
                        <Form.Label>
                            Введите URL для сокращения:
                        </Form.Label><br />
                        {!userIsAuth &&
                            <Form.Label style={{ color: "red" }}>
                                Без авторизации статистика собираться не будет
                            </Form.Label>
                        }
                        <InputGroup>
                            <InputGroup.Text id="inputGroup-sizing-default">
                                URL:
                            </InputGroup.Text>
                            <Form.Control type="url" placeholder="https://" required />
                            <Button variant="primary" id="button-addon2">
                                Сократить
                            </Button>
                        </InputGroup>
                        <Form.Label>
                            <br />Поддерживаются только "http://" и "https://" ссылки. При отсутствии
                        </Form.Label>
                    </div>
                </div>
                <div className="main-table" style={{
                    padding: 8
                }}>
                    <div className="wrapper">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Полная ссылка</th>
                                    <th>Дата создания</th>
                                    <th>Сокращенная ссылка</th>
                                    <th>Количество переходов</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>https://</td>
                                    <td>Вчера</td>
                                    <td>https://</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>https://</td>
                                    <td>Вчера</td>
                                    <td>https://</td>
                                    <td>2</td>
                                </tr>
                                <tr>
                                    <td>https://</td>
                                    <td>Вчера</td>
                                    <td>https://</td>
                                    <td>2</td>
                                </tr>
                                <tr>
                                    <td>https://</td>
                                    <td>Вчера</td>
                                    <td>https://</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>https://</td>
                                    <td>Вчера</td>
                                    <td>https://</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>https://</td>
                                    <td>Вчера</td>
                                    <td>https://</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>https://</td>
                                    <td>Вчера</td>
                                    <td>https://</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>https://</td>
                                    <td>Вчера</td>
                                    <td>https://</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>https://</td>
                                    <td>Вчера</td>
                                    <td>https://</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>https://</td>
                                    <td>Вчера</td>
                                    <td>https://</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>https://</td>
                                    <td>Вчера</td>
                                    <td>https://</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>https://</td>
                                    <td>Вчера</td>
                                    <td>https://</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>https://</td>
                                    <td>Вчера</td>
                                    <td>https://</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>https://</td>
                                    <td>Вчера</td>
                                    <td>https://</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>https://</td>
                                    <td>Вчера</td>
                                    <td>https://</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>https://</td>
                                    <td>Вчера</td>
                                    <td>https://</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>https://</td>
                                    <td>Вчера</td>
                                    <td>https://</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>https://</td>
                                    <td>Вчера</td>
                                    <td>https://</td>
                                    <td>3</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </main >

            <Modal show={signinIsShow} onHide={signinOnClose}>
                <FormGroup role="form">
                    <form onSubmit={signinOnSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Войти в аккаунт</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <FloatingLabel controlId="LoginInput" label="Логин" className="mb-3" >
                                <Form.Control
                                    type="text"
                                    placeholder="Логин"
                                    required
                                    value={signinUsername}
                                    onChange={(e) => setSigninUsername(e.target.value)}
                                />
                            </FloatingLabel>

                            <FloatingLabel controlId="PasswordInput" label="Пароль">
                                <Form.Control
                                    type="password"
                                    placeholder="Пароль"
                                    required
                                    value={signinPassword}
                                    onChange={(e) => setSigninPassword(e.target.value)}
                                />
                            </FloatingLabel>
                        </Modal.Body>

                        <Modal.Footer className="d-flex justify-content-between">
                            <Button type="submit" variant="primary">
                                Войти
                            </Button>
                            <Button variant="secondary" onClick={registrationModalOpen}>
                                Регистрация
                            </Button>
                        </Modal.Footer>
                    </form>
                </FormGroup>
            </Modal>

            <Modal show={signupIsShow} onHide={signupOnClose}>
                <FormGroup role="form">
                    <form onSubmit={signupOnSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Зарегистрировать аккаунт</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <FloatingLabel controlId="RegistrationLoginInput" label="Логин" className="mb-3" >
                                <Form.Control
                                    type="text"
                                    placeholder="Логин"
                                    required
                                    value={signupUsername}
                                    onChange={(e) => setSignupUsername(e.target.value)}
                                />
                            </FloatingLabel>

                            <FloatingLabel controlId="RegistrationPasswordInput" label="Пароль" className="mb-3">
                                <Form.Control
                                    type="password"
                                    placeholder="Пароль"
                                    required
                                    value={signupPassword}
                                    onChange={(e) => setSignupPassword(e.target.value)}
                                />
                            </FloatingLabel>

                            <FloatingLabel controlId="RegistrationPasswordRepeatInput" label="Повторите пароль">
                                <Form.Control
                                    type="password"
                                    placeholder="Пароль"
                                    required
                                    value={signupPasswordRepeat}
                                    onChange={(e) => setSignupPasswordRepeat(e.target.value)}
                                />
                            </FloatingLabel>
                        </Modal.Body>

                        <Modal.Footer className="d-flex justify-content-between">
                            <Button type="submit" variant="primary">
                                Регистрация
                            </Button>
                            <Button variant="secondary" onClick={loginModalOpen}>
                                Войти
                            </Button>
                        </Modal.Footer>
                    </form>
                </FormGroup>
            </Modal>
        </>
    );
})

export default App
