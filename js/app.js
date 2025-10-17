/**
 * Main Application Logic
 */

// Global state
let currentProblem = '8puzzle';
let problem = null;

// Problem registry
const PROBLEMS = {
    '8puzzle': {
        name: '8-Puzzle',
        description: 'Arrange tiles in numerical order by sliding them into the empty space.',
        visualiser: PuzzleVisualiser,
        config: '',
        createProblem: () => {
            const state = PuzzleVisualiser.getRandomState();
            return new EightPuzzle(state);
        }
    },
    'hanoi': {
        name: 'Tower of Hanoi',
        description: 'Move all disks from the first peg to the last peg, one at a time, never placing a larger disk on a smaller one.',
        visualiser: HanoiVisualiser,
        config: `
            <div class="control-group">
                <label for="hanoi-disks">Number of Disks</label>
                <input type="number" id="hanoi-disks" min="2" max="5" value="3">
            </div>
        `,
        createProblem: () => {
            const n = parseInt(document.getElementById('hanoi-disks').value) || 3;
            return new TowerOfHanoi(n);
        }
    },
    'jugs': {
        name: 'Water Jugs',
        description: 'Measure the exact target amount of water using only the two jugs.',
        visualiser: JugsVisualiser,
        config: `
            <div class="control-group">
                <label for="jug-capacity-a">Jug A Capacity (liters)</label>
                <input type="number" id="jug-capacity-a" min="1" max="10" value="4">
            </div>
            <div class="control-group">
                <label for="jug-capacity-b">Jug B Capacity (liters)</label>
                <input type="number" id="jug-capacity-b" min="1" max="10" value="3">
            </div>
            <div class="control-group">
                <label for="jug-goal">Target Amount (liters)</label>
                <input type="number" id="jug-goal" min="1" max="10" value="2">
            </div>
        `,
        createProblem: () => {
            const capA = parseInt(document.getElementById('jug-capacity-a').value) || 4;
            const capB = parseInt(document.getElementById('jug-capacity-b').value) || 3;
            const goal = parseInt(document.getElementById('jug-goal').value) || 2;
            return new WaterJugs(capA, capB, goal);
        }
    },
    'nqueens': {
        name: 'N-Queens',
        description: 'Place N queens on an N×N chessboard so that no two queens threaten each other.',
        visualiser: QueensVisualiser,
        config: `
            <div class="control-group">
                <label for="nqueens-size">Board Size (N×N)</label>
                <input type="number" id="nqueens-size" min="4" max="12" value="8">
            </div>
        `,
        createProblem: () => {
            const n = parseInt(document.getElementById('nqueens-size').value) || 8;
            return new NQueens(n);
        }
    }
};

// UI Functions
function updateStats(explored, frontier, depth, time) {
    document.getElementById('explored').textContent = explored;
    document.getElementById('frontier').textContent = frontier;
    document.getElementById('depth').textContent = depth >= 0 ? depth : '-';
    document.getElementById('time').textContent = time.toFixed(2) + 's';
}

function clearStats() {
    updateStats(0, 0, -1, 0);
    document.getElementById('path').innerHTML = '<p style="color: #999; text-align: center;">Solution will appear here</p>';
}

function setStatus(message, type) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.className = 'status ' + type;
}

function showPath(path) {
    const pathDiv = document.getElementById('path');
    pathDiv.innerHTML = '';
    
    const problemData = PROBLEMS[currentProblem];
    
    path.forEach((step, idx) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'path-step';
        
        const header = document.createElement('div');
        header.className = 'path-step-header';
        header.textContent = `Step ${idx}${step.action ? ': ' + step.action : ' (Initial)'}`;
        
        const content = document.createElement('div');
        content.className = 'path-step-content';
        content.textContent = problemData.visualiser.formatState(step.state);
        
        stepDiv.appendChild(header);
        stepDiv.appendChild(content);
        pathDiv.appendChild(stepDiv);
    });
}

// Problem Management
function changeProblem() {
    currentProblem = document.getElementById('problem-select').value;
    const problemData = PROBLEMS[currentProblem];
    
    document.getElementById('problem-config').innerHTML = problemData.config;
    document.getElementById('problem-description').textContent = problemData.description;
    
    reset();
}

function createProblem() {
    return PROBLEMS[currentProblem].createProblem();
}

// Search Control
async function startSolve() {
    if (solving) return;
    
    startSearch();
    setStatus('Searching for solution...', 'searching');
    document.getElementById('path').innerHTML = '<p style="color: #999; text-align: center;">Searching...</p>';
    
    const algorithm = document.getElementById('algorithm').value;
    const speed = document.getElementById('speed').value;
    const visualiser = PROBLEMS[currentProblem].visualiser;
    
    try {
        const onStep = async (state, stats) => {
            visualiser.render(state, true, problem);
            updateStats(stats.explored, stats.frontier, stats.depth, stats.time);
            await new Promise(resolve => setTimeout(resolve, 101 - speed));
        };
        
        const path = await search(problem, algorithm, onStep);
        
        if (path) {
            showPath(path);
            setStatus(`Solution found in ${path.length - 1} moves!`, 'success');
            
            // Animate solution
            for (const step of path) {
                visualiser.render(step.state, true, problem);
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        } else {
            setStatus('No solution found!', 'failed');
        }
    } catch (error) {
        setStatus(error.message, 'failed');
    }
    
    stopSearch();
}

function stopSolve() {
    stopSearch();
    setStatus('Search stopped', 'failed');
}

function randomize() {
    problem = createProblem();
    PROBLEMS[currentProblem].visualiser.render(problem.initial, false, problem);
    setStatus('Problem randomized! Ready to solve.', 'idle');
    clearStats();
}

function reset() {
    stopSearch();
    problem = createProblem();
    PROBLEMS[currentProblem].visualiser.render(problem.initial, false, problem);
    setStatus('Ready to solve!', 'idle');
    clearStats();
}

// Event Listeners
document.getElementById('problem-select').addEventListener('change', changeProblem);
document.getElementById('solve-btn').addEventListener('click', startSolve);
document.getElementById('randomize-btn').addEventListener('click', randomize);
document.getElementById('reset-btn').addEventListener('click', reset);
document.getElementById('stop-btn').addEventListener('click', stopSolve);

// Initialize
changeProblem();