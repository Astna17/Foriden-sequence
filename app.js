const form = document.getElementById("numberForm");
const numberInput = document.getElementById("numberInput");
const output = document.getElementById("output");

let stopExecution = false; 

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const N = parseInt(numberInput.value, 10);
  if (isNaN(N) || N < 1 || N > 1000) {
    alert("Please enter a number between 1 and 1000.");
    return;
  }

  // Clear the output
  output.innerHTML = "";

  // Perform the sequence
  for (let i = 1; i <= N; i++) {
    if (stopExecution) {
      await waitForCaptcha(); // Wait until captcha is resolved
    }

    try {
      await fetchWhoAmI(i);
    } catch (error) {
      if (error.message === "Captcha required") {
        stopExecution = true;
        triggerCaptcha();
      } else {
        console.error(error);
      }
    }

    await sleep(1000); // Wait 1 second
  }
});

function fetchWhoAmI(index) {
  return new Promise((resolve, reject) => {
    fetch("https://api.prod.jcloudify.com/whoami")
      .then((response) => {
        if (response.status === 403) {
          reject(new Error("Captcha required"));
        } else {
          output.innerHTML += `<div>${index}. Forbidden</div>`;
          resolve();
        }
      })
      .catch((error) => reject(error));
  });
}

function triggerCaptcha() {
  // Captcha appears automatically due to AWS WAF protection
  // No specific code needed here as the SDK integration will handle it
}

function waitForCaptcha() {
  return new Promise((resolve) => {
    // Captcha SDK event listener to detect resolution
    document.addEventListener("captchaResolved", () => {
      stopExecution = false;
      resolve();
    });
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
