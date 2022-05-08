import BasePage from "./basePage";

class SelectablePage extends BasePage {
  static get url () {
    return '/selectable';
  }

    static get container () {
        return cy.get('li.mt-2');
    }
    static get tabGrid () {
        return cy.get('a#demo-tab-grid');
    }
    static get gridElement () {
        return cy.get('li.list-group-item');
    }



}


export default SelectablePage;