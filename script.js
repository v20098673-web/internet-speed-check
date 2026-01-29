function startTest() {
    document.getElementById("speed").innerText = "Speed: Testing...";
    document.getElementById("ping").innerText = "Ping: Testing...";
    document.getElementById("network").innerText = "Network: Detecting...";

    let startPing = performance.now();
    fetch("https://www.google.com/images/phd/px.gif", { mode: "no-cors" })
        .then(() => {
            let ping = Math.round(performance.now() - startPing);
            document.getElementById("ping").innerText = "Ping: " + ping + " ms";
        });

    let image = new Image();
    let startTime = new Date().getTime();

    image.onload = function () {
        let endTime = new Date().getTime();
        let duration = (endTime - startTime) / 1000;
        let imageSize = 500000;
        let speedMbps = ((imageSize * 8) / duration / 1024 / 1024).toFixed(2);
        document.getElementById("speed").innerText = "Speed: " + speedMbps + " Mbps";
    };

    image.src = "https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg?" + Math.random();

    if (navigator.connection) {
        document.getElementById("network").innerText =
            "Network: " + navigator.connection.effectiveType.toUpperCase();
    } else {
        document.getElementById("network").innerText = "Network: Unknown";
    }
}
