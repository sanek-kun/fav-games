const allgames = document.querySelector(".allgames")
const searchButton = document.querySelector(".searchButton")
const searchGameInput = document.querySelector(".searchGameInput")
const loadMoreButton = document.querySelector(".loadMoreButton")
import {getGames} from "./api.js"
import { renderGames , renderMoreGames} from "./render.js"
let nextPage = null


async function loadgames () {
    try {
        const game = await getGames()
        nextPage = game.next
        renderGames(game.results , allgames)

        searchButton.addEventListener("click", async () => {
            if(!searchGameInput.value){
                const genGamesIfInputEmpty = await getGames()
                renderGames(genGamesIfInputEmpty.results , allgames)
                nextPage = genGamesIfInputEmpty.next
            }else{
                const searchGame = await (getGames(searchGameInput.value))
                renderGames(searchGame.results , allgames)
                nextPage = searchGame.next
            }
        })

        loadMoreButton.addEventListener('click' , async ()=>{
            const nextGames = await getGames(nextPage)
            nextPage = nextGames.next

            renderMoreGames(nextGames.results , allgames)
        })
    }
    catch(error){
        console.log(error.message)
    }
}


loadgames()
