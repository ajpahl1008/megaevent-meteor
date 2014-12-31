MegaEvents = new Meteor.Collection("MegaEvents");
MegaTasks = new Meteor.Collection("MegaTasks");
MegaParticipants = new Meteor.Collection("MegaParticipants");
MegaRoles = new Meteor.Collection("MegaRoles");
MegaFeed = new Meteor.Collection("MegaFeed");

findEventIDByName = function(eventName) {
	var megaevent = MegaEvents.findOne({eventName: eventName})._id;
	return megaevent;
}

findParticipantIDByName = function(idName) {
	var participant = MegaParticipants.findOne({userId: idName});
	return participant.userId;
}

hasEmptyField = function(jsonObject) {
	var returnType = false;
	for (var item in jsonObject) {
		if (jsonObject[item].length === 0)  {
			returnType = true;
		}
	}
	return returnType;
}

getTimeStamp=function() {
    var now = new Date();
    return ((now.getMonth() + 1) + '/' +
            (now.getDate()) + '/' +
             now.getFullYear() + " " +
             now.getHours() + ':' +
             ((now.getMinutes() < 10)
                 ? ("0" + now.getMinutes())
                 : (now.getMinutes())) + ':' +
             ((now.getSeconds() < 10)
                 ? ("0" + now.getSeconds())
                 : (now.getSeconds())));
}

//TEST DATA LOADER
loadTasks = function(taskVolume, eventState, taskState) {

	for (var x = 0; x < taskVolume ; x++) {
		var eventCursor = MegaEvents.find({state: eventState}).fetch();
				eventCursor.forEach(function(row) {
					MegaTasks.insert({taskName: "autoLoaded", eventID: findEventIDByName(row.eventName), startDate: "12/12/2012", startTime: "00:01:01",
					                  taskDetails: "do some stuff",taskValidaion: "validate some stuff", taskExecutor: findParticipantIDByName("ID4"),
					taskValidator: findParticipantIDByName("ID2") , taskStatus: taskState, requiredRole: "SysAdmin(UNIX)" });
				});
	}
}


