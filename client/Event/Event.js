Template.PlanningEvent.events({
		'click .trashevent': function(evt,tmpl) {
			Session.set('delete_eventId',tmpl.data._id);
			 $('.confirmModal').modal('show');
		},
		'click .delete-yes-button': function(evt, tmpl) {
				var _tmpEventInfo = MegaEvents.findOne(Session.get('delete_eventId'));
				removeEventsTasks(Session.get('delete_eventId'));
				MegaEvents.remove({_id: Session.get('delete_eventId')});
				$('.confirmModal').on('hidden.bs.modal', function() {}).modal('hide');
		    	Session.set('delete_eventId',null);
				MegaFeed.insert({feedTimeStamp: getTimeStamp(), feedData: "Deleted Event: " + _tmpEventInfo.eventName});
		},
		'click .delete-cancel-button': function(evt, tmpl) {
				$('.confirmModal').on('hidden.bs.modal', function() {
	        	}).modal('hide');
		    	Session.set('delete_eventId',null);
		},
		'click .activateEvent': function(evt,tmpl) {
			Session.set('activate_eventId',tmpl.data._id);
			 $('.activateModal').modal('show');
		},
		'click .activate-yes-button': function(evt, tmpl) {
				var _tmpEventInfo = MegaEvents.findOne(Session.get('activate_eventId'));
				activateEventsTasks(Session.get('activate_eventId'));
				MegaEvents.update(Session.get('activate_eventId'),{$set:{state:"active"}});
				$('.activateModal').on('hidden.bs.modal', function() { }).modal('hide');
		    	Session.set('activate_eventId',null);
				MegaFeed.insert({feedTimeStamp: getTimeStamp(), feedData: "Activated Event: " + _tmpEventInfo.eventName});
		},
		'click .activate-cancel-button': function(evt, tmpl) {
				$('.activateModal').on('hidden.bs.modal', function() {
	        	}).modal('hide');
		    	Session.set('activate_eventId',null);
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

Template.PlanningEvent.helpers({
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
		targeted_activate_event: function() {
	 		var targetEvent = MegaEvents.findOne(Session.get('activate_eventId'));
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
		planning_tasks: function() {
			var tasks = MegaTasks.find({eventID: this._id, taskStatus:'planning'}).count();
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

Template.ActiveEvent.events({
	'click .completeEvent': function(evt,tmpl) {
		Session.set('complete_eventId',tmpl.data._id);
		 $('.completeEventModal').modal('show');
	},
	'click .complete-event-yes-button': function(evt, tmpl) {
		var _tmpEventInfo = MegaEvents.findOne(Session.get('complete_eventId'));
		MegaEvents.update(Session.get('complete_eventId'),{$set: {state:'complete'}});
		$('.completeEventModal').on('hidden.bs.modal', function() { }).modal('hide');
    	Session.set('complete_eventId',null);
		MegaFeed.insert({feedTimeStamp: getTimeStamp(), feedData: "Completed Event: " + _tmpEventInfo.eventName});
	},
	'click .complete-event-cancel-button': function(evt, tmpl) {
			$('.cancelTaskModal').on('hidden.bs.modal', function() { }).modal('hide');
    	Session.set('cancel_taskId',null);
	}
});


Template.ActiveEvent.helpers({
		complete_event: function() {
				return Session.get('complete_eventId');
		},
		targeted_complete_event: function() {
	 		var targetEvent = MegaEvents.findOne(Session.get('complete_eventId'));
			if (((typeof targetEvent != "undefined") && (typeof targetEvent.valueOf() == "object")) && (targetEvent.eventName.length > 0 )) {
				return targetEvent.eventName;	
			} else {
				return targetEvent = "No-Name Event";
			}					
		},	
		all_tasks_complete: function() {
			var percentage; 
			var totalTaskCount = MegaTasks.find({eventID: this._id}).count();
			var totalComplete = MegaTasks.find({eventID: this._id, taskStatus: 'completed'}).count();
			var totalCanceled = MegaTasks.find({eventID: this._id, taskStatus: 'canceled'}).count();
			var totalTaskCount = totalTaskCount - totalCanceled;
			percentage = Math.abs(( totalComplete / totalTaskCount) * 100);
			if (percentage == "100") {
				return true;
			} else {
				return false;
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
	
	 removeEventsTasks = function(eventId) {
		 var targetTasks = MegaTasks.find({eventID: eventId}).fetch();
 				targetTasks.forEach(function(row) {
					MegaTasks.remove({_id: row._id});
					MegaFeed.insert({feedTimeStamp: getTimeStamp(), feedData: "Deleted Task: " + row.taskName});
 				});
	}
	
	activateEventsTasks = function(eventId) {
	 var targetTasks = MegaTasks.find({eventID: eventId}).fetch();
				targetTasks.forEach(function(row) {
					if (row.taskStatus != "canceled" && row.taskStatus != "pending" ) {
						MegaTasks.update(row._id,{$set: {taskStatus:"pending"}});
						MegaFeed.insert({feedTimeStamp: getTimeStamp(), feedData: "Pending Task: " + row.taskName});
					} else {
						MegaTasks.remove({_id: row._id});
						MegaFeed.insert({feedTimeStamp: getTimeStamp(), feedData: "Deleted Canceled Task: " + row.taskName});
					}
				});
	}

