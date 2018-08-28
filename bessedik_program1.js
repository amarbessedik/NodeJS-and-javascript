/********************************************************************* 
Name : AMAR BESSEDIK
Class: CSC604: Advanced Seminar In Web Technology
Desc: javascript objects/functions 
*/


/*----------- QUESTION1: POINT-------------*/
function Point(x, y) {
    if (typeof x === 'number' && typeof y === 'number') {
        this.x = x;
        this.y = y;
    } else {
        console.log('Arguments must be numeric!!!');
    }
}

Point.prototype.setCoordinates = function (a, b) {
    if (typeof b === 'number' && typeof a === 'number') {
        this.x = a;
        this.y = b;
    } else {
        conosole.log('Arguments must be numeric!');
    }
};

Point.prototype.getCoordinates = function () {
    return [this.x, this.y];
};
//========================================================================
/********************************************************************** */
/* ----------- QUESTION2: SQUARE -----------*/
function Square(tl_point, edge) {
    if (tl_point instanceof Point && typeof edge === 'number') {
        this.top_left_point = tl_point;
        this.edge = edge;
    } else {
        console.log('One or both arguments may be wrong!!!');
    }
}
//SETTER
Square.prototype.setSquare = function (P, E) {
    if (P instanceof Point && typeof E === 'number') {
        this.top_left_point = P;
        this.edge = E;
    } else {
        console.log('One or both arguments may be wrong!!!');
    }
};
//GETTER
Square.prototype.getSquare = function () {
    return [this.top_left_point.getCoordinates(), this.edge];
};

//==========================================================================
/************************************************************************ */
/*----------QUESTION3: moveTo function ----*/
Square.prototype.moveTo = function (newX, newY) {
    try {
        if (this && typeof newX === 'number' && typeof newY === 'number')
            this.top_left_point.setCoordinates(newX, newY);
    } catch (e) {
        return 'Arguments must be numeric!!!\n' + e.name + '\n';
    }
}
/*========================================================================*/
/*--------------------------- 4- TEST PROGRAM ----------------------*/
/*========================================================================*/
//1- CODE FOR POINT
console.log('1 - CODE FOR POINT');
//Define a point instance
var pt = new Point(2, 1);
//Display coordinates
console.log('Initial coordinates are: ', pt.getCoordinates());
//Set coordinates
pt.setCoordinates(4, 5);
//Display again
console.log('Using the setter function, the coordinates are: ', pt.getCoordinates());
space(2);

/*------------------------------------------------------------------- */
//2 - CODE FOR SQUARE
console.log('2 - CODE FOR SQUARE');
//Define a square instance
var sq = new Square(new Point(-3, -4), 2.5);
//Display square
console.log('Coordinates of the top left point of the square are: ', sq.getSquare()[0]);
console.log('The edge of the square is: ', sq.getSquare()[1]);
//Set square data
sq.setSquare(new Point(4, -1), 3);
//Display square again
console.log('Set top left point of the square: ', sq.getSquare()[0]);
console.log('Set edge of the square: ', sq.getSquare()[1]);

space(2);
/*------------------------------------------------------------------- */
//3 - CODE FOR moveTo FUNCTION
console.log('3 - CODE FOR moveTo FUNCTION');
sq.moveTo(-5, 3);
console.log('Square moved to: ', sq.getSquare()[0]);

space(2);
/*------------------------------------------------------------------- */

/*Define a Line object with two Points as the data members. */
// QUESTION5 - LINE
/*
   We need to define a global constant representing the wether or not the points are the same.
   In order for an object to be a line, its points must be different.
   and therefore define a function to check for that.
*/

function areTheSamePoints(p1, p2) {
    try {
        return (JSON.stringify(p1.getCoordinates()) === JSON.stringify(p2.getCoordinates()));
    } catch (e) {
        return 'Error: ' + e.name + '\n';
    }
}

function Line(P1, P2) {
    try {
        if (P1 instanceof Point && P2 instanceof Point) {
            if (!areTheSamePoints(P1, P2)) {
                this.left_point = P1;
                this.right_point = P2;
            } else {
                console.log('Arguments must be different from one another !!');

            }
        }
    } catch (e) {
        return 'Both arguments must be points!!!\n' + e.message + '\n';
    }
}

