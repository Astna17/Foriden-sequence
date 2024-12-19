// Définir la clé API
window.WAF_API_KEY = "votre_clé_API"; // Remplacez ceci par votre vraie clé API

// Fonction pour générer et afficher la séquence "Forbidden"
function generateSequence() {
    const number = parseInt(document.getElementById("numberInput").value);

    // Vérifier si le nombre est valide (entre 1 et 1000)
    if (isNaN(number) || number < 1 || number > 1000) {
        alert("Veuillez entrer un nombre entre 1 et 1000.");
        return;
    }

    // Masquer le formulaire et afficher la séquence "Forbidden"
    document.getElementById("captchaForm").style.display = "none";
    document.getElementById("output").style.display = "block";

    // Générer la séquence "Forbidden"
    let sequenceHtml = '';
    for (let i = 1; i <= number; i++) {
        sequenceHtml += `${i}. Forbidden<br>`;
    }
    document.getElementById("sequenceOutput").innerHTML = sequenceHtml;

    // Afficher le Captcha après avoir affiché la séquence
    var container = document.querySelector("#my-captcha-container");
    AwsWafCaptcha.renderCaptcha(container, {
        apiKey: window.WAF_API_KEY,
        onSuccess: function(wafToken) {
            // Lorsque le Captcha est validé, effectuer un traitement si nécessaire
            console.log("Captcha validé, WAF Token :", wafToken);
        },
        onError: captchaExampleErrorFunction,
    });
}

// Fonction appelée en cas d'erreur du Captcha
function captchaExampleErrorFunction(error) {
    console.error("Erreur de Captcha:", error);
}
