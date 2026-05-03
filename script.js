const contentContainer = document.querySelector(".content-container")
const gridMovies = document.querySelector(".movies-container")
const sliderContainer = document.querySelector(".slide-track")
const loadingMoreBtn = document.getElementById("loadingMore")
const moreMoviesGrid = document.querySelector(".more-movies-grid")
const loadingContainerBtnHome = document.querySelector(".loading-container")
const gridContainerMovies = document.querySelector(".movie-grid")
const btnHome = document.getElementById("homeBtn")
const loadingMoreMoviesGrid = document.getElementById("loadingMoreMoviesGrid")
const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")
const searchInputHome = document.getElementById("searchInputHome")
const searchBtnHome = document.getElementById("searchBtnHome")
const notFoundContainer = document.querySelector(".no-result-search-container")
const containerAreaNotFound = document.querySelector(".container-grid-movies")
const toastContainer = document.querySelector(".toast-container")
const toastBody = document.querySelector(".toast-body")
const btnCloseToast = document.getElementById("btnCloseToast")
const detailsPage = document.querySelector(".details-page")
const backBtnDetailsPage = document.getElementById("backBtn")
const detailBackdrop = document.querySelector(".detail-backdrop")
const detailContent = document.querySelector(".detail-content")
const detailPoster = document.querySelector(".detail-poster")
const detailInfo = document.querySelector(".detail-info")
const detailTitle = document.querySelector(".detail-title")
const detailYear = document.querySelector(".detail-year")
const detailOverview = document.querySelector(".detail-overview")
const detailRating = document.querySelector(".detail-rating")
const detailMeta = document.querySelector(".detail-meta")
const swiperWrapper = document.querySelector(".swiper-wrapper")
const modalLoadBtn = document.getElementById("modalLoadBtn")
const modalClose = document.querySelector(".modal-close")
const modalTrailer = document.querySelector(".modal-trailer")
const trailerFrame = document.getElementById("trailerFrame")
const IMG_URL = "https://image.tmdb.org/t/p/w500"
const IMG_URL_BACKDROP = "https://image.tmdb.org/t/p/original"


// ESTADOS

let paginaAtual = 1
let pesquisaInicial = ""
let termoPesquisa = ""
let castSwiper = null
let filmesExibidos = new Set()
let filmeAtualId = null


// FUNÇÕES 

async function init() {
    const filmes = await popularMovies()
    exibirPoster(filmes)
}

async function fetchFilmes(url) {
    const r = await fetch(url)
    return await r.json()
}

async function buscarFilmes(nameMovie) {

    paginaAtual = 1
    termoPesquisa = nameMovie
    gridContainerMovies.innerHTML = ""
    filmesExibidos.clear()

    let moviesValidos = []

    while (moviesValidos.length < 20) {
        // const r = await fetch(`https://api.themoviedb.org/3/search/movie?query=${nameMovie}&api_key=${API_KEY}&language=pt-BR&region=BR&page=${paginaAtual}&include_adult=false`)
        // const dados = await r.json()

        const dados = await fetchFilmes(urlBusca())

        if (!dados.results.length) {
            loadingMoreMoviesGrid.classList.add("hidden-btn")
            break
        }

        const filtrados = dados.results.filter(f =>
            f.poster_path && f.overview !== "" && !filmesExibidos.has(f.id)
        )

        moviesValidos = [...moviesValidos, ...filtrados]

        if (moviesValidos.length < 20) paginaAtual++
        console.log(dados)

    }
    if (moviesValidos.length === 0) {
        searchInput.value = termoPesquisa
        gridContainerMovies.style.display = "none"
        notFoundContainer.classList.remove("hidden")
        loadingMoreMoviesGrid.classList.add("hidden-btn")
    } else {
        exibirFilmes(moviesValidos.slice(0, 20))
        searchInput.value = termoPesquisa
        gridContainerMovies.style.display = "flex"
        notFoundContainer.classList.add("hidden")
        loadingMoreMoviesGrid.classList.remove("hidden-btn")
    }



}

