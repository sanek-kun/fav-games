const allgames = document.querySelector(".allgames")
const searchButton = document.querySelector(".searchButton")
const searchGameInput = document.querySelector(".searchGameInput")
const loadMoreButton = document.querySelector(".loadMoreButton")
const favoriteGamesButton = document.querySelector(".favoriteGamesButton")
import {getGames} from "./api.js"
import { renderGames} from "./render.js"
import { search } from "./datas.js" 
let showFavorites = false
let nextPage = null
let games = null
let favorites = []
if(localStorage.getItem("game")){
        favorites = JSON.parse(localStorage.getItem("game"))
    }else{
        favorites = []
    }


async function loadgames () {
    try {
        const game = await getGames()
        nextPage = game.next
        games = game.results
        renderGames(game.results , allgames , favorites)

        searchButton.addEventListener("click", async () => {
            
            if(showFavorites === true){
                const favoriteSearch = search(favorites , searchGameInput.value)
                renderGames(favoriteSearch , allgames , favorites)
            }else{
                if(!searchGameInput.value){
                    const genGamesIfInputEmpty = await getGames()
                    games = genGamesIfInputEmpty.results
                    renderGames(genGamesIfInputEmpty.results , allgames , favorites)
                    nextPage = genGamesIfInputEmpty.next
                }else{
                    const searchGame = await (getGames(searchGameInput.value))
                    games = searchGame.results
                    renderGames(searchGame.results , allgames , favorites)
                    nextPage = searchGame.next
                }
            }
        })

        loadMoreButton.addEventListener('click' , async ()=>{
            if(showFavorites === false){
                const nextGames = await getGames(nextPage)
                games = [...games , ...nextGames.results]
                console.log(games)
                nextPage = nextGames.next
                renderGames(nextGames.results , allgames , favorites , true)
            }else{
                return
            }
        })

        allgames.addEventListener("click" , (event)=>{

            console.log(event.target.dataset.addToFavorite)

            if(event.target.dataset.addToFavorite){
                let favoriteGames

                if(showFavorites === true){
                    favoriteGames = favorites.find(game => game.id === Number(event.target.dataset.addToFavorite))
                }else{
                    favoriteGames = games.find(game => game.id === Number(event.target.dataset.addToFavorite))
                }
                console.log(favoriteGames)
                const isFavorite = favorites.some(fav => fav.id === favoriteGames.id)
                if(isFavorite){
                    let userFavoritGamesArr = favorites.findIndex(fav => fav.id === favoriteGames.id)
                    favorites.splice(userFavoritGamesArr , 1)
                }else{
                    favorites.push(favoriteGames)
                }


                if(showFavorites === true){
                    renderGames(favorites, allgames, favorites)
                }else{
                    renderGames(games, allgames,favorites)
                }
                
                localStorage.setItem("game" , JSON.stringify(favorites))
                console.log(JSON.parse(localStorage.getItem("game")))
            }
        })

        favoriteGamesButton.addEventListener('click' ,  ()=> {
            if(showFavorites === false){
                const getFavoritegames = favorites
                renderGames(getFavoritegames , allgames , favorites)
                showFavorites = true
            }else{
                renderGames(games , allgames , favorites)
                showFavorites = false
            }

            favoriteGamesButton.querySelector("span").textContent = showFavorites ? "all games" : "favorite games";
            
        })
    }
    catch(error){
        console.log(error.message)
    }
}


loadgames()
