/**
 * Water Jugs Problem
 * State: [amountA, amountB]
 * Goal: Either jug contains the target amount
 */
class WaterJugs extends Problem {
    constructor(capacityA = 4, capacityB = 3, goal = 2) {
        super([0, 0], [goal, 0]);
        this.capacityA = capacityA;
        this.capacityB = capacityB;
        this.goalAmount = goal;
    }

    actions(state) {
        const [a, b] = state;
        const actions = [];

        if (a < this.capacityA) actions.push('FILL_A');
        if (b < this.capacityB) actions.push('FILL_B');
        if (a > 0) actions.push('EMPTY_A');
        if (b > 0) actions.push('EMPTY_B');
        if (a > 0 && b < this.capacityB) actions.push('POUR_A_TO_B');
        if (b > 0 && a < this.capacityA) actions.push('POUR_B_TO_A');

        return actions;
    }

    result(state, action) {
        let [a, b] = state;

        if (action === 'FILL_A') {
            a = this.capacityA;
        } else if (action === 'FILL_B') {
            b = this.capacityB;
        } else if (action === 'EMPTY_A') {
            a = 0;
        } else if (action === 'EMPTY_B') {
            b = 0;
        } else if (action === 'POUR_A_TO_B') {
            const pour = Math.min(a, this.capacityB - b);
            a -= pour;
            b += pour;
        } else if (action === 'POUR_B_TO_A') {
            const pour = Math.min(b, this.capacityA - a);
            b -= pour;
            a += pour;
        }

        return [a, b];
    }

    goalTest(state) {
        return state[0] === this.goalAmount || state[1] === this.goalAmount;
    }

    h(state) {
        // Distance from either jug to goal amount
        return Math.min(
            Math.abs(state[0] - this.goalAmount),
            Math.abs(state[1] - this.goalAmount)
        );
    }
}