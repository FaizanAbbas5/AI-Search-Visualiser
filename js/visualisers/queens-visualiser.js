/**
 * N-Queens Visualiser
 */
const QueensVisualiser = {
    render: (state, animate = false, problem = null) => {
        const viz = document.getElementById('visualisation');
        const n = parseInt(document.getElementById('nqueens-size')?.value) || 8;
        const squareSize = Math.max(40, Math.min(60, 480 / n));
        
        viz.innerHTML = '<div class="chess-board"></div>';
        const board = viz.querySelector('.chess-board');
        board.style.gridTemplateColumns = `repeat(${n}, ${squareSize}px)`;
        board.style.gridTemplateRows = `repeat(${n}, ${squareSize}px)`;
        
        const conflicts = (problem && state.length === n) 
            ? problem.getConflicts(state) 
            : new Set();
        
        for (let row = 0; row < n; row++) {
            for (let col = 0; col < n; col++) {
                const square = document.createElement('div');
                square.className = 'chess-square ' + ((row + col) % 2 === 0 ? 'light' : 'dark');
                
                const queenCol = state.indexOf(row);
                if (queenCol === col) {
                    const queen = document.createElement('span');
                    queen.className = 'queen-piece';
                    queen.textContent = '♛';
                    queen.style.fontSize = (squareSize * 0.7) + 'px';
                    
                    if (conflicts.has(col)) {
                        square.classList.add('attacking');
                    }
                    
                    square.appendChild(queen);
                    
                    if (animate) {
                        square.classList.add('exploring');
                    }
                }
                
                board.appendChild(square);
            }
        }
    },

    getRandomState: () => {
        return [];
    },

    formatState: (state) => {
        return `Queens at rows: [${state.join(', ')}]`;
    }
};