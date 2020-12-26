import React from "react";
import { Pagination as Pg } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function Pagination(props) {

    const history = useHistory();

    // const next = () => {

    // }

    // const prev = () => {

    // }

    const last = () => {
        let query = `${window.location.search.replace(/page=\d*/, `page=${props.state.data.last_page}`)}`;
        let url = `${props.server_api}${window.location.pathname}${query}`;
        props.setUrl(url);
        history.push(window.location.pathname + query);
    }

    const first = () => {
        let query = `${window.location.search.replace(/page=\d*/, `page=${props.state.data.first_page}`)}`;
        let url = `${props.server_api}${window.location.pathname}${query}`;
        props.setUrl(url);
        history.push(window.location.pathname + query);
    }

    const goPage = (page) => {
        let query = `${window.location.search.replace(/page=\d*/, `page=${page}`)}`;
        let url = `${props.server_api}${window.location.pathname}${query}`;
        props.setUrl(url);
        history.push(window.location.pathname + query); 
    }

    return (
        <Pg className="float-right">
            <Pg.First onClick={first} />

            <PgItems state={props.state} goPage={goPage}/>

            <Pg.Last onClick={last} />
        </Pg>
    )
}

function PgItems(props) {

    if (props.state.data.current_page === 1) {
        return (
            <>
                <Pg.Item onClick={()=> props.goPage(1)} active>{1}</Pg.Item>
                <Pg.Item onClick={()=> props.goPage(2)}>{2}</Pg.Item>
                <Pg.Item onClick={()=> props.goPage(3)}>{3}</Pg.Item>
            </>
        )
    }else if (props.state.data.current_page === props.state.data.last_page) {
        let last_page = props.state.data.last_page;
        return (
            <>
                <Pg.Item onClick={()=> props.goPage(last_page - 2)}>{ last_page - 2 }</Pg.Item>
                <Pg.Item onClick={()=> props.goPage(last_page - 1)}>{last_page - 1 }</Pg.Item>
                <Pg.Item onClick={()=> props.goPage(last_page)} active>{ last_page }</Pg.Item>
            </>
        )
    }else {
        let current_page = props.state.data.current_page;
        let prev_page = current_page - 1;
        let next_page = current_page + 1;
        return (
            <>
                <Pg.Ellipsis />
                <Pg.Item onClick={()=> props.goPage(prev_page)}>{prev_page}</Pg.Item>
                <Pg.Item onClick={()=> props.goPage(current_page)} active>{current_page}</Pg.Item>
                <Pg.Item onClick={()=> props.goPage(next_page)}>{next_page}</Pg.Item>
                <Pg.Ellipsis />
            </>
        )
    }
}

export default Pagination;