Template.Role.helpers({
		all_roles: function() {
			return MegaRoles.find({});
		}
});


Template.RoleEditor.events({
	'click .trashrole': function(evt,tmpl) {
		Session.set('delete_roleId',tmpl.data._id);
		 $('.confirmRoleModal').modal('show');
	},
		'click .delete-yes-button': function(evt, tmpl) {
		
		MegaRoles.remove({_id: Session.get('delete_roleId')});
		$('.confirmRoleModal').on('hidden.bs.modal', function() {
        }).modal('hide');
    	Session.set('delete_roleId',null);
	
	},
		'click .delete-cancel-button': function(evt, tmpl) {
			$('.confirmRoleModal').on('hidden.bs.modal', function() {
    	}).modal('hide');
    	Session.set('delete_roleId',null);
		
	}
});

Template.RoleEditor.helpers({
	targeted_delete_role: function() {
 		var targetRole = MegaRoles.findOne(Session.get('delete_roleId'));
		if (((typeof targetRole != "undefined") && (typeof targetRole.valueOf() == "object")) && (targetRole.roleName.length > 0 )) {
			return targetRole.roleName;	
		} else {
			return "No-Name Role";
		}					
	}
});