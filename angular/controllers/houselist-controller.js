myApp.controller('HouseListController',['$http', 'StoreDetailService', 'PageDataService', 'ItemDetailService', function($http,StoreDetailService,PageDataService,ItemDetailService){
	angular.element('body').css('background', 'url("img/houselistBack.jpg")');
	angular.element('#divJumbo').addClass('ng-hide');
	angular.element(document).ready(function(){
	    $(this).scrollTop(0);
	});
	
	var main = this;
	main.order = "name";
	main.searchedText = "";
	main.dupes = {};
	main.pageNo = PageDataService.getSelectedHousePgNo();
	main.items_per_page = PageDataService.getSelectedHousePgItems();
	main.total_count = 444;
	main.housesDatalist = [];
	main.regionList = [];
	main.linkInd = ItemDetailService.returnHouseIndicator();

	if(main.linkInd == "house"){
		main.btnText = PageDataService.getSelectedHousePgItems();
	}
	else{
		main.btnText = "No Of Records";
	}

	angular.element('#ddlHousePageList li >a').click(function() {
		angular.element('#ddlNoOfHousePages').text(angular.element(this).text());
		if(angular.element(this).text() == "No Of Records"){
			main.getHousesData(main.pageNo, 10);
			main.btnText = "No Of Records";
			ItemDetailService.storeHouseIndicator("", "");
		}
		else{
			main.getHousesData(main.pageNo, angular.element(this).text());
			main.btnText = angular.element(this).text();
		}
	});

	this.textChanged = function(){
		main.searchedText = angular.element(document.getElementById("txtHouseName")).val();
	}

	this.loadHousesArray = function(){
		main.housesDatalist = StoreDetailService.getHouseData();
		main.dupes = {};
		main.regionList = [];

		angular.forEach(main.housesDatalist, function(value){
			if (!main.dupes[value.region]) {
		        main.dupes[value.region] = true;
		        main.regionList.push(value.region);
		    }
		});
		main.regionList.unshift("Filter By Region");
		angular.element('#selectedRegion').html(main.regionList[0]);

		main.searchedText = "";
		main.regionFilter = "";
		angular.element('#ddlNoOfHousePages').text(main.btnText);
	}
	
	this.loadHousesArray();

	this.getHousesData = function(housePageNo, housePageSize){
		main.pageNo = housePageNo;
		main.items_per_page = housePageSize;

		PageDataService.loadHousesDataForPage(housePageNo, housePageSize)
		.then(function successCallback(response){
			StoreDetailService.addHouseData(response.data);
			main.loadHousesArray();
		}, function errorCallback(response){
			alert("Some error occurred in loadHousesDataForPage() check the console");
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

	main.regionSelected = function (region){
		if(region =="Filter By Region")
		{
			main.regionFilter = "";
			angular.element('#selectedRegion').html(main.regionList[0]);
		}
		else
		{
        	angular.element('#selectedRegion').html(region);
        	main.regionFilter = region;
    	}
	}

	main.getHouseDetail = function(houseUrl){
    	ItemDetailService.storeHouseUrl(houseUrl);
    	if(main.btnText != "No Of Records"){	
    		ItemDetailService.storeHouseIndicator("house");
    	}
    }
}])