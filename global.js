MegaEvents = new Meteor.Collection("MegaEvents");
MegaTasks = new Meteor.Collection("MegaTasks");
MegaParticipants = new Meteor.Collection("MegaParticipants");


reloadTestData = function() {
	// Clears out the entire collection(s) -- DEBUG: SHOULD BE COMMENTED OUT!!!
	var globalObject=Meteor.isClient?window:global;
	    for(var property in globalObject){
	        var object=globalObject[property];
	        if(object instanceof Meteor.Collection){
	            object.remove({});
	        }
	    }

	if (MegaEvents.find().count() === 0) {
		var activeEvents = ["Event1","Event2","Event3"];
		var inactiveEvents = ["Event4","Event5","Event6"];
		var completeEvents = ["Event7","Event8","Event9","Event10","Event11", "Event12"];
		var planningEvents = ["Event17","Event18","Event19","Event20","Event21"];
		
		
		console.log("Adding Simulated Events-Active");
		for (var i = 0; i < activeEvents.length; i++) {
			MegaEvents.insert({eventName: activeEvents[i], startDate:"12-12-1201", startTime:"12:00:00.000",  state:"active", complete:10, active:10, unstarted:12});
		}
		console.log("Adding Simulated Events - Inactive");
		for (var i = 0; i < inactiveEvents.length; i++) {
			MegaEvents.insert({eventName: inactiveEvents[i], startDate:"12-12-1023", startTime:"12:00:00.000", state:"inactive",complete:0, active:0, unstarted:12});
		}
		console.log("Adding Simulated Events - Complete");
		for (var i = 0; i < completeEvents.length; i++) {
			MegaEvents.insert({eventName: completeEvents[i], startDate:"12-12-1023", startTime:"12:00:00.000",  state:"complete",complete:100, active:0, unstarted:0});
		}
		console.log("Adding Simulated Events - Planning");
		for (var i = 0; i < planningEvents.length; i++) {
			MegaEvents.insert({eventName: planningEvents[i], startDate:"12-12-1023", startTime:"12:00:00.000",  state:"planning",complete:0, active:0, unstarted:100});
		}
	
	} 
	
	if (MegaParticipants.find().count() === 0) {
		var sysadminParticipants = ["ID2","ID3","ID4"];
		console.log("Adding Simulated Participants - SysAdmins");
		for (var i = 0; i < sysadminParticipants.length; i++) {
			MegaParticipants.insert({participantName: sysadminParticipants[i], role:"sysadmin", phone:"555-1212", email:"dude@company.com"});
		}
	
		var ownersParticipants = ["ID5","ID7","ID8"];
		console.log("Adding Simulated Participants - owners");
		for (var i = 0; i < ownersParticipants.length; i++) {
			MegaParticipants.insert({participantName: ownersParticipants[i], role:"owners", phone:"555-1212", email:"dude@company.com"});
		}
	}
	
}