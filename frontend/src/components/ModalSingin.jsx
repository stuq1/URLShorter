import { useState } from "react"
import { Alert, Button, FloatingLabel, Form, FormGroup, Modal } from "react-bootstrap"

const ModalSignin = ({ show, onClose, onSubmit, onOpenSignup }) => {
    const [signinUsername, setSigninUsername] = useState("");
    const [signinPassword, setSigninPassword] = useState("");
    const [isShowError, setIsShowError] = useState(false);

    const clearInputs = () => {
        setSigninUsername("");
        setSigninPassword("");
        setIsShowError(false);
    }

    const onModalClose = () => {
        onClose();
        clearInputs();
    }

    const onModalSubmit = async (e) => {
        e.preventDefault();

        const success = await onSubmit(signinUsername, signinPassword);

        if (!success) {
            setIsShowError(true);
        } else {
            clearInputs();
            onModalClose();
        }
    }

    const onModalNavigate = () => {
        onOpenSignup();
        clearInputs();
    }

    return (
        <Modal show={show} onHide={onModalClose}>
            <Form onSubmit={onModalSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Войти в аккаунт</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {isShowError && <Alert variant="danger">Ошибка: неверный логин или пароль!</Alert>}

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
                    <Button variant="secondary" onClick={onModalNavigate}>
                        Регистрация
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default ModalSignin;
