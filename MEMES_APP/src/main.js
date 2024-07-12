import "/style.css";

// Function to check for a key in the URL
function checkKeyInUrl(key) {
  return new URL(window.location.href).searchParams.get(key);
}

// Initialize API key from local storage
let apiKey = JSON.parse(localStorage.getItem("apiKey"));

// Check if in demo mode or if API key exists
if (checkKeyInUrl("demo") == "true") {
  let url = "/mock/search/search.json";
  console.log("demo url = ", url);
  apiKey = "demo";
  showAllMemes(url);
} else if (apiKey) {
  let url = `https://api.humorapi.com/memes/search?api-key=${apiKey}&number=30`;
  showAllMemes(url);
}

// Function to add or update URL parameters
function addOrUpdateURLParam(key, value) {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(key, value);
  const newRelativePathQuery = window.location.pathname + "?" + searchParams.toString();
  history.pushState(null, "", newRelativePathQuery);
}

// Initialize favorite memes list
let favouriteMemesListArray = JSON.parse(localStorage.getItem('favouriteMemesList')) || [];

// Function to display saved memes list
function showSaveMemesList() {
  const favouriteMemesList = document.querySelector("#favouriteMemesList");
  favouriteMemesList.innerHTML = "";

  favouriteMemesListArray.forEach((meme) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `  
      <td class="block p-0">
        <div class="flex items-center gap-4 p-3 bg-base-200 rounded-lg shadow transition-all duration-300 hover:shadow-md hover:scale-102">
          <div class="w-12 h-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-primary">
            <img src="${meme.url}" class="w-full h-full object-cover transition-transform duration-300 hover:scale-110" alt="Meme thumbnail" />
          </div>
          <div class="flex-grow">
            <div class="font-bold truncate">${meme.description}</div>
          </div>
        </div>
      </td>
    `;
    favouriteMemesList.appendChild(tr);
  });
}

showSaveMemesList();

// Theme management
const themeArray = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave",
  "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua",
  "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula",
  "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee",
  "winter", "dim", "nord", "sunset"
];

// Function to validate theme
function valid(theme) {
  return themeArray.includes(theme) ? theme : null;
}

const listOfTheme = document.getElementById("listOfTheme");
let currTheme = valid(checkKeyInUrl("theme")) ||
  valid(localStorage.getItem("theme")) ||
  "light";

console.log("Current theme:", currTheme);

// Populate theme list and handle theme selection
themeArray.forEach(theme => {
  const li = document.createElement("li");
  li.innerHTML = `
    <input id="${theme}"
    type="radio"
    name="theme-dropdown"
    class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
    aria-label="${theme}"
    value="${theme}" />
    `;
  listOfTheme.appendChild(li);

  const clickedTheme = listOfTheme.querySelector(`#${theme}`);
  clickedTheme.addEventListener("click", () => {
    clickedTheme.click();
    addOrUpdateURLParam("theme", theme);
    localStorage.setItem("theme", theme);
  });
});

const clickedTheme = document.getElementById(`${currTheme}`);
clickedTheme.click();
localStorage.setItem("theme", currTheme);

// API handling
const api_input = document.getElementById("apiInput");
const apiSubmitBtn = document.getElementById("apiSubmitBtn");

let url = "/mock/search/search.json";
const demo = checkKeyInUrl("demo");

apiSubmitBtn.addEventListener("click", async () => {
  url = `https://api.humorapi.com/memes/search?api-key=${api_input.value}&number=30`;
  const response = await fetch(url);
  const result = await response.json();
  if (demo != "true") {
    if (response.ok) {
      apiKey = api_input.value;
      showAllMemes(url);
    } else {
      console.log("API Error:", url);
      showError(result);
    }
  }
});

