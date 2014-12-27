if (Meteor.isClient) {

	Template.CreateRole.events({
		'click .cancelRoleCreate': function(evt,tmpl) {
			clearRoleDeck(tmpl);
		},
		'click .saveNewRole': function(evt, tmpl) {
			var roleName = tmpl.find('.roleName').value;

			MegaRoles.insert({roleName: roleName});
			clearRoleDeck(tmpl);
			Router.go('/CreateRole');
		}
  	});
		
	clearRoleDeck = function(tmpl){
		tmpl.find('.roleName').value = '';
	}
	
}

