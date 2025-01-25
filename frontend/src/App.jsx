import { Button, Form, InputGroup, Table } from "react-bootstrap"
import { observer } from "mobx-react-lite";

import { userStore } from "./store/UserStore";

import "./App.css"

const App = observer(() => {
    let userIsAuth = userStore.userIsAuth;

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
                            </tbody>
                        </Table>
                    </div>
                </div>
            </main >
        </>
    );
})

export default App
