import CheckBoxPage from "../../pageObjects/checkBoxPage";
import TextBoxPage from "../../pageObjects/textBoxPage";
import RadioButtonsPage from "../../pageObjects/radioButtonsPage";
import WebTablesPage from "../../pageObjects/webTablesPage";
import ButtonsPage from "../../pageObjects/buttonsPage";
import LinksPage from "../../pageObjects/linksPage";


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
    it.only("Clicking checkbox - Notes", () => {
      
      CheckBoxPage.expandAllButton.click();

      CheckBoxPage.checkboxListItems.contains('Notes').click();
      CheckBoxPage.checkboxListItems.contains('General').click();
      CheckBoxPage.selectedItemsArea
        .should("contain","notes")
        .should("contain","general")
      });
    it.only("Clicking checkbox - Office", () =>{
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

    it.only("",()=>{
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
    
    it.only("Click Radio buttons scenario",() =>{
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
    it.only("Delete all records",() =>{
    //Delete user with email: alden@example.com
      WebTablesPage.deleteRow("alden@example.com");
    });

  });

  context("Butons page scenarios",()=>{
    beforeEach(() => {
      ButtonsPage.visit();
    });

    it.only("Click buttons",()=>{
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
  
  
  context("Butons page scenarios",()=>{
    beforeEach(() => {
      LinksPage.visit();
    });
    it.only("Click Links buttons",()=>{
      cy.intercept("GET","created", {statusCode: 500}).as("getCreated");
      LinksPage.createdLink.click();
      cy.wait("@getCreated").then((data)=>{
        expect(data.response.statusCode).to.eq(201)
      });


    });
  });
});