async function popularMovies() {

    let filmesValidos = []

    while (filmesValidos.length < 20) {
        // const r = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&region=BR&page=${paginaAtual}&include_adult=false`)
        // const dados = await r.json()

        const dados = await fetchFilmes(urlPopulares())

        const filtrados = dados.results.filter(f =>
            f.poster_path && f.overview !== "" && !filmesExibidos.has(f.id)
        )

        filmesValidos = [...filmesValidos, ...filtrados]

        if (filmesValidos.length < 20) paginaAtual++

    }

    // Garante que os filmes que passaram pela verificação sempre preencha o espaço de 20 filmes por página
    return filmesValidos.slice(0, 20)
}

function exibirFilmes(filmes) {

    filmes.forEach(filme => {

        const posterMovie = filme.poster_path
        const idMovie = filme.id

        if (!posterMovie || filmesExibidos.has(filme.id)) return

        filmesExibidos.add(filme.id)


        let div = document.createElement("div")
        div.dataset.id = filme.id
        div.classList.add("card-movie")

        div.innerHTML = `<img src="${IMG_URL}${posterMovie}" alt="${filme.title}">`
        console.log(paginaAtual)


        gridContainerMovies.appendChild(div)
    })
}

function exibirPoster(filmes) {

    filmes.forEach((movie) => {
        criarSlides(movie)
    })

    filmes.forEach((movie) => {
        criarSlides(movie)
    })

}

function criarSlides(movie) {
    let div = document.createElement("div")
    div.classList.add("slide")

    div.innerHTML = `
    <img src="${IMG_URL}${movie.poster_path}" alt="${movie.title}">
    `
    sliderContainer.appendChild(div)

}

async function addMoviesOnGrid() {

    paginaAtual++

    let filmes

    if (termoPesquisa === "") {
        filmes = await popularMovies()
    } else {

        let moviesValidos = []

        while (moviesValidos.length < 20) {
            const dados = await fetchFilmes(urlBusca())

            if (!dados.results.length) {
                loadingMoreMoviesGrid.classList.add("hidden-btn")
                break
            }

            const filtrados = dados.results.filter(f =>
                f.poster_path && f.overview !== "" && !filmesExibidos.has(f.id)
            )

            moviesValidos = [...moviesValidos, ...filtrados]
            console.log(moviesValidos)

            if (moviesValidos.length < 20) paginaAtual++
        }

        filmes = moviesValidos.slice(0, 20)

    }

    exibirFilmes(filmes)
}

function verMaisFilmes() {

    termoPesquisa = ""
    paginaAtual = 0

    searchInput.value = ""

    contentContainer.style.display = "none"
    moreMoviesGrid.classList.remove("hidden")
    loadingContainerBtnHome.classList.add("hidden")

    gridContainerMovies.innerHTML = ""
    filmesExibidos.clear()

    addMoviesOnGrid()

}

function showToast(erro) {

    toastBody.innerHTML = `${(erro)}`

    toastContainer.classList.remove("hidden", "toast-show", "toast-hide")
    toastContainer.classList.add("toast-show")

    setTimeout(() => {
        toastContainer.classList.remove("hidden")
        toastContainer.classList.add("toast-hide")
    }, 2000)

}


function formatarDuracao(minutos) {
    const horas = Math.floor(minutos / 60)
    const mins = minutos % 60
    return `${horas}h ${mins}min`
}


// EVENT LISTENERS

loadingMoreBtn.addEventListener("click", verMaisFilmes)

loadingMoreMoviesGrid.addEventListener("click", addMoviesOnGrid)

modalLoadBtn.addEventListener("click", async () => {

    let videos = await fetchFilmes(urlTrailer(filmeAtualId))

    if (!videos.results.length) {
        videos = await fetchFilmes(urlTrailerFallback(filmeAtualId))

        if (!videos.results.length) {
            showToast("Não foi possivel encontrar o trailer")
        }
    }

    const trailer = videos.results.find(v => v.type === "Trailer" && v.site === "YouTube")

    if (trailer) {
        trailerFrame.src = `https://www.youtube.com/embed/${trailer.key}`
        modalTrailer.classList.remove("hidden")
        detailsPage.style.overflowY = "auto"
    }

})



