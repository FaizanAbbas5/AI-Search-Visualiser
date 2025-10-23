# AIMA Search Problems Visualiser

An interactive web-based visualisation tool for classic AI search problems from **Artificial Intelligence: A Modern Approach (AIMA)**. Watch search algorithms explore state spaces in real-time with animations and detailed statistics.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white)

## Overview

A browser-based tool for visualising AI search algorithms working through classic problems. Originally created to help students understand how different search strategies explore state spaces and find solutions.

## Features

### Search Algorithms
- **Breadth-First Search (BFS)** - Explores level by level
- **Depth-First Search (DFS)** - Explores depth-first
- **A\* Search** - Optimal search using heuristics
- **Greedy Best-First** - Uses heuristics to guide search

### Problems Included

#### 8-Puzzle
Slide numbered tiles to arrange them in order.
- Configurable initial states
- Manhattan distance heuristic
- Animated tile movements

#### Tower of Hanoi
Move disks between three pegs following the standard rules.
- Adjustable number of disks (2-5)
- Colour-coded disks
- Shows recursive solution

#### Water Jugs
Measure exact amounts using two jugs of different capacities.
- Customisable jug capacities
- Configurable target amounts
- Visual fill levels

#### N-Queens
Place N queens on a chessboard so none threaten each other.
- Board sizes from 4×4 to 12×12
- Conflict highlighting
- Backtracking visualisation

### Statistics
- Nodes explored
- Current frontier size
- Solution depth
- Time elapsed
- Complete solution path

## Getting Started

### Requirements
A modern web browser. No installation or build process required.

### Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/aima-search-visualiser.git
   cd aima-search-visualiser
   ```

2. **Open in browser**
   ```bash
   # On macOS
   open index.html
   
   # On Linux
   xdg-open index.html
   
   # On Windows
   start index.html
   ```

3. **Usage**
   - Select a problem type
   - Choose a search algorithm
   - Adjust animation speed
   - Click "Solve" to watch the algorithm work

### Using a Local Server (Optional)

For better performance, serve via HTTP:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (with http-server)
npx http-server

# Then visit: http://localhost:8000
```

## Project Structure

```
aima-search-visualiser/
├── index.html                    # Main application page
├── styles.css                    # Styling
├── js/
│   ├── core/                    # Core framework
│   │   ├── problem.js           # AIMA Problem base class and SearchNode
│   │   └── search.js            # Search algorithm implementations
│   │
│   ├── problems/                # Problem implementations
│   │   ├── eight-puzzle.js      # 8-Puzzle with Manhattan heuristic
│   │   ├── tower-of-hanoi.js    # Tower of Hanoi 
│   │   ├── water-jugs.js        # Water Jugs problem
│   │   └── n-queens.js          # N-Queens with backtracking
│   │
│   ├── visualisers/             # Problem-specific visualisations
│   │   ├── puzzle-visualiser.js # 8-Puzzle grid rendering
│   │   ├── hanoi-visualiser.js  # Tower of Hanoi disk rendering
│   │   ├── jugs-visualiser.js   # Water jug fill visualisation
│   │   └── queens-visualiser.js # Chess board rendering
│   │
│   └── app.js                   # Application logic and UI control
│
└── README.md
```

## Educational Use

### For Students
- Watch algorithms work through problems step by step
- Compare how different algorithms explore state spaces
- Experiment with problem parameters
- Learn classic AI problems interactively

### For Teachers
- Demonstrate algorithms during lectures
- Set assignments for students to implement new problems
- Compare different solutions visually
- Works immediately in any browser, no setup needed

### Classroom Activities

1. **Algorithm Comparison**: Run BFS and A* on the same problem to compare performance
2. **Heuristic Design**: Modify heuristic functions and observe the effects
3. **Problem Implementation**: Assign students to add new problems
4. **Complexity Analysis**: Count nodes explored to understand algorithmic complexity

## Architecture

### Core Design

The visualiser follows AIMA conventions with a modular architecture:

```javascript
// Every problem extends the Problem base class
class Problem {
    actions(state)          // Returns valid actions from state
    result(state, action)   // Returns resulting state
    goalTest(state)         // Tests if state is goal
    h(state)               // Heuristic estimate (optional)
    pathCost(...)          // Path cost calculation
}
```

### Adding New Problems

To add a new problem, create three components:

#### 1. Problem Class (`js/problems/your-problem.js`)

```javascript
class YourProblem extends Problem {
    constructor(initial, goal) {
        super(initial, goal);
        // Initialisation code
    }

    actions(state) {
        // Return array of valid actions
        return ['ACTION1', 'ACTION2'];
    }

    result(state, action) {
        // Return new state after applying action
        return newState;
    }

    goalTest(state) {
        // Return true if state is goal
        return state === this.goal;
    }

    h(state) {
        // Optional: return heuristic estimate to goal
        return estimatedCost;
    }
}
```

#### 2. Visualiser (`js/visualisers/your-visualiser.js`)

