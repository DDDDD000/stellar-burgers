describe('Заказ', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '**/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', '**/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    cy.setCookie('accessToken', 'test-access-token');
    window.localStorage.setItem('refreshToken', 'test-refresh-token');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookies();
    window.localStorage.clear();
  });

  it('Создание заказа', () => {
    cy.contains('li', 'булка').within(() => {
      cy.contains('Добавить').click();
    });

    cy.contains('li', 'Биокотлета').within(() => {
      cy.contains('Добавить').click();
    });

    cy.contains('li', 'Соус').within(() => {
      cy.contains('Добавить').click();
    });

    cy.contains('Оформить заказ').click();

    cy.wait('@createOrder');

    cy.get('#modals').within(() => {
      cy.contains('111111').should('be.visible');
    });

    cy.get('#modals').find('button').filter(':visible').first().click();

    cy.get('#modals').contains('111111').should('not.exist');

    cy.contains('p', /^0$/).should('be.visible');
  });
});
