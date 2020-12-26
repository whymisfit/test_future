import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function ChoiceData (props) {
    let history = useHistory();

    function loadSmallData() {
        let url = "/data?size=small";
        history.push(url);
    }

    function loadLargeData() {
        let url = "/data?size=large&page=1";
        history.push(url);
    }

    return (
        <div className="row align-items-center m-0" style={{ height: "100vh" }}>
            <div className="col">
                <h1 className="text-center">Выберите один из наборов тестовых данных</h1>
                <div className="d-flex justify-content-center mt-5">
                    <div className="mr-5 d-flex justify-content-center flex-column">
                        <p >Маленький набор:</p>
                        <Button variant="primary" onClick={loadSmallData}>Загрузить</Button>
                    </div>
                    <div className="ml-5 d-flex justify-content-center flex-column">
                        <p>Большой набор:</p>
                        <Button variant="primary" onClick={loadLargeData}>Загрузить</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChoiceData;