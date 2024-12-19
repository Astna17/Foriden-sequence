function showMyCaptcha() {
    const number = parseInt(document.getElementById("numberInput").value);
    

    if (isNaN(number) || number < 1 || number > 1000) {
        alert("Veuillez entrer un nombre entre 101 et 1000.");
        return;
    }

 
    document.getElementById("captchaForm").style.display = "none";
    document.getElementById("output").style.display = "block";
    
    var container = document.querySelector("#my-captcha-container");

    AwsWafCaptcha.renderCaptcha(container, {
        apiKey: window.WAF_API_KEY,
        onSuccess: function(wafToken) {
            submitForm(number);
        },
        onError: captchaExampleErrorFunction,
    });
}

function captchaExampleErrorFunction(error) {
    console.error("Erreur de Captcha:", error);
}

function submitForm(number) {
    let count = 1;
    const interval = setInterval(function() {
        fetch('https://api.prod.jcloudify.com/whoami')
            .then(response => response.json())
            .then(data => {
                document.getElementById("sequenceOutput").innerHTML += `${count}. Forbidden<br>`;
            })
            .catch(error => {
                console.error("Erreur lors de l'appel API:", error);
            });
        
        count++;
        if (count > number) {
            clearInterval(interval);
        }
    }, 1000); 
}
