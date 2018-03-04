myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{
            // location of the template
        	templateUrl		: 'views/all-list.html',
        	// Which controller it should use 
            controller 		: 'MainController',
            // what is the alias of that controller.
        	controllerAs 	: 'mainCtrl'
        })

        .when('/contact',{
            // location of the template
            templateUrl     : 'views/contact.html',
            // Which controller it should use 
            controller      : 'ContactController',
            // what is the alias of that controller.
            controllerAs    : 'contactCtrl'
        })

        .when('/bookList',{
            // location of the template
            templateUrl     : 'views/book-list.html',
            // Which controller it should use 
            controller      : 'BookListController',
            // what is the alias of that controller.
            controllerAs    : 'bookListCtrl'
        })

        .when('/charList',{
            // location of the template
            templateUrl     : 'views/character-list.html',
            // Which controller it should use 
            controller      : 'CharacterListController',
            // what is the alias of that controller.
            controllerAs    : 'charListCtrl'
        })

        .when('/houseList',{
            // location of the template
            templateUrl     : 'views/house-list.html',
            // Which controller it should use 
            controller      : 'HouseListController',
            // what is the alias of that controller.
            controllerAs    : 'houseListCtrl'
        })

        .when('/book',{
            // location of the template
            templateUrl     : 'views/book-detail.html',
            // Which controller it should use 
            controller      : 'BookDetailController',
            // what is the alias of that controller.
            controllerAs    : 'bookDetailCtrl'
        })

        .when('/character',{
            // location of the template
            templateUrl     : 'views/character-detail.html',
            // Which controller it should use 
            controller      : 'CharDetailController',
            // what is the alias of that controller.
            controllerAs    : 'charDetailCtrl'
        })

        .when('/house',{
            // location of the template
            templateUrl     : 'views/house-detail.html',
            // Which controller it should use 
            controller      : 'HouseDetailController',
            // what is the alias of that controller.
            controllerAs    : 'houseDetailCtrl'
        })
        
        .otherwise(
            {
                template   : '<h1>404 page not found</h1>'
            }
        );
}]);