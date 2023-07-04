class Position {
    constructor(x,y,distance=0,previous=null){
        this.x=x;
        this.y=y;
        this.distance=distance;
        this.previous=previous;
    }
}  // this sets our position on the board as well as stores our distance and the 
//previous traversal we did

function getMoves(position){
    const moves=[];
    const possibleMoves = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
      ]; //the knight can move in only these directions.
    for(i=0;i<possibleMoves.length;i++){
        const newX = position.x + possibleMoves[i][0];
        const newY = position.y + possibleMoves[i][1]; 

        if(newX >= 0 && newX <8 && newY >= 0 && newY < 8){
            moves.push(new Position(newX,newY));
        }
    }  
    return moves;
} // this function takes a position which is some x,y on a board and then it 
//runs it through all the possible combinations of where it can go 
// we push only legal moves if a number goes under 0 or over 7 its out of bounds
// and not a legal move so it gets traversed but not pushed, we then return the array
// of possible moves that can be made from the current position 

function travail(startPos,endPos){
    const start = new Position(startPos[0],startPos[1]);
    const end = new Position(endPos[0],endPos[1]); //users pass array/start position
    const q=[];
    q.push(start);
    const visited = new Set();
    visited.add(start); //keep track of already visited positions so we dont store 
    //duplicates 

    while(q.length>0){
        const currentPos = q.shift();

        if(currentPos.x === end.x && currentPos.y === end.y){ //if found
            const shortestPath=[];  // make array 
            let current = currentPos; //take current pos
            while(current){
                shortestPath.push([current.x,current.y]);
                current=current.previous;
            } // push x y of current and then go back to previous store and repeat 
            return shortestPath.reverse(); // array is in wrong order so call reverse
                                            // to fix 
        }
        
        const moves = getMoves(currentPos);
        for (let i=0;i<moves.length;i++){
            if(!visited.has(moves[i])) {
                moves[i].distance = currentPos.distance+1;
                moves[i].previous = currentPos;
                q.push(moves[i]);
                visited.add(moves[i]);
            }
        }
    }
}

const start = [2, 3];
const target = [4, 7];
const shortestPath = travail(start, target);
console.log(shortestPath);