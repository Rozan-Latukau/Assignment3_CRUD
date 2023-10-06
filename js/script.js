const movieList = document.getElementById("list-movie");
const typeLiga = document.getElementById("type")
const url = 'http://localhost:3000/data';
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

// Membuat Get All
fetch(url)
    .then((res) => res.json())
    .then((result) => {
        result.forEach((data) => {
            const node = document.createElement('div');
            node.classList.add('col-md-3');
            node.classList.add('col-sm-6');
            node.innerHTML = `
              <div class="card mb-3 text-bg-dark">
                <img src="${data.img}" class="card-img-top" alt="card">
                <div class="card-body">
                  <h5 class="card-title">Club : ${data.name}</h5>
                  <h5 class="card-text">Liga : ${data.liga}</h5>
                  <div class="pt-3 fs-1">
                    <a href="#" class="btn btn-success" onclick="tampilData(${data.id})"><i class="fa-solid fa-eye"></i></a>
                    <a href="#" class="btn btn-warning" onclick="updateData(${data.id})"><i class="fa-solid fa-sync-alt"></i></a>
                    <a href="#" class="btn btn-danger" onclick="deleteData(${data.id})"><i class="fa-solid fa-trash"></i></a>
                  </div>
                </div>
              </div>
            `;
            movieList.appendChild(node);
        })
    })

// Membuat Get ID
async function tampilData(id) {
    movieList.innerHTML = "";
    try {
        const result = await fetch(`${url}/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const response = await result.json();
        console.log(response);
        const node = document.createElement('div');
        node.innerHTML = `
                  <div class="card mb-3 text-bg-dark">
                    <img src="${response.img}" class="card-img-top size-img" alt="card">
                    <div class="card-body">
                      <h4 class="card-title fw-bold">Club : ${response.name}</h4>
                      <h4 class="card-text fw-medium">Liga : ${response.liga}</h4>
                      <a href="" class="btn btn-success mt-2" onclick="homeData()">Back</a>
                    </div>
                  </div>
                `;
        movieList.appendChild(node)

    } catch (error) {
        alert('terjadi eror', error)
    }


}

async function homeData() {
    try {
        const result = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const response = await result.json();
        console.log(response);
        const node = document.createElement('div');
        node.classList.add('col-md-3');
        node.classList.add('col-sm-6');
        node.innerHTML = `
              <div class="card mb-3 text-bg-dark">
                <img src="${response.img}" class="card-img-top" alt="card">
                <div class="card-body">
                  <h5 class="card-title">Club : ${response.name}</h5>
                  <h5 class="card-text">Liga : ${response.liga}</h5>
                  <div class="pt-3 fs-1">
                    <a href="#" class="btn btn-success" onclick="tampilData(${response.id})"><i class="fa-solid fa-eye"></i></a>
                    <a href="#" class="btn btn-warning" onclick="updateData(${response.id})"><i class="fa-solid fa-sync-alt"></i></a>
                    <a href="#" class="btn btn-danger" onclick="deleteData(${response.id})"><i class="fa-solid fa-trash"></i></a>
                  </div>
                </div>
              </div>
            `;

    } catch (error) {
        console.error('eror', error);
    }
}

// Membuat POST
async function postData(e) {

    const data = JSON.stringify({
        name: document.getElementById("name").value,
        img: document.getElementById("img").value,
        liga: document.getElementById("type").value
    })

    try {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data
        });

        const response = await result.json();
        console.log("berhasil", response);
    } catch (error) {
        alert('ada eror', error);
    }
}

// membuat DELETE
async function deleteData(id) {

    await fetch(`${url}/${id}`, {
            method: "DELETE",
        })
        .then((res) => res.json())
        .then(() => result())
        .catch(alert('Ada kesalahan hapus', result()))
}

// Membuat PUT
async function updateData(id) {
    const addForm = document.getElementById("addForm");
    const dataupdate = await dataid(id);
    document.getElementById("name").value = dataupdate.name;
    document.getElementById("img").value = dataupdate.img;
    document.getElementById("type").value = dataupdate.liga;

    document.getElementById("updateId").value = id;
    console.log(dataupdate);
    if (addForm.style.display === ' ' || addForm.style.display === 'none') {
        addForm.style.display = 'block'
    } else {
        addForm.style.display = 'none'
    }
}
async function dataid(id) {
    try {
        const result = await fetch(`${url}/${id}`);
        const data = await result.json();
        return data;
    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan saat mengambil data berdasarkan ID');
    }
}

async function putData(event) {
    const updateid = document.getElementById("updateId").value;
    const data = {
        name: document.getElementById("name").value,
        img: document.getElementById("img").value,
        liga: document.getElementById("type").value
    };
    try {
        const result = await fetch(`${url}/${updateid}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const response = await result.json();
        console.log("Berhasil update", response);

    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan saat update data', error);
    }
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