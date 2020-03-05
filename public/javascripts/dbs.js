
const db = document.querySelector("#dbs");


db.addEventListener("change", () => {
    const dbValue = document.getElementById("dbs").value;
    console.log("db", dbValue);
    
});
