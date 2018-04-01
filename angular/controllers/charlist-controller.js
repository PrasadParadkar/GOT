myApp.controller('CharacterListController',['$http', 'StoreDetailService', 'PageDataService', 'ItemDetailService', function($http,StoreDetailService,PageDataService,ItemDetailService){
	angular.element('body').css('background', 'url("img/charlistBack.jpg")');
	angular.element('#divJumbo').addClass('ng-hide');
	angular.element(document).ready(function(){
	    $(this).scrollTop(0);
	});
	
	var main = this;
	main.order = "name";
	main.searchedText = "";
	main.dupes = {};
	main.genderSelection = "";
	main.pageNo = PageDataService.getSelectedCharPgNo();
	main.items_per_page = PageDataService.getSelectedCharPgItems();
	main.total_count = 2138;
	main.characterDatalist = [];
	main.genders = ["Select Gender","Male","Female"];
	main.cultureList = [];
	angular.element('#ddlGenderList').hide();
	angular.element('#ddlCultureList').hide();
	main.linkInd = ItemDetailService.returnCharIndicator();

	if(main.linkInd == "char"){
		main.btnText = PageDataService.getSelectedCharPgItems();
	}
	else{
		main.btnText = "No Of Records";
	}

	angular.element('#ddlCharPageList li >a').click(function() {
		angular.element('#ddlNoOfCharPages').text(angular.element(this).text());
		if(angular.element(this).text() == "No Of Records"){
			main.getCharactersData(main.pageNo, 10);
			main.btnText = "No Of Records";
			ItemDetailService.storeCharIndicator("", "");
		}
		else{
			main.getCharactersData(main.pageNo, angular.element(this).text());
			main.btnText = angular.element(this).text();
		}
	});

	this.textChanged = function(){
		main.searchedText = angular.element(document.getElementById("txtCharName")).val();
	}

	this.loadCharactersArray = function(){
		main.characterDatalist = StoreDetailService.getCharacterData();
		main.dupes = {};
		angular.element('#ddlGenderList').hide();
		angular.element('#ddlCultureList').hide();
		main.searchedText = "";
		main.genderSelection = "";
		main.cultureFilter = "";
		angular.element('#ddlNoOfCharPages').text(main.btnText);
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
		}
		else
		{
        	angular.element('#ddlGenderFilter').text(gender);
        	main.genderSelection = gender;
    	}
	}

	main.cultureSelected = function (culture){
		if(culture == "Select Culture")
		{
			main.cultureFilter = "";
			angular.element('#btnSelectedChar').text(main.cultureList[0]);
		}
		else
		{
        	angular.element('#btnSelectedChar').text(culture);
        	main.cultureFilter = culture;
    	}
    }

	main.getCharDetail = function(charUrl){
    	ItemDetailService.storeCharUrl(charUrl);
    	if(main.btnText != "No Of Records"){	
    		ItemDetailService.storeCharIndicator("char");
    	}
    }
}])