const startButton = document.getElementById("start");

startButton.addEventListener("click", async () => {
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    const permission = await DeviceMotionEvent.requestPermission();

    if (permission !== "granted") {
      document.getElementById("result").textContent =
        "센서 사용 권한이 필요합니다.";
      return;
    }
  }

  window.addEventListener("devicemotion", (event) => {
    const a = event.accelerationIncludingGravity;

    if (!a) return;

    document.getElementById("x").textContent =
      "X: " + (a.x ?? 0).toFixed(2);

    document.getElementById("y").textContent =
      "Y: " + (a.y ?? 0).toFixed(2);

    document.getElementById("z").textContent =
      "Z: " + (a.z ?? 0).toFixed(2);
  });

  document.getElementById("result").textContent =
    "센서 측정 중!";
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js");
    });
}
