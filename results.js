import { apiKey } from './key.js'


const query = new URLSearchParams(window.location.search).get('query');
const recipes = document.querySelector('.recipes')
const resultContainer = document.querySelector('.results')
const load = document.querySelector('.load')

console.log('asdasdas')
let offset = 0
let number = 9
function fetchResults() {

    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=${number}&apiKey=${apiKey}`).then(res => res.json()).then(data => {
        loadRecipes(data.totalResults, data.results)
        console.log(data)
    }).catch(error => {
        console.log(error)
    })

}

function loadRecipes(total, data) {
    let row = 0
    console.log(data)
    recipes.innerHTML = `      
    <div class="d-flex mb-4 justify-content-between">
        <h2 class="fw-bold blue">${total} Results for '${query}'</h2>
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

    load.addEventListener('click', () => {
        number += 9
        fetchResults()
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
      <div  class="d-flex justify-content-between gap-2">
        <h3 class="fw-bold d-inline ">${recipe.title}</h3>
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
        <div>
          <hr>
          <a     href="recipe.html?id=${recipe.id}" class=" btn btn-outline-danger view stretched-link">View</a>
        </div>
        
      </div>
    
    </div>`

}

fetchResults()