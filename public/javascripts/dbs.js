const db = document.querySelector("#dbs");
const head = document.getElementById("headers");
const body = document.getElementById("bodies");
let docStructure;
const coll = document.getElementById("cols");

window.onload = function() {
  const dbValue = this.document.getElementById("dbs").value;
  fetch("/getCollections/" + dbValue)
    .then(res => res.json())
    .then(mostrarPrincipio);
};

const mostrarPrincipio = colecciones => {
  collections.innerHTML = "";
  colecciones.forEach(coleccion => {
    collections.innerHTML +=
      "<option value=" + coleccion.name + ">" + coleccion.name + "</option>";
  });
  const colValue = document.getElementById("cols").value;
  const dbValue = document.getElementById("dbs").value;
  fetch("/getDocs/" + dbValue + "/" + colValue)
    .then(res => res.json())
    .then(mostrarPrimerosDocs);
};

const mostrarPrimerosDocs = docs => {
  head.innerHTML = "";
  body.innerHTML = "";
  let mayor = docs[0];
  docStructure = mayor;
  /*   
  Este código mira cuál objeto tiene mayor número de keys y crea los headers a partir de eso, pero como no todos los documentos son iguales entonces se pierde el sentido.
  docs.forEach(doc => {
    if (Object.keys(doc).length >= Object.keys(mayor).length) {
      mayor = doc;
    }
  }); */
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
    if(key !== "_id")
    {
      formBody +=
      "<div class='form-group'> <label><span>" +
      key +
      "</span></label> <input class='form-control' required name=" +
      key +
      " type='text'>  </div>";
    }
  }
  formBody +=  "<button class='btn btn-primary' id='aniadir' type='submit' formaction='/postDoc/" + db.value + "/" + coll.value + "'>Crear registro</button>";
  form.innerHTML = formBody;
};

db.addEventListener("change", () => {
  const dbValue = document.getElementById("dbs").value;
  fetch("/getCollections/" + dbValue)
    .then(res => res.json())
    .then(mostrar);
});

const collections = document.getElementById("cols");

const mostrar = colecciones => {
  collections.innerHTML = "";
  colecciones.forEach(coleccion => {
    collections.innerHTML +=
      "<option value=" + coleccion.name + ">" + coleccion.name + "</option>";
  });
  fetch("/getDocs/" + db.value + "/" + collections.value)
    .then(res => res.json())
    .then(mostrarPrimerosDocs);
};

collections.addEventListener("change", () => {
  fetch("/getDocs/" + db.value + "/" + collections.value)
    .then(res => res.json())
    .then(mostrarPrimerosDocs);

});

