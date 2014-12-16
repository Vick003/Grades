// Step 1: Add data to students array


var students = [
    //{fname: "Joe", lname: "Schmoe", grade: 55}
];


var lowIndex = 0;

var highIndex = 0;


var fname_field, lname_field, grade_field, add_btn;



function init() {
    // Assign references to various elements
    fname_field = $('#fname');
    lname_field = $('#lname');
    grade_field = $('#grade');
    add_btn = $('#btn-add-student');

    // Create click event for add student button

    add_btn.click(addStudent);
    add_btn.click(calculateAverage);

    $('tbody').on('click', '.btn-del-student', removeStudent);
    /*the tbody element is chosen because this has to do with loading of the page. the rows are not available yet with the delete button so the "on" is known as an event delegation method. The code above basically runs the function removeStudent when the .btn-del-student class is clicked on. The key is to know that the button is not created yet when the page is loaded. So the "on" Jquery method is used when there is a lot dynamism on the page. Stuff being created and taken off after the page has loaded.  */





}

function removeStudent() {
    var row_index = $(this).parent().parent().index();
    /* the "this" inside the Jquery function refers to the remove button that was responding to the click event. To delete the the row, we must move up parents. The code above captures the index in a variable so we can use it later to remove from the array of objects. The code below removes the clicked on row. */

    $(this).parent().parent().remove();
    students.splice(row_index, 1);
    //splice above is used to remove the specific object from 
    // the array students.
    updateAverage();
    compareGrades();
}

function addStudent() {

    // Create object with the three values
    var student = {
        fname: fname_field.val(),
        lname: lname_field.val(),
        grade: parseFloat(grade_field.val())
    }

    // Add the physical rows to our table
    addRow(student);


    // Add student object into students array
    students.push(student);

    // Clear out fields
    fname_field.val('');
    lname_field.val('');
    grade_field.val('');

    console.log(students);
    updateAverage();
    compareGrades();

}



function addRow(student) {
    var tr = $('<tr>'); //storing the entire tr element in tr variable
    var td_name = $('<td>').html(student.fname + ' ' + student.lname);
    //table data element with object values,  .html adds these values inside element
    var td_grade = $('<td>').html(student.grade);

    var button = $('<button>').addClass('btn btn-danger btn-del-student').html('X');

    //button element with class !Do not do $('<button class = 'blahblah')

    var td_button = $('<td>').append(button);
    // pay attention to the html, this is just the third td element inside the table row

    tr.append(td_name).append(td_grade).append(td_button);
    //adds everything to the table row

    $('#grades-table tbody').append(tr);


}


function updateAverage() {
    $('#result').html(calculateAverage());
}

function calculateAverage() {
    var sum = 0;
    for (var i = 0; i < students.length; i++) {
        sum += students[i].grade;
    }
    var avg = sum / students.length;
    return avg;
}



function compareGrades() {
    var highGrade = 0;
    var lowGrade = 101;
    var rows = $("tbody tr");
    /* "rows" makes each row appended pushed to an array, this is to keep an index that's tracked with each student row that's added. The jQuery function extracts the html elements and puts it into an array. This is done so we can access the row index that is highest or lowest, for highlighting purposes.*/
    $(rows[highIndex]).removeClass("bg-info");
   
    /*removes highGrade highlight before the for-loop starts going over all 
     newly added rows. */

    $(rows[lowIndex]).removeClass("bg-danger");
    
    /*removes lowGrade highlight before the for-loop starts going over all 
     newly added rows. */

    for (var i = 0; i < students.length; i++) {
        if (students[i].grade < lowGrade) {
            lowGrade = students[i].grade;
            lowIndex = i; //keep track of lowest grade; 
        }
        if (students[i].grade > highGrade) {
            highGrade = students[i].grade;
            highIndex = i; //need to keep track of highest grade

        }
    }
     console.log("high " + highIndex);
    console.log("low " + lowIndex);

    $(rows[highIndex]).addClass("bg-info");
    if (students.length > 1) {
        // this to check to see if there is more than one row entry to do a 
        // a  high-low comparison. 
        $(rows[lowIndex]).addClass("bg-danger");
    }



}
$(document).ready(init);