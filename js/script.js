function startGame() {
    const title = document.querySelector('.title');
    const cells = document.querySelectorAll('.cell');
    const restartBtn = document.getElementById('btn');
    const boardArray = Array.from(cells);
    let tracking = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 

    // Looping through all the board's cells
    cells.forEach(cell => {
        cell.addEventListener('click', (event)=> {
            // Player X move
            const index = boardArray.indexOf(event.target);
            cells[index].classList.add('x');

            // Splicing the move from the tracking list
            const spliceIndex = tracking.indexOf(index + 1);
            tracking.splice(spliceIndex, 1);
        
            // Check if player wins
            if(win('x', cells)) {
                title.innerHTML = 'You win!';
                title.classList.add('red');
                document.body.classList.add('game-over');
                cells.forEach(cell => {
                    cell.style.cursor = 'no-drop';
                })
            }

            // Check for draw
            if(tracking.length === 0) {
                title.innerHTML = `It's a draw!`;
                title.style.color = '#3e3e3e';
            }

            // Computer move
            const random = Math.floor(Math.random() * tracking.length);
            const compIndex  = tracking[random];
            cells[compIndex - 1].classList.add('o');
    

            //Splicing the computer move from the tracking list
            tracking.splice(random, 1)

            // Check if computer wins
            if(win('o', cells)) {
                title.innerHTML = 'Computer wins!';
                title.classList.add('blue');
                cells.forEach(cell => {
                    cell.style.cursor = 'no-drop';
                })
            }
        })
    })
    // Restarts game
    restartBtn.addEventListener('click', () => {
        location.reload()
    })
}

startGame();

// Winning positions
function win(playerName, cells){
    function check(pos1, pos2, pos3){
        if(
            cells[pos1].classList.contains(playerName) &
            cells[pos2].classList.contains(playerName) &
            cells[pos3].classList.contains(playerName) 
        ) {
            return true;
        }
        else {
            return false;
        }
    }
    if(check(0, 3, 6)) return true;
    else if (check(1, 4, 7)) return true;
    else if (check(2, 5, 8)) return true;
    else if (check(0, 1, 2)) return true;
    else if (check(3, 4, 5)) return true;
    else if (check(6, 7, 8)) return true;
    else if (check(0, 4, 8)) return true;
    else if (check(2, 4, 6)) return true;
}