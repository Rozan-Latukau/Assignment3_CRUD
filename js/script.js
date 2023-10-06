const typeLiga = document.getElementById("type")
const movieList = document.getElementById("list-movie");
const url = 'http://localhost:3000/data';
const xhr = new XMLHttpRequest();

const typeList = [
    "EPL",
    "La Liga",
    "Serie A",
    "Ligue 1 Uber Eats",
    "Bundesliga"
];

typeList.forEach((element) => {
    const newOption = document.createElement('option');
    const optionText = document.createTextNode(element);
    newOption.appendChild(optionText);
    newOption.setAttribute('value', element);

    typeLiga.appendChild(newOption)
});


function fetchData() {
    xhr.onerror = function() {
        alert("there is an error")
    }

    xhr.onloadstart = function() {
        movieList.innerHTML = "Start";
    }

    xhr.onloadend = function() {
        movieList.innerHTML = "";
        const data = JSON.parse(this.response);
        for (let i = 0; i < data.length; i++) {
            const node = document.createElement("div");
            node.classList.add("col-md-3");
            node.classList.add("col-sm-6");
            node.innerHTML = `
                <div class="card mb-3 text-bg-dark">
                    <img src="${data[i].img}" class="card-img-top" alt="card">
                    <div class="card-body">
                        <h5 class="card-title">Club : ${data[i].name}</h5>
                        <h5 class="card-text">Liga : ${data[i].liga}</h5>
                        <div class="pt-3 fs-1">
                        <a href="#" class="btn btn-success" onclick="tampilData(${data[i].id})"><i class="fa-solid fa-eye"></i></a>
                        <a href="#" class="btn btn-warning" onclick="updateData(${data[i].id})"><i class="fa-solid fa-sync-alt"></i></a>
                        <a href="#" class="btn btn-danger" onclick="deleteData(${data[i].id})"><i class="fa-solid fa-trash"></i></a>
                        </div>
                    </div>
                </div>   
            `
            movieList.appendChild(node);
        }
    }

    xhr.onprogress = function() {
        movieList.innerHTML = "Loading";
    }

    xhr.open("GET", url);
    xhr.send();
}


function tampilData() {
    movieList.innerHTML = '';
    let newTampil = document.createElement("div")
    newTampil.innerHTML = `
    `
    xhr.open("GET", url);
    xhr.send();
}
tampilData();




function deleteData(id) {
    xhr.open("DELETE", url + `/${id}`);
    xhr.send();
}

function postData(e) {
    e.preventDefault();
    const data = JSON.stringify({
        name: document.getElementById("name").value,
        img: document.getElementById("img").value,
        liga: document.getElementById("type").value
    });
    console.log(data);

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function() {
        console.log(this.responseText);
    };

    xhr.send(data);

}








function addform() {
    const addForm = document.getElementById("addForm")
    if (addForm.style.display === "" || addForm.style.display === "block") {
        addForm.style.display = "none";
    } else {
        addForm.style.display = "block"
    }
}
addform()
















function nav(event) {
    let navLinks = document.querySelectorAll(".navbar-nav .nav-item .nav-link");
    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove('active')
    }
    let targetElement = event.target;
    if (!targetElement.classList.contains("dropdown-item")) {
        targetElement.classList.add("active");
    }
}

function navClick(event) {
    if (event.target.classList.contains("nav-link")) {
        nav(event);
    }
}