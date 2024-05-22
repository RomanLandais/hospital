// Importer Cypress et configurer les options

// Définir le scénario de test
describe("Inscription Utilisateur", () => {
  it("Doit permettre à un nouvel utilisateur de s'inscrire", () => {
    // Ouvrir l'application
    cy.visit("/inscription");

    // Remplir le formulaire d'inscription avec des informations valides
    cy.get('input[name="nom"]').type("NomUtilisateur");
    cy.get('input[name="email"]').type("utilisateur@example.com");
    cy.get('input[name="motDePasse"]').type("motDePasse123");
    cy.get('input[name="confirmationMotDePasse"]').type("motDePasse123");

    // Soumettre le formulaire
    cy.get('button[type="submit"]').click();

    // Vérifier que l'utilisateur est redirigé vers la page de connexion après l'inscription
    cy.url().should("include", "/connexion");

    // Vérifier que le message de confirmation d'inscription est affiché
    cy.contains(
      "Votre compte a été créé avec succès. Veuillez vous connecter."
    );
  });
});
