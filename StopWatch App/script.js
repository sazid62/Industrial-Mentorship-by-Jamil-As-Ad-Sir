const start = document.querySelector("#start");
const reset = document.querySelector("#reset");
const pause = document.querySelector("#pause");
const second = document.querySelector("#second");



function ShowPause() {
    pause.classList.remove("hidden");
    start.classList.add("hidden");
}
function showStart() {
    pause.classList.add("hidden");
    start.classList.remove("hidden");
}
function showTime(sec) {
    second.innerText = sec + " seconds";
}

let c = 0, intervalId = 0;;
function takeCfromLocalStorage() {
    const cJSON = localStorage.getItem("c");
    c = JSON.parse(cJSON);
}
takeCfromLocalStorage();
console.log(c);
function showInitial() {
    showStart();
    showTime(c);
}
showInitial();

function saveCtoLocalStorage() {
    localStorage.setItem("c", JSON.stringify(c));
}
start.addEventListener("click", () => {
    intervalId = setInterval(() => {
        ShowPause();
        showTime(c);
        saveCtoLocalStorage();
        c++;
    }, 1000);
});

pause.addEventListener("click", () => {
    c--;
    saveCtoLocalStorage();
    clearInterval(intervalId);
    showStart();
});

reset.addEventListener("click", () => {
    c = 0;
    saveCtoLocalStorage();
    clearInterval(intervalId);
    showStart();
    showTime(c);
});