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
			clearTaskDeck(tmpl);
		},
		'click .saveNewTask': function(evt, tmpl) {
     		var taskEvent = tmpl.find('.selectedEvent').value;
			if ( taskEvent.length === 0 ) {
	 			Alerts.add('Incomplete Data: Please Update And Resubmit', 'danger', {fadeIn: 500, fadeOut: 1000, autoHide: 3000});
			} else {
				var taskName = tmpl.find('.taskName').value;
				var taskEventId = findEventIDByName(taskEvent);
				var startTaskDate = tmpl.find('.startTaskDate').value;
				var startTaskTime = tmpl.find('.startTaskTime').value;
				var taskDetails = tmpl.find('.taskDetails').value;
				var taskValidation = tmpl.find('.taskValidation').value;
				var taskExecutor = tmpl.find('.selectedExecutor').value;
				var taskValidator = tmpl.find('.selectedValidator').value;
		
				var taskInfo = { taskName: taskName, eventID: taskEventId, startDate: startTaskDate,startTime: startTaskTime,
					taskDetails: taskDetails, taskValidation: taskValidation,
					taskExecutor: taskExecutor,	taskValidator: taskValidator,
					taskStatus: "planning"
				};
    			validateAndSave(taskInfo,tmpl);
			}
		}

  	});
	
    var validateAndSave = function(task,tmpl){
 		if (hasEmptyField(task)) {
 			Alerts.add('Incomplete Data: Please Update And Resubmit', 'danger', {fadeIn: 500, fadeOut: 1000, autoHide: 3000});
		} else {
 			MegaTasks.insert(task);
 			clearTaskDeck(tmpl);
 			Alerts.add('Created Task ' + task.taskName,'success',{fadeIn: 1000, fadeOut: 1000, autoHide: 3000});
			MegaFeed.insert({feedTimeStamp: getTimeStamp(), feedData: "Created New Task: " + task.taskName});
			
		}
 	}
		
	var clearTaskDeck = function(tmpl){
			tmpl.find('.taskName').value = '';
			tmpl.find('.selectedEvent').value = '';
			tmpl.find('.startTaskDate').value =  '';
			tmpl.find('.startTaskTime').value = '';
			tmpl.find('.taskDetails').value = '';
			tmpl.find('.taskValidation').value = '';
			tmpl.find('.selectedExecutor').value = '';
			tmpl.find('.selectedValidator').value = '';
	}

