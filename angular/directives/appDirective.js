myApp.directive('bookCarousel',function(){
	return{
		restrict : "E",
		templateUrl: "views/book-carousel.html",
		controller : function($scope){
				$scope.bookCarousel = $scope.data.books;
		}
	}
})

myApp.directive('charCarousel',function(){
	return{
		restrict : "E",
		templateUrl: "views/char-carousel.html",
		controller : function($scope){
				$scope.charCarousel = $scope.data.characters;
		}
	}
})

myApp.directive('houseCarousel',function(){
	return{
		restrict : "E",
		templateUrl: "views/house-carousel.html",
		controller : function($scope){
				$scope.houseCarousel = $scope.data.houses;
		}
	}
})