gridContainerMovies.addEventListener("click", async function (e) {

    const card = e.target.closest(".card-movie")
    
    if (!card) return
    document.body.style.overflow = "hidden"

    swiperWrapper.innerHTML = ""
    detailBackdrop.innerHTML = ""

    if (castSwiper) {
        castSwiper.destroy(true, true)
        castSwiper = null
    }

    const id = card.dataset.id
    filmeAtualId = id

    // Detalhes dos filmes
    const filme = await fetchFilmes(urlDetalhes(id))

    console.log(filme)

    // Elenco dos filmes
    const credits = await fetchFilmes(urlCreditos(id))
    const elenco = credits.cast


    elenco.forEach(actor => {

        const pfActor = actor.profile_path

        let div = document.createElement("div")
        div.classList.add("swiper-slide")

        div.innerHTML = `
        ${pfActor
                ? `<img src="${IMG_URL}${actor.profile_path}" alt=""></img>`
                : `<div class="no-photo"><i class="bi bi-person-fill"></i></div>`
            }
        <p>${actor.original_name}</p>
        `
        swiperWrapper.appendChild(div)
    })

    let backdropImage = document.createElement("img")
    backdropImage.src = `${IMG_URL_BACKDROP}${filme.backdrop_path}`

    detailsPage.classList.remove("hidden")

    detailBackdrop.appendChild(backdropImage)
    detailPoster.src = `${IMG_URL}${filme.poster_path}`
    detailTitle.innerHTML = `${filme.title}`
    detailOverview.innerHTML = `${filme.overview}`
    detailMeta.innerHTML = `${filme.release_date.slice(0, 4)} | ${formatarDuracao(filme.runtime)} | ${Number(filme.vote_average).toFixed(2)} <i class="bi bi-star-fill" style="color: rgb(255, 217, 0);"></i>`

    castSwiper = new Swiper('.swiper', {

        direction: 'horizontal',
        grabCursor: true,
        slidesPerView: 9,
        loop: true,

        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },

        pagination: {
            el: '.swiper-pagination',
        },

        navigation: {
            nextEl: '.next',
            prevEl: '.prev',
        },

        breakpoints: {

            320: {
                slidesPerView: 3,
            },

            480: {
                slidesPerView: 3,
            },

            640: {
                slidesPerView: 4,
            },

            1024: {
                slidesPerView: 6,
            },

            1280: {
                slidesPerView: 9,
            }
        },

    });


})

backBtnDetailsPage.addEventListener("click", () => {
    detailsPage.classList.add("hidden")
    swiperWrapper.innerHTML = ""
    document.body.style.overflow = ""
    trailerFrame.src = ""
    modalTrailer.classList.add("hidden")
    detailsPage.style.overflowY = ""
    document.body.style.overflowY = ""

})

searchInputHome.addEventListener("keydown", (e) => {


    if (e.key === "Enter") {
        if (searchInputHome.value.trim() === "") {
            showToast("Busca Inválida")
            return
        }
        const termo = searchInputHome.value.trim()

        contentContainer.style.display = "none"
        moreMoviesGrid.classList.remove("hidden")
        loadingContainerBtnHome.classList.add("hidden")

        buscarFilmes(termo)
    }
})

searchBtnHome.addEventListener("click", () => {

    if (searchInputHome.value.trim() === "") {
        showToast("Busca Inválida")
        return
    }
    const termo = searchInputHome.value.trim()

    contentContainer.style.display = "none"
    moreMoviesGrid.classList.remove("hidden")
    loadingContainerBtnHome.classList.add("hidden")

    buscarFilmes(termo)
})

searchInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
        if (searchInput.value.trim() === "") {
            showToast("Busca Inválida")
            return
        } else {
            buscarFilmes(searchInput.value)
        }
    }
})

searchBtn.addEventListener("click", () => {

    if (searchInput.value.trim() === "") {
        showToast("Busca Inválida")
        return
    }

    gridContainerMovies.innerHTML = ""
    console.log(searchInput.value)
    buscarFilmes(searchInput.value)
})

btnHome.addEventListener("click", () => {
    paginaAtual = 0
    gridContainerMovies.innerHTML = ""
    searchInputHome.value = ""

    contentContainer.style.display = "flex"
    moreMoviesGrid.classList.add("hidden")
    loadingContainerBtnHome.classList.remove("hidden")
    notFoundContainer.classList.add("hidden")
    gridContainerMovies.style.display = "flex"
    filmesExibidos.clear()


})

toastContainer.addEventListener("animationend", (e) => {
    if (e.animationName === "notifyClose") {
        toastContainer.classList.add("hidden")
    }
})


// INICIALIZAÇÃO
init()