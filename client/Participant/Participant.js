Template.Participant.helpers({
		all_persons: function() {
			return MegaParticipants.find({});
		}
});
Template.Validator.helpers({
		all_persons: function() {
			return MegaParticipants.find({});
		}
});
Template.Executor.helpers({
		all_persons: function() {
			return MegaParticipants.find({});
		}
});


Template.ParticipantEditor.events({
	'click .trashparticipant': function(evt,tmpl) {
		Session.set('delete_participantId',tmpl.data._id);
		 $('.confirmParticipantModal').modal('show');
	},
		'click .delete-yes-button': function(evt, tmpl) {
		
		var _tmpParticipantInfo = MegaParticipants.findOne(Session.get('delete_participantId'));
		MegaParticipants.remove({_id: Session.get('delete_participantId')});
		MegaFeed.insert({feedTimeStamp: getTimeStamp(), feedData: "Deleted Participant: " + _tmpParticipantInfo.userId});
		
		
		$('.confirmParticipantModal').on('hidden.bs.modal', function() {
        }).modal('hide');
    	Session.set('delete_roleId',null);
	
	},
		'click .delete-cancel-button': function(evt, tmpl) {
			$('.confirmParticipantModal').on('hidden.bs.modal', function() {
    	}).modal('hide');
    	Session.set('delete_participantId',null);
		
	}
});

Template.ParticipantEditor.helpers({
	targeted_delete_participant: function() {
 		var targetParticipant = MegaParticipants.findOne(Session.get('delete_participantId'));
		if (((typeof targetParticipant != "undefined") && (typeof targetParticipant.valueOf() == "object")) && (targetParticipant.userId.length > 0 )) {
			return targetParticipant.userId;	
		} else {
			return "No-Name Participant";
		}					
	}
});