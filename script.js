document.addEventListener("DOMContentLoaded", function () {
    function toLocalISOString(date) {
        const offset = date.getTimezoneOffset() * 60000;
        const localTime = new Date(date.getTime() - offset);
        return localTime.toISOString().slice(0, 16);
    }

    function formatTimeDifference(seconds) {
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `Heartbeat ${minutes} minutes ago`;

        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `Heartbeat ${hours} hours ago`;

        const days = Math.floor(hours / 24);
        if (days < 30) return `Heartbeat ${days} days ago`;

        const months = Math.floor(days / 30);
        if (months < 12) return `Heartbeat ${months} months ago`;

        const years = Math.floor(months / 12);
        return `Heartbeat ${years} years ago`;
    }

    const now = new Date();
    const lastHeartbeatDefault = toLocalISOString(new Date(now.getTime() - 5 * 60 * 1000));
    const updatedAtDefault = toLocalISOString(new Date(now.getTime() - 15 * 60 * 1000));

    document.getElementById("lastHeartbeat").value = lastHeartbeatDefault;
    document.getElementById("updatedAt").value = updatedAtDefault;

    window.checkPlayerStatus = function () {
        const lastHeartbeat = new Date(document.getElementById("lastHeartbeat").value).getTime();
        const updatedAt = new Date(document.getElementById("updatedAt").value).getTime();
        const updateInterval = parseInt(document.getElementById("updateInterval").value) * 1000;

        const nextHeartbeatAt = lastHeartbeat + updateInterval;
        const now = Date.now();

        let result, resultClass;

        if (now >= nextHeartbeatAt) {
            const differenceInSeconds = Math.floor((now - nextHeartbeatAt) / 1000);
            result = formatTimeDifference(differenceInSeconds);
            resultClass = "heartbeat-ago";
        } else if (lastHeartbeat >= updatedAt) {
            result = "Up to date";
            resultClass = "up-to-date";
        } else {
            const nextHeartbeatInMinutes = Math.ceil((nextHeartbeatAt - now) / 60000);
            result = `Update in ${nextHeartbeatInMinutes} minutes`;
            resultClass = "update-in";
        }

        const resultContainer = document.getElementById("statusResult");
        resultContainer.className = `result ${resultClass}`;
        resultContainer.style.display = "flex";
        resultContainer.textContent = result;
    };
});
