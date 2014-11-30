Template.RelatedEvent.helpers({
		all_planned_events: function() {
			return MegaEvents.find({});
		}
});