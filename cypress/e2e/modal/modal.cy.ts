describe('Модальное окно', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });
  it('Открытие модального окна ингредиента', () => {
    cy.contains('li', 'Соус').click();

    cy.get('#modals').within(() => {
      cy.contains('Соус Spicy-X').should('be.visible');
    });
  });

  it('Закрытие модального окна ингредиента', () => {
    cy.contains('li', 'Соус').click();

    cy.get('#modals').within(() => {
      cy.contains('Соус Spicy-X').should('be.visible');
      cy.get('button').filter(':visible').first().click();

      cy.contains('Соус Spicy-X').should('not.exist');
    });
  });
  it('Закрытие модального окна при нажатии на оверлей', () => {
    cy.contains('li', 'Соус').click();

    cy.get('#modals').within(() => {
      cy.contains('Соус Spicy-X').should('be.visible');
    });
    cy.get('body').click(0, 0);

    cy.get('#modals').contains('Соус Spicy-X').should('not.exist');
  });
});
