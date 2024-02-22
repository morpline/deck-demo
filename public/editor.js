const button = document.getElementById("save");
const deledte = document.getElementById("delete");
const filename = document.getElementById("filename");
const main = document.getElementById("main");


const params = window.location.search
const fid = new URLSearchParams(params).get('f')


const get = async () => {
    document.title = "Deck Editor | "+fid;
    filename.innerText = fid;
    const data = await axios.get("http://127.0.0.1:3000/file?file="+fid)
    console.log(data)
    main.innerText = data.data.data;
}

const save = async () => {
    const data = await axios.post("http://127.0.0.1:3000/file?file="+fid+"&data="+main.innerText,{data:main.innerText},{})
    console.log(data);
}
button.addEventListener("click",save);

get();