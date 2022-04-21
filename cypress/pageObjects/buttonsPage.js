import BasePage from"./basePage";

class ButtonsPage extends BasePage{
    static get url(){
        return'/buttons'    
    }
    static get exampleElement () {
        return cy.get("exampleSelector");
    }
    static get doubleClickButton () {
        return cy.get("#doubleClickBtn");
    }
    static get rightClickButton () {
        return cy.get("#rightClickBtn");
    }
    static get doubleClickSuccessMsg () {
        return cy.get("#doubleClickMessage");
    }
    static get rightClickSuccessMsg () {
        return cy.get("#rightClickMessage");
    }
    static get dynamicClickButton () {
        return cy.get("button.btn-primary").contains(/^\bClick Me\b/);
    }
    static get dynamicClickSuccessMsg () {
        return cy.get("#dyma,ocClickMessage");
    }

}

export default ButtonsPage;