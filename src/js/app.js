(function(){
	$(function(){
		$('#myCarousel').carousel();

		var formInscription = $(".form-inscription");
		var buttonInscription = $(".inscription");
		buttonInscription.on('click', function(){
			formInscription.css({display: 'block'}).animate({top:'300px'});
		})
	});
})();