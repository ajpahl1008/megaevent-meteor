if (Meteor.isClient) {
	Template.EditRoles.helpers({
		list_roles: function() {
			return MegaRoles.find({});
		}		
	});
}
	