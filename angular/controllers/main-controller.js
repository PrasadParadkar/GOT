myApp.controller('MainController',['$http','$window', 'GotService', 'StoreDetailService', 'PageDataService', function($http,$window,GotService,StoreDetailService,PageDataService){
	angular.element('body').css('background', 'url("img/main.jpg")');
	var main = this;
	main.mainData = [];
	main.mainObj = {};
	
	PageDataService.setSelectedBookPgNo(1);
	PageDataService.setSelectedCharPgNo(1);
	PageDataService.setSelectedHousePgNo(1);

	this.loadAllData = function(){
		//Function to get books data for book carousel
		GotService.getBooksData()
		.then(function successCallback(response){
			main.mainObj['books'] = response.data;
			StoreDetailService.addBookData(response.data);

			//Function to get characters data for character carousel
			GotService.getCharactersData()
			.then(function successCallback(response){
				main.mainObj['characters'] = response.data;
				StoreDetailService.addCharacterData(response.data);

				//Function to get houses data for house carousel
				GotService.getHousesData()
				.then(function successCallback(response){
					main.mainObj['houses'] = response.data;
					StoreDetailService.addHouseData(response.data);
					main.mainData.push(main.mainObj);
					main.slideMultipleCarousel();
				}, function errorCallback(response){
					alert("Some error occurred in getHousesData() check the console");
				}) //end getHousesData()

			}, function errorCallback(response){
				alert("Some error occurred in getCharactersData() check the console");
			}) //end getCharactersData()

		}, function errorCallback(response){
			alert("Some error occurred in getBooksData() check the console");
		}) //end getBooksData()
	}

	this.loadAllData();

	this.slideMultipleCarousel = function(){
		$(document).ready(function () {
		    setTimeout(function(){
				$('.carousel[data-type="multi"] .item').each(function(){
					var next = $(this).next();

					if (!next.length) {
						next = $(this).siblings(':first');
					}
					next.children(':first-child').clone().appendTo($(this));

					var count;
					if($window.windowWidthSize < 768){
						count = 0;
					}
					else if($window.windowWidthSize >= 768 && $window.windowWidthSize < 992){
						count = 2;
					}
					else if($window.windowWidthSize >= 992){
						count = 4;
					}

					for (var i=0;i<count;i++) {
						next=next.next();
						if (!next.length) {
							next = $(this).siblings(':first');
						}
						next.children(':first-child').clone().appendTo($(this));
					}
				});

		    	$('.carousel-inner').children(':first-child').addClass('active');

		    },3000);

			$(window).scroll(function () {
		        if ($(this).scrollTop() > 400) {
		            $('#back-to-top').fadeIn();
		        } else {
		            $('#back-to-top').fadeOut();
		        }
		    });
		    // scroll body to 0px on click
		    $('#back-to-top').click(function () {
		        $('#back-to-top').tooltip('hide');
		        $('body,html').animate({
		            scrollTop: 0
		        });
		        return false;
		    });
    	});
  	}
}]);