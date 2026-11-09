const searchBar = document.querySelector("#search-bar")
const searchBarBtn = document.querySelector("#search-bar-btn")
const main = document.querySelector("#main")
const movieArray = []
const searchFunction = async () => {
    main.innerHTML = ""
    const res = await fetch(`http://www.omdbapi.com/?apikey=ca17555b&s=${searchBar.value}&type=movie`)
    const data = await res.json()
    if (data.Response === "True") {
        for (let i=0; i<10; i++) {
       const res2 = await fetch(`http://www.omdbapi.com/?apikey=ca17555b&i=${data.Search[i].imdbID}&plot=short`)
       const data2 = await res2.json()
       if (localStorage.getItem(data.Search[i].imdbID)) {
         main.innerHTML += `
        <div class="movie-container">
            <img alt="picture of le movie" src="${data2.Poster}">
            <h2 class="movie-title">${data2.Title}</h2>
            <p class="rating"><i class="ph ph-star ph-fill"></i>${data2.Ratings[0].Value}</p>
            <p class="duration">${data2.Runtime}</p>
            <p class="genres">${data2.Genre}</p>
            <div class="watchlist-add-btn-container">
               <p>ADDED!</p>
            </div>
            <p class="plot">${data2.Plot}</p>
        </div> 
       `
       } else {
        main.innerHTML += `
        <div class="movie-container">
            <img alt="picture of le movie" src="${data2.Poster}">
            <h2 class="movie-title">${data2.Title}</h2>
            <p class="rating"><i class="ph ph-star ph-fill"></i>${data2.Ratings[0].Value}</p>
            <p class="duration">${data2.Runtime}</p>
            <p class="genres">${data2.Genre}</p>
            <div class="watchlist-add-btn-container">
                <button class="watchlist-add-btn" data-movie=${data.Search[i].imdbID}>+</button>
                <p class="watchlist-add-btn-description">watchlist</p>
            </div>
            <p class="plot">${data2.Plot}</p>
        </div> 
       `
       }
        
       
    }   
    } else {
        main.innerHTML = `<h2 class="center">Unable to find what you’re looking for. Please try another search.</h2>`
    }
    console.log(data.Search)
   
}

searchBarBtn.addEventListener("click", searchFunction)

document.addEventListener("click", async (e) => {
    if (e.target.dataset.movie) {
        const res = await fetch(`http://www.omdbapi.com/?apikey=ca17555b&i=${e.target.dataset.movie}&plot=short`)
        const data = await res.json()
        let placeholder = ""
        placeholder =
        `
        <div class="movie-container">
            <img alt="picture of le movie" src="${data.Poster}">
            <h2 class="movie-title">${data.Title}</h2>
            <p class="rating"><i class="ph ph-star ph-fill"></i>${data.Ratings[0].Value}</p>
            <p class="duration">${data.Runtime}</p>
            <p class="genres">${data.Genre}</p>
            <div class="watchlist-add-btn-container">
                <button class="watchlist-add-btn" data-movie=${e.target.dataset.movie} >-</button>
                <p class="watchlist-add-btn-description">remove</p>
            </div>
            <p class="plot">${data.Plot}</p>
        </div> 
       `
       localStorage.setItem(`${e.target.dataset.movie}`, JSON.stringify(placeholder))
       e.target.parentElement.innerHTML = "<p>ADDED!</p>"
    } else {
    }
})

searchBar.addEventListener("keypress", (e) => {
    if(e.keyCode === 13) {
        searchFunction()
    }
})
