import { useState } from "react"
import "./App.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { Button, FloatingLabel, Form, InputGroup, Modal, Table } from "react-bootstrap"

function App() {
    let onClick_user = function () {
        document.getElementById("dialog").showModal();
    }

    let onClick_modalClose = function () {
        document.getElementById("dialog").close();
    }

    const [show, setShow] = useState(false);
    const [isUser, setIsUser] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                        {!isUser ?

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
                                onClick={() => setIsUser(false)}
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
                        </Form.Label>
                        <InputGroup controlId="URLInput">
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
            </main>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Войти в аккаунт</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <FloatingLabel controlId="EmailInput" label="Почта" className="mb-3">
                        <Form.Control type="email" placeholder="name@example.com" />
                    </FloatingLabel>

                    <FloatingLabel controlId="PasswordInput" label="Пароль">
                        <Form.Control type="password" placeholder="Пароль" />
                    </FloatingLabel>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-between">
                    <Button variant="primary" onClick={() => { setShow(false); setIsUser(true); }} >
                        Войти
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Регистрация
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default App
