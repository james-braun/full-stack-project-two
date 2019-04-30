/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

// Holds list of students from html.
const studentList = document.getElementsByClassName("student-list")[0].getElementsByTagName("li");

const showPage = (list, page, pageSize) => {

    // Set beginning and end indexes.
    var startIndex = page * pageSize - pageSize;
    var endIndex = page * pageSize;

    // itterate though list of stuents and show and hide them
    // based on whether they are between the indexes.
    for (var i = 0; i < list.length; i += 1) {
        if (i < startIndex || i >= endIndex) {
            list[i].style.display = "none";
        } else {
            list[i].style.display = "block";
        }
    }
}

const createPagination = (page, numberOfPageLinks) => {

    var element = document.createElement('div')  // Holds element to be created.

    // Add a class name to the element.
    element.className = "pagination";

    // Create ul element.
    element.innerHTML = `<ul>`;

    // create each li and 'a' element inside ul element.
    for (var i = 1; i <= numberOfPageLinks; i += 1) {
        if (i === page) {
            element.innerHTML += `<li><a class="active" href="#">${i}</a></li>`;
        } else {
            element.innerHTML += `<li><a href="#">${i}</a></li>`;
        }
    }

    // Close ul element.
    element.innerHTML += `</ul>`;

    // Add element to the page.
    document.getElementsByClassName("page")[0].appendChild(element);
}

const appendPageLinks = (studentList) => {

    var page = 1;  // Which page is being displayed.
    var listSize = 10; // the maximum students per page.
    var numberOfPageLinks = Math.ceil(studentList.length / listSize); // The number of pagination links.

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

appendPageLinks(studentList);