//TEST DATA LOADER
reloadTestData = function() {
	// DEBUG-AJP: Clears out the entire collection(s) -- DEBUG: SHOULD BE COMMENTED OUT!!!
	var globalObject=Meteor.isClient?window:global;
	    for(var property in globalObject){
	        var object=globalObject[property];
	        if(object instanceof Meteor.Collection){
	            object.remove({});
	     }
	}
	
	if (MegaParticipants.find().count() === 0) {
		var sysadminParticipants = ["ID1","ID2","ID3","ID4"];
		console.log("Adding Simulated Participants - Developer");
		for (var i = 0; i < sysadminParticipants.length; i++) {
			MegaParticipants.insert({firstName: "Scott", lastName: "Brown", userId: sysadminParticipants[i], role:"Developer", phoneNumber:"888-555-1212", emailAddress:"dude@company.com"});
		}
	
		var ownersParticipants = ["ID5","ID7","ID8"];
		console.log("Adding Simulated Participants - Coordinator");
		for (var i = 0; i < ownersParticipants.length; i++) {
			MegaParticipants.insert({firstName: "Steve", lastName: "Jones", userId: ownersParticipants[i], role:"Change Coordinator", phoneNumber:"555-1212", emailAddress:"dude@company.com"});
		}
	}
	
	if (MegaRoles.find().count() == 0) {
		var roles = ["Systems Engineer","DBA","Developer","San Engineer", "QA", "Audit", "Risk"];
		console.log("Adding Simulated Roles");
		for (var i=0; i< roles.length; i++) {
			MegaRoles.insert({roleName: roles[i]});
		}
	}
	
	if (MegaEvents.find().count() === 0) {
		var activeEvents = ["Event1","Event2","Event3"];
		var completeEvents = ["Event7","Event8","Event9","Event10","Event11", "Event12"];
		var planningEvents = ["Event17","Event18","Event19","Event20","Event21"];
		
		console.log("Adding Simulated Events - Active");
		for (var i = 0; i < activeEvents.length; i++) {
			var me_aid = MegaEvents.insert({eventName: activeEvents[i], startDate:"12-12-1201", startTime:"12:00:00",  state:"active"});
			MegaTasks.insert({taskName: me_aid+1, eventID: me_aid, startDate: "12/12/2012", startTime: "00:01:01",taskDetails: "do some stuff",taskValidaion: "validate some stuff",
			                  taskExecutor: findParticipantIDByName("ID1"),taskValidator: findParticipantIDByName("ID2") ,taskStatus: "active"});
			MegaTasks.insert({taskName: me_aid+2, eventID: me_aid, startDate: "12/12/2012", startTime: "00:01:01",taskDetails: "do some stuff",taskValidaion: "validate some stuff",
			                  taskExecutor: findParticipantIDByName("ID1"),taskValidator: findParticipantIDByName("ID2") ,taskStatus: "completed"});
			MegaTasks.insert({taskName: me_aid+3, eventID: me_aid, startDate: "12/12/2012", startTime: "00:01:01",taskDetails: "do some stuff",taskValidaion: "validate some stuff",
			                  taskExecutor: findParticipantIDByName("ID1"),taskValidator: findParticipantIDByName("ID2") ,taskStatus: "pending"});
			MegaTasks.insert({taskName: me_aid+4, eventID: me_aid, startDate: "12/12/2012", startTime: "00:01:01",taskDetails: "do some stuff",taskValidaion: "validate some stuff",
			                  taskExecutor: findParticipantIDByName("ID1"),taskValidator: findParticipantIDByName("ID2") ,taskStatus: "pending"});
			MegaTasks.insert({taskName: me_aid+5, eventID: me_aid, startDate: "12/12/2012", startTime: "00:01:01",taskDetails: "do some stuff",taskValidaion: "validate some stuff",
			                  taskExecutor: findParticipantIDByName("ID1"),taskValidator: findParticipantIDByName("ID2") ,taskStatus: "active"});

		}
		console.log("Adding Simulated Events - Complete");
		for (var i = 0; i < completeEvents.length; i++) {
		  	var me_cid = MegaEvents.insert({eventName: completeEvents[i], startDate:"12-12-1023", startTime:"12:00:00",  state:"complete"});
		  		MegaTasks.insert({taskName: me_cid+1, eventID: me_cid, startDate: "12/12/2012", startTime: "00:01:01",taskDetails: "do some stuff",taskValidaion: "validate some stuff",
            		  			  taskExecutor: findParticipantIDByName("ID1"),taskValidator: findParticipantIDByName("ID2") ,taskStatus: "completed"});
				MegaTasks.insert({taskName: me_cid+2, eventID: me_cid, startDate: "12/12/2012", startTime: "00:01:01",taskDetails: "do some stuff",taskValidaion: "validate some stuff",
                                  taskExecutor: findParticipantIDByName("ID1"),taskValidator: findParticipantIDByName("ID2") ,taskStatus: "completed"});
		        MegaTasks.insert({taskName: me_cid+3, eventID: me_cid, startDate: "12/12/2012", startTime: "00:01:01",taskDetails: "do some stuff",taskValidaion: "validate some stuff",
                                  taskExecutor: findParticipantIDByName("ID1"),taskValidator: findParticipantIDByName("ID2") ,taskStatus: "canceled"});
		}
		console.log("Adding Simulated Events - Planning");
		for (var i = 0; i < planningEvents.length; i++) {
			var me_pid = MegaEvents.insert({eventName: planningEvents[i], startDate:"12-12-1023", startTime:"12:00:00",  state:"planning"});
				MegaTasks.insert({taskName: me_pid+1, eventID: me_pid, startDate: "12/12/2012", startTime: "00:01:01",taskDetails: "do some stuff",taskValidaion: "validate some stuff",
					  			  taskExecutor: findParticipantIDByName("ID1"),taskValidator: findParticipantIDByName("ID2") ,taskStatus: "planning"});
				MegaTasks.insert({taskName: me_pid+2, eventID: me_pid, startDate: "12/12/2012", startTime: "00:01:01",taskDetails: "do some stuff",taskValidaion: "validate some stuff",
				                  taskExecutor: findParticipantIDByName("ID1"),taskValidator: findParticipantIDByName("ID2") ,taskStatus: "planning"});
				MegaTasks.insert({taskName: me_pid+3, eventID: me_pid, startDate: "12/12/2012", startTime: "00:01:01",taskDetails: "do some stuff",taskValidaion: "validate some stuff",
				                  taskExecutor: findParticipantIDByName("ID1"),taskValidator: findParticipantIDByName("ID2") ,taskStatus: "canceled"});
		}
	}
	
	console.log("Added Simulated Feed Item");
	if (MegaFeed.find().count() === 0 ) {
		MegaFeed.insert({feedTimeStamp: getTimeStamp(),  feedData: "Some Shit Happened at this time."});
		MegaFeed.insert({feedTimeStamp: getTimeStamp(),  feedData: "Some More Shit Went down"});
	} 
	
}