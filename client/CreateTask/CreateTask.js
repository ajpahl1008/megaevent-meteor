if (Meteor.isClient) {
	Template.CreateTask.rendered=function() {
			$('#datepicker').datetimepicker({	
				pickTime: false
    		});
			$('#timepicker').datetimepicker({	
				pickDate: false
    		});
	}
	
	Template.CreateTask.events({
		'click .cancelTaskCreate': function(evt,tmpl) {
			clearDeck(tmpl);
		},
		'click .saveNewTask': function(evt, tmpl) {
				var taskName = tmpl.find('.taskName').value;
	     		var taskEvent = tmpl.find('.selectedEvent').value;
				var taskEventId = findEventID(taskEvent);
				var startTaskDate = tmpl.find('.startTaskDate').value;
				var startTaskTime = tmpl.find('.startTaskTime').value;
				var taskDetails = tmpl.find('.taskDetails').value;
				var taskValidation = tmpl.find('.taskValidation').value;
				var taskExecutor = tmpl.find('.selectedExecutor').value;
				var taskValidator = tmpl.find('.selectedValidator').value;
		
				var taskId = MegaTasks.insert({
					taskName: taskName,
					eventID: taskEventId,
					startDate: startTaskDate,
					startTime: startTaskTime,
					taskDetails: taskDetails,
					taskValidaion: taskValidation,
					taskExecutor: taskExecutor,
					taskValidator: taskValidator,
					taskStatus: "planning"
				});
				clearDeck(tmpl);
				Router.go('/PlanningEvents');
		}

  	});
		
	clearDeck = function(tmpl){
			tmpl.find('.taskName').value = '';
			tmpl.find('.selectedEvent').value = '';
			tmpl.find('.startTaskDate').value =  '';
			tmpl.find('.startTaskTime').value = '';
			tmpl.find('.taskDetails').value = '';
			tmpl.find('.taskValidation').value = '';
			tmpl.find('.selectedExecutor').value = '';
			tmpl.find('.selectedValidator').value = '';
			Router.go('/PlanningEvents');
	}
	
}

