

const searchBtn = document.getElementById('search-btn')
const search = document.getElementById('search')
const logout = document.getElementById('logout')


searchBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    window.location.href = `search.html?query=${search.value}`

})

logout.addEventListener('click',(e)=>{
    e.preventDefault()
    localStorage.removeItem('login')
    window.location.href = 'login.html'
})
