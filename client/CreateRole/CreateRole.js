
	Template.CreateRole.events({
		'click .cancelRoleCreate': function(evt,tmpl) {
			clearRoleDeck(tmpl);
		},
		'click .saveNewRole': function(evt, tmpl) {
			var roleName = tmpl.find('.roleName').value;
			var roleInfo = {roleName: roleName};
			if (hasEmptyField(roleInfo) ) { 
				Alerts.add('Incomplete Data: Please Update And Resubmit', 'danger', {fadeIn: 500, fadeOut: 1000, autoHide: 3000});
			} else {
				MegaRoles.insert({roleName: roleName});
				clearRoleDeck(tmpl);	
				Alerts.add('Created Role ' + roleName ,'success',{fadeIn: 1000, fadeOut: 1000, autoHide: 3000});
				MegaFeed.insert({feedTimeStamp: getTimeStamp(), feedData: "Created New Role: " + roleName});
			}
		},
		'keyup .roleName': function(evt,tmpl) {
			if (evt.which === 13 ) {
			var roleName = tmpl.find('.roleName').value;
			var roleInfo = {roleName: roleName};
			if (hasEmptyField(roleInfo) ) { 
				Alerts.add('Incomplete Data: Please Update And Resubmit', 'danger', {fadeIn: 500, fadeOut: 1000, autoHide: 3000});
			} else {
				MegaRoles.insert({roleName: roleName});
				clearRoleDeck(tmpl);	
				Alerts.add('Created Role ' + roleName ,'success',{fadeIn: 1000, fadeOut: 1000, autoHide: 3000});
				MegaFeed.insert({feedTimeStamp: getTimeStamp(), feedData: "Created New Role: " + roleName});
			}
		 }
		} 
  	});

	clearRoleDeck = function(tmpl){
		tmpl.find('.roleName').value = '';
	}	


