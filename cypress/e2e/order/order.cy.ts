import {
  INGREDIENTS_API,
  USER_API,
  ORDERS_API,
  LIST_ITEM,
  BUN_NAME,
  ADD_BUTTON_TEXT,
  MAIN_NAME,
  SAUCE_NAME,
  ORDER_BUTTON_TEXT,
  MODALS,
  ORDER_NUMBER
} from 'cypress/support/constants';

describe('Заказ', () => {
  beforeEach(() => {
    cy.intercept('GET', INGREDIENTS_API, { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', USER_API, { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', ORDERS_API, { fixture: 'order.json' }).as(
      'createOrder'
    );

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
    cy.contains(LIST_ITEM, BUN_NAME).within(() => {
      cy.contains(ADD_BUTTON_TEXT).click();
    });

    cy.contains(LIST_ITEM, MAIN_NAME).within(() => {
      cy.contains(ADD_BUTTON_TEXT).click();
    });

    cy.contains(LIST_ITEM, SAUCE_NAME).within(() => {
      cy.contains(ADD_BUTTON_TEXT).click();
    });

    cy.contains(ORDER_BUTTON_TEXT).click();
    cy.wait('@createOrder');

    cy.get(MODALS).within(() => {
      cy.contains(ORDER_NUMBER).should('be.visible');
    });

    cy.get(MODALS).find('button').filter(':visible').first().click();
    cy.get(MODALS).contains(ORDER_NUMBER).should('not.exist');

    cy.contains('p', /^0$/).should('be.visible');
  });
});
