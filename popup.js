class TabCloser {
    tabToClose = null;
    timeToClose = null;

    constructor() {
        this.setup()
    }

    async setup() {
        let [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true
        });

        this.tabToClose = tab.id;

        this.setupButtonListener();
    }

    setupButtonListener() {
        const startTimer = document.getElementById("startTimer");
        startTimer.addEventListener("click", () => {
            if (this.validateInputs()) {
                this.closeTab();
            } else {
                alert("Please enter a valid time");
            }
        });
    }

    validateInputs() {
        const hoursInput = document.getElementById("hours");
        const minutesInput = document.getElementById("minutes");

        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;

        if (hours < 0 || minutes < 0) {
            return false;
        }
        this.timeToClose = hours * 60 + minutes;
        return true;
    }

    toHumanTime() {
        const hours = Math.floor(this.timeToClose / 60);
        const minutes = this.timeToClose % 60;
        let time = "";
        if (hours > 0) {
            if (hours === 1) {
                time += `${hours} hour`;
            } else {
                time += `${hours} hours`;
            }
        }
        if (minutes > 0) {
            if (time.length > 0) {
                time += ` and `;
            }
            if (minutes === 1) {
                time += `${minutes} minute`;
            } else {
                time += `${minutes} minutes`;
            }
        }
        return time;
    }

    validateAlarmInputs() {
        return this.timeToClose && this.timeToClose > 0 && this.tabToClose;
    }

    closeTab() {
        if (this.validateAlarmInputs()) {
            alert(`Closing tab in ${this.toHumanTime()}`);
            chrome.alarms.create(`closeTab-${this.tabToClose}`, {
                delayInMinutes: this.timeToClose,
            });
            window.close();
        } else {
            alert(`One or more inputs to timer are invalid. Tab Id = ${this.tabToClose}, Time to Close = ${this.timeToClose}.`);
        }

    }
}

new TabCloser();