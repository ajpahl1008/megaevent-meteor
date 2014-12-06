if (Meteor.isServer) {
	Meteor.startup(function() {
		console.log("Starting Up MegaEvent");
		reloadTestData();
	
	});
	
	Meteor.methods({
		      reloadData: function() {
				  reloadTestData();
				  console.log("Reload Complete");
		      },
			  loadTaskData: function(eventName, taskName, taskStatus) {
			  	  loadTask(eventName, taskName, taskStatus);
			  }
			  
		    });
	

}