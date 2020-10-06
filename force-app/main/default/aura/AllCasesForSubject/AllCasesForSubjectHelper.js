({
    promesa : function(cmp, action){
        return new Promise( function(resolve, reject){
            action.setCallback(this, function(response){
                var state = response.getState();
                
                if (state === "SUCCESS") {
                    resolve(response.getReturnValue());
                } else if (state === "ERROR") {
                    reject("Unknown error");
                }
            });
            $A.enqueueAction(action);
        });
    },
})