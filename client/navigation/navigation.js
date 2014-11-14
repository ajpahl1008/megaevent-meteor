if (Meteor.isClient) {
	Template.navigation.helpers({
		total_event_count: function() {
			return MegaEvents.find().count();
		},
		active_event_count: function() {
			return MegaEvents.find({state:'active'}).count();
		},
		inactive_event_count: function() {
			return MegaEvents.find({state:'inactive'}).count();
		},
		complete_event_count: function() {
			return MegaEvents.find({state:'complete'}).count();
		},
		planning_event_count: function() {
			return MegaEvents.find({state:'planning'}).count();
		}
		
	});
}