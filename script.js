/* ===== SPEEDOMETER CONFIG ===== */
const maxSpeed = 300;
const minAngle = -120;
const maxAngle = 120;
const arcLengthTotal = 754;

/* ===== START SPEED TEST ===== */
function startTest() {

    const speedText = document.getElementById("speedValue");
    const pingText = document.getElementById("ping");
    const networkText = document.getElementById("network");
    const needle = document.getElementById("needle");
    const arc = document.getElementById("activeArc");
    const status = document.getElementById("status");

    // Reset UI
    speedText.innerText = "0";
    pingText.innerText = "Ping: Testing...";
    networkText.innerText = "Network: Detecting...";
    status.innerText = "Connecting to server…";

    /* ===== REAL PING TEST ===== */
    let pingStart = performance.now();
    fetch("https://www.google.com/images/phd/px.gif", { mode: "no-cors" })
        .then(() => {
            let ping = Math.round(performance.now() - pingStart);
            pingText.innerText = "Ping: " + ping + " ms";
        })
        .catch(() => {
            pingText.innerText = "Ping: -- ms";
        });

    /* ===== NETWORK TYPE ===== */
    if (navigator.connection) {
        networkText.innerText =
            "Network: " + navigator.connection.effectiveType.toUpperCase();
    } else {
        networkText.innerText = "Network: Unknown";
    }

    /* ===== REAL DOWNLOAD SPEED TEST ===== */
    let image = new Image();
    let imageSize = 500000; // bytes
    let startTime = performance.now();

    image.onload = function () {
        let endTime = performance.now();
        let duration = (endTime - startTime) / 1000;

        let speedMbps =
            (imageSize * 8) / duration / 1024 / 1024;

        speedMbps = Math.min(speedMbps, maxSpeed);

        animateSpeed(speedMbps);
    };

    image.onerror = function () {
        status.innerText = "Speed test failed";
    };

    image.src =
        "https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg?"
        + Math.random();
}

/* ===== ANIMATE NEEDLE + ARC (FIXED) ===== */
function animateSpeed(finalSpeed) {

    const speedText = document.getElementById("speedValue");
    const needle = document.getElementById("needle");
    const arc = document.getElementById("activeArc");
    const status = document.getElementById("status");

    let start = performance.now();
    let duration = 3500;

    function animate(now) {
        let progress = Math.min((now - start) / duration, 1);

        // Smooth easing (professional feel)
        let eased = 1 - Math.pow(2, -10 * progress);

        let currentSpeed = eased * finalSpeed;
        speedText.innerText = currentSpeed.toFixed(1);

        /* ✅ CORRECT NEEDLE ROTATION (WORKING) */
        let angle =
            minAngle +
            (currentSpeed / maxSpeed) * (maxAngle - minAngle);

        needle.style.transform = `rotate(${angle}deg)`;

        /* ✅ CORRECT ARC FILL */
        let arcLen =
            (currentSpeed / maxSpeed) * arcLengthTotal;

        arc.style.strokeDasharray =
            `${arcLen} ${arcLengthTotal}`;

        if (progress < 1) {
            status.innerText = "Measuring download speed…";
            requestAnimationFrame(animate);
        } else {
            status.innerText = "Test completed successfully";
        }
    }

    requestAnimationFrame(animate);
}
