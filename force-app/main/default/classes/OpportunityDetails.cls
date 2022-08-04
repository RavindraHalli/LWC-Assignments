public with sharing class OpportunityDetails {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunity(String oppId) {
        
        return [Select Id, Name, Amount, Type from Opportunity where Id = :oppId];

    }
}
