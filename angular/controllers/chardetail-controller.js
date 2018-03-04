myApp.controller('CharDetailController', ['$http', 'ItemDetailService', function($http,ItemDetailService){
	angular.element('body').css('background', 'url("img/1.jpg")');
	var main = this;
	main.charUrl = "";
	main.charDetail = {};

	this.showCharDetail = function(){
		main.charUrl = ItemDetailService.returnCharUrl();
		ItemDetailService.getIndividualCharData(main.charUrl)
		.then(function successCallback(response){
			main.charDetail = response.data;
			console.log(main.charDetail);
		}, function errorCallback(response){
			alert("Some error occurred in getIndividualCharData() check the console");
		})
	}

	this.showCharDetail();

	main.getBookDetail = function(bookUrl){
    	ItemDetailService.storeBookUrl(bookUrl);
    }

    main.getCharDetail = function(charUrl){
    	ItemDetailService.storeCharUrl(charUrl);
    	main.showCharDetail();
    }

    main.getHouseDetail = function(houseUrl){
    	ItemDetailService.storeHouseUrl(houseUrl);
    }
}])