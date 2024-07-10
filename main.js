import './style.css'


let params = new URL(document.location).searchParams;
let URLthemeName = params.get("theme");



function urlPushState(theme) {
    new URL(document.location).searchParams.set("theme", theme);
}

function urlReplaceState(theme) {
    // history.replaceState("", "", `?theme=${theme}`);
    new URL(document.location).searchParams.set("theme", theme);

}



const themeArray = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
];


const listOfTheme = document.getElementById("listOfTheme");
let currTheme = localStorage.getItem("theme");
if (!currTheme) currTheme = "light";


// if(!name) currTheme = name;



function URLthemeNameVarify() {
    themeArray.find(function (theme) {

        // console.log(theme, URLthemeName);
        if (theme == URLthemeName) {
            currTheme = URLthemeName;
            return;
        }

    });
}

URLthemeNameVarify();
localStorage.setItem("theme", currTheme);
urlReplaceState(currTheme);



for (const theme of themeArray) {

    const li = document.createElement("li");
    li.innerHTML = `
    <input id = "${theme}"
    type="radio"
    name="theme-dropdown"
    class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
    aria-label="${theme}"
    value="${theme}" />
    `
    // li.classList.add("overflow-auto");
    listOfTheme.appendChild(li);
    const clickedTheme = li.querySelector(".btn");
    if (theme == currTheme) {
        urlPushState(theme);
        clickedTheme.click();
    }
    // console.log(clickedTheme);
    clickedTheme.addEventListener("click", () => {
        // console.log(history.state);
        // console.log(clickedTheme.value);
        urlPushState(theme);
        localStorage.setItem("theme", clickedTheme.value);

        //   document.documentElement.className = clickedTheme.value;
    });




}



const api_input = document.getElementById("apiInput");
const apiSubmitBtn = document.getElementById("apiSubmitBtn");
// apiSubmitBtn.addEventListener("click", () => {
//     console.log(api_input.value);

// });


let url = "/mock/search/search.json";
const errorMsgBtn = document.getElementById("errorMsg");
const demo = new URL(window.location.href).searchParams.get("demo");
 
    apiSubmitBtn.addEventListener("click", async () => {
        if(demo != "true")
         url = `https://api.humorapi.com/gif/search?api-key=${api_input.value}&query=dog`;

        const response = await fetch(url);
        const result = await response.json();
        if (response.ok) {
            const dialogueBox = document.getElementById("dialogueBox");
            dialogueBox.classList.add("hidden");


            const showContent = document.getElementById("showContent");
        result.images.map((url)=> {
            const div = document.createElement("div");
            // div.classList.add("h-30","w-max");
            div.innerHTML = `<img src="${url.url}" alt="Meme" class="meme-img">`;
            showContent.appendChild(div);
            // console.log(url.url);
        });

        }
        else {
            console.log(result.message);
        }

    });

 



