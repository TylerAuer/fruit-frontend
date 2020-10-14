///<reference types="Cypress" />

describe('All pages load', () => {
  it('/', () => {
    cy.visitAsNewUser('/');
  });

  it('/data', () => {
    cy.visitAsNewUser('/data');
  });

  it('/about', () => {
    cy.visitAsNewUser('/about');
  });
});

describe('<h1> in Header navigates to /', () => {
  it('from /data', () => {
    cy.visitAsNewUser('/data');
    cy.get('h1').click();
    cy.url().should('include', '#/');
  });

  it('from /about', () => {
    cy.visitAsNewUser('/about');
    cy.get('h1').click();
    cy.location('hash').should('eq', '#/');
  });
});

describe('"Back to Matrix" btn navigates to /', () => {
  it('from /data', () => {
    cy.visitAsNewUser('/data');
    cy.get('header > button').click();
    cy.url().should('include', '#/');
  });

  it('from /about', () => {
    cy.visitAsNewUser('/about');
    cy.get('header > button').click();
    cy.location('hash').should('eq', '#/');
  });
});

describe('Links and buttons in footer of /', () => {
  beforeEach(() => {
    cy.visitAsNewUser('/');
  });

  it('Has 3 elements', () => {
    cy.get('.bottom__link').should('have.length', 3);
  });

  it('"About" navigates to /about', () => {
    cy.get('.bottom__link').contains('About').click();
    cy.location('hash').should('eq', '#/about');
  });

  it('"Data" navigates to /data', () => {
    cy.get('.bottom__link').contains('Data').click();
    cy.location('hash').should('eq', '#/data');
  });

  it('"Inspiration" opens xkcd Modal', () => {
    cy.get('.bottom__link').contains('Inspiration').click();
    cy.get('.react-responsive-modal-overlay');
  });
});

describe('Jump links in /data', () => {
  context('User without previous ratings', () => {
    before(() => {
      cy.visitAsNewUser('/data');
    });

    it('Rating Frequencies', () => {
      cy.get('.nav__link').contains('Rating Frequencies').click();
      cy.location('hash').should('eq', '#/data/#frequencies');
    });

    it('Isolated Dimensions', () => {
      cy.get('.nav__link').contains('Isolated Dimensions').click();
      cy.location('hash').should('eq', '#/data/#iso-dimensions');
    });

    it('2D Histograms', () => {
      cy.get('.nav__link').contains('2D Histograms').click();
      cy.location('hash').should('eq', '#/data/#histograms');
    });

    it('Correlation Matrices', () => {
      cy.get('.nav__link').contains('Correlation Matrices').click();
      cy.location('hash').should('eq', '#/data/#correlation');
    });
  });

  context('User with previous ratings', () => {
    before(() => {
      cy.visitAsUserWithPreviousRatings('/data');
      cy.closeReturningUserModal();
    });

    it('Percentiles', () => {
      cy.get('.nav__link').contains('Percentiles').click();
      cy.location('hash').should('eq', '#/data/#percentiles');
    });
  });
});