export function search(games , input){
    return games.filter(game => {
        return game.name.toLowerCase().includes(input.toLowerCase())
    })
}