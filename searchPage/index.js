const searchBar = document.querySelector("#search-bar")
const searchBarBtn = document.querySelector("#search-bar-btn")
const main = document.querySelector("#main")
searchBarBtn.addEventListener("click", async () => {
    main.innerHTML = ""
    const res = await fetch(`http://www.omdbapi.com/?apikey=ca17555b&s=${searchBar.value}&type=movie`)
    const data = await res.json()
    console.log(data.Search)
    for (let i=0; i<10; i++) {
       const res2 = await fetch(`http://www.omdbapi.com/?apikey=ca17555b&i=${data.Search[i].imdbID}&plot=full`)
       const data2 = await res2.json()
       console.log(data2)
       main.innerHTML += `
        <div class="movie-container">
            <im alt="picture of le movie" src="${data2.Poster}">
            <h2 class="movie-title">${data2.Title}</h2>
            <p class="rating">${data2.Rating}</p>
            <p class="duration">${data2.duration}</p>
            <p class="genres">${data2.Genre}</p>
            <button class="watchlist-add-btn">+</button>
            <p class="watchlist-add-btn-description">watchlist</p>
            <p class="plot">${data2.Plot}</p>
        </div>
       
       
       
       
       `
    }   
})


