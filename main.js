import { get } from './user.js'
import { update } from './user.js'
import { apiKey } from './key.js'
import { nav, updateListeners } from './nav.js'


nav()

document.body.innerHTML += `  <div class="hero mx-4"></div>

  <div class="min-vh-100 d-flex justify-content-between p-4 main gap-4">

    <div class="recipes h-100">
    </div>
  <div class="d-flex flex-column min-vh-100 main-r gap-2">
        <div class="history d-flex flex-column ml-2 gap-2  w-100"></div>
        
        <div class="lists d-flex flex-column gap-2  "></div>

  </div>
  </div>
`

let recipes = document.querySelector('.recipes')
let history = document.querySelector('.history')
let lists = document.querySelector('.lists')

let data = await get(localStorage.getItem('login'))

let user = data[0]
console.log(user)




function fetchPopular() {
  console.log('asdsa')
  fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1`).then(res => res.json()).then(data => {


    loadRecipes(data.recipes)
  }).catch((error) => {
    console.log(error)
  })
}


function loadRecipes(data) {
  //POPULAR
  let row = 0
  console.log(data)
  recipes.innerHTML = `      
    <div class="d-flex mb-4 justify-content-between">
        <h2 class="fw-bold blue">Popular Recipes</h2>
        <button class="btn btn-primary px-5 refresh btn-orange">Refresh</button>
    </div>
      <div class="flex-row row mb-4">
      </div>`
  let recipeRow = document.querySelectorAll('.row')


  data.forEach((recipe) => {

    if (row < 3) {
      addRecipe(recipeRow, recipe)
      row += 1
    }
    else {
      row = 1
      recipes.innerHTML += `     
            <div class="row flex-row mb-4">   
            </div>`
      recipeRow = document.querySelectorAll('.row')
      addRecipe(recipeRow, recipe)
    }

  })
  let refresh = document.querySelector('.refresh')
  refresh.addEventListener('click', () => {
    fetchPopular()
  })

  //HISTORY
  history.innerHTML = '<h3 class="fw-bold">Recently Visited</h3>'
  console.log(user.history)
  user.history.forEach(recipe => {

    history.innerHTML += `
      <div class=" d-flex gap-2 min-15 position-relative darken w-100 justify-content-between bg-light rounded">
      <div style="background-image:url('${recipe.image}')"class="w-50 history-img rounded-start"></div>
      <div class="w-50 p-2">
      
        <h5 class="fw-bold">${recipe.title}</h5>
      </div>
      <a href="recipe.html?id=${recipe.id}"class="stretched-link"></a>
      </div>`
  })

  //LISTS
  loadList()
  updateListeners()

}


function addRecipe(recipeRow, recipe) {

  recipeRow[recipeRow.length - 1].innerHTML += `        
    <div class="col-sm">
      <div class="recipe hover bg-light z-1">
      <img
        src="${recipe.image}"
        alt=""></img>
      <div class="recipe-info d-flex flex-column justify-content-between p-3 h-100">
      <div>
      <div class="d-flex justify-content-between gap-2">
        <h3 class="fw-bold d-inline">${recipe.title}</h3>
                <div class="dropstart ">
            <i class="fa-solid fa-circle-plus fa-2x add z-3 position-relative" type="button" data-bs-toggle="dropdown" aria-expanded="false ">
            </i>
            <ul class="dropdown-menu" id="${recipe.id}">
            </ul>
        </div>
        </div>
        <p><span class="fw-bold">Cuisine:</span> ${recipe.cuisines.toString()}</p>
        </div>  
        <div>
          <hr>
          <span class="fw-bold"> ${recipe.readyInMinutes} mins</span> <a     href="recipe.html?id=${recipe.id}" class=" btn btn-outline-danger view stretched-link">View</a>
        </div>
        
      </div>
    
    </div>`


  let dropdown = document.getElementById(recipe.id)
  for (let list of Object.keys(user.lists)) {
    let listEl = document.createElement('li')
    listEl.innerHTML = `<a class="dropdown-item" id="${recipe.id}">${list}</a>`
    console.log(listEl)
    dropdown.appendChild(listEl)
  }
  document.querySelectorAll('.dropdown-item').forEach(el => {

    el.addEventListener('click', (e) => {
      if (!data[1][localStorage.getItem('login')].lists[e.target.innerHTML].includes(e.target.id)) {
        user.lists[e.target.innerHTML].push(e.target.id)
        console.log(user.lists)
        save()
        loadList()


      }

    })
  })
  updateListeners()
}

function fetchById(id) {

  return
}

function loadList() {
  lists.innerHTML = '<h3 class="fw-bold">Your Lists</h3>'
  for (let list of Object.keys(user.lists)) {
    let listContainer = document.createElement('div')
    let listEl = document.createElement('div')
    let listItems = document.createElement('div')
    listItems.classList.add('list-items','overflow-auto')
    listEl.innerHTML = `<div><i class="fa-solid fa-angle-up me-3"></i><h5 class="fw-bold d-inline">${list}</h5><div>`
    listEl.classList.add('w-100', 'bg-light', 'rounded', 'p-3', 'align-center', 'list')
    listContainer.appendChild(listEl)
    listContainer.appendChild(listItems)

    listEl.addEventListener('click', () => {
      listEl.classList.toggle('open-icon')
      listItems.classList.toggle('open')
    })

    user.lists[list].forEach(async (id) => {
      let recipe
      console.log(id)
      await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`).then(res => res.json()).then(data => {
        recipe = data
      }).catch((error) => {
        console.log(error)
      })
      console.log(recipe)
      listItems.innerHTML += `
      <div class=" d-flex gap-2 min-15 darken w-100 justify-content-between bg-light rounded position-relative mb-2">
      <div style="background-image:url('${recipe.image}')"class="w-50 history-img rounded-start"></div>
      <div class="w-50 p-2">
      
        <h5 class="fw-bold">${recipe.title}</h5>
      </div>
      <a href="recipe.html?id=${recipe.id}"class="stretched-link"></a>
      </div>`
    })

    lists.appendChild(listContainer)
  }
  let addList = document.createElement('div')
  addList.classList.add('w-100', 'bg-light', 'rounded', 'p-3', 'align-center', 'list')
  addList.innerHTML = `<i class="fa-solid fa-plus me-3"></i><h5 class="fw-bold d-inline">Add list`
  addList.addEventListener('click', () => {
    let listName = prompt('Enter list name:')
    if (listName){
    user.lists[listName] = []
    console.log(user)

    loadList()
    fetchPopular()
    save()
    }else{
      alert('List name cannot be empty.')
    }
  })
  lists.appendChild(addList)
  updateListeners()
}

function save(){
  console.log('saved')
  data[1][localStorage.getItem('login')] = user
  update(JSON.stringify(data[1]))


}

updateListeners()
fetchPopular()

