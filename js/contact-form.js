// Initialisation d'EmailJS
(function() {
    // Remplacez ces valeurs par vos propres identifiants EmailJS
    emailjs.init("VOTRE_CLE_PUBLIQUE");
})();

// Gestion du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Afficher un message de chargement
            formStatus.innerHTML = '<p class="sending">Envoi en cours...</p>';
            submitBtn.disabled = true;
            
            // Paramètres pour EmailJS
            const templateParams = {
                user_name: document.getElementById('name').value,
                user_email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Envoi de l'email via EmailJS
            // Remplacez ces valeurs par vos propres identifiants EmailJS
            emailjs.send('SERVICE_ID', 'TEMPLATE_ID', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    formStatus.innerHTML = '<p class="success">Message envoyé avec succès !</p>';
                    contactForm.reset();
                    
                    // Redirection vers la page de remerciement après 2 secondes
                    setTimeout(function() {
                        window.location.href = 'merci.html';
                    }, 2000);
                }, function(error) {
                    console.log('FAILED...', error);
                    formStatus.innerHTML = '<p class="error">Une erreur s\'est produite. Veuillez réessayer.</p>';
                })
                .finally(function() {
                    submitBtn.disabled = false;
                });
        });
    }
});

// Ajout de styles pour les messages de statut
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        #form-status {
            margin: 15px 0;
            font-weight: 500;
        }
        #form-status .sending {
            color: var(--primary-color);
        }
        #form-status .success {
            color: var(--success-color);
        }
        #form-status .error {
            color: var(--danger-color);
        }
    `;
    document.head.appendChild(style);
});
