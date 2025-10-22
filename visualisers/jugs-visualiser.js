/**
 * Water Jugs Visualiser
 */
const JugsVisualiser = {
    render: (state, animate = false) => {
        const viz = document.getElementById('visualisation');
        const capA = parseInt(document.getElementById('jug-capacity-a')?.value) || 4;
        const capB = parseInt(document.getElementById('jug-capacity-b')?.value) || 3;
        
        viz.innerHTML = '<div class="jugs-container"></div>';
        const container = viz.querySelector('.jugs-container');
        
        [state[0], state[1]].forEach((amount, idx) => {
            const capacity = idx === 0 ? capA : capB;
            const fillPercent = (amount / capacity) * 100;
            
            const jug = document.createElement('div');
            jug.className = 'jug';
            
            const visual = document.createElement('div');
            visual.className = 'jug-visual';
            if (animate) visual.classList.add('exploring');
            visual.style.setProperty('--fill', fillPercent + '%');
            
            const amountLabel = document.createElement('div');
            amountLabel.className = 'jug-amount';
            amountLabel.textContent = amount;
            visual.appendChild(amountLabel);
            
            const label = document.createElement('div');
            label.className = 'jug-label';
            label.textContent = `Jug ${idx === 0 ? 'A' : 'B'} (${capacity}L)`;
            
            jug.appendChild(visual);
            jug.appendChild(label);
            container.appendChild(jug);
        });
    },

    getRandomState: () => {
        return [0, 0];
    },

    formatState: (state) => {
        return `Jug A: ${state[0]}L, Jug B: ${state[1]}L`;
    }
};