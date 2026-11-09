const main = document.querySelector("#main")

const render = () => {
if (localStorage.length > 0) {
    main.innerHTML = ""
    for (let i =0; i < localStorage.length; i++) {
    main.innerHTML += 
    JSON.parse(localStorage.getItem(localStorage.key(i)))
}
} else {
    main.innerHTML = `
                <div class="outer-main-container">
                    <h2 class="gray">Your watchlist is looking a little empty...</h2>
                    <div class="main-container" id="main-container">
                        <button class="watchlist-add-btn">+</button>
                        <h3>Lets add some movies</h3>
                    </div>
                </div>`
}
}

document.addEventListener("click", async (e) => {
    if (e.target.dataset.movie) {
        localStorage.removeItem(e.target.dataset.movie)
        render()
    }
})
render()