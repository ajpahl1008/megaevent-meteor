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
			  loadTaskData: function() {
			  	  loadTasks(65, 'planning', 'pending');
  			  	  loadTasks(3, 'planning', 'canceled');
				  loadTasks(25, 'active', 'pending');
  				  loadTasks(32, 'active', 'active');
   				  loadTasks(67, 'active', 'completed');
   				  loadTasks(9, 'active', 'canceled');
  				  loadTasks(50, 'complete', 'completed');
   				  loadTasks(3, 'complete', 'canceled');
			  }			  
		    });
	

}