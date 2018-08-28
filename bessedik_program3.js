/*
Name : AMAR BESSEDIK
Class: CSC604: Advanced Seminar In Web Technology
Desc : This Program is an express server on the Node.js plateform serving a .html or .htm files in this order.
       It handles valid and invalid JSON requests using CURL on command line with any key/value pair names.
       It also handles urls with integer numbers.
       
       This entire project is developed using Ubuntu Linux 16.04 LTS OS.
*/
var app = require('express');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');

//Launch the server
//BodyParser is depricated, that's why json() amd urlencoded() middleweares are used
app().use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(handle_valid_json_requests)
    .use(handle_wrong_json_requests)
    .use(serveStatic(__dirname + '/public', { 'index': ['index.html', 'index.htm'] }))
    .use(handle_number_urls)
    .listen(3000);

console.log('Server is listening on port 3000 ...');

//Handle Valid JSON requests 
function handle_valid_json_requests(req, res, next) {
    //console for debugging
    console.log('Passed handle_valid_json requests!');
    var value = Object.values(req.body)[0];
    var key = Object.keys(req.body)[0];
    if (value) {
        res.end('\nOPERATION SUCCESSED!!  \tVALUE OF ' + key + ' IS: ' + value + '\n\n');
    } else {
        next();
    }
}
//Handle wrong JSON requests
function handle_wrong_json_requests(err, req, res, next) {
    //console for debugging 
    console.log('Passed handle_wrong_json requests!!');
        res.end('\nOPERATION FAILLED!!  \tINVALID JSON OBJECT BODY!!\n\n');
}

//Handle URLs of numbers 
function handle_number_urls(req, res) {
    //console for debugging
    console.log('Passed handle_number_urls')
    var reg_exp = /^\d+$/;
    var req_content = req.originalUrl.slice(1);
    var message_to_client = '';
    //When a url is a valid integer
    if (req_content.match(reg_exp)) {
        message_to_client = '\nYOU ENTRED: ' + req_content + '\n\n';
        res.end(message_to_client);
    } else {
        //When a url is an invalid integer (123xy for example)
        message_to_client = '\nCAN\'T PROCESS REQUEST: PLEASE CHECK YOUR URL OR COMMAND!!!\n\n'
        res.end(message_to_client);
    }
}

/**************************************** END *************************************** */

