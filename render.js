export function renderGames(game , gamecont , favorites , append){
    const gameCard = game.map((game) => {
         const isFavorite = favorites.some(fav => fav.id === game.id)
         return `
         <div>
             <img src='${game.background_image}' width = "250" height = "250">
             <h2>${game.name}</h2>
             <p>${game.rating} ★ </p>
            <button type="button" data-add-to-favorite="${game.id}"> ${isFavorite ? "remove from favorite" : "add to favorite"}</button>
         </div>
        `
     })
     
     if(append ===true){
        gamecont.innerHTML += gameCard.join()
     }else{
        gamecont.innerHTML = gameCard.join()
     }
}