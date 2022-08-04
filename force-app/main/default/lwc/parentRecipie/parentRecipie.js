import { LightningElement,wire, api } from 'lwc';
import getRandomRecipie from '@salesforce/apex/Spoonacular.getRandomRecipie';

export default class ParentRecipie extends LightningElement {

    
    @api image;
    @api price;
    @api time;
    @api summary;
    @api title;
    @api randomRec;

    //  get getRandomRecipie() {        
    //     if(data){
    //      this.randomRec = JSON.parse(data);
    //       console.log("Random data:",this.randomRec); 
    //     }
    //    else{
    //        console.log('Error')
    //    }
    //   }

    handleRandomClick(){
        console.log('Entered the handleRandomClick')
        getRandomRecipie()
        .then((data) => {            
            let recipe = JSON.parse(data);
            console.log('recipe',recipe)
            if (recipe) {
                console.log('recipe1',recipe)
                
              this.image = recipe.recipes[0].image;
              this.title = recipe.recipes[0].title;

              this.price = recipe.recipes[0].pricePerServing;
              console.log('price',this.price);

              this.time = recipe.recipes[0].readyInMinutes;
              console.log('time',this.time);

              this.summary = recipe.recipes[0].summary;
              console.log('summary',this.summary);

              console.log('Post Summary')
              
            }
          })
          .catch((error) => {
            console.error(error);
          });
       
    }  
}