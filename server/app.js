require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { checkHealthServerPost, checkHealthServerGet } = require("./src/routes.js");

const PORT = process.env.PORT || 8080;

/** @type {import('express').Application} */
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        /** @type {{status: number, url: string}[]} */
        let servers = [
            {
                status: await checkHealthServerGet(process.env.CALLSAPI_BASE_URL),
                url: process.env.CALLSAPI_BASE_URL,
            },
            {
                status: await checkHealthServerPost(`${process.env.NEURCRM_BASE_URL}/auth/get_token`, {
                    email: process.env.NEURCRM_EMAIL,
                    password: process.env.NEURCRM_PASSWORD,
                }),
                url: process.env.NEURCRM_BASE_URL,
            },
            {
                status: await checkHealthServerPost(`${process.env.TEST_NEURCRM_BASE_URL}/auth/get_token`, {
                    email: process.env.TEST_NEURCRM_EMAIL,
                    password: process.env.TEST_NEURCRM_PASSWORD,
                }),
                url: process.env.TEST_NEURCRM_BASE_URL,
            },
            {
                status: await checkHealthServerGet(process.env.BLIMTOOLKIT_BASE_URL),
                url: process.env.BLIMTOOLKIT_BASE_URL,
            },
        ];

        res.send({ data: { servers }, status: 200 });
    } catch (error) {
        console.log(error);
        res.send({ data: error, status: 500 });
    }
});

app.listen(PORT, () => console.log("Server started on port ", PORT));
