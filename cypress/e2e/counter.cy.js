describe('Counter Component', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the initial value of 0', () => {
    cy.get('h1').should('have.text', '0');
  });

  it('should increment the counter when the "+" button is clicked', () => {
    cy.contains('button', '+').click();

    cy.get('h1').should('have.text', '1');
  });

  it('should decrement the counter when the "-" button is clicked', () => {
    cy.contains('button', '-').click();

    cy.get('h1').should('have.text', '-1');
  });

  it('should handle multiple increments and decrements', () => {
    cy.contains('button', '+').click();
    cy.contains('button', '+').click();
    cy.get('h1').should('have.text', '2');

    cy.contains('button', '-').click();
    cy.get('h1').should('have.text', '1');
  });
});
