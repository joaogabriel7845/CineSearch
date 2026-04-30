const API_KEY = '4b45ba95d0309cc802236de4b0e193f9'
const BASE_URL = 'https://api.themoviedb.org/3'
const PARAM = `&api_key=${API_KEY}&language=pt-BR&region=BR&include_adult=false`
const PARAM_DETAILS = `?api_key=${API_KEY}&language=pt-BR&region=BR&include_adult=false`

const urlPopulares = () => `${BASE_URL}/movie/popular?page=${paginaAtual}${PARAM}`
const urlBusca = () => `${BASE_URL}/search/movie?query=${termoPesquisa}&page=${paginaAtual}${PARAM}`
const urlDetalhes = (id) => `${BASE_URL}/movie/${id}${PARAM_DETAILS}`
const urlCreditos = (id) => `${BASE_URL}/movie/${id}/credits${PARAM_DETAILS}`
const urlTrailer = (id) => `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=pt-BR`
const urlTrailerFallback = (id) => `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
