import { LightningElement,api } from 'lwc';
import {NavigationMixin} from 'lightning/navigation'

 const actions = [
      { label: 'View Case', name: 'viewCase' },
  //   { label: 'Edit', name: 'edit' },
      { label: 'Delete', name: 'delete' }
 ];

const data_column = [
    { label: 'Account Name', fieldName: 'Name', type : 'button', initialWidth: 250,
      typeAttributes:{label:{fieldName:'Name'},variant:'base'}},

    { label: 'Is Active?', fieldName: 'Active__c'},
    
    { label: 'More',
        type: 'action',
        typeAttributes: { rowActions: actions },
    },

    { label:''

    },
   
];


export default class ChildLWC extends NavigationMixin(LightningElement) {

    @api activeData;
    @api inactiveData;

    data_columns = data_column;

    navigateToAccount(event){
        console.log("Entered Navigate to Account");

        const actionName = event.detail.action.name;
        console.log('actionName:',this.actionName);
        console.log('event.detail.action.name:',JSON.stringify(actionName));
        const row = event.detail.row;

        //if(actionName === 'viewCase' || 'delete'){
            console.log ('Entered Switch Statement');

        switch (actionName) {
            case 'delete':
                this.deleteRow(row);
                break;
            case 'viewCase':
                this.showCaseDetails(row);
                break;                
            default:
                this.showAccountDetails(row);
        } 
        //}
        //else {

        
        //}
    }

    showAccountDetails(row){
        console.log ('Entered else Statement');        
         this[NavigationMixin.Navigate]({
         type:'standard__recordPage',
         attributes:{
             recordId:row.Id,
             objectApiName:'Account',
             actionName:'view'
         }
     })
   }

    deleteRow(row) {
        const { id } = row;
        const index = this.findRowIndexById(id);
        if (index !== -1) {
            this.data = this.data
                .slice(0, index)
                .concat(this.data.slice(index + 1));
        }
    }

    findRowIndexById(id) {
        let ret = -1;
        this.data.some((row, index) => {
            if (row.id === id) {
                ret = index;
                return true;
            }
            return false;
        });
        return ret;
    }

    showCaseDetails(row) {
        // this.record = row;   
        console.log('showCaseDetails entered');   
        console.log('row.Name',row.Name) 

        const selectedEvent = new CustomEvent("viewcaseclicked", {
            detail: {accID:row.Id,accName:row.Name}                        
        });
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
        console.log('selectedEvent issue:',selectedEvent);
        console.log('accID:',selectedEvent.detail.accID);
        
    }
}