// Function to show all memes
async function showAllMemes(url) {
  const loadingSpinner = document.getElementById("loadingSpinner");
  const showContent = document.getElementById("showContent");
  const dialogueBox = document.getElementById('dialogueBox');

  // Show loading spinner
  loadingSpinner.classList.remove("hidden");
  showContent.innerHTML = "";
  dialogueBox.classList.add("hidden");

  try {
    const response = await fetch(url);
    const result = await response.json();

    if (response.ok) {
      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Hide loading spinner
      loadingSpinner.classList.add("hidden");

      changeLogInOutState();

      if (apiKey && apiKey != "demo") {
        localStorage.setItem("apiKey", JSON.stringify(apiKey));
      }
      document.getElementById('my_modal_1').close();

      // Display memes
      result.memes.forEach((meme) => {
        const div = document.createElement("div");
        div.classList = "w-full h-auto shadow-xl rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-2 hover:border-red-700";
        div.innerHTML = `
          <figure class="relative w-full h-64 overflow-hidden">
            <img class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              src="${meme.url}" alt="${meme.description}" />
          </figure>
          <div class="p-4">
            <h2 class="text-xl font-semibold mb-2 truncate">${meme.description}</h2>
            <div class="flex justify-end">
              <button id="${meme.id}" class="btn btn-primary btn-sm font-bold text-xs group">
                <svg xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 inline-block mr-1 transition-transform duration-200 group-hover:scale-110"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Save
              </button>
            </div>
          </div>
        `;
        showContent.appendChild(div);

        // Handle save button click
        const saveBtn = document.getElementById(`${meme.id}`);
        saveBtn.addEventListener("click", () => {
          let val = prompt("Save this picture as");
          favouriteMemesListArray.push({
            "id": `${meme.id}`,
            "description": `${val}`,
            "url": `${meme.url}`,
          });
          localStorage.setItem("favouriteMemesList", JSON.stringify(favouriteMemesListArray));
          showSaveMemesList();
        });
      });

      // If no memes, show dialogue box
      if (result.memes.length === 0) {
        dialogueBox.classList.remove("hidden");
      }
    } else {
      showError(result);
    }
  } catch (error) {
    console.error("Error fetching memes:", error);
    showError({ message: "An error occurred while fetching memes." });
  } finally {
    loadingSpinner.classList.add("hidden");
  }
}
 
// Function to show error messages
function showError(result) {
  showContent.innerHTML = "";
  if (result.code == 402 && localStorage.getItem("apiKey") != null) {
    showContent.innerHTML = `
      <div role="alert" class="h-fit w-96 p-8 m-8 alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-5xl">${result.message}</span>
      </div>
    `;
    apiKey = "";
    localStorage.removeItem("apiKey");
  } else {
    const errorMsgBtn = document.getElementById(`errorMsg`);
    errorMsgBtn.textContent = `${result.message}`;
    errorMsgBtn.classList.remove("hidden");
    console.log(errorMsgBtn);
  }
}

// Search Memes handling
const searchMemes = document.getElementById("searchMemes");
let debounceTimeout;
searchMemes.addEventListener('input', function (event) {
  const errorMsgBtn = document.getElementById(`errorMsg`);
  errorMsgBtn.classList.add("hidden");

  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(async () => {
    const val = event.target.value;
    if (val.length >= 3) {
      if (demo == "true") {
        url = `/mock/search/search.json`;
        apiKey = "demo";
        showAllMemes(url);
      } else if (localStorage.getItem("apiKey")) {
        apiKey = JSON.parse(localStorage.getItem("apiKey"));
        url = `https://api.humorapi.com/memes/search?api-key=${apiKey}&keywords=${val}&number=30`;
        console.log("search bar api url:", url);
        showAllMemes(url);
      } else {
        const modalBtn = document.getElementById("modalBtn");
        modalBtn.click();
      }
    }
  }, 500);
});

// User authentication state management
const signOutBtn = document.getElementById("signOut");
const logInBtn = document.getElementById("logIn");
const demoBtn = document.getElementById("demo");
if (!localStorage.getItem("apiKey")) {
  const needHide = document.getElementById("needHide");
  // needHide.classList.add("hidden");
}

function changeLogInOutState() {
  if (apiKey != "demo") {
    signOutBtn.classList.remove("hidden");
    logInBtn.classList.add("hidden");
    demoBtn.classList.add("hidden");
  } else {
    logInBtn.classList.add("hidden");
    signOutBtn.classList.add("hidden");
    demoBtn.classList.remove("hidden");
  }
}

signOutBtn.addEventListener("click", () => {
  localStorage.removeItem("apiKey");
  window.location.reload();
});

logInBtn.addEventListener("click", () => {
  modalBtn.click();
});



