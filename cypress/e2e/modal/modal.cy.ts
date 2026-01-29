import {
  INGREDIENTS_API,
  LIST_ITEM,
  SAUCE_NAME,
  MODALS,
  SAUCE_FULL_NAME
} from 'cypress/support/constants';

describe('Модальное окно', () => {
  beforeEach(() => {
    cy.intercept('GET', INGREDIENTS_API, {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('Открытие модального окна ингредиента', () => {
    cy.contains(LIST_ITEM, SAUCE_NAME).click();

    cy.get(MODALS).within(() => {
      cy.contains(SAUCE_FULL_NAME).should('be.visible');
    });
  });

  it('Закрытие модального окна ингредиента', () => {
    cy.contains(LIST_ITEM, SAUCE_NAME).click();

    cy.get(MODALS).within(() => {
      cy.contains(SAUCE_FULL_NAME).should('be.visible');
      cy.get('button').filter(':visible').first().click();
      cy.contains(SAUCE_FULL_NAME).should('not.exist');
    });
  });

  it('Закрытие модального окна по клику на оверлей', () => {
    cy.contains(LIST_ITEM, SAUCE_NAME).click();

    cy.get(MODALS).within(() => {
      cy.contains(SAUCE_FULL_NAME).should('be.visible');
    });

    cy.get('body').click(0, 0);
    cy.get(MODALS).contains(SAUCE_FULL_NAME).should('not.exist');
  });
});