Line.prototype.getLineCoordinates = function () {
    try {
        if (this.left_point.getCoordinates() && this.right_point.getCoordinates())
            return [this.left_point.getCoordinates(), this.right_point.getCoordinates()];
    } catch (exx) {
        return 'Error: ' + exx.name;
    }
};

console.log('CODE FOR LINE: ');
var line = new Line(new Point(2, -1), new Point(0, 2));
console.log('Line points are: ');
console.log('First point: ', line.getLineCoordinates()[0]);
console.log('Second point: ', line.getLineCoordinates()[1]);

//DEFINE getSlope() FUNCTION

Line.prototype.getSlope = function () {
    try {
        //Instead of accessing a two dimentional array each time, merge into one dimentional array.
        var points = this.getLineCoordinates().join().split(',');

        var x1 = points[0];
        var x2 = points[2];
        var y1 = points[1];
        var y2 = points[3];

        if (x1 && x2 && y1 && y2) {
            if (x2 !== x1) {
                return (y2 - y1) / (x2 - x1);
            } else if (y2 !== y1) {
                /* When x1 === x2 & y1 !== y2, the line is vertical!!
                   We can alternatively chose to return 'undefined' or a '0' to handle this case.
                   In this algorithm '0' is choosen to indicate that a line is vertical. 
                   It is just a symbol that helps to make the decision. */
                return 0;
            }
        } else {
            return 'ERROR: MISSING DATA!!';
        }
    } catch (err) {
        return 'Entries must be of type Line !!! \nError: ' + err.name + '\n';
    }
};

/* -------  DEFINE isParallel() FUNCTION -------*/
function isParallel(L1, L2) {
    try {
        if (L1 instanceof Line && L2 instanceof Line) {
            if (!isNaN(L1.getSlope()) && !isNaN(L2.getSlope())) {
                return (L1.getSlope() === L2.getSlope());
            } else {
                return 'UNDECIDABLE CASE BECAUSE OF MISSING DATA !!!'
            }
        }
    } catch (e) {
        console.log('Error: ' + e);
    }
}

console.log('TEST FOR PARALLEL LINES:\n');
console.log('line1 = [[1, 0], [-2, 1]]');
var line1 = new Line(new Point(1, 0), new Point(-2, 1));
console.log('line2 = [[-3, 0], [3, 3]]');
var line2 = new Line(new Point(-3, 0), new Point(3, 3));

console.log('\nSlope of the 1st line: ', line1.getSlope());
console.log('Slope of the 2nd line: ', line2.getSlope());
console.log('ARE LINES PARALLEL? : ' + isParallel(line1, line2));
console.log('------------------------------------------------');
console.log('line3 = [[1, 2], [-2, 1]]');
var line3 = new Line(new Point(1, 2), new Point(-2, 1));
console.log('line4 = [[2, 4], [-4, 2]]');
var line4 = new Line(new Point(2, 4), new Point(-4, 2));

console.log('\nSlope of the 1st line: ', line3.getSlope());
console.log('Slope of the 2nd line: ', line4.getSlope());
console.log('\nARE LINES PARALLEL? :' + isParallel(line3, line4));

//=======This section is for checking how the program handles errors========

/*console.log('=============================================================');
console.log('Make some intentional mistakes to see how it handles errors:\n');
console.log('Wrong param: L1 = [[-2, \'three\'], [-2, 1]]');
var L1 = new Line(new Point(-2, 'three'), new Point(-2, 1));
console.log('Same points: L2 = [[1, 5], [1, 5]]');
var L2 = new Line(new Point(1, 5), new Point(1, 5));

console.log('Slope of the 1st line: ', L1.getSlope());
console.log('Slope of the 2nd line: ', L2.getSlope());
console.log('Are lines Parallel ? :' + isParallel(L1, L2));*/

/**************************************************************** */
//HELPER FUNCTION TO SEPARATE RESULTS OF DIFFERENT EXECUTIONS 
//FOR BETTER DISPLAY ON THE SCREEN
function space(n) {
    do {
        console.log();
        n--;
    } while (n > 0);
}
