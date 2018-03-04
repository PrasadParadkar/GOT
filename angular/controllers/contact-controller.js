myApp.controller('ContactController',['$http', function($http){
	$( document ).ready(function() {
		angular.element('body').css('background', 'url("img/contact.jpg")');

    	$('#contact-form').validator();

    	function sendFormData(event){
    		event.preventDefault();
    		console.log($('#contact-form').serialize());
    		$.ajax('https://api.edwisor.com/api/v1/public/send/mail/prasadparadkar@outlook.com',{
                type:'POST',
                data: $('#contact-form').serialize(),
                dataType: "json",
                success : function(response){
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;
                    // let's compose Bootstrap alert box HTML
                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    // If we have messageAlert and messageText
                    if (messageAlert && messageText) {
                        // inject the alert to .messages div in our form
                        $('#contact-form').find('.messages').html(alertBox);
                        // empty the form
                        $('#contact-form')[0].reset();
                    }
                },
                error : function(request,errorType,errorMessage){
                    console.log(request);
                    console.log(errorType);
                    console.log(errorMessage);
                }
            });// end ajax call 
    	}
    $("#contact-form").on('submit',sendFormData);
	});
}]);