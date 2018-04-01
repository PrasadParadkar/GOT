myApp.controller('MainController',['$http','$window', 'GotService', 'StoreDetailService', 'PageDataService', 'ItemDetailService', function($http,$window,GotService,StoreDetailService,PageDataService,ItemDetailService){
	angular.element('#divJumbo').removeClass('ng-hide');
	angular.element('#divJumbo').addClass('ng-show');
	angular.element('body').css('background-image','radial-gradient(circle, #dbdee1, #a9b5c2, #7b8ca3, #4f6686, #234169)');
	angular.element(document).ready(function(){
	    $(this).scrollTop(0);
	});

	var main = this;
	main.mainData = StoreDetailService.getAllData();
	console.log(main.mainData.length);
	main.mainObj = {};
	main.authorList = [];
	main.publisherList = [];
	main.cultureList = [];
	main.regionList = [];
	main.dupes = {};
	
	PageDataService.setSelectedBookPgNo(1);
	PageDataService.setSelectedCharPgNo(1);
	PageDataService.setSelectedHousePgNo(1);
	PageDataService.setSelectedBookPgItems(10);
	PageDataService.setSelectedCharPgItems(10);
	PageDataService.setSelectedHousePgItems(10);
	ItemDetailService.storeBookIndicator("", "");
	ItemDetailService.storeCharIndicator("", "");
	ItemDetailService.storeHouseIndicator("", "");

	main.genders = ["Select Gender","Male","Female"];
	angular.element('#authorList').hide();
	angular.element('#publisherList').hide();
	angular.element('#genderList').hide();
	angular.element('#cultureList').hide();
	angular.element('#regionList').hide();

	this.loadAllData = function(){
		if(main.mainData.length == 0){
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
						StoreDetailService.addAllData(main.mainData);
						main.dupes = {};
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
	}

	this.loadAllData();

	main.getBookDetail = function(bookUrl){
    	ItemDetailService.storeBookUrl(bookUrl);
    }

    main.getCharDetail = function(charUrl){
    	ItemDetailService.storeCharUrl(charUrl);
    }

    main.getHouseDetail = function(houseUrl){
    	ItemDetailService.storeHouseUrl(houseUrl);
    }

    main.setOrder = function(dataOrder){
		if(dataOrder == "desc")
		{
			main.order = "-name";
		}
		if(dataOrder == "asc")
		{
			main.order = "name";
		}
	}

	main.textChanged = function(){
		main.searchedText = angular.element(document.getElementById("txtSearchBox")).val();
	}

    //Book Section
    main.showAuthor = function(){
		angular.element('#authorList').toggle();
		angular.forEach(main.mainObj.books, function(authorsArray){
			angular.forEach(authorsArray.authors, function(author){
				if (!main.dupes[author]) {
			        main.dupes[author] = true;
			        main.authorList.push(author);
			    }
			})
		});
		main.authorList.unshift("Select Author");
		angular.element('#selectedAuthorName').html(main.authorList[0]);
	}

	main.showPublisher = function(){
		angular.element('#publisherList').toggle();
		angular.forEach(main.mainObj.books, function(value){
			if (!main.dupes[value.publisher]) {
		        main.dupes[value.publisher] = true;
		        main.publisherList.push(value.publisher);
		    }
		});
		main.publisherList.unshift("Select Publisher");
		angular.element('#selectedPublisherName').html(main.publisherList[0]);
	}

	main.authorSelected = function (author){
		if(author =="Select Author")
		{
			main.authFilter = "";
			angular.element('#selectedAuthorName').html(main.authorList[0]);
		}
		else
		{
        	angular.element('#selectedAuthorName').html(author);
        	main.authFilter = author;
    	}
    }

    main.publisherSelected = function (publisher){
		if(publisher == "Select Publisher")
		{
			main.publFilter = "";
			angular.element('#selectedPublisherName').html(main.publisherList[0]);
		}
		else
		{
        	angular.element('#selectedPublisherName').html(publisher);
        	main.publFilter = publisher;
    	}
    }

	//Character Section
	main.showGender = function(){
		angular.element('#genderList').toggle();
		angular.element('#genderFilter').text(main.genders[0]);
	}

	main.showCulture = function(){
		angular.element('#cultureList').toggle();
		angular.forEach(main.mainObj.characters, function(value){
			if (!main.dupes[value.culture]) {
		        main.dupes[value.culture] = true;
		        main.cultureList.push(value.culture);
		    }
		});
		main.cultureList.unshift("Select Culture");
		angular.element('#selectedCultureName').html(main.cultureList[0]);
	}

	main.genderSelected = function (gender){
		if(gender =="Select Gender")
		{
			main.genderSelection = "";
			angular.element('#genderFilter').text(main.genders[0]);
		}
		else
		{
        	angular.element('#genderFilter').text(gender);
        	main.genderSelection = gender;
    	}
	}

	main.cultureSelected = function (culture){
		if(culture == "Select Culture")
		{
			main.cultureFilter = "";
			angular.element('#selectedCultureName').text(main.cultureList[0]);
		}
		else
		{
        	angular.element('#selectedCultureName').text(culture);
        	main.cultureFilter = culture;
    	}
    }

	//Region Section
	main.showRegion = function(){
		angular.element('#regionList').toggle();
		angular.forEach(main.mainObj.houses, function(value){
			if (!main.dupes[value.region]) {
		        main.dupes[value.region] = true;
		        main.regionList.push(value.region);
		    }
		});
		main.regionList.unshift("Select Region");
		angular.element('#selectedRegionName').html(main.regionList[0]);
	}

	main.regionSelected = function (region){
		if(region =="Select Region")
		{
			main.regionFilter = "";
			angular.element('#selectedRegionName').html(main.regionList[0]);
		}
		else
		{
        	angular.element('#selectedRegionName').html(region);
        	main.regionFilter = region;
    	}
	}

    angular.element(window).scroll(function () {
        if (angular.element(this).scrollTop() > 750) {
        	angular.element('#back-to-top').removeClass('ng-hide');
        	angular.element('#back-to-top').addClass('ng-show');
            // angular.element('#back-to-top').fadeIn();
        } else {
        	angular.element('#back-to-top').removeClass('ng-show');
        	angular.element('#back-to-top').addClass('ng-hide');
            // angular.element('#back-to-top').fadeOut();
        }
    });
    // scroll body to 0px on click
    angular.element('#back-to-top').click(function () {
        angular.element('#back-to-top').tooltip('hide');
        angular.element('body,html').animate({
            scrollTop: 0
        });
        return false;
    });

}]);