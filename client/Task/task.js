Template.ActiveTask.events({
		'click .canceltask': function(evt,tmpl) {
			Session.set('cancel_taskId',tmpl.data._id);
			 $('.cancelTaskModal').modal('show');
		},
		'click .cancel-task-yes-button': function(evt, tmpl) {
			var _tmpTaskInfo = MegaTasks.findOne(Session.get('cancel_taskId'));
			MegaTasks.update(Session.get('cancel_taskId'),{$set: {taskStatus:'canceled'}});
			$('.cancelTaskModal').on('hidden.bs.modal', function() { }).modal('hide');
	    	Session.set('cancel_taskId',null);
			MegaFeed.insert({feedTimeStamp: getTimeStamp(), feedData: "Canceled Task: " + _tmpTaskInfo.taskName});
		},
		'click .cancel-task-cancel-button': function(evt, tmpl) {
				$('.cancelTaskModal').on('hidden.bs.modal', function() { }).modal('hide');
	    	Session.set('cancel_taskId',null);
		},
		'click .completetask': function(evt,tmpl) {
			Session.set('complete_taskId',tmpl.data._id);
			 $('.completeTaskModal').modal('show');
		},
		'click .complete-task-yes-button': function(evt, tmpl) {
			var _tmpTaskInfo = MegaTasks.findOne(Session.get('complete_taskId'));
			MegaTasks.update(Session.get('complete_taskId'),{$set: {taskStatus:'completed'}});
			$('.completeTaskModal').on('hidden.bs.modal', function() { }).modal('hide');
	    	Session.set('complete_taskId',null);
			MegaFeed.insert({feedTimeStamp: getTimeStamp(), feedData: "Completed Task: " + _tmpTaskInfo.taskName});
		},
		'click .complete-task-cancel-button': function(evt, tmpl) {
				$('.completedTaskModal').on('hidden.bs.modal', function() { }).modal('hide');
	    	Session.set('completed_taskId',null);
		},
		'click .activetask': function(evt,tmpl) {
			Session.set('active_taskId',tmpl.data._id);
			 $('.activeTaskModal').modal('show');
		},
		'click .active-task-yes-button': function(evt, tmpl) {
			var _tmpTaskInfo = MegaTasks.findOne(Session.get('active_taskId'));
			MegaTasks.update(Session.get('active_taskId'),{$set: {taskStatus:'active'}});
			$('.activeTaskModal').on('hidden.bs.modal', function() { }).modal('hide');
	    	Session.set('active_taskId',null);
			MegaFeed.insert({feedTimeStamp: getTimeStamp(), feedData: "Active Task: " + _tmpTaskInfo.taskName});
		},
		'click .active-task-cancel-button': function(evt, tmpl) {
				$('.activeTaskModal').on('hidden.bs.modal', function() { }).modal('hide');
	    	Session.set('active_taskId',null);
		},
		'click .pendingtask': function(evt,tmpl) {
			Session.set('pending_taskId',tmpl.data._id);
			 $('.pendingTaskModal').modal('show');
		},
		'click .pending-task-yes-button': function(evt, tmpl) {
			var _tmpTaskInfo = MegaTasks.findOne(Session.get('pending_taskId'));
			MegaTasks.update(Session.get('pending_taskId'),{$set: {taskStatus:'pending'}});
			$('.pendingTaskModal').on('hidden.bs.modal', function() { }).modal('hide');
	    	Session.set('pending_taskId',null);
			MegaFeed.insert({feedTimeStamp: getTimeStamp(), feedData: "Pending Task: " + _tmpTaskInfo.taskName});
		},
		'click .pending-task-cancel-button': function(evt, tmpl) {
				$('.pendingTaskModal').on('hidden.bs.modal', function() { }).modal('hide');
	    	Session.set('pending_taskId',null);
		}
		  
});

Template.ActiveTask.helpers({
	 targeted_cancel_task: function() {
	 		var targetTask = MegaTasks.findOne(Session.get('cancel_taskId'));
			if (((typeof targetTask != "undefined") && (typeof targetTask.valueOf() == "object")) && (targetTask.taskName.length > 0 )) {
				return targetTask.taskName;	
			} else {
				return targetTask = "Unamed Task";
			}					
		},
   	  targeted_complete_task: function() {
   	 		var targetTask = MegaTasks.findOne(Session.get('complete_taskId'));
   			if (((typeof targetTask != "undefined") && (typeof targetTask.valueOf() == "object")) && (targetTask.taskName.length > 0 )) {
   				return targetTask.taskName;	
   			} else {
   				return targetTask = "Unamed Task";
   			}					
   		},
     	targeted_pending_task: function() {
     	 		var targetTask = MegaTasks.findOne(Session.get('pending_taskId'));
     			if (((typeof targetTask != "undefined") && (typeof targetTask.valueOf() == "object")) && (targetTask.taskName.length > 0 )) {
     				return targetTask.taskName;	
     			} else {
     				return targetTask = "Unamed Task";
     			}					
     	},
     	targeted_active_task: function() {
     	 		var targetTask = MegaTasks.findOne(Session.get('active_taskId'));
     			if (((typeof targetTask != "undefined") && (typeof targetTask.valueOf() == "object")) && (targetTask.taskName.length > 0 )) {
     				return targetTask.taskName;	
     			} else {
     				return targetTask = "Unamed Task";
     			}					
     		},
		task_status: function() {
			var tasks = MegaTasks.find({id: this._id}); 
			return tasks;
		}
			
});

Template.PlanningTask.events({
		'click .trashtask': function(evt,tmpl) {
			Session.set('delete_taskId',tmpl.data._id);
			 $('.confirmTaskModal').modal('show');
		},
		'click .delete-task-yes-button': function(evt, tmpl) {
			var _tmpTaskInfo = MegaTasks.findOne(Session.get('delete_taskId'));
				MegaTasks.remove({_id: Session.get('delete_taskId')});
				$('.confirmTaskModal').on('hidden.bs.modal', function() {
		        }).modal('hide');
		    	Session.set('delete_taskId',null);
				MegaFeed.insert({feedTimeStamp: getTimeStamp(), feedData: "Deleted Task: " + _tmpTaskInfo.taskName});
		},
			'click .delete-task-cancel-button': function(evt, tmpl) {
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

Template.PlanningTask.helpers({
		editing_task: function() {
				return Session.get('editing_task');
		},
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
		}
			
});
	
	 


