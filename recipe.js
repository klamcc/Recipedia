import { apiKey } from "./key.js";
import { update } from './user.js';
import { get } from './user.js';

const id = new URLSearchParams(window.location.search).get('id');
const recipe = document.querySelector('.recipe-details')

let data = await get()
let updatedData = data[1]
let user = data[0]
console.log('asds')
fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`).then(res => res.json()).then(data => {
    console.log(data)

    if (!user['history'].includes(data)) {
        console.log('added history')
        updatedData[localStorage.getItem('login')]['history'].unshift(data)
        console.log(updatedData)
        update(JSON.stringify(updatedData))
    }


    recipe.innerHTML = `        
    <div class="w-50 recipe-details d-flex flex-column gap-4 p-2">
            <div>
                <h1 class="fw-bold blue">${data.title}</h1>
                <p class="">By ${data.creditsText}</p>


                <div class="w-100"><img
                        src="${data.image}"
                        alt="" class="rounded">
                </div>
            </div>
            <div>
                <h2>Instructions</h2>
                <p>${data.instructions}</p>
            </div>


        </div>

        <div class="w-50 recipe-details d-flex flex-column gap-4 bg-light p-4 rounded">
            <div>
                <div class="mb-3">
                    <h5><span class="fw-bold">Health Score:</span> ${data.healthScore}</h5>
                    <h5><span class="fw-bold">Ready In:</span> ${data.readyInMinutes} mins</h5>
                    <h5><span class="fw-bold">Servings:</span> ${data.servings}</h5>
                    <a class="blue" href=${data.sourceUrl}"">${data.sourceUrl}</a>
                </div>

                <h1>Summary</h1>
                <p>${data.summary}</p>

                <h1 class="">Ingredients</h1>
                <ul class="ingredients">

                </ul>

            </div>
            <div>


            </div>


        </div>`
    const ingredients = document.querySelector('.ingredients')
    ingredients.innerHTML = ''
    data.extendedIngredients.forEach((ingredient) => {
        ingredients.innerHTML += `<li>${ingredient.amount} ${ingredient.unit} ${ingredient.nameClean}</li>`
    })
})




