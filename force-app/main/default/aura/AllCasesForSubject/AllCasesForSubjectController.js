({
    doInit : function(cmp, evn, hlp) {
        var currentCase = cmp.get("c.getCase");
        currentCase.setParams({caseId : cmp.get("v.recordId")});
        hlp.promesa(cmp, currentCase)
        .then(
            $A.getCallback(function(response){
                var allCases = cmp.get("c.allCasesBySubject");
                allCases.setParams({currentCase : response});
                cmp.set("v.accountName", response.Account.Name);
                return hlp.promesa(cmp, allCases);
            }))
        .then(
            $A.getCallback(function(response){
                cmp.set("v.allCases", response);
                cmp.set("v.totalCases", response.length);
            }))
        .catch(
            $A.getCallback(function(response){
                console.log(response);
            }));
    },
    handleClick : function(component, event, helper) {
        var recordId = event.target.dataset.caseid;
        
        var sObectEvent = $A.get("e.force:navigateToSObject");
        sObectEvent.setParams({
            "recordId": recordId,
            "slideDevName": "detail"
        });
        sObectEvent.fire();
    }
})