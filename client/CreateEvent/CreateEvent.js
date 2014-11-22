if (Meteor.isClient) {
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
			clearDeck(tmpl);
		},
		'click .saveNewEvent': function(evt, tmpl) {
			var eventName = tmpl.find('.eventName').value;
			var startDate = tmpl.find('.startDateMarker').value;
			var startTime = tmpl.find('.startTimeMarker').value;
			var eventOwner = tmpl.find('.selectedParticipant').value;
			//alert("name: " + eventName + ", startDate: " + startDateTime + ", owner: " + eventOwner);
			MegaEvents.insert({eventName: eventName, startDate: startDate, startTime: startTime, owner: eventOwner, state: "planning", complete:0, active:0, unstarted:100})
			clearDeck(tmpl);
			Router.go('/PlanningEvents');
		}

  	});
		
	clearDeck = function(tmpl){
		tmpl.find('.eventName').value = '';
		tmpl.find('.startDateMarker').value = '';
		tmpl.find('.startTimeMarker').value = '';
		tmpl.find('.selectedParticipant').value ='';

	}
	
}

