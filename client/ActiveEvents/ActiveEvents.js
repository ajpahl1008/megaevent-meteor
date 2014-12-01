if (Meteor.isClient) {
	Template.ActiveEvents.helpers({
		active_events: function() {
			return MegaEvents.find({state: 'active'});
		}		
	});
}
	