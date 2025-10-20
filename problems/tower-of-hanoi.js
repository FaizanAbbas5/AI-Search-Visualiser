/**
 * Tower of Hanoi Problem
 * State: Array of 3 arrays, each representing a peg with disk numbers
 * Goal: All disks on the third peg
 */
class TowerOfHanoi extends Problem {
    constructor(n = 3) {
        const initial = [Array.from({length: n}, (_, i) => n - i), [], []];
        const goal = [[], [], Array.from({length: n}, (_, i) => n - i)];
        super(initial, goal);
        this.n = n;
    }

    actions(state) {
        const actions = [];
        for (let from = 0; from < 3; from++) {
            if (state[from].length > 0) {
                for (let to = 0; to < 3; to++) {
                    if (from !== to) {
                        // Can move if target peg is empty or top disk is smaller
                        if (state[to].length === 0 || 
                            state[from][state[from].length - 1] < state[to][state[to].length - 1]) {
                            actions.push(`${from}->${to}`);
                        }
                    }
                }
            }
        }
        return actions;
    }

    result(state, action) {
        const [from, to] = action.split('->').map(Number);
        const newState = state.map(peg => [...peg]);
        const disk = newState[from].pop();
        newState[to].push(disk);
        return newState;
    }

    h(state) {
        // Number of disks not on goal peg
        return this.n - state[2].length;
    }
}