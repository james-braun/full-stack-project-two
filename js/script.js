/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Holds list of students from html.
const studentList = document.getElementsByClassName("student-list")[0].getElementsByTagName("li");

// create and append a search element to the page.
const search = document.createElement('div');
search.className = "student-search";
search.innerHTML = "<input id=\"input\" type=\"search\" value=\"\" name=\"student_search\" placeholder=\"Search for atudents...\"><button id=\"button\" type=\"submit\" name=\"student_search\">search</button>"
document.getElementsByClassName("page-header")[0].appendChild(search);


function showPage(list, page, pageSize) {

    // Set beginning and end indexes.
    var startIndex = page * pageSize - pageSize;
    var endIndex = page * pageSize;

    // itterate though list of stuents and show and hide them
    // based on whether they are between the indexes and
    // are not in the search.
    var i = 0;
    var j = 0;
    while (i < list.length) {

        // if student matches search then check if they are within the indices.
        if (list[i].className != 'student-item cf invisible') {

            // if student not within the indices then don't display.
            // else display.
            if ((j < startIndex || j >= endIndex)) {
                list[i].style.display = "none";
            } else {
                list[i].style.display = "block";
            }
            j += 1;
        } else {

            // if student does not match search don't display.
            list[i].style.display = "none";
        }
        i += 1;
    }
}

function createPagination(page, numberOfPageLinks) {

    var element = document.createElement('div');  // Holds element to be created.

    // Add a class name to the element.
    element.className = "pagination";

    // Create ul element.
    element.innerHTML = "<ul>";

    // create each li and 'a' element inside ul element.
    for (var i = 1; i <= numberOfPageLinks; i += 1) {
        if (i === page) {
            element.innerHTML += "<li><a class=\"active\" href=\"#\">" + i + "</a></li>";
        } else {
            element.innerHTML += "<li><a href=\"#\">" + i + "</a></li>";
        }
    }

    // Close ul element.
    element.innerHTML += "</ul>";

    // Add element to the page.
    document.getElementsByClassName("page")[0].appendChild(element);
}

function getStudentListLenght(studentList) {

    // Holds the number of students in the search.
    var result = 0;

    // Itterate over studentList and count the number of students in the search.
    for (var i = 0; i < studentList.length; i += 1) {
        if (studentList[i].className === 'student-item cf') {
            result += 1;
        }
    }

    // retrun the number of students in the search.
    return result;
}

function appendPageLinks(studentList) {

    var page = 1;  // Which page is being displayed.
    var listSize = 10; // the maximum students per page.
    var numberOfPageLinks = Math.ceil(getStudentListLenght(studentList) / listSize); // The number of pagination links.

    // Show one page of students.
    showPage(studentList, page, listSize);

    // Create pagination links for that page.
    createPagination(page, numberOfPageLinks);

    // Holds list of li elements in pagination div.
    var element = document.getElementsByClassName('pagination')[0].getElementsByTagName('li');

    // create event listener for each li in pagination.
    for (var i = 0; i < numberOfPageLinks; i += 1) {
        element[i].addEventListener('click', function () {

            // Set the page varible to the paginations link's number value.
            page = parseInt(this.textContent);

            // clear the "active" or selected class from li's in pagination.
            for (var j = 0; j < element.length; j += 1) {
                element[j].getElementsByTagName('a')[0].className = "";
            }

            // Add active class to current page's pagination link.
            this.getElementsByTagName('a')[0].className = "active";

            // Show current page.
            showPage(studentList, page, listSize);

        });
    };
}

// initail pagination call.
appendPageLinks(studentList);

// function curtesy of Prakash Poudel
// https://www.sharmaprakash.com.np/javascript/ie-alternative-to-inludes/
function includes(container, value) {
    var returnValue = false;
    var pos = container.indexOf(value);
    if (pos >= 0) {
        returnValue = true;
    }
    return returnValue;
}

// Add event listener keyup.
document.getElementById('input').addEventListener('keyup', function () {

    // for every student if syudent name is not in search then remove
    // or make it "invisible" to shoePage.
    for (var i = 0; i < studentList.length; i += 1) {
        if (!includes(studentList[i].getElementsByTagName('h3')[0].innerHTML.toUpperCase(), this.value.toUpperCase())) {
            studentList[i].className = 'student-item cf invisible';
        } else {
            studentList[i].className = 'student-item cf';
        }
    }

    // remove pagination and add back new pagination
    // and reset page.
    document.getElementsByClassName('page')[0].removeChild(document.getElementsByClassName('pagination')[0]);
    appendPageLinks(studentList);
});

// Add click event,
document.getElementById('button').addEventListener('click', function () {

    // for every student if syudent name is not in search then remove
    // or make it "invisible" to shoePage.
    for (var i = 0; i < studentList.length; i += 1) {
        if (!(includes(studentList[i].getElementsByTagName('h3')[0].innerHTML.toUpperCase(), document.getElementById('input').value.toUpperCase()))) {
            studentList[i].className = 'student-item cf invisible';
        } else {
            studentList[i].className = 'student-item cf';
        }
    }

    // remove pagination and add back new pagination
    // and reset page.
    document.getElementsByClassName('page')[0].removeChild(document.getElementsByClassName('pagination')[0]);
    appendPageLinks(studentList);
});