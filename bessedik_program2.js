/*
Name : AMAR BESSEDIK
Class: CSC604: Advanced Seminar In Web Technology
Desc : Write two functions: one converts a Student object to JSON and another converts
       JSON to a Student object. Add some unit test code to show that your program works.
*/

function Student(id, first, last) {
    this.ID = id;
    this.FIRST_NAME = first;
    this.LAST_NAME = last;
}

Student.prototype.updateStudent = function (major, grad_status, gpa) {
    this.MAJOR = major;
    this.GRAD_STATUS = grad_status;
    this.GPA = gpa;
}

Student.prototype.getStudent = function () {
    return {
        ID: this.ID,
        FIRST_NAME: this.FIRST_NAME,
        LAST_NAME: this.LAST_NAME,
        MAJOR: this.MAJOR,
        GRAD_STATUS: this.GRAD_STATUS,
        GPA: this.GPA
    };
}

/**************************************************************************** */
// Student object to JSON and another converts JSON to a Student object
//------- CONVERT TO JSON  --------
function convertToJSON(student_object) {
    try {
        if (student_object instanceof Student)
            return JSON.stringify(student_object);
            
    } catch (e) {
        return 'Argument must be a of type Student!! : ', e.name;
    }
}

//------- CONVERT TO OBJECT --------
function convertToObject(student_json) {
    try {
        return JSON.parse(student_json);
    } catch (ex) {
        return 'INVALID JSON OBJECT: ', ex.name;
    }
}

/*************************************************************** */


var student1 = new Student(100, 'Charlie', 'Chaplin');
student1.updateStudent('Art and Theatre', 'Senior', 4.0);
console.log('DISPLAY STUDENT DATA:\n', student1.getStudent());

var studentJSON = convertToJSON(student1);
console.log('\nCONVERT TO JSON:\n', studentJSON);
var studentOBJECT = convertToObject(studentJSON);
console.log('\nCONVERT BACK TO OBJECT:\n', studentOBJECT);


/***************************************************************** */
// This section is for testing / error handling

/*console.log('\nMAKE SOME INTENTIONAL ERRORS:\n');
console.log('var studentJSON2 = convertToJSON(\'student1\');');
var studentJSON2 = convertToJSON('student1');
console.log('CONVERT TO JSON:', studentJSON2);

var studentOBJECT = convertToObject(studentJSON + '"state":"ENG"');
console.log('var studentOBJECT = convertToObject(studentJSON + \'\"state":"ENG\"\');');
console.log('CONVERT BACK TO OBJECT:\n', studentOBJECT);*/