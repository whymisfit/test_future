const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const { json } = require("body-parser");

const app = express();
const PORT = 2010;
const DATA_DIR = path.join(__dirname, "/backend/data/");

const searchPerson = (json_data, query) => {
    let data = [];

    json_data.forEach( person => {
        let person_str = "";
        let person_search = "";
        for (let key in query) {
            if (key !== "size") {
                person_str += `${person[key]}`.toUpperCase();
                person_search += `${query[key]}`.toUpperCase();
            }
        }
        if (person_str === person_search) data.push(person);
    });

    return data;
}

app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/data", (req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
})

app.get("/data", (req, res) => {

    const MAX_ROW_ON_PAGE = 50;
    let data = {
        pages: "",
        current_page: "",
        first_page: "",
        last_page: "",
        next_page: "",
        prev_page: "",
        elem: [],
    };

    if (req.query.size === "small") {
        fs.readFile(path.join(DATA_DIR, "small.json"), "utf8", (err, json_data)=>{
            json_data = JSON.parse(json_data);

            let data = {
                elem: json_data,
            }

            res.json(data);
        })
    } else if (req.query.size === "large") {
        fs.readFile(path.join(DATA_DIR, "large.json"), "utf8", (err, json_data) => {

            json_data = JSON.parse(json_data);
            let pages = Math.ceil(json_data.length / MAX_ROW_ON_PAGE);
            let last_page = pages;
            let first_page = 1;

            let current_page = req.query.page !== undefined ? parseInt(req.query.page) : first_page;

            let next_page = ((current_page + 1) < 50) ? current_page + 1 : last_page;
            let prev_page = ((current_page - 1) != 0) ? current_page - 1 : first_page;

            let elem = [];
            // for example: page 7 => 7 * 50 = 350, 350 - last elem, 350 - 50 = 300 - start_elem
            let start_elem = (current_page * MAX_ROW_ON_PAGE) - MAX_ROW_ON_PAGE;
            let end_elem = current_page * MAX_ROW_ON_PAGE;

            for (let i = start_elem; i < end_elem; i++) {
                if (json_data[i] !== undefined) {
                    elem.push(json_data[i]);
                } else {
                    continue
                };
            }
            data = {
                pages,
                current_page,
                first_page,
                last_page,
                next_page,
                prev_page,
                elem,
            }
            res.json(data);
        })
    } else {
        let errors = {
            error: "Неправильный запрос"
        }
        return res.status(400).json(errors);
    }
});

app.get("/data/search", (req, res)=> {
    
    if (req.query.size === "large") {
        fs.readFile(path.join(DATA_DIR, "large.json"), "utf8", (err, json_data) => {
            json_data = JSON.parse(json_data);

            let data = searchPerson(json_data, req.query, );
            
            res.json(data);
        })
    }else if (req.query.size === "small") {
        fs.readFile(path.join(DATA_DIR, "small.json"), "utf8", (err, json_data) => {
            json_data = JSON.parse(json_data);

            let data = searchPerson(json_data, req.query );

            res.json(data);
        })
    }
});

app.post("/data/new", (req, res) => {
    
    let file = DATA_DIR;

    if (req.query.size === "large") {
        file = path.join(file, "large.json");
    }else if (req.query.size === "small") {
        file = path.join(file, "small.json");
    }else {
        res.sendStatus(400).end();
    }

    let new_person = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        address: {
            streetAddress: req.body.streetAddress,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
        },
        description: req.body.description,
    }

    let data = [];
    fs.readFile(file, "utf8", (err, json_data) => {
        data = JSON.parse(json_data);
        data.push(new_person);
        data = JSON.stringify(data, null, '\t');

        fs.writeFile(file, data, (err)=>{
            if (err) throw err;
            console.log("Данные сохранены.");
            res.json(new_person);
        })
    });    
});

app.listen(PORT, () => {
    console.log(`Dev server starting on 127.0.0.1:${PORT}`);
})