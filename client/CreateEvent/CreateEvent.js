	Template.CreateEvent.rendered=function() {
			$('#datepicker').datetimepicker({	
				pickTime: false
    		});
			$('#timepicker').datetimepicker({	
				pickDate: false
    		});
		    
	}
	
	Template.CreateEvent.events({
		'click .cancelEventCreate': function(evt,tmpl) {
			clearEventDeck(tmpl);
		},
		'click .saveNewEvent': function(evt, tmpl) {
			 var eventName = tmpl.find('.eventName').value;
			 var startDate = tmpl.find('.startDateMarker').value;
			 var startTime = tmpl.find('.startTimeMarker').value;
			 var eventOwner = tmpl.find('.selectedParticipant').value;
			 var eventInfo =  {
				eName: eventName,eDate: startDate,eTime: startTime,	eOwner: eventOwner, state: "planning",
				 complete:0, active:0, unstarted:100
			};
			eventValidation(eventInfo,tmpl);
		}
  	});

   var eventValidation = function(eventInfo,tmpl) {
		if (eventInfo.eName.length === 0 || eventInfo.eDate.length === 0 || eventInfo.eTime.length === 0 || eventInfo.eOwner.length === 0) {
			Alerts.add('Incomplete Data: Please Update And Resubmit', 'danger', {fadeIn: 500, fadeOut: 1000, autoHide: 3000});
		} else {
			MegaEvents.insert(eventInfo);
			clearEventDeck(tmpl);
			Alerts.add('Created Event ' + eventInfo.eName,'success',{fadeIn: 1000, fadeOut: 1000, autoHide: 3000});
		}
	}

	var clearEventDeck = function(tmpl){
		tmpl.find('.eventName').value = '';
		tmpl.find('.startDateMarker').value = '';
		tmpl.find('.startTimeMarker').value = '';
		tmpl.find('.selectedParticipant').value ='';
	}	
    
	

