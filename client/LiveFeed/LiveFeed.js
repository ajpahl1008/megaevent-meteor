	Template.LiveFeed.helpers({
		current_12hr_tasks: function() {
			return MegaFeed.find({}).fetch().reverse();
		}		
	});

	