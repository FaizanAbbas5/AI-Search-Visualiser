/**
 * N-Queens Problem
 * State: Array of row positions, index represents column
 * Goal: N queens placed without conflicts
 */
class NQueens extends Problem {
    constructor(n = 8) {
        super([], Array.from({length: n}, (_, i) => i));
        this.n = n;
    }

    actions(state) {
        if (state.length >= this.n) return [];
        
        const col = state.length;
        const actions = [];
        
        for (let row = 0; row < this.n; row++) {
            if (this.isSafe(state, row, col)) {
                actions.push(row);
            }
        }
        
        return actions;
    }

    result(state, action) {
        return [...state, action];
    }

    goalTest(state) {
        return state.length === this.n;
    }

    isSafe(state, row, col) {
        for (let i = 0; i < state.length; i++) {
            const otherRow = state[i];
            // Check row conflict
            if (otherRow === row) return false;
            // Check diagonal conflict
            if (Math.abs(otherRow - row) === Math.abs(i - col)) return false;
        }
        return true;
    }

    h(state) {
        // Number of queens remaining to place
        return this.n - state.length;
    }

    getConflicts(state) {
        const conflicts = new Set();
        for (let i = 0; i < state.length; i++) {
            const row1 = state[i];
            for (let j = i + 1; j < state.length; j++) {
                const row2 = state[j];
                if (row1 === row2 || Math.abs(row1 - row2) === Math.abs(i - j)) {
                    conflicts.add(i);
                    conflicts.add(j);
                }
            }
        }
        return conflicts;
    }
}