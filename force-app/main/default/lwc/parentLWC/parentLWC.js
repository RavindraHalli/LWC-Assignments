import { LightningElement,api,wire, track } from 'lwc';
import getActiveAccountDetails from '@salesforce/apex/AccountDetails.getActiveAccountDetails';
import getInactiveAccountDetails from '@salesforce/apex/AccountDetails.getInactiveAccountDetails';
import getCaseDetails from '@salesforce/apex/AccountDetails.getCaseDetails';

const case_column = [
  { label: 'Case Number', fieldName: 'CaseNumber'},
  { label: 'Status', fieldName: 'Status'} 
 
];

export default class ParentLWC extends LightningElement {
    @api recordId;
    @api objectApiName;
    
    acctRecId;
    activeRec;
    inactiveRec;
    caseRec;
    checkAccount;

    @track acctName;
    @track accountName;
    

    @track clickedActiveButton = "Show Active";
    @track clickedInactiveButton = "Show Inactive";

    @track boolActive = false;
    @track boolInactive = false;

    @track activeCaseRec;
    @track inactiveCaseRec;

    //@track bool;

    @wire(getActiveAccountDetails) activeAccountRecords({error,data}){
      if(data){
        this.activeRec = data;
         console.log("Active data:",this.activeRec); 
      }
    }

    @wire(getInactiveAccountDetails) inactiveAccountRecords({error,data}){
      if(data){
        this.inactiveRec = data;
         console.log("inactive data:",this.inactiveRec); 
      }
    }
    

    @wire(getCaseDetails,{acctId:'$acctRecId'}) caseRecords({error,data}){
      if(data){

        console.log('Entered Case Method');
        
        this.caseRec = data;

        console.log('caseRec:',this.caseRec);
        console.log('data.length', data.length);

        if (data.length === 0){
          console.log('Data length is 0 ')

          this.checkAccount = this.activeRec.includes(this.acctRecId);
          console.log('checkAccount:',this.checkAccount);


          if(this.checkAccount === true){
           console.log('Active Account Case');
           this.activeAcctName = "No Related case found for " + this.acctName;
           this.activeCaseRec = data;
          }
          else if (this.checkAccount === false) {
            console.log('InActive Account Case')
           this.inactiveAcctName = "No Related case found for " + this.acctName;
           this.inactiveCaseRec = data;
           console.log('No cases Found');
          }
        }
        else{   

           console.log('Entered Case Else Method'); 

          if(data[0].Account.Active__c == 'Yes'){
            console.log('Else : Active Account Cases');
            this.activeCaseRec = data;
            console.log('activeCaseRec:',this.activeCaseRec);
            this.activeAcctName = "Related Cases of " + data[0].Account.Name;
          }
          else if (data[0].Account.Active__c == 'No'){
            console.log('Else : InActive Account Cases');
            this.inactiveCaseRec = data;
            console.log('inactiveCaseRec:',this.inactiveCaseRec);
            this.inactiveAcctName = "Related Cases of " + data[0].Account.Name;

          }

        // console.log("caseRec data:",this.caseRec); 
        // this.caseRec.map(i=>{
        // this.acctName =  i.Account?.Name
        // console.log('acctName',this.acctName);
        //  this.accountName = "Related Cases of " + this.acctName;
        // });
      }
      }     

    }
    case_column = case_column;

    handleCaseView(event){
        console.log('handleCaseView enetered');        
        this.acctRecId = event.detail.accID;
        this.acctName = event.detail.accName;
        console.log('acctRecId: ',this.acctRecId);
        console.log('event.detail.accID: ',event.detail.accID);

    }
    

    handleActiveClick(event) {        
        const label = event.target.label;
        if (label === "Show Active" ){
              this.clickedActiveButton = "Hide Active";
              this.boolActive = true;
              
        }

        else if(label === "Hide Active" ){
          this.clickedActiveButton = "Show Active";
          this.boolActive = false;
          this.activeCaseRec = null;
        } 
    }
    
    handleInactiveClick(event) {   
      const label = event.target.label;
        if (label === "Show Inactive" ){
              this.clickedInactiveButton = "Hide Inactive";
              this.boolInactive = true;
        }

        else if (label === "Hide Inactive" ) {
          this.clickedInactiveButton = "Show Inactive";
          this.boolInactive = false;
          this.inactiveCaseRec = null;
        }      
        
    }  
}