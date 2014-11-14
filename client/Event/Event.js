if (Meteor.isClient) {
	Template.Event.events({
		'click .trashevent': function(evt,tmpl) {
			 $('#confirm-modal').modal('show');
		},
			'click .confirm-yes-button': function(evt, tmpl) {
	    	MegaEvents.remove({_id: this._id});
	    	$('#confirm-modal').on('hidden.bs.modal', function() {
	            //Router.go('/home');
	        }).modal('hide');
	    
		},
		   'dblclick .eventName': function(evt, tmpl) {
		   Session.set('editing_event', true);
		
		},
			'keyup .eventtext': function(evt,tmpl) {
			if (evt.which === 13 ) {
				var eventText = tmpl.find('.eventtext').value;
				MegaEvents.update(this._id,{$set: {name:eventText}});
				Session.set('editing_event', false);
			 } else if (evt.which === 27) {
			 	Session.set('editing_event', false);
			 } 
		}	
	});

	Template.Event.editing_event = function() {
		return Session.get('editing_event');
	}
	

}