```javascript
const YourVisualiser = {
    render: (state, animate = false) => {
        const viz = document.getElementById('visualisation');
        // Create DOM elements to visualise state
        viz.innerHTML = '<div>Your visualisation</div>';
    },
    
    getRandomState: () => {
        // Return a random valid initial state
        return randomState;
    },
    
    formatState: (state) => {
        // Return human-readable string representation
        return `State: ${state}`;
    }
};
```

#### 3. Register in `app.js`

```javascript
const PROBLEMS = {
    'yourproblem': {
        name: 'Your Problem Name',
        description: 'Brief description',
        visualiser: YourVisualiser,
        config: `
            <div class="control-group">
                <label for="your-param">Parameter</label>
                <input type="number" id="your-param" value="5">
            </div>
        `,
        createProblem: () => {
            const param = parseInt(document.getElementById('your-param').value);
            return new YourProblem(param);
        }
    }
};
```

#### 4. Update HTML

Add to `index.html`:
```html
<select id="problem-select">
    <!-- existing options -->
    <option value="yourproblem">Your Problem Name</option>
</select>

<!-- Add script tags before app.js -->
<script src="js/problems/your-problem.js"></script>
<script src="js/visualisers/your-visualiser.js"></script>
```

## Potential Problems to Add

Classic problems from AIMA that could be added:

- **Route Finding** - Navigate cities with road distances (Romania map problem)
- **Missionaries and Cannibals** - River crossing puzzle
- **Vacuum World** - Clean rooms with an agent
- **Graph Colouring** - Colour map regions
- **Pancake Sorting** - Sort by flipping stacks
- **Sliding Block Puzzles** - Rush Hour, Klotski variations
- **Rubik's Cube** - 2×2×2 Pocket Cube
- **Sudoku Solver** - Constraint satisfaction
- **Cryptarithmetic** - SEND + MORE = MONEY puzzles

## Customisation

### Styling
Edit `styles.css` to change:
- Colour schemes
- Animation speeds
- Layout dimensions
- Typography

### Algorithms
Modify `js/core/search.js` to:
- Add new search strategies
- Implement iterative deepening
- Add bidirectional search
- Experiment with beam search

### Heuristics
Each problem's `h(state)` method can be modified to test different heuristics:
```javascript
// In eight-puzzle.js
h(state) {
    // Try different heuristics:
    return this.manhattanDistance(state);  // Current
    // return this.misplacedTiles(state);  // Alternative
    // return this.linearConflict(state);   // Advanced
}
```

## Performance Notes

- **BFS**: Guaranteed optimal but uses most memory
- **DFS**: Memory efficient but not optimal
- **A\***: Optimal and efficient with good heuristic
- **Greedy**: Fast but not guaranteed optimal

### Typical Performance (8-Puzzle):
- **BFS**: ~1000-10000 nodes for medium difficulty
- **A\* (Manhattan)**: ~100-500 nodes
- **DFS**: Unpredictable, may not find shortest path

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingProblem`)
3. Add your problem following the architecture above
4. Test thoroughly with all search algorithms
5. Commit changes (`git commit -m 'Add Amazing Problem'`)
6. Push to branch (`git push origin feature/AmazingProblem`)
7. Open a Pull Request

### Guidelines

- Follow the existing code style
- Include comments explaining your problem
- Use meaningful variable names
- Test with all four search algorithms
- Update README if adding major features

## Code Quality

- No dependencies - pure JavaScript, HTML, CSS
- No build process - works directly in browser
- Modular design - easy to understand and extend
- Clean separation - logic, visualisation, and UI separated
- Well documented - comments explain key concepts

## Troubleshooting

### Visualisation not showing?
- Check browser console for errors
- Ensure all JS files are loaded in correct order
- Verify problem class extends `Problem`

### Search taking too long?
- Reduce problem complexity (smaller board, fewer disks)
- Use A* instead of BFS for large problems
- Check heuristic is admissible

### Animation too fast/slow?
- Adjust speed slider in UI
- Modify delay in `app.js` `onStep` callback

## Resources

### AIMA Textbook
- [Official Website](http://aima.cs.berkeley.edu/)
- [AIMA Python Repository](https://github.com/aimacode/aima-python)

### Search Algorithms
- [Wikipedia: Search Algorithms](https://en.wikipedia.org/wiki/Search_algorithm)
- [A* Algorithm Explained](https://en.wikipedia.org/wiki/A*_search_algorithm)

### JavaScript & Web
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript Info](https://javascript.info/)

## Licence

This project is licensed under the MIT Licence:

```
MIT Licence

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Acknowledgements

- Russell & Norvig - For the AIMA textbook and problem formulations
- AIMA Python Contributors - For reference implementations
- The educational AI community

## Contact

- **Issues**: [GitHub Issues](https://github.com/FaizanAbbas5/AI-Search-Visualiser/issues)
- **LinkedIn**: [LinkedIn](https://www.linkedin.com/in/faizan-abbas-b774a2217)

---

Built for AI education
