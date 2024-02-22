const button = document.getElementById("sned");
const sreate = document.getElementById("sreate");
const list = document.getElementById("list");
const Filename = document.getElementById("Filename");
const update = async () => {
    const data = await axios.get("http://127.0.0.1:3000/files")
    console.log(data)
    list.innerHTML = "";
    data.data.data[0].map((e)=>{
        let li = document.createElement("li");
        li.innerHTML=(`
        <a href="/editor.html?f=${e}">${e}</a>
        `);
        list.appendChild(li);
    })
}
button.addEventListener("click",update)

sreate.addEventListener("click",async () => {
    if(Filename.value == "") {
        console.error("Input File name cannot be empty.");
        return;
    }
    console.log("filename:",Filename.value);
    // const responce = await axios.post("http://127.0.0.1:3000/create",{name:"N:"+Filename.value},{headers:{"Content-Type":"application/json"}});
    const responce = await axios.post("http://127.0.0.1:3000/create?name="+Filename.value);
    console.log(responce);
    Filename.value = "";
    update();
})

update();