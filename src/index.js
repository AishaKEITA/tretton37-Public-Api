/*  1. find public apis 
2. practice fetch and async await on them
3. loop through 1337 api to get
a) all the names
b) all the people from Lund office
c) people with same names*/




// const { fuchsia } = require("color-name");

// fetch('https://api.tretton37.com/ninjas')
//     .then(
//         function (response) {
//             if (response.status !== 200) {
//                 console.log('Looks like there was a problem. Status Code: ' +
//                     response.status);
//                 return;
//             }

//             // Examine the text in the response
//             response.json().then(function (data) {
//                 // console.log(data);
//                 //console.log(data [0]);
//                 for (let i = 0; i < data.length; i++) {
//                     let person = data[i];
//                     // console.log(person);
//                     // console.log(person.email);
//                     // console.log(person.name);
//                     // console.log(person.office)

//                     // if (person.office === "Lund") {
//                     //     //console.log(person);
//                     //     document.getElementById("tretton").innerHTML +=
//                     //         `<p>${person.name}</p>`;
//                     // }
//                 }
//             });
//         }
//     )
//     .catch(function (err) {
//         console.log('Fetch Error :-S', err);
//     });



async function asyncData() {
    const response = await fetch('https://api.tretton37.com/ninjas');
    const data = await response.json();
    return data;
}

function fetchallnames() {
    asyncData().then(workers => {
        for (let i = 0; i < workers.length; i++) {
            let worker = workers[i];
            // console.log(worker.name);
        }
    });
}

function fetchoffice(officename) {
    asyncData().then(workers => {
        for (let i = 0; i < workers.length; i++) {
            let worker = workers[i];
            if (worker.office === officename) {
                // console.log(worker);
                //document.getElementById('tretton').innerHTML += `<P>${worker.name}</P>`;
            }
        }
    });
}


function fetchname(name) {
    asyncData().then(workers => {
        for (let i = 0; i < workers.length; i++) {
            let worker = workers[i];
            if (worker.name.includes(name)) {
                // console.log(worker);
            }
        }
    });
}

/* How I interpret c):
Create a function (that takes no parameters) and
returns a dictionary (Key/Value pair collection)
where each Key is a Firstname, and the matching
value is an array of "Firstname Lastname"
A certain Key should only exist in the dictionary
if there are more than one person with that Firstname
*/
function similarNames() {
    asyncData().then(workers => {
        let dict = {};
        for (let i = 0; i < workers.length; i++) {
            let worker = workers[i];
            let firstname = worker.name.split(' ')[0];
            if (firstname in dict) {
                // Key does exist in dict, value is an array, append to array
                dict[firstname].push(worker.name);
            } else {
                // Key does not exist in dict, insert it
                dict[firstname] = [worker.name];
            }
        }
        for (const [key, value] of Object.entries(dict)) {
            if (value.length == 1) {
                delete dict[key];
            }
        }
        console.log(dict);
        return dict;
    });
}


function search() {
    let val = document.getElementById("myinput").value;
    // console.log(val);
    fetchname(val);
}

/*
let btn = document.getElementById("searchbtn");
btn.addEventListener("click", search);

fetchoffice("Lund")
*/

console.log(similarNames());

