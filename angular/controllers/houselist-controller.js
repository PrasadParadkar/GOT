myApp.controller('HouseListController',['$http', 'StoreDetailService', 'PageDataService', 'ItemDetailService', function($http,StoreDetailService,PageDataService,ItemDetailService){
	angular.element('body').css('background', 'url("img/houselistBack.jpg")');
	
	var main = this;
	main.order = "name";
	main.searchedText = "";
	main.dupes = {};
	main.pageNo = PageDataService.getSelectedHousePgNo();
	main.items_per_page = 10;
	main.total_count = 444;
	main.housesDatalist = [];
	main.regionList = [];

	angular.element('#ddlHousePageList li >a').click(function() {
		angular.element('#ddlNoOfHousePages').text(angular.element(this).text());
		if(angular.element(this).text() == "No Of Records"){
			main.getHousesData(main.pageNo, main.items_per_page);
		}
		else{
			main.getHousesData(main.pageNo, angular.element(this).text());
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
		main.searchedText = angular.element(document.getElementById("txtHouseName")).val();
		main.readyFunction();
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
		main.readyFunction();
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
			main.readyFunction();
		}
		else
		{
        	angular.element('#selectedRegion').html(region);
        	main.regionFilter = region;
        	main.readyFunction();
    	}
	}

	main.getHouseDetail = function(houseUrl){
    	ItemDetailService.storeHouseUrl(houseUrl);
    }
}])