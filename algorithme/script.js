
let card_grid =document.querySelector('.card');
let search_input =document.querySelector('.input_search')
let search_btn =document.querySelector('.link_search');
let keys_api ='7843f8d22a43911f15301ef8d76338ae';
let Form_search =document.querySelector('#form');



fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${keys_api}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false`)
.then( reponse => reponse.json())
.then(data =>{
  console.log(data.results)
      displayFilm(data.results);
      var title_card =document.querySelector(` ${data[i].title}`)
})
.catch( (error) => console.log(' une erreur est survenue'));





Form_search.addEventListener('submit',(e)=>{
  e.preventDefault();
  console.log(search_input.value)
  if(search_input.value ){
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${keys_api}&query=${search_input.value}`)
    .then(res => res.json())
    .then( data => {
      console.log(data)
      displayFilm(data.results)

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
    .then(res => res.json())
    .then( data => {
      console.log(data)
      displayFilm(data.results)

    })
  }else{
    alert('film non trouve');
  }
})
  

  
function displayFilm(data){
    card.innerHTML="";
  
    if( data.results !=0){
      for(let i=0; i< data.length;i++){
        card.innerHTML +=`
        <div class="card-group col-md-3 ">
        <div class="profile-photo card " onclick="selection(${data[i].id})">
            <img class=" img_card" src=" https://image.tmdb.org/t/p/w500${data[i].poster_path}" alt="photo">
           <div class ="card-body">
           <h2 class="title_card"> ${data[i].title} </h2>
           <p class="text-card"> 
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

function selection(id){
  console.log(id)
  fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${keys_api}`)
  .then(res => res.json())
  .then( data => { console.log(data)

  card.innerHTML =`
  <div class="card-group col-md-3 ">
  <div class="profile-photo card " >
      <img class=" img_card" src=" https://image.tmdb.org/t/p/w500${data.poster_path}" alt="photo">
     <div class ="card-body">
     <h2 class="title_card"> ${data.title} </h2>
     <p class="text-card"> 
     ${data.overview}
     <span> ${data.release_date}</span>
     </p>
     
     </div>
  </div>
  
 

</div>
  
  `
  })
}
