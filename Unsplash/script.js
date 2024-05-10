const input = document.getElementById('input');
const button = document.getElementById('button');
const list = document.getElementById('list');
const showMore = document.getElementById('showMore');
const landscope = document.getElementById('landscope');
const portrait = document.getElementById('portrait');


// button.addEventListener('click', () => {
    //   const inputValue = input.value;
    // //   console.log(inputValue);
    // });
    let mode = "portrait";
    let pages = 1;
    async function main(search_input) {
        try {
        list.innerHTML = "";
        const response = await fetch(`https://api.unsplash.com/search/photos/?client_id=7xYkovYppynf7sq9uc1W-rpwNiK7-JktLXPomYbS0JY&query=${search_input}&page=${pages}&orientation=${mode}`);
        const data = await response.json();
        console.log(data);
        console.log(search_input);

        for(let i = 0; i < data.results.length; i++) {
            // console.log(data.results[i].urls.full);
            const url = data.results[i].urls.small;
            console.log(data.results[i].urls);
            const div = document.createElement('div');

            // div.style.add("display: flex;","flex: 1 200px;","height: 400px;","width: 400px;","margin: 10px;");
            // div.classList.add("myDiv");
            div.style.display ='flex';
            div.style.flex ='1';
            div.style.height = '50%';
            div.style.width = '50%';
            div.innerHTML = `
           
            <img src = "${url}">
            `
            list.appendChild(div);


            showMore.style.visibility = "";

        }
         
    } catch (error) {
            console.log(new Error ("My Unsplash API Erro "));
    }
    
}



button.addEventListener('click', ()=> {
    main(input.value);
    pages = 1;
    console.log(input.value);
});

showMore.addEventListener('click', ()=> {
    pages++;
    main(input.value);
});

portrait.addEventListener('click', ()=> {
    mode = "portrait";
    main(input.value);
});

landscope.addEventListener('click', ()=> {
    mode = "landscape";
    main(input.value);
});
