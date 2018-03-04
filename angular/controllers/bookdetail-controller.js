myApp.controller('BookDetailController', ['$http', 'ItemDetailService', function($http,ItemDetailService){
	angular.element('body').css('background', 'url("img/2.jpg")');
	var main = this;
	main.bookUrl = "";
	main.bookDetail = {};

	this.showBookDetail = function(){
		main.bookUrl = ItemDetailService.returnBookUrl();
		ItemDetailService.getIndividualBookData(main.bookUrl)
		.then(function successCallback(response){
			main.bookDetail = response.data;
			console.log(main.bookDetail);
		}, function errorCallback(response){
			alert("Some error occurred in getIndividualBookData() check the console");
		})
	}

	this.showBookDetail();

	main.getCharDetail = function(charUrl){
    	ItemDetailService.storeCharUrl(charUrl);
    }
}])