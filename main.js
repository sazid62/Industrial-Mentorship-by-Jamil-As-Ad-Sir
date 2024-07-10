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
    if (demo != "true")
        url = `https://api.humorapi.com/gif/search?api-key=${api_input.value}&query=dog`;

    const response = await fetch(url);
    const result = await response.json();
    if (response.ok) {
        const dialogueBox = document.getElementById("dialogueBox");
        document.getElementById('my_modal_1').close();
        dialogueBox.classList.add("hidden");



        const showContent = document.getElementById("showContent");
        result.memes.map((url) => {
            const div = document.createElement("div");
            // div.classList.add("");
            div.innerHTML = `<div class="card o bg-base-100  shadow-3xl">
  <figure>
    <img class="block   "
      src="${url.url}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title font-semibold p-6 m-6">${url.description}</h2>
     
    <div class="card-actions justify-end">
      <button class="btn btn-primary">love</button>
    </div>
  </div>
</div>`;
            console.log(div);
            showContent.appendChild(div);
            // console.log(url.url);
        });

    }
    else {
        console.log(result.message);
    }

});




// 

const response = await fetch(url);
const result = await response.json();
const dialogueBox = document.getElementById("dialogueBox");
document.getElementById('my_modal_1').close();
dialogueBox.classList.add("hidden");



const showContent = document.getElementById("showContent");
result.memes.map((url) => {
    const div = document.createElement("div");
    // div.classList.add("");
    div.innerHTML = `<div class=" card  h-96 w-30 p-3 mt-3  shadow-xl mr-3">
<figure>

        <div class="text-center  object-contain hover:object-scale-down h-20 w-52 border-2 rounded-md">
      <div class="h-min overflow-hidden rounded-md">
        <img class="  object-contain hover:object-scale-down h-20 w-52   hover:scale-125 transition-all duration-500 cursor-pointer" src="${url.url}" alt="" />
      </div>
       </div>


</figure>
<div class="card-body">
<h2 class=" h-20 w-52 card-title font-semibold p-1">${url.description}</h2>

<div class="card-actions justify-end m-3">
<button id = "${url.id}" class="btn btn-primary font-bold size-16">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-2 w-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
  Save
</button>
</div>
</div>
</div>`;
    console.log(div);
    showContent.appendChild(div);
    const saveBtn = document.getElementById(`${url.id}`);
    saveBtn.addEventListener("click", () =>{
        prompt("saaaa");
    });
    // console.log(url.url);
});


