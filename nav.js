export function nav() {
  document.body.innerHTML =
    `    <nav class="navbar navbar-expand-lg navbar-light justify-content-between px-4">


        <a class="navbar-brand" href="main.html"><img src="recipedia.png" alt=""></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="main.html">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link " aria-current="page" href="login.html" id="logout">Log Out</a>
          </li>
        </ul>


          <form class="d-flex form-inline">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="search">
            <button class="btn btn-primary" type="submit" id="search-btn">Search</button>          </form>

    </nav>`




updateListeners()
}

export function updateListeners(){
  const searchBtn = document.getElementById('search-btn')
  const search = document.getElementById('search')
  const logout = document.getElementById('logout')


  searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    window.location.href = `search.html?query=${search.value}`
    console.log('ok')

  })

  logout.addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.removeItem('login')
    window.location.href = 'login.html'

  })
}