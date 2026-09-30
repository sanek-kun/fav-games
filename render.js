export function renderGames(game , gamecont , favorites , append){
    const gameCard = game.map((game) => {
         const isFavorite = favorites.some(fav => fav.id === game.id)
         return `
         <div class="gameCont">
            <img class="gameImg" src='${game.background_image}'>
            <h2 class="gameTitle">${game.name}</h2>
            <p class="gameRating">${game.rating} ★ </p>
            <button class="favByn" type="button" data-add-to-favorite=" ${game.id}"><span class = "favImg">♡</span>${isFavorite ? "remove from favorite" : "add to favorite"}</button>
         </div>
        `
     })
     
     if(append ===true){
        gamecont.innerHTML += gameCard.join("")
     }else{
        gamecont.innerHTML = gameCard.join("")
     }
}