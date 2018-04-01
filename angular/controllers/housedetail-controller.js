myApp.controller('HouseDetailController', ['$http', 'ItemDetailService', function($http,ItemDetailService){
	angular.element('body').css('background', 'url("img/4.jpg")');
	angular.element('#divJumbo').addClass('ng-hide');
	angular.element(document).ready(function(){
	    $(this).scrollTop(0);
	});
	
	var main = this;
	main.houseUrl = "";
	main.houseDetail = {};

	this.showHouseDetail = function(){
		main.houseUrl = ItemDetailService.returnHouseUrl();
		ItemDetailService.getIndividualHouseData(main.houseUrl)
		.then(function successCallback(response){
			main.houseDetail = response.data;
			console.log(main.houseDetail);
		}, function errorCallback(response){
			alert("Some error occurred in getIndividualHouseData() check the console");
		})
	}

	this.showHouseDetail();

	main.getCharDetail = function(charUrl){
    	ItemDetailService.storeCharUrl(charUrl);
    }

    main.getHouseDetail = function(houseUrl){
    	ItemDetailService.storeHouseUrl(houseUrl);
    	main.showHouseDetail();
    }
}])