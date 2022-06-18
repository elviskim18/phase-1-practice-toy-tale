let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToyData()

  document.querySelector(".add-toy-form").addEventListener("submit", handleSubmit)
});

//handle Events
function handleSubmit(e){
  e.preventDefault()
  let newtoy ={
    "name":e.target.name.value,
    "imageUrl":e.target.image.value,
    "likes":0
  }
  renderToy(newtoy)
  addToyData(newtoy)
}
//render each toy
function renderToy(toy){
  let card = document.createElement('div');
  card.className = 'card';
  card.innerHTML =`
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar">  
  <p id="likesP">${toy.likes} likes</p>
  <button id="likeBtn">like</button>
  `                                      //image not loading
  card.querySelector("#likeBtn").addEventListener('click', (event) =>{
    event.preventDefault()   //page refreshes after clicking
    toy.likes += 1;
    card.querySelector("#likesP").textContent = toy.likes +" " +"likes"
    updateLikes(toy)


  
  } )
  document.querySelector('#toy-collection').appendChild(card)   //card to DOM
}

//fetch from json
function getToyData(){
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toyData => toyData.forEach(toy => renderToy(toy)))
  
}

//POST
function addToyData(newtoy){
  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(newtoy)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))

}

//patch
function updateLikes(toy){
  

  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method:'PATCH',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then(res => res.json())
  .then(data => console.log(data))
}