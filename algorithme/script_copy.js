let card_grid = document.querySelector(".card");
let search_input = document.querySelector(".input_search");
let search_btn = document.querySelector(".link_search");
let keys_api = "7843f8d22a43911f15301ef8d76338ae";

fetch(
  `https://api.themoviedb.org/3/discover/movie?api_key=${keys_api}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false`
)
  .then((reponse) => reponse.json())
  .then((data) => {
    console.log(data.results);
    displayFilm(data.results);
    var title_card = document.querySelector(` ${data[0].title}`);
  })
  .catch((error) => console.log(" une erreur est survenue"));

search_btn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(search_input.value);
  if (search_input.value) {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${keys_api}&query=${search_input.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        displayFilm(data.results);
      });
  } else {
    alert("film non trouve");
  }
});

function Detail(){
    
  function displayFilm(data) {
    card.innerHTML = "";
    if (data.results != 0) {
      card.innerHTML += `
      <div class="card-group col-md-6 ">
      <div class="profile-photo card ">
          <img class=" img_card" src=" https://image.tmdb.org/t/p/w500${data[0].poster_path}" alt="photo">
         <div class ="card-body">
         <h2 class="title_card"> ${data[0].title} </h2>
         <p class="text-card"> 
         ${data[0].overview}
         <span> ${data[0].release_date}</span>
         </p>
         
         </div>
      </div>
      
     
    
    </div>
      
      `
    }
  }
    }
title_card.addEventListener("click", () => {
  console.log("hello");
});
