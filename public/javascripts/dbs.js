
const db = document.querySelector("#dbs");


db.addEventListener("change", () => {
    const dbValue = document.getElementById("dbs").value;
    fetch("/getCollections/" + dbValue).then(res => res.json()).then(mostrar);
});

const mostrar = colecciones =>{
    const col = document.getElementById("colecciones")
    col.style.display = "block";
    col.innerHTML = "";
    col.innerHTML = "<option>" + "</option>";
    console.log(colecciones);

}
