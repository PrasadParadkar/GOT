myApp.controller('CharacterListController',['$http', 'StoreDetailService', 'PageDataService', 'ItemDetailService', function($http,StoreDetailService,PageDataService,ItemDetailService){
	angular.element('body').css('background', 'url("img/charlistBack.jpg")');
	
	var main = this;
	main.order = "name";
	main.searchedText = "";
	main.dupes = {};
	main.genderSelection = "";
	main.pageNo = PageDataService.getSelectedCharPgNo();
	main.items_per_page = 10;
	main.total_count = 2138;
	main.characterDatalist = [];
	main.genders = ["Select Gender","Male","Female"];
	main.cultureList = [];
	angular.element('#ddlGenderList').hide();
	angular.element('#ddlCultureList').hide();

	angular.element('#ddlCharPageList li >a').click(function() {
		angular.element('#ddlNoOfCharPages').text(angular.element(this).text());
		if(angular.element(this).text() == "No Of Records"){
			main.getCharactersData(main.pageNo, main.items_per_page);
		}
		else{
			main.getCharactersData(main.pageNo, angular.element(this).text());
		}
	});

	this.readyFunction = function(){
		angular.element(document).ready(function () {
	        angular.element(".flip").flip({
	        	trigger: 'hover'
	    	});
		});
	}

	this.textChanged = function(){
		main.searchedText = angular.element(document.getElementById("txtCharName")).val();
		main.readyFunction();
	}

	this.loadCharactersArray = function(){
		main.characterDatalist = StoreDetailService.getCharacterData();
		main.dupes = {};
		angular.element('#ddlGenderList').hide();
		angular.element('#ddlCultureList').hide();
		main.searchedText = "";
		main.genderSelection = "";
		main.cultureFilter = "";
		main.readyFunction();
	}
	
	this.loadCharactersArray();

	this.getCharactersData = function(charPageNo, charPageSize){
		main.pageNo = charPageNo;
		main.items_per_page = charPageSize;

		PageDataService.loadCharsDataForPage(charPageNo, charPageSize)
		.then(function successCallback(response){
			StoreDetailService.addCharacterData(response.data);
			main.loadCharactersArray();
		}, function errorCallback(response){
			alert("Some error occurred in loadCharsDataForPage() check the console");
		})
	}

	this.setOrder = function(dataOrder){
		if(dataOrder == "desc")
		{
			main.order = "-name";
		}
		if(dataOrder == "asc")
		{
			main.order = "name";
		}
	}

	main.showGender = function(){
		angular.element('#ddlGenderList').toggle();
		angular.element('#ddlGenderFilter').text(main.genders[0]);
	}

	main.showCulture = function(){
		angular.element('#ddlCultureList').toggle();
		angular.forEach(main.characterDatalist, function(value){
			if (!main.dupes[value.culture]) {
		        main.dupes[value.culture] = true;
		        main.cultureList.push(value.culture);
		    }
		});
		main.cultureList.unshift("Select Culture");
		angular.element('#btnSelectedChar').text(main.cultureList[0]);
	}

	main.genderSelected = function (gender){
		if(gender =="Select Gender")
		{
			main.genderSelection = "";
			angular.element('#ddlGenderFilter').text(main.genders[0]);
			main.readyFunction();
		}
		else
		{
        	angular.element('#ddlGenderFilter').text(gender);
        	main.genderSelection = gender;
        	main.readyFunction();
    	}
	}

	main.cultureSelected = function (culture){
		if(culture == "Select Culture")
		{
			main.cultureFilter = "";
			angular.element('#btnSelectedChar').text(main.cultureList[0]);
			main.readyFunction();
		}
		else
		{
        	angular.element('#btnSelectedChar').text(culture);
        	main.cultureFilter = culture;
        	main.readyFunction();
    	}
    }

	main.getCharDetail = function(charUrl){
    	ItemDetailService.storeCharUrl(charUrl);
    }
}])