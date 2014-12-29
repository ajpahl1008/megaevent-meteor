if (Meteor.isClient) {
	
	Template.Event.events({
		'click .trashevent': function(evt,tmpl) {
			Session.set('delete_eventId',tmpl.data._id);
			 $('.confirmModal').modal('show');
		},
			'click .delete-yes-button': function(evt, tmpl) {
			
			removeEventsTasks(Session.get('delete_eventId'));
			
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
			if (((typeof targetEvent != "undefined") && (typeof targetEvent.valueOf() == "object")) && (targetEvent.eventName.length > 0 )) {
				return targetEvent.eventName;	
			} else {
				return targetEvent = "No-Name Event";
			}					
		},
		complete_percentage: function() {
			var percentage; 
			var totalTaskCount = MegaTasks.find({eventID: this._id}).count();
			var totalComplete = MegaTasks.find({eventID: this._id, taskStatus: 'completed'}).count();
			var totalCanceled = MegaTasks.find({eventID: this._id, taskStatus: 'canceled'}).count();
			var totalTaskCount = totalTaskCount - totalCanceled;
			percentage = Math.abs(( totalComplete / totalTaskCount) * 100);
			return Math.floor(percentage);
		},
		event_tasks: function() {
			var tasks = MegaTasks.find({eventID: this._id});
			return tasks;
		},
		completed_tasks: function() {
			var tasks = MegaTasks.find({eventID: this._id, taskStatus: 'completed'}).count();
			return tasks;
		},
		pending_tasks: function() {
			var tasks = MegaTasks.find({eventID: this._id, taskStatus:'pending'}).count();
			return tasks;
		},
		active_tasks: function() {
			var tasks = MegaTasks.find({eventID: this._id, taskStatus: 'active'}).count();
			return tasks;
		},
		canceled_tasks: function() {
			var tasks = MegaTasks.find({eventID: this._id, taskStatus: 'canceled'}).count();
			return tasks;
		}
	});
	
	Template.CompletedEvents.helpers({
		complete_percentage: function() {
			var percentage; 
			var totalTaskCount = MegaTasks.find({eventID: this._id}).count();
			var totalComplete = MegaTasks.find({eventID: this._id, taskStatus: 'completed'}).count();
			var totalCanceled = MegaTasks.find({eventID: this._id, taskStatus: 'canceled'}).count();
			var totalTaskCount = totalTaskCount - totalCanceled;
			percentage = Math.abs(( totalComplete / totalTaskCount) * 100);
			return Math.floor(percentage);
		},
		event_tasks: function() {
			var tasks = MegaTasks.find({eventID: this._id});
			return tasks;
		},
		completed_tasks: function() {
			var tasks = MegaTasks.find({eventID: this._id, taskStatus: 'completed'}).count();
			return tasks;
		},
		pending_tasks: function() {
			var tasks = MegaTasks.find({eventID: this._id, taskStatus:'pending'}).count();
			return tasks;
		},
		active_tasks: function() {
			var tasks = MegaTasks.find({eventID: this._id, taskStatus: 'active'}).count();
			return tasks;
		},
		canceled_tasks: function() {
			var tasks = MegaTasks.find({eventID: this._id, taskStatus: 'canceled'}).count();
			return tasks;
		}
	});
	
	 removeEventsTasks = function(eventId) {
		 var targetTasks = MegaTasks.find({eventID: eventId}).fetch();
 				targetTasks.forEach(function(row) {
					MegaTasks.remove({_id: row._id});
					console.log("Removing Task:  " + row._id);
 				});
		
	}
}

