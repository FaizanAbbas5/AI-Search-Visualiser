/**
 * Generic search algorithm implementation
 * Supports: BFS, DFS, A*, Greedy Best-First
 */

let solving = false;

/**
 * Main search function
 * @param {Problem} problem - Problem instance to solve
 * @param {string} strategy - Search strategy: 'bfs', 'dfs', 'astar', 'greedy'
 * @param {Function} onStep - Callback for each step: (state, stats) => {}
 * @returns {Promise<Array|null>} - Solution path or null
 */
async function search(problem, strategy, onStep) {
    const frontier = [new SearchNode(problem.initial)];
    const explored = new Set();
    let nodesExplored = 0;
    const startTime = Date.now();

    while (frontier.length > 0 && solving) {
        let node;

        // Select node based on strategy
        if (strategy === 'dfs') {
            node = frontier.pop();
        } else if (strategy === 'bfs') {
            node = frontier.shift();
        } else if (strategy === 'astar' || strategy === 'greedy') {
            frontier.sort((a, b) => {
                const fa = strategy === 'astar' 
                    ? a.pathCost + problem.h(a.state) 
                    : problem.h(a.state);
                const fb = strategy === 'astar' 
                    ? b.pathCost + problem.h(b.state) 
                    : problem.h(b.state);
                return fa - fb;
            });
            node = frontier.shift();
        }

        const stateKey = problem.getStateKey(node.state);
        if (explored.has(stateKey)) continue;

        explored.add(stateKey);
        nodesExplored++;

        // Callback for visualization
        if (onStep) {
            const elapsed = (Date.now() - startTime) / 1000;
            await onStep(node.state, {
                explored: nodesExplored,
                frontier: frontier.length,
                depth: node.depth,
                time: elapsed
            });
        }

        // Goal test
        if (problem.goalTest(node.state)) {
            return node.path();
        }

        // Expand node
        const actions = problem.actions(node.state);
        for (const action of actions) {
            const childState = problem.result(node.state, action);
            const childKey = problem.getStateKey(childState);
            
            if (!explored.has(childKey)) {
                const childCost = problem.pathCost(
                    node.pathCost, 
                    node.state, 
                    action, 
                    childState
                );
                frontier.push(new SearchNode(childState, node, action, childCost));
            }
        }

        // Safety limit
        if (nodesExplored > 100000) {
            throw new Error('Search limit exceeded');
        }
    }

    return null; // No solution found
}

/**
 * Stop the current search
 */
function stopSearch() {
    solving = false;
}

/**
 * Start a new search
 */
function startSearch() {
    solving = true;
}