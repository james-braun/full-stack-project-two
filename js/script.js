/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const studentList = document.getElementsByClassName("student-list")[0].getElementsByTagName("li");
var page = 1;
var listSize = 10;
var numberOfPageLinks = Math.ceil(studentList.length / listSize);


/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
const showPage = (list, pageSize) => {
    var startIndex = page * pageSize - pageSize;
    var endIndex = page * pageSize;
    for (var i = 0; i < list.length; i += 1) {
        if (i < startIndex || i >= endIndex) {
            list[i].style.display = "none";
        } else {
            list[i].style.display = "block";
        }
    }
}

showPage(studentList, listSize);

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/


const createelement = () => {

    var element = document.createElement('div')
    element.className = "pagination";
    element.innerHTML = `<ul>`;
    for (var i = 1; i <= numberOfPageLinks; i += 1) {
        if (i === page) {
            element.innerHTML += `<li><a class="active" href="#">${i}</a></li>`;
        } else {
            element.innerHTML += `<li><a href="#">${i}</a></li>`;
        }
    }
    element.innerHTML += `</ul>`;
    document.getElementsByClassName("page")[0].appendChild(element);
}

createelement();
var element = document.getElementsByClassName('pagination')[0].getElementsByTagName('li');
for (var i = 0; i < numberOfPageLinks; i += 1) {
    element[i].addEventListener('click', function () {
        page = parseInt(this.textContent);
        console.log(page);
        console.log(element);
        for (var j = 0; j < element.length; j += 1) {
            element[j].getElementsByTagName('a')[0].className = "";
        }
        this.getElementsByTagName('a')[0].className = "active";
        showPage(studentList, listSize);

    });
};

// Remember to delete the comments that came with this file, and replace them with your own code comments.