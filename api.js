export async function getGames(search) {
    let respons

    if(search && search.startsWith("https")){
        respons = await fetch(search)
    }else if(search){
        respons = await fetch(`https://api.rawg.io/api/games?key=b8aebae7b3f74926a6e88781b2776abb&search=${search}`)
    }else{
        respons = await fetch(`https://api.rawg.io/api/games?key=b8aebae7b3f74926a6e88781b2776abb`)
    }

    

    if(!respons.ok){
        throw new Error(`HTTP error: ${respons.status}`);
    }

    const game = await respons.json()

    return game
}
