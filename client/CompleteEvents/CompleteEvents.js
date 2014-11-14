if (Meteor.isClient) {
	Template.CompleteEvents.helpers({
			complete_events: function() {
				return MegaEvents.find({state: 'complete'});
			}
	});	
}
