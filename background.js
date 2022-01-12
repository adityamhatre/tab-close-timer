chrome.alarms.onAlarm.addListener(alarm => {
    chrome.tabs.remove(parseInt(alarm.name.split("-")[1]));
});