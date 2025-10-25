/**
 * AIMA-Compatible Problem Base Class
 * All problem implementations should extend this class
 */
class Problem {
    constructor(initial, goal = null) {
        this.initial = initial;
        this.goal = goal;
    }

    /**
     * Return list of actions available from given state
     * @param {*} state - Current state
     * @returns {Array} - List of valid actions
     */
    actions(state) {
        throw new Error('Must implement actions()');
    }

    /**
     * Return the state that results from executing action in state
     * @param {*} state - Current state
     * @param {*} action - Action to execute
     * @returns {*} - Resulting state
     */
    result(state, action) {
        throw new Error('Must implement result()');
    }

    /**
     * Test if given state is a goal state
     * @param {*} state - State to test
     * @returns {boolean} - True if goal state
     */
    goalTest(state) {
        if (Array.isArray(this.goal)) {
            return JSON.stringify(state) === JSON.stringify(this.goal);
        }
        return state === this.goal;
    }

    /**
     * Return the cost of taking action from state1 to state2
     * @param {number} c - Cost to reach state1
     * @param {*} state1 - Starting state
     * @param {*} action - Action taken
     * @param {*} state2 - Resulting state
     * @returns {number} - Total path cost
     */
    pathCost(c, state1, action, state2) {
        return c + 1;
    }

    /**
     * Heuristic function for informed search
     * @param {*} state - State to evaluate
     * @returns {number} - Estimated cost to goal
     */
    h(state) {
        return 0;
    }

    /**
     * Get unique key for state (for explored set)
     * @param {*} state - State to convert
     * @returns {string} - Unique state key
     */
    getStateKey(state) {
        return JSON.stringify(state);
    }
}

/**
 * Search Node for maintaining search tree
 */
class SearchNode {
    constructor(state, parent = null, action = null, pathCost = 0) {
        this.state = state;
        this.parent = parent;
        this.action = action;
        this.pathCost = pathCost;
        this.depth = parent ? parent.depth + 1 : 0;
    }

    /**
     * Return path from root to this node
     * @returns {Array} - Array of {state, action} objects
     */
    path() {
        const path = [];
        let node = this;
        while (node) {
            path.unshift({state: node.state, action: node.action});
            node = node.parent;
        }
        return path;
    }
}