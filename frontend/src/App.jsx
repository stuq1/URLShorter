import { useEffect, useState } from "react";
import { reaction } from "mobx";
import { observer } from "mobx-react-lite";

import { Alert, Button, Form, InputGroup, Table } from "react-bootstrap"

import { userStore } from "./store/UserStore";
import { urlsStore } from "./store/UrlStore";

import "./App.css"

function isValidHttpUrl(url) {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    } catch (e) {
        return false;
    }
}

const App = observer(() => {
    const [url, setUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const userIsAuth = userStore.userIsAuth;
    const urls = urlsStore.urls;

    useEffect(() => {
        const dispose = reaction(
            () => userStore.userIsAuth,
            (isAuth) => {
                setErrorMessage("");
                setSuccessMessage("");
                setUrl("");
                
                if (isAuth) {
                    urlsStore.loadUrls();
                } else {
                    urlsStore.clearUrls();
                }
            }
        );

        return () => dispose();
    }, []);

    const shorterOnCLick = async () => {
        setErrorMessage("");
        setSuccessMessage("");

        if (url === "") {
            return false;
        }

        if (!isValidHttpUrl(url)) {
            setErrorMessage("Ссылка не является http:// или https://");
            return false;
        }

        const result = await urlsStore.addUrl(url);

        if (result.short) {
            setSuccessMessage(`Ссылка добавлена: ${import.meta.env.VITE_HOST}/${result.short}`);
            urlsStore.loadUrls();
        } else if (result.error) {
            setErrorMessage(result.error);
        } else {
            setErrorMessage("Ошибка добавления URL");
        }
    }

    return (
        <>
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
                                Для сокращенных без авторизации ссылок статистика не собирается
                            </Form.Label>
                        }
                        <InputGroup className="mb-1">
                            <InputGroup.Text id="inputGroup-sizing-default">
                                URL:
                            </InputGroup.Text>
                            <Form.Control
                                type="url"
                                placeholder="https://"
                                required
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                            <Button
                                variant="primary"
                                onClick={shorterOnCLick}
                            >
                                Сократить
                            </Button>
                        </InputGroup>
                        {errorMessage &&
                            <Alert variant="danger" dismissible>{errorMessage}</Alert>
                        }
                        {successMessage &&
                            <Alert variant="success">{successMessage}</Alert>
                        }
                        <Form.Label>
                            <br />Поддерживаются только "http://" и "https://" ссылки
                        </Form.Label>
                    </div>
                </div>

                {userIsAuth &&
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
                                    {
                                        urls.map(function (item, i) {
                                            return (
                                                <tr key={i}>
                                                    <td>{item.urlFull}</td>
                                                    <td>{new Date(item.creationDate).toLocaleString()}</td>
                                                    <td><a href={`${import.meta.env.VITE_HOST}/${item.urlShort}`} target="_blank">{import.meta.env.VITE_HOST}/{item.urlShort}</a></td>
                                                    <td>{item.clicksCount}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                }
            </main >
        </>
    );
})

export default App
