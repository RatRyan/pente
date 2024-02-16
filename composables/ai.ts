
export function aiMove(board: Tile[][], x: number, y: number){
    for(let i = 0; i < y--; i++){
        for(let j = 0; j < x--; j++){
            if(board[i][j] == Tile.Empty){
                return board[i][j] = Tile.White
            }
        }
    }

    return {
        aiMove
    }
}

