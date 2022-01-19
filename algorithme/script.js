let card_grid =document.querySelector('.card');
let search_input =document.querySelector('.input_search')
let search_btn =document.querySelector('.link_search');
let keys_api ='7843f8d22a43911f15301ef8d76338ae';
let Form_search =document.querySelector('#form');
let firstPage =5;
 let textCard;






 fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${keys_api}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false`)
  .then(reponse =>reponse.json())
 .then(data =>{
  console.log(data.results)
      DisplayMovie(data.results);
      
      // var title_card =document.querySelector(` ${data[i].title}`)
})
.catch( (error) => console.log(' une erreur est survenue'));





Form_search.addEventListener('submit',(e)=>{
  e.preventDefault();
  console.log(search_input.value)
  if(search_input.value ){
    
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${keys_api}&query=${search_input.value}`)
    .then(reponse =>reponse.json())
    .then( data => {
      console.log(data)
      DisplayMovie(data.results)

    })
  }else{
    alert('film non trouve');
  }
})
Form_search.addEventListener('keyup',(e)=>{
  e.preventDefault();
  console.log(search_input.value)
  if(search_input.value ){
    
   fetch(`https://api.themoviedb.org/3/search/movie?api_key=${keys_api}&query=${search_input.value}`)
   .then(reponse =>reponse.json()) 
   .then( data => {
      console.log(data)
     DisplayMovie(data.results)

    })
  }else{
    alert('film non trouve');
  }
})


  
function DisplayMovie(data){
    card.innerHTML="";
 
    if( data.results !=0){
      for(let i=0; i< data.length;i++){
        card.innerHTML +=`
        <div class="card-group col-md-3 ">
        <div class="profile-photo card " onclick="DisplayMo(${data[i].id})">
            <img class=" img_card" src=" https://image.tmdb.org/t/p/w500${data[i].poster_path}" alt="photo">
           <div class ="card-body">
           <h2 class="title_card"> ${data[i].title} </h2>
           <p class="text_card" > 
           ${data[i].overview}
           <span> ${data[i].release_date}</span>
           </p>
           
           </div>
        </div>
        
       
      
    </div>
        
        `
      }
    }
}

function DisplayMo(id){
  console.log(id)
 
 
  fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${keys_api}`)
  .then(reponse =>reponse.json())
  .then( data => { console.log(data)
  card.innerHTML =`
  <div class="card-group col-md-3>
  <div class="profile-photo card " >
      <img class=" img_card" src=" https://image.tmdb.org/t/p/w500${data.poster_path}" alt="photo" style="width:100%">
     <div class ="card-body">
     <h2 class="title_card"> ${data.title} </h2>
     <p class="text_card" style="display:block"> 
    
     ${data.overview}
     <span  style="display:block"> ${data.release_date}</span>
     </p>
   
     </div>
  </div>
  
 
</div>
  
  `
  })
 
}


// pagination


function page1() {

  console.log("cool");
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${keys_api}&language=en-US&page=1`
    )
    .then(reponse =>reponse.json())
    .then((resp) =>{ 
      DisplayMovie(resp.results)
      console.log(resp)}
    );
}


function page2() {
  console.log("cool");
  fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${keys_api}&language=en-US&page=2`
    )
    .then(reponse =>reponse.json())
    .then((resp) => DisplayMovie(resp.results));
}
function page3() {
  console.log("cool");
  fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${keys_api}&language=en-US&page=2`
    )
    .then(reponse =>reponse.json())
    .then((resp) => DisplayMovie(resp.results));
}


let ajout = 3;
function Next() {
  ajout++;
  console.log("ajout");
 fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${keys_api}&language=en-US&page=${ajout}`
    )
    .then(reponse =>reponse.json())
    .then((resp) => DisplayMovie(resp.results));
}

let diminue = -1;
function preview() {
  diminue--;
  console.log("ajout");
 fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${keys_api}&language=en-US&page=${diminue}`
    )
    .then(reponse =>reponse.json())
    .then((resp) => DisplayMovie(resp.results));
}
  
  


//scroll infinie

function loadPage() {
  let page = 1;

  window.addEventListener("scroll", (e) => {
    //console.log(scrollY)

    const { scrollTop , scrollHeight, clientHeight } = document.documentElement;
    let defiler = scrollHeight - clientHeight;

    if (scrollY == defiler) {
      page++;

      fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${keys_api}&language=en-US&page=${page}`
        )
        .then((resp) => resp.json())
        .then(data =>{
          let ElementData = data.results

          for (let i = 0; i < ElementData.length; i++) {
            card.innerHTML += `
                  <div class="card-group col-3">
              <div class="card" onclick="DisplayMo(${ElementData[i].id})">
                <img src="https://image.tmdb.org/t/p/w500${ElementData[i].poster_path}" class="card-img-top" alt="image1">
                <div class="card-body">
                  <a href="#" id="lien">
                  <h5 class="card-title">${ElementData[i].title}</h5>
                  </a>
                  <p class="card-text" style ="display:none">${ElementData[i].overview}</p>
                  <p class="text-date" style = "display:none" style = "color:red">${ElementData[i].release_date}</p>
                </div>
              </div>
              </div>
                  `;
          }
        })
      
    }
  });
}

// loadPage();

let timeOut;
function attente (){
  timeOut = window.setTimeout(loadPage,1000)
}

attente ();
