import { LightningElement, wire } from 'lwc';
import Id from '@salesforce/user/Id';
import { getRecord } from 'lightning/uiRecordApi';
import UserNameFld from '@salesforce/schema/User.FirstName';

export default class DisplayName extends LightningElement {
    enteredValue;
    capitalizedValue;
    wish;

    currentUserName;

    @wire(getRecord, { recordId: Id, fields:[UserNameFld]}) 
    userDetails({error, data}) {
        if (data) {
            this.currentUserName = data.fields.FirstName.value;
            
        } else if (error) {
            this.error = error ;
        }
    }


    capitalizeWord(event){
        this.enteredValue = event.target.value;
        this.capitalizedValue = this.enteredValue.toUpperCase();
        console.log(this.capitalizedValue);
     }

    currenthour = new Date().getHours();    

    
    get messageWish(){
        if (this.currenthour < 12) {
            this.wish = "Good Morning " + this.currentUserName + " !";
            console.log(this.wish);
            return this.wish;

        }
        else if(this.currenthour >=12 && this.currenthour <18 ){
            this.wish = "Good Afternoon " + this.currentUserName + " !"
            console.log(this.wish);
            return this.wish;
        } 

        else{
            this.wish = "Good Evening " + this.currentUserName + " !"
            return this.wish;

        }

    }
    // wish = 'Good '+ (currenthour<12 ? 'Morning' : currenthour<18 ? 'Afternoon' : 'Evening'); 
}