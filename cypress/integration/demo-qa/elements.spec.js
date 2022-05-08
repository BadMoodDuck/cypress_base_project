import CheckBoxPage from "../../pageObjects/checkBoxPage";
import TextBoxPage from "../../pageObjects/textBoxPage";
import RadioButtonsPage from "../../pageObjects/radioButtonsPage";
import WebTablesPage from "../../pageObjects/webTablesPage";
import ButtonsPage from "../../pageObjects/buttonsPage";
import LinksPage from "../../pageObjects/linksPage";
import SelectablePage from "../../pageObjects/selectablePage";


context("Elements Page", () => {
  context("Text box scenarios", () => {
    beforeEach(() => {
      TextBoxPage.visit();
    });

    it("Filling in Text Boxes", () => {
      // Add scenario stuff here
      TextBoxPage.fullNameInput.type("George");
      TextBoxPage.userEmailInput.type("randomemail@randomdomain.com");
      TextBoxPage.currentAddressInput.type("Some Random Current Address 1234");
      TextBoxPage.permanentAddressInput.type("Some Random Permanent Address 1234");
      
      TextBoxPage.submitButton.click();

      TextBoxPage.nameParagraph.should("be.visible").should("contain","George");
      TextBoxPage.emailParagraph.should("be.visible").should("contain","randomemail@randomdomain.com");
      TextBoxPage.currentAddressParagraph.should("be.visible").should("contain","Some Random Current Address 1234");
      TextBoxPage.permanentAddressParagraph.should("be.visible").should("contain","Some Random Permanent Address 1234");



    });
    it("Filling in Text Boxes with fixture",() => {
      cy.fixture('textBoxPageData').then((data) => {
        TextBoxPage.fullNameInput.type(data.fullName);
        TextBoxPage.userEmailInput.type(data.email);
        TextBoxPage.currentAddressInput.type(data.currentAddress);
        TextBoxPage.permanentAddressInput.type(data.permanentAddress);
      
        TextBoxPage.submitButton.click();

        TextBoxPage.nameParagraph.should("be.visible").should("contain",data.fullName)
        TextBoxPage.emailParagraph.should("be.visible").should("contain",data.email)
        TextBoxPage.currentAddressParagraph.should("be.visible").should("contain",data.currentAddress)
        TextBoxPage.permanentAddressParagraph.should("be.visible").should("contain",data.permanentAddress)

      });
    });
  });
  
  
  context("Checkbox scenarios", () =>{
    beforeEach(() => {
     CheckBoxPage.visit();
    });
    it("Clicking checkbox - Notes", () => {
      
      CheckBoxPage.expandAllButton.click();

      CheckBoxPage.checkboxListItems.contains('Notes').click();
      CheckBoxPage.checkboxListItems.contains('General').click();
      CheckBoxPage.selectedItemsArea
        .should("contain","notes")
        .should("contain","general")
      });
    it("Clicking checkbox - Office", () =>{
      CheckBoxPage.expandAllButton.click();
      CheckBoxPage.checkboxListItems.contains("Office").click();
      CheckBoxPage.selectedItemsArea
        .should("contain","office")
        .should("contain","public")
        .should("contain","private")
        .should("contain","classified")
        .should("contain","general")
    });
  });


  context("Radio button scenarios", () =>{
    beforeEach(() => {
     RadioButtonsPage.visit();
    });

    it("",()=>{
      RadioButtonsPage.yesRadioButton.click();
      RadioButtonsPage.resultsText.should("contain", "Yes");
      RadioButtonsPage.impressiveRadioButton.click();
      RadioButtonsPage.resultsText.should("contain", "Impressive");
      RadioButtonsPage.noRadioButton.should("be.disabled");

    });
  });

  context("Web tables scenarios",()=>{
    beforeEach(() => {
      WebTablesPage.visit();
    });
    
    it("Click Radio buttons scenario",() =>{
      WebTablesPage.addButton.click();
      
      WebTablesPage.firstName.type("xxxxx");
      WebTablesPage.lastName.type("yyyyy");
      WebTablesPage.userEmail.type("aaa@bbb.com");
      WebTablesPage.userAge.type("50");
      WebTablesPage.salary.type("50000");
      WebTablesPage.department.type("Science");
      
      WebTablesPage.submitButton.click();

      WebTablesPage.allTable.should("contain","aaa@bbb.com")
      WebTablesPage.allTableRows.should("contain","aaa@bbb.com")


    });
    it("Delete all records",() =>{
    //Delete user with email: alden@example.com
      WebTablesPage.deleteRow("alden@example.com");
    });

  });

  context("Butons page scenarios",()=>{
    beforeEach(() => {
      ButtonsPage.visit();
    });

    it("Click buttons",()=>{
      //Do a double click / validate
      ButtonsPage.doubleClickButton.dblclick();
      ButtonsPage.doubleClickSuccessMsg.should('contain','You have done a double click')
      // do a right click / validate
      ButtonsPage.rightClickButton.rightclick();
      ButtonsPage.rightClickSuccessMsg.should('contain','You have done a right click')
      // do a dynamic click / validate
      ButtonsPage.dynamicClickButton.click();

    });
  });
  
  
  context("Buttons page scenarios",()=>{
    beforeEach(() => {
      LinksPage.visit();
    });
    it("Click Links buttons",()=>{
      cy.intercept("GET","created", {statusCode: 500}).as("getCreated");
      LinksPage.createdLink.click();
      cy.wait("@getCreated").then((data)=>{
        expect(data.response.statusCode).to.eq(500)
      });


    });

  context("Selectable page scenarios",()=>{
    beforeEach(() => {
      SelectablePage.visit();
    });

    it("Scenario 1", ()=>{
      //Noklikot uz laukiem “Cras justo odio” un “Morbi leo risus”
      SelectablePage.container.contains("Cras justo odio").click();
      SelectablePage.container.contains("Morbi leo risus").click();
      //Novalidēt, ka noklikotie lauki ir aktīvi.
      SelectablePage.container.contains("Cras justo odio").should('have.class', "mt-2 list-group-item active list-group-item-action")
      SelectablePage.container.contains("Morbi leo risus").should('have.class', "mt-2 list-group-item active list-group-item-action")
      //Novalidēt, ka pārējie lauki nav mainījuši stāvokli.
      SelectablePage.container.contains("Dapibus ac facilisis in").should('have.class', "mt-2 list-group-item list-group-item-action");
      SelectablePage.container.contains("Porta ac consectetur ac").should('have.class', "mt-2 list-group-item list-group-item-action");
    });

    it("Scenario 2", ()=>{
      //Atvērt sadaļu “Grid”.
      SelectablePage.tabGrid.click();
      //Noklikot laukus “Two”, “Four”, “Six” un “Eight”.
      SelectablePage.gridElement.contains("Two").click();
      SelectablePage.gridElement.contains("Four").click();
      SelectablePage.gridElement.contains("Six").click();
      SelectablePage.gridElement.contains("Eight").click();
      //Novalidēt, ka lauki “Two”, “Four”, “Six” un “Eight” ir aktīvi.
      SelectablePage.gridElement.contains("Two").should('have.class','list-group-item active list-group-item-action');
      SelectablePage.gridElement.contains("Four").should('have.class','list-group-item active list-group-item-action');
      SelectablePage.gridElement.contains("Six").should('have.class','list-group-item active list-group-item-action');
      SelectablePage.gridElement.contains("Eight").should('have.class','list-group-item active list-group-item-action');
      //Novalidēt, ka pārējie lauki nav mainījuši stāvokli.
      SelectablePage.gridElement.contains("One").should('have.class','list-group-item list-group-item-action');
      SelectablePage.gridElement.contains("Three").should('have.class','list-group-item list-group-item-action');
      SelectablePage.gridElement.contains("Five").should('have.class','list-group-item list-group-item-action');
      SelectablePage.gridElement.contains("Seven").should('have.class','list-group-item list-group-item-action');
      SelectablePage.gridElement.contains("Nine").should('have.class','list-group-item list-group-item-action');
    });


  });



  });
});