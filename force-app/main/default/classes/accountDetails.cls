public with sharing class accountDetails {
    @AuraEnabled(cacheable=true)
    public static List<Account> getActiveAccountDetails() {

        return [SELECT Id,NAME,Active__c FROM ACCOUNT WHERE Active__c = 'Yes'];

    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getInactiveAccountDetails() {

        return [SELECT Id,NAME,Active__c FROM ACCOUNT WHERE Active__c = 'No'];

    }

    @AuraEnabled(cacheable=true)
    public static List<Case> getCaseDetails(string acctId) {

        return [SELECT CaseNumber,Status, Account.Name, Account.Active__C FROM Case WHERE AccountId = :acctId];

    }
}
