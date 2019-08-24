function Response() {
    this.code = 200;
    this.success = true;
    this.message = "";
    this.payload = {};
    this.err = "";
}


function successResponse(message, data) {
    let res = new Response();
    res.code = 200;
    res.success = true;
    res.message = message;
    res.payload = data;

    return res;
}


function notFound(message, data) {
    let res = new Response();
    res.code = 200;
    res.success = true;
    res.message = message;
    res.payload = data;
    res.err = message;

    return res;
}


function failResponse(message, data, err) {

    let res = new Response();
    res.code = 500;
    res.success = false;
    res.message = message;
    res.payload = data;
    res.err = err;

    return res;
}


module.exports = {
    successResponse,
    failResponse,
    notFound
}