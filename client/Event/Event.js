if (Meteor.isClient) {
	
	Template.Event.events({
		'click .trashevent': function(evt,tmpl) {
			Session.set('delete_eventId',tmpl.data._id);
		 Session.set('targeted_delete_event',targetEvent.eventName);
			console.log("DEBUG: Deleting Event: " + tmpl.data._id);
			console.log("DEBUG: Targeted Event Name: " + Session.get('targeted_delete_event'));
			 $('.confirmModal').modal('show');
		},
			'click .delete-yes-button': function(evt, tmpl) {
			MegaEvents.remove({_id: Session.get('delete_eventId')});
			$('.confirmModal').on('hidden.bs.modal', function() {
	        }).modal('hide');
	    	Session.set('delete_eventId',null);
		
		},
			'click .delete-cancel-button': function(evt, tmpl) {
				$('.confirmModal').on('hidden.bs.modal', function() {
        	}).modal('hide');
	    	Session.set('delete_eventId',null);
			
		},
		  'dblclick .eventName': function(evt, tmpl) {
		   Session.set('editing_event', true);
		
		},
			'keyup .eventtext': function(evt,tmpl) {
			if (evt.which === 13 ) {
				var eventText = tmpl.find('.eventtext').value;
				MegaEvents.update(this._id,{$set: {eventName:eventText}});
				Session.set('editing_event', false);
			 } else if (evt.which === 27) {
			 	Session.set('editing_event', false);
			 } 
		}	
	});

	Template.Event.helpers({
		editing_event: function() {
				return Session.get('editing_event');
			},
		targeted_delete_event: function() {
   		 		var targetEvent = MegaEvents.findOne(Session.get('delete_eventId'));
			
		        return targetEvent.eventName;
			}
			
	});	
	
	// Template.Event.targeted_item = function() {
// 			return MegaEvents.find({_id: Session.get('delete_eventId')},{fields: {'eventName':1}});
// 	};

}
