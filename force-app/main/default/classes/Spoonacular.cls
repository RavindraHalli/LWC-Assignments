public class Spoonacular {
    
    private static final String SPOONACULAR_API = 'https://api.spoonacular.com/recipes/random?apiKey=';
    private static final string API_KEY = 'e2c5cb1fb9764614915d36a64d40824f';

    @AuraEnabled
    public static string getRandomRecipie(){
        HTTP http = new HTTP();

        HttpRequest request = new HttpRequest();
        
        request.setEndPoint(SPOONACULAR_API + API_KEY);
        request.setMethod('GET');
        
        HttpResponse response = http.send(request);
        
        
         if (response.getStatusCode() == 200) {
                    return response.getBody();
                }
       
        return ''; 
    }

}