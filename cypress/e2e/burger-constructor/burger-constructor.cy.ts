describe('Конструктор ингредиетов', () => {
  const URL = process.env.BURGER_API_URL;

  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('Добавление ингредиентов в конструктор', () => {
    cy.contains('li', 'булка').within(() => {
      cy.contains('Добавить').click();
    });
    cy.contains('li', 'Биокотлета').within(() => {
      cy.contains('Добавить').click();
    });
    cy.contains('li', 'Соус').within(() => {
      cy.contains('Добавить').click();
    });
    cy.contains('Оформить заказ').should('not.be.disabled');
  });
});
