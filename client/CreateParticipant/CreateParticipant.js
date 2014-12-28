if (Meteor.isClient) {

	Template.CreateParticipant.rendered=function(evt,tmpl) {
		$('#selectedRole').selectpicker('');
		
	}

	Template.CreateParticipant.events({
		'click .cancelParticipantCreate': function(evt,tmpl) {
			clearParticipantDeck(tmpl);
		},
		'click .saveNewParticipant': function(evt, tmpl) {
			var firstName = tmpl.find('.firstName').value;
			var lastName = tmpl.find('.lastName').value;
			var userId = tmpl.find('.userId').value;
			var emailAddress = tmpl.find('.emailAddress').value;	
			var phoneNumber = tmpl.find('.phoneNumber').value;					
			var role = tmpl.find('.selectedRole').value;
			MegaParticipants.insert({firstName: firstName, lastName: lastName, userId: userId, emailAddress: emailAddress, phoneNumber: phoneNumber, role: role});
			clearParticipantDeck(tmpl);
			Router.go('/CreateParticipant');
		}
  	});
		
	clearParticipantDeck = function(tmpl){
		tmpl.find('.firstName').value = '';
		tmpl.find('.lastName').value = '';
		tmpl.find('.userId').value = '';
		tmpl.find('.emailAddress').value = '';
		tmpl.find('.phoneNumber').value = '';
		tmpl.find('.selectedRole').value = '';
	}
	
}

