if (Meteor.isClient) {
	
	Template.Task.events({
		'click .trashtask': function(evt,tmpl) {
			Session.set('delete_taskId',tmpl.data._id);
			 $('.confirmTaskModal').modal('show');
		},
			'click .delete-yes-button': function(evt, tmpl) {
			MegaTasks.remove({_id: Session.get('delete_taskId')});
			$('.confirmTaskModal').on('hidden.bs.modal', function() {
	        }).modal('hide');
	    	Session.set('delete_taskId',null);
		},
			'click .delete-cancel-button': function(evt, tmpl) {
				$('.confirmTaskModal').on('hidden.bs.modal', function() {
        	}).modal('hide');
	    	Session.set('delete_taskId',null);
		},
		  'dblclick .taskName': function(evt, tmpl) {
		   Session.set('editing_task', true);
	   },
			'keyup .tasktext': function(evt,tmpl) {
			if (evt.which === 13 ) {
				var taskText = tmpl.find('.tasktext').value;
				MegaTasks.update(this._id,{$set: {taskName:taskText}});
				Session.set('editing_task', false);
			 } else if (evt.which === 27) {
			 	Session.set('editing_task', false);
			 } 
		}	
	});

	Template.Task.helpers({
		targeted_delete_task: function() {
	 		var targetTask = MegaTasks.findOne(Session.get('delete_taskId'));
			if (((typeof targetTask != "undefined") && (typeof targetTask.valueOf() == "object")) && (targetTask.taskName.length > 0 )) {
				return targetTask.taskName;	
			} else {
				return targetTask = "Unamed Task";
			}					
		},
		task_status: function() {
			var tasks = MegaTasks.find({id: this._id}); 
			return tasks;
		},
			
	});
	
	 
}

