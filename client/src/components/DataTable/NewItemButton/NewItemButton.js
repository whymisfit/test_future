import React, {useState} from "react";
import {Form, Modal, Button} from "react-bootstrap";

const NewItemButton = (props) => {

    const style = {
        position: "fixed",
        display: "flex",
        bottom: "2%",
        right: "2%",
    }

    const [modal, setModal] = useState({
        show: false,
    })

    const [state, setState] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        streetAddress: "",
        city: "",
        state: "",
        zip: "",
        description: "",
    });

    const [validated, setValidate] = useState(false);

    function showModal(){
        setModal({show: true});
    }

    function hideModal(){
        setModal({show: false});
    }

    function handleChange(e) {
        setState((state) => ({
            ...state,
            [e.target.id]: e.target.value,
        }));
    }

    function handleSubmit(e) {
        const form = e.currentTarget;
        e.preventDefault();

        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            addNewItem();
        }

        setValidate(true);
    }

    async function addNewItem(){
        let url = `${props.server_api}/data/new`;
        if (window.location.search.search("size=large") !== -1) {
            url += "?size=large";
        }else if (window.location.search.search("size=small") !== -1) {
            url += "?size=small";
        }

        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(state),
        })

        let data = await response.json();
        
        props.setState((state) => ({
            ...state,
            elem: data,
        }))
    }

    return (
        <>
            <Button className="rounded-circle" variant="primary" style={style} onClick={showModal}>
                +
            </Button>
            {modal.show &&
                <Modal
                    show={modal.show}
                    onHide={hideModal}
                    backdrop="static"
                    >
                    <Modal.Header closeButton>
                        <Modal.Title>Дополнительная информация</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit} method="post">
                        <Form.Group>
                            <Form.Label className="font-weight-bold">id</Form.Label>
                            <Form.Control id="id" type="text" placeholder="" onChange={handleChange} value={state.id} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="font-weight-bold">First Name</Form.Label>
                            <Form.Control id="firstName" type="text" placeholder="" onChange={handleChange} value={state.firstName} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="font-weight-bold">Last Name</Form.Label>
                            <Form.Control id="lastName" type="text" placeholder="" onChange={handleChange}  value={state.lastName} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="font-weight-bold">Email</Form.Label>
                            <Form.Control id="email" type="text" placeholder="" onChange={handleChange} value={state.email} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="font-weight-bold">Phone</Form.Label>
                            <Form.Control id="phone" type="text" placeholder="" onChange={handleChange} value={state.phone} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="font-weight-bold">streetAddress</Form.Label>
                            <Form.Control id="streetAddress" type="text" placeholder="" onChange={handleChange} value={state.streetAddress} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="font-weight-bold">city</Form.Label>
                            <Form.Control id="city" type="text" placeholder="" onChange={handleChange} value={state.city} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="font-weight-bold">state</Form.Label>
                            <Form.Control id="state" type="text" placeholder="" onChange={handleChange}  value={state.state} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="font-weight-bold">zip</Form.Label>
                            <Form.Control id="zip" type="text" placeholder="" onChange={handleChange} value={state.zip} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="font-weight-bold">description</Form.Label>
                            <Form.Control id="description" type="text" placeholder="" onChange={handleChange} value={state.description} required/>
                        </Form.Group>
                        <Button type="submit" variant="success">
                        Добавить
                        </Button>
                        <Button variant="outline-primary" onClick={hideModal}>
                            Отмена
                        </Button>
                    </Form>
                    </Modal.Body>
                </Modal>
            }
        </>

    )
}

export default NewItemButton;