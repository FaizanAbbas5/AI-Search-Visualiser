/**
 * 8-Puzzle Problem
 * State: Array of 9 numbers (0 represents blank)
 * Goal: [1, 2, 3, 4, 5, 6, 7, 8, 0]
 */
class EightPuzzle extends Problem {
    constructor(initial) {
        super(initial, [1, 2, 3, 4, 5, 6, 7, 8, 0]);
    }

    actions(state) {
        const actions = [];
        const blank = state.indexOf(0);
        const row = Math.floor(blank / 3);
        const col = blank % 3;

        if (row > 0) actions.push('UP');
        if (row < 2) actions.push('DOWN');
        if (col > 0) actions.push('LEFT');
        if (col < 2) actions.push('RIGHT');

        return actions;
    }

    result(state, action) {
        const blank = state.indexOf(0);
        const row = Math.floor(blank / 3);
        const col = blank % 3;
        let newBlank = blank;

        if (action === 'UP') newBlank = (row - 1) * 3 + col;
        if (action === 'DOWN') newBlank = (row + 1) * 3 + col;
        if (action === 'LEFT') newBlank = row * 3 + (col - 1);
        if (action === 'RIGHT') newBlank = row * 3 + (col + 1);

        const newState = [...state];
        [newState[blank], newState[newBlank]] = [newState[newBlank], newState[blank]];
        return newState;
    }

    h(state) {
        // Manhattan distance heuristic
        let distance = 0;
        for (let i = 0; i < 9; i++) {
            if (state[i] !== 0) {
                const goalIdx = state[i] - 1;
                const currentRow = Math.floor(i / 3);
                const currentCol = i % 3;
                const goalRow = Math.floor(goalIdx / 3);
                const goalCol = goalIdx % 3;
                distance += Math.abs(currentRow - goalRow) + Math.abs(currentCol - goalCol);
            }
        }
        return distance;
    }
}