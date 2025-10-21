/**
 * Tower of Hanoi Visualiser
 */
const HanoiVisualiser = {
    render: (state, animate = false) => {
        const viz = document.getElementById('visualisation');
        viz.innerHTML = '<div class="hanoi-container"></div>';
        const container = viz.querySelector('.hanoi-container');
        
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
        
        state.forEach((peg, idx) => {
            const pegDiv = document.createElement('div');
            pegDiv.className = 'hanoi-peg';
            
            const pole = document.createElement('div');
            pole.className = 'hanoi-pole';
            
            peg.forEach(disk => {
                const diskDiv = document.createElement('div');
                diskDiv.className = 'hanoi-disk';
                if (animate) diskDiv.classList.add('exploring');
                diskDiv.style.width = (40 + disk * 20) + 'px';
                diskDiv.style.background = colors[disk - 1];
                diskDiv.textContent = disk;
                pole.appendChild(diskDiv);
            });
            
            pegDiv.appendChild(pole);
            
            const base = document.createElement('div');
            base.className = 'hanoi-base';
            pegDiv.appendChild(base);
            
            const label = document.createElement('div');
            label.className = 'hanoi-peg-label';
            label.textContent = ['A', 'B', 'C'][idx];
            pegDiv.appendChild(label);
            
            container.appendChild(pegDiv);
        });
    },

    getRandomState: () => {
        const n = parseInt(document.getElementById('hanoi-disks')?.value) || 3;
        return [Array.from({length: n}, (_, i) => n - i), [], []];
    },

    formatState: (state) => {
        return `A: [${state[0].join(',')}] B: [${state[1].join(',')}] C: [${state[2].join(',')}]`;
    }
};