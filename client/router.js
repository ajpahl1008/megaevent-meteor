Router.configure({
	layoutTemplate: 'layout'
});
Router.map(function(){
	this.route('home', {path:'/'});
	this.route('about', {path:'/about'});
	this.route('ActiveEvents', {path:'/ActiveEvents'});
	this.route('CompleteEvents', {path:'/CompleteEvents'});
	this.route('PlanningEvents', {path:'/PlanningEvents'});
	this.route('LiveFeed', {path:'/LiveFeed'});
	this.route('Event', {path: 'Event'});
	this.route('CreateEvent', {path:'/CreateEvent'});
	this.route('CreateTask', {path:'/CreateTask'});
	this.route('CreateParticipant', {path:'/CreateParticipant'});
	
})
