	// Template.CreateParticipant.rendered=function(evt,tmpl) {
	// 	$('#selectedRole').selectpicker('');
	//
	// }

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
			var participantInfo = {firstName: firstName, lastName: lastName, userId: userId, emailAddress: emailAddress, phoneNumber: phoneNumber, role: role};
			validateParticipantAndSave(participantInfo,tmpl);
		}
  	});
	
    var validateParticipantAndSave = function(participant,tmpl){
 		if (hasEmptyField(participant)) {
 			Alerts.add('Incomplete Data: Please Update And Resubmit', 'danger', {fadeIn: 500, fadeOut: 1000, autoHide: 3000});
		} else {
 			MegaParticipants.insert(participant);
			clearParticipantDeck(tmpl);
 			Alerts.add('Created Participant ' + participant.userId,'success',{fadeIn: 1000, fadeOut: 1000, autoHide: 3000});
		}
 	}
		
	clearParticipantDeck = function(tmpl){
		tmpl.find('.firstName').value = '';
		tmpl.find('.lastName').value = '';
		tmpl.find('.userId').value = '';
		tmpl.find('.emailAddress').value = '';
		tmpl.find('.phoneNumber').value = '';
		tmpl.find('.selectedRole').value = '';
	}
	
	