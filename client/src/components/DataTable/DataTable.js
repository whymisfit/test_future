import React, { useState, useEffect } from "react";
import DataFilter from "./DataFilter/DataFilter";
import NewItemButton from "./NewItemButton/NewItemButton";
import Pagination from "./Pagination/Pagination";

import { useHistory } from "react-router-dom";
import { Table, Container, Button, Modal, Spinner } from "react-bootstrap";

const server_api = "http://127.0.0.1:2010";

function DataTable(props) {

    const [state, setState] = useState({
        data: [{}],
        elem: [{}],
    });

    const [modal, setModal] = useState({
        show: false,
        person: {},
    })

    let history = useHistory();

    let refId = React.createRef();
    let refFirstName = React.createRef();
    let refLastName = React.createRef();
    let refEmail = React.createRef();
    let refPhone = React.createRef();

    useEffect(() => {
        let url = `${server_api}${window.location.pathname}${window.location.search}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setState((state) => ({
                    ...state,
                    data: data,
                    elem: data.elem,
                }))
            });


    }, [])

    useEffect(() => {
        let url = `${server_api}${window.location.pathname}${window.location.search}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setState((state) => ({
                    ...state,
                    data: data,
                    elem: data.elem,
                }))
            });
        window.scrollTo(0, 0);
    }, [props.url])

    const sortRow = (col_name, ref) => {
        let _data = state.elem;
        _data.sort((a, b) => {
            if (a[col_name] > b[col_name]) {
                return 1;
            }
            if (a[col_name] < b[col_name]) {
                return -1;
            }
            // a == b
            return 0;
        });
        setState((state) => ({
            ...state,
            elem: _data,
        }))
    }

    function additionalInfo(person) {
        setModal((modal) => ({
            ...modal,
            show: true,
            person: person,
        }))
    }

    function closeModal() {
        setModal((modal) => ({
            ...modal,
            show: false,
        }))
    }

    return (

        <Container>

            <Button
                className="mt-5 mb-5"
                variant="outline-secondary"
                onClick={() => {
                    history.push("/");
                }}>
                К выбору данных
            </Button>

            <DataFilter state={state} setState={setState} server_api={server_api} />

            <Table bordered hover>
                <thead>
                    <tr>
                        <th role="button" onClick={() => sortRow("id")}>id ▼</th>
                        <th role="button" onClick={() => sortRow("firstName")}>First Name ▼</th>
                        <th role="button" onClick={() => sortRow("lastName")}>Last Name ▼</th>
                        <th role="button" onClick={() => sortRow("email")}>Email ▼</th>
                        <th role="button" onClick={() => sortRow("phone")}>Phone ▼</th>
                    </tr>
                </thead>
                <tbody>
                    {state.elem.length !== 0 ?
                        <TableRowItem elem={state.elem} onClick={additionalInfo} />
                        :
                        <tr key={1}>
                            <td className="text-info" colSpan="5">
                                <div className="d-flex align-items-center">
                                    Данные загружаются или не найдены
                                        <Spinner className="ml-2" animation="border" variant="info" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>
                                </div>
                            </td>
                        </tr>
                    }
                </tbody>
                {modal.show &&
                    <Modal
                        show={modal.show}
                        onHide={closeModal}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Дополнительная информация</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p><span className="font-weight-bold">id: </span>{modal.person.id}</p>
                            <p><span className="font-weight-bold">firstName: </span>{modal.person.firstName}</p>
                            <p><span className="font-weight-bold">lastName: </span>{modal.person.lastName}</p>
                            <p><span className="font-weight-bold">email: </span>{modal.person.email}</p>
                            <p><span className="font-weight-bold">phone: </span>{modal.person.phone}</p>
                            <p><span className="font-weight-bold">address: </span>{modal.person.address.streetAddress}</p>
                            <p><span className="font-weight-bold">city: </span>{modal.person.address.city}</p>
                            <p><span className="font-weight-bold">state: </span>{modal.person.address.state}</p>
                            <p><span className="font-weight-bold">zip: </span>{modal.person.address.zip}</p>
                            <p><span className="font-weight-bold">description: </span>{modal.person.description}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={closeModal}>
                                Ок
                        </Button>
                        </Modal.Footer>
                    </Modal>
                }
            </Table>

            <NewItemButton server_api={server_api} setState={setState} state={state}/>

            {(state.data.next_page !== undefined | state.data.prev_page !== undefined) && <Pagination state={state} setUrl={props.setUrl} url={props.url} server_api={server_api} />}
        </Container>
    )
}

const TableRowItem = (props) => {
    return (
        <>
            {props.elem.map((person, i) => {
                return (
                    <tr role="button" key={i} id={person.id} onClick={() => props.onClick(person)}>
                        <td>{person.id}</td>
                        <td>{person.firstName}</td>
                        <td>{person.lastName}</td>
                        <td>{person.email}</td>
                        <td>{person.phone}</td>
                    </tr>
                )
            })}
        </>
    )
}

export default DataTable;