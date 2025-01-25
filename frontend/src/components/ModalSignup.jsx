import { useState } from "react"
import { Alert, Button, FloatingLabel, Form, FormGroup, Modal } from "react-bootstrap"

const ModalSignup = ({ show, onClose, onSubmit, onOpenSignin }) => {
    const [signupUsername, setSignupUsername] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupPasswordRepeat, setSignupPasswordRepeat] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const clearInputs = () => {
        setSignupUsername("");
        setSignupPassword("");
        setSignupPasswordRepeat("");
        setErrorMessage("");
    }

    const onModalClose = () => {
        onClose();
        clearInputs();
    }

    const onModalSubmit = async (e) => {
        e.preventDefault();
        
        if (signupPassword !== signupPasswordRepeat) {
            setErrorMessage("Ошибка: пароли не совпадают!");
            return;
        }

        const success = await onSubmit(signupUsername, signupPassword);

        if (!success) {
            setErrorMessage("Ошибка: этот пользователь уже зарегистрирован!");
        } else {
            clearInputs();
            onModalClose();
        }
    }

    const onModalNavigate = () => {
        onOpenSignin();
        clearInputs();
    }

    return (
        <Modal show={show} onHide={onModalClose}>
            <Form onSubmit={onModalSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Зарегистрировать аккаунт</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                    <FloatingLabel controlId="SigninLoginInput" label="Логин" className="mb-3" >
                        <Form.Control
                            type="text"
                            placeholder="Логин"
                            required
                            value={signupUsername}
                            onChange={(e) => setSignupUsername(e.target.value)}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="SigninPasswordInput" label="Пароль" className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Пароль"
                            required
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="SigninPasswordRepeatInput" label="Повторите пароль">
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
                    <Button variant="secondary" onClick={onModalNavigate}>
                        Войти
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default ModalSignup;
