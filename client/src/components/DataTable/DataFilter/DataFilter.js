import React, {useState} from "react";

import { Form, Button } from "react-bootstrap";

function DataFilter(props) {

    const [formState, setFormState] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });

    const onClick = () => {
        let url = `${props.server_api}/data/search`;
        if (window.location.search.search("large") !== -1) {
            url += "?size=large";
        }else if (window.location.search.search("small") !== -1) {
            url += "?size=small"
        }
        else {
            return;
        }
        for (let key in formState) {
            if (formState[key] !== "") url += `&${key}=${formState[key]}`;
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {props.setState((state) => ({
                ...state,
                elem: data,
            }))
        })
    }

    const handleChange = (e) => {
        setFormState((formState) => ({...formState, [e.target.id]: e.target.value}));
    }

    return (
        <Form inline className="mb-2">
            <Form.Control
                className="mr-2 ml-2"
                id="id"
                placeholder="id"
                value={formState.id}
                onChange={handleChange}
            />
            <Form.Control
                className="ml-2 mr-2"
                id="firstName"
                placeholder="firstName"
                value={formState.firstName}
                onChange={handleChange}
            />
            
            <Form.Control
                className="ml-2 mr-2"
                id="lastName"
                placeholder="lastName"
                value={formState.lastName}
                onChange={handleChange}
            />
            
            <Form.Control
                className="ml-2 mr-2"
                id="email"
                placeholder="email"
                value={formState.email}
                onChange={handleChange}
            />
            
            <Form.Control
                className="ml-2 mr-2"
                id="phone"
                placeholder="phone"
                value={formState.phone}
                onChange={handleChange}
            />
            <Button onClick={onClick} variant="success" className="d-block float-right mt-2 ml-2 mr-2">
                Найти
            </Button>
        </Form>
    )


}

export default DataFilter;