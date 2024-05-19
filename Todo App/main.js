import './style.css'



// Take Task from USer
const btn = document.querySelector('#btn');
const input = document.querySelector('#input');


const todoSection = document.querySelector('.toDoSection');
const inProgressSection = document.querySelector(".inProgressSection");
const completeSection = document.querySelector('.completeSection');
const cleanTodo = document.querySelector('#cleanTodo');
const cleanCompleted = document.querySelector('#cleanCompleted');
const cleanInProgress = document.querySelector('#cleanInProgress');
const API_BASE_URL = "https://todo-crudl.deno.dev";
const USER_ID = "sajid";
async function showAll() {
  cleanTodo.innerHTML = "";
  cleanCompleted.innerHTML = "";
  cleanInProgress.innerHTML = "";
  const res = await fetch(`${API_BASE_URL}/${USER_ID}/todos`);
  const result = await res.json();

  result.forEach(element => {
    const status = element.status;
    if (status == "completed") {

      addToComplete(element);
    }
    else if (status == "todo") {
      addToTodo(element);
    }
    else {
      addToInprogress(element);
    }

    // console.log(element.status);  
  });
}
showAll();
btn.addEventListener('click', () => {
  
  todoSectionAPI();

});




async function updateAPI(data, msg) {
  const res = await fetch(`${API_BASE_URL}/${USER_ID}/todos/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(
      {
        status: msg,
      }
    ),
  });



  showAll();
}



async function deleteAPI(data) {
  const res = await fetch(`${API_BASE_URL}/${USER_ID}/todos/${data.id}`, {
    method: "DELETE",
  });


  showAll();
}






















function addToTodo(data) {
  const div = document.createElement('div');
  div.innerHTML = `
              <div>
                  <input  type="checkbox"
                    class="checkbox border-black checked:border-indigo-800 [--chkbg:theme(colors.indigo.600)] [--chkfg:white]" />
                </div>

                <div class="flex   w-full justify-between">

                  <div>

                    <h1 class="font-sans font-bold text-lg p-4 pt-0 pr-1">
                     ${data.title}
                    </h1>
                  </div>


                  <div>

                    <button class="btn btn-square btn-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                
  `;


  div.classList = "mt-4 ml-4 mr-3 flex  flex-row   h-10";


  //adding TODO section
  todoSection.appendChild(div);
  const checkbox = div.querySelector(".checkbox");
  checkbox.addEventListener('click', () => {
    // console.log("hey");
    updateAPI(data, "progress");
  });


  const btn = div.querySelector(".btn");
  btn.addEventListener('click', () => {
    console.log("hey");
    deleteAPI(data);
  });
}




// In Progress
function addToInprogress(data) {
  const div = document.createElement('div');
  div.innerHTML = `
  <div class=" ml-4 mr-3 flex  flex-row   h-10" >
  <div class="   ">
    <input type="checkbox"
      class="checkbox border-black checked:border-indigo-800 [--chkbg:theme(colors.indigo.600)] [--chkfg:white]" />
  </div>

  <div class="flex   w-full justify-between">

    <div>

      <h1 class="font-sans font-bold text-lg p-4 pt-0 pr-1">
        ${data.title}
      </h1>
    </div>


    <div>

      <button class="btn btn-square btn-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</div> `;


  inProgressSection.appendChild(div);

  const checkbox = div.querySelector(".checkbox");
  checkbox.addEventListener('click', () => {
    // console.log("hey");
    updateAPI(data, "completed");
  });



  const btn = div.querySelector(".btn");
  btn.addEventListener('click', () => {
    console.log("hey");
    deleteAPI(data);
  });

}


















// Complete Section
function addToComplete(data) {
  const div = document.createElement('div');
  div.innerHTML = `
  <div class="mt-4 ml-4 mr-3 flex  flex-row   h-10">


  <div class="flex   w-full justify-between">

    <div>

      <h1 class="font-sans font-bold text-lg p-4 pt-0 pr-1">
       ${data.title};
      </h1>
    </div>


    <div>

      <button class="btn btn-square btn-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</div>`;





  completeSection.appendChild(div);


  const btn = div.querySelector(".btn");
  btn.addEventListener('click', () => {
    console.log("hey");
    deleteAPI(data);
  });

}










// TODO section operation by API
async function completeSectionAPI() {
  const res = await fetch(`${API_BASE_URL}/${USER_ID}/todos`);
  const result = await res.json();
  console.log(result);
}

async function todoSectionAPI() {
  const errorBox  = document.querySelector('#errorBox');
  try {
    
    const res = await fetch(`${API_BASE_URL}/${USER_ID}/todos`, {
      method: "POST",
      
      body: JSON.stringify({
        title: input.value,
      }),
    });
    if(!res.ok) {
      const data = await res.json();
      console.log(data.fieldErrors.title);

      errorBox.classList.remove("hidden");
      // errorBox.classList.remove("hidden");
    errorBox.innerHTML = `
    ${data.fieldErrors.title};
    `;
    // console.log(errorBox.innerHTML);

    return;
  }
  showAll();
} catch (error) {
  
  console.log("heyyyyyyy your API got caught brooooooooo");
  
  
  
}
errorBox.classList.add("hidden");

 
}



completeSectionAPI();