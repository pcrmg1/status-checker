const axios = require("axios").default;

/** @param {string} url
 * @param {any} body
 */
async function checkHealthServerPost(url, body) {
    return axios
        .post(url, body)
        .then(response => {
            return response.status;
        })
        .catch(error => {
            return error.response.status;
        });
}

/** @param {string} url */
async function checkHealthServerGet(url) {
    return axios
        .get(url)
        .then(response => {
            return response.status;
        })
        .catch(error => {
            return error.response.status;
        });
}

module.exports = { checkHealthServerPost, checkHealthServerGet };
