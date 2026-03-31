class PomoFlow {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.timerInterval = null;
        this.isRunning = false;
        this.currentMode = 'pomodoro';
        this.pomodoroCount = 0;
        this.totalMinutes = 0;

        this.modes = {
            pomodoro: 25 * 60,
            shortBreak: 5 * 60,
            longBreak: 15 * 60
        };

        this.initializeElements();
        this.attachEventListeners();
        this.updateDisplay();
        this.updateStats();
    }

    initializeElements() {
        this.timerDisplay = document.getElementById('timerDisplay');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.settingsBtn = document.getElementById('settingsBtn');
        this.pomodoroCountElement = document.getElementById('pomodoroCount');
        this.totalMinutesElement = document.getElementById('totalMinutes');
        this.modeButtons = document.querySelectorAll('.mode-btn');
    }

    attachEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.settingsBtn.addEventListener('click', () => this.showSettings());

        this.modeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setMode(e.target.dataset.mode);
            });
        });
    }

    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.startBtn.disabled = true;
        this.pauseBtn.disabled = false;

        this.timerInterval = setInterval(() => {
            this.tick();
        }, 1000);
    }

    pause() {
        if (!this.isRunning) return;

        this.isRunning = false;
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        clearInterval(this.timerInterval);
    }

    reset() {
        this.pause();
        this.timeLeft = this.modes[this.currentMode];
        this.updateDisplay();
    }

    tick() {
        if (this.timeLeft > 0) {
            this.timeLeft--;
            this.updateDisplay();
            this.trackProgress();
        } else {
            this.timerComplete();
        }
    }

    timerComplete() {
        this.pause();
        this.playNotificationSound();

        if (this.currentMode === 'pomodoro') {
            this.pomodoroCount++;
            this.updateStats();

            if (this.pomodoroCount % 4 === 0) {
                this.setMode('longBreak');
                alert('Pomodoro complete! Time for a long break.');
            } else {
                this.setMode('shortBreak');
                alert('Pomodoro complete! Time for a short break.');
            }
        } else {
            this.setMode('pomodoro');
            alert('Break is over! Time to focus.');
        }
    }

    setMode(mode) {
        this.currentMode = mode;
        this.timeLeft = this.modes[mode];

        this.modeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });

        this.reset();
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Update page title
        document.title = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} - PomoFlow`;
    }

    trackProgress() {
        if (this.currentMode === 'pomodoro' && this.isRunning) {
            this.totalMinutes++;
            this.updateStats();
        }
    }

    updateStats() {
        this.pomodoroCountElement.textContent = this.pomodoroCount;
        this.totalMinutesElement.textContent = this.totalMinutes;
    }

    playNotificationSound() {
        // Create a simple beep sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.3;

        oscillator.start();
        setTimeout(() => {
            oscillator.stop();
            audioContext.close();
        }, 200);
    }

    showSettings() {
        alert('Settings coming soon! Stay tuned for custom timer durations, themes, and more.');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PomoFlow();
});