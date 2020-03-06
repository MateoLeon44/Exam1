const db = document.querySelector("#dbs");
const head = document.getElementById("headers");
const body = document.getElementById("bodies");
let docStructure;
const coll = document.getElementById("cols");
const modal = document.getElementById("modal");


window.onload = function() {
  const dbValue = this.document.getElementById("dbs").value;
  fetch("/getCollections/" + dbValue, {
    method: "POST",
    body: JSON.stringify({ connection: process.env.MONGODB_URI }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(res => res.json())
    .then(mostrarPrincipio);
};

const mostrarPrincipio = colecciones => {
  let con = document.getElementById("connect").value;
  const obj = { connection: con };
  collections.innerHTML = "";
  colecciones.forEach(coleccion => {
    collections.innerHTML +=
      "<option value=" + coleccion.name + ">" + coleccion.name + "</option>";
  });
  const colValue = document.getElementById("cols").value;
  const dbValue = document.getElementById("dbs").value;
  fetch("/getDocs/" + dbValue + "/" + colValue, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(res => res.json())
    .then(mostrarPrimerosDocs);
};

const mostrarPrimerosDocs = docs => {
  head.innerHTML = "";
  body.innerHTML = "";
  let mayor = docs[0];
  docStructure = mayor;
  for (const key in mayor) {
    head
      .appendChild(document.createElement("th"))
      .appendChild(document.createTextNode(key));
  }
  let tableBody = "";
  docs.forEach(doc => {
    tableBody += "<tr>";
    const object = Object.values(doc);
    for (let value of object) {
      if (typeof value == "object") {
        value = JSON.stringify(value);
      }
      tableBody += "<td>" + value + "</td>";
    }
    tableBody += "</tr>";
  });
  body.innerHTML = tableBody;
  const form = document.getElementById("aniadirForm");
  form.innerHTML = "";
  let formBody = "";
  for (const key in docStructure) {
    if (key !== "_id") {
      formBody +=
        "<div class='form-group'> <label><span>" +
        key +
        "</span></label> <input class='form-control' required name=" +
        key +
        " type='text'>  </div>";
    }
  }
  const connection = document.getElementById("connect").value;
  formBody += "<input type='hidden' name='connection' value='" + connection + "'>";
  formBody +=
    "<button class='btn btn-primary' id='aniadir' type='submit' formaction='/postDoc/" +
    db.value +
    "/" +
    coll.value +
    "'>Crear registro</button>";
  form.innerHTML = formBody;
  modal.style.display = "none";
};

db.addEventListener("change", () => {
  modal.style.display = "block";
  let con = document.getElementById("connect").value;
  const obj = { connection: con };
  const dbValue = document.getElementById("dbs").value;
  fetch("/getCollections/" + dbValue, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(res => res.json())
    .then(mostrar);
});

const collections = document.getElementById("cols");

const mostrar = colecciones => {
  let con = document.getElementById("connect").value;
  const obj = { connection: con };
  collections.innerHTML = "";
  colecciones.forEach(coleccion => {
    collections.innerHTML +=
      "<option value=" + coleccion.name + ">" + coleccion.name + "</option>";
  });
  fetch("/getDocs/" + db.value + "/" + collections.value, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(res => res.json())
    .then(mostrarPrimerosDocs);
};

collections.addEventListener("change", () => {
  modal.style.display = "block";
  let con = document.getElementById("connect").value;
  const obj = { connection: con };
  fetch("/getDocs/" + db.value + "/" + collections.value, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(res => res.json())
    .then(mostrarPrimerosDocs);
});

document.getElementById("conexion").addEventListener("click", () => {
  modal.style.display = "block";
  let obj = { connection: document.getElementById("connect").value };
  fetch("/getDbs/", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(res => res.json())
    .then(getDbs);
});

const getDbs = dbs => {
  let obj = { connection: document.getElementById("connect").value };
  db.innerHTML = "";
  let body = "";
  dbs.databases.forEach(database => {
    body +=
      "<option value='" + database.name + "'>" + database.name + "</option>";
  });
  db.innerHTML = body;
  const dbValue = this.document.getElementById("dbs").value;
  fetch("/getCollections/" + dbValue, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(res => res.json())
    .then(mostrarPrincipio);
};
