import {
  ADD_BUTTON_TEXT,
  BUN_NAME,
  INGREDIENTS_API,
  LIST_ITEM,
  MAIN_NAME,
  ORDER_BUTTON_TEXT,
  SAUCE_NAME
} from 'cypress/support/constants';

describe('Конструктор ингредиетов', () => {
  beforeEach(() => {
    cy.intercept('GET', INGREDIENTS_API, {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('Добавление ингредиентов в конструктор', () => {
    cy.contains(LIST_ITEM, BUN_NAME).within(() => {
      cy.contains(ADD_BUTTON_TEXT).click();
    });

    cy.contains(LIST_ITEM, MAIN_NAME).within(() => {
      cy.contains(ADD_BUTTON_TEXT).click();
    });

    cy.contains(LIST_ITEM, SAUCE_NAME).within(() => {
      cy.contains(ADD_BUTTON_TEXT).click();
    });

    cy.contains(ORDER_BUTTON_TEXT).should('not.be.disabled');
  });
});
