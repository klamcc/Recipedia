import { get } from './user.js'
import { apiKey } from './key.js'
const recipes = document.querySelector('.recipes')
function fetchPopular() {
    console.log('asdsa')
    fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=9`).then(res => res.json()).then(data => {

      
        loadRecipes(data.recipes)
    }).catch((error) => {
        console.log(error)
    })
}

function loadRecipes(data) {
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
}

function addRecipe(recipeRow, recipe) {
  
    recipeRow[recipeRow.length - 1].innerHTML += `        
    <div class="col-sm">
      <div class="recipe bg-light">
      <img
        src="${recipe.image}"
        alt=""></img>
      <div class="recipe-info d-flex flex-column justify-content-between p-3 h-100">
      <div>
      <div class="d-flex justify-content-between gap-2">
        <h3 class="fw-bold d-inline">${recipe.title}</h3>
                <div class="dropdown-center">
            <i class="fa-solid fa-circle-plus fa-2x add " type="button" data-bs-toggle="dropdown" aria-expanded="false">
            </i>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Favourites</a></li>
                <li><a class="dropdown-item" href="#">List 1</a></li>
                <li><a class="dropdown-item" href="#">List 2</a></li>
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

}

fetchPopular()

async function loadUser(){
  let data = await get()
  console.log(data[localStorage.getItem('login')])
}


loadUser()