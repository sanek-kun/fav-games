export function renderGames(game , gamecont){
    const gameCard = game.map((game) => {
        return `
        <div>
            <img src='${game.background_image}' width = "250" height = "250">
            <h2>${game.name}</h2>
            <p>${game.rating} ★ </p>
            <button type="button">add to favotite</button>
        </div>
        `
    })
    gamecont.innerHTML = gameCard.join()
}
export function renderMoreGames(game , gamecont){
    const gameCard = game.map((game) => {
        return `
        <div>
            <img src='${game.background_image}' width = "250" height = "250">
            <h2>${game.name}</h2>
            <p>${game.rating} ★ </p>
            <button type="button">add to favotite</button>
        </div>
        `
    })

    gamecont.innerHTML += gameCard.join()
}