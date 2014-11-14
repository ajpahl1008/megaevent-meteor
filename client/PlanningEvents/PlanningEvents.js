if (Meteor.isClient) {
	Template.PlanningEvents.helpers({
			planning_events: function() {
				return MegaEvents.find({state: 'planning'});
			}
	});
		
}
