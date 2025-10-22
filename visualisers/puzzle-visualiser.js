/**
 * 8-Puzzle Visualiser
 */
const PuzzleVisualiser = {
    render: (state, animate = false) => {
        const viz = document.getElementById('visualisation');
        viz.innerHTML = '<div class="puzzle-grid"></div>';
        const grid = viz.querySelector('.puzzle-grid');
        
        state.forEach(num => {
            const tile = document.createElement('div');
            tile.className = 'puzzle-tile' + (num === 0 ? ' empty' : '');
            if (animate && num !== 0) {
                tile.classList.add('exploring');
            }
            tile.textContent = num === 0 ? '' : num;
            grid.appendChild(tile);
        });
    },

    getRandomState: () => {
        const state = [1, 2, 3, 4, 5, 6, 7, 8, 0];
        const problem = new EightPuzzle(state);
        
        // Generate solvable random state by making random moves
        for (let i = 0; i < 50; i++) {
            const actions = problem.actions(state);
            const action = actions[Math.floor(Math.random() * actions.length)];
            const newState = problem.result(state, action);
            state.splice(0, state.length, ...newState);
        }
        
        return state;
    },

    formatState: (state) => {
        return state.join(' ');
    }
};