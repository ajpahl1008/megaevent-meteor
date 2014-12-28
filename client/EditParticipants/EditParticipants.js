if (Meteor.isClient) {
	Template.EditParticipants.helpers({
		list_participants: function() {
			return MegaParticipants.find({});
		}		
	});
}
	