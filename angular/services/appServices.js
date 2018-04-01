myApp.factory('GotService', function GotFactory($http){
	var gotAPIS = {};
	var baseUrl = 'https://www.anapioficeandfire.com/api';

	gotAPIS.getBooksData = function(){
		return $http({
			method : 'GET',
			url : baseUrl+'/books'
		})
	}

	gotAPIS.getCharactersData = function(){
		return $http({
			method : 'GET',
			url : baseUrl+'/characters'
		})
	}

	gotAPIS.getHousesData = function(){
		return $http({
			method : 'GET',
			url : baseUrl+'/houses'
		})
	}
	
	return gotAPIS;
});

myApp.factory('StoreDetailService', function(){
	var bookData = [];
	var characterData = [];
	var houseData = [];
	var allData = [];

	var addAllData = function(arrData){
		allData = arrData;
	}

	var getAllData = function(){
		return allData;
	}

	var addBookData = function(bookArray){
		bookData = bookArray;
	}

	var getBookData = function(){
		return bookData;
	}

	var addCharacterData = function(characterArray){
		characterData = characterArray;
	}

	var getCharacterData = function(){
		return characterData;
	}

	var addHouseData = function(houseArray){
		houseData = houseArray;
	}

	var getHouseData = function(){
		return houseData;
	}

	return{
		addAllData : addAllData,
		getAllData : getAllData,
		addBookData : addBookData,
		getBookData : getBookData,
		addCharacterData : addCharacterData,
		getCharacterData : getCharacterData,
		addHouseData : addHouseData,
		getHouseData : getHouseData
	};
});

myApp.factory('PageDataService', function($http){
	var pageData = {};
	var baseUrl = 'https://www.anapioficeandfire.com/api';
	var selectedBookPgNo , selectedCharPgNo, selectedHousePgNo;
	var selectedBookPgItems , selectedCharPgItems, selectedHousePgItems;

	pageData.loadBooksDataForPage = function(bookPageNo, bookPageSize){
		selectedBookPgNo = bookPageNo;
		selectedBookPgItems = bookPageSize;
		return $http({
			method : 'GET',
			url : baseUrl+'/books?page='+bookPageNo+'&pageSize='+bookPageSize
		})
	}

	pageData.loadCharsDataForPage = function(charPageNo, charPageSize){
		selectedCharPgNo = charPageNo;
		selectedCharPgItems = charPageSize;
		return $http({
			method : 'GET',
			url : baseUrl+'/characters?page='+charPageNo+'&pageSize='+charPageSize
		})
	}

	pageData.loadHousesDataForPage = function(housePageNo, housePageSize){
		selectedHousePgNo = housePageNo;
		selectedHousePgItems = housePageSize;
		return $http({
			method : 'GET',
			url : baseUrl+'/houses?page='+housePageNo+'&pageSize='+housePageSize
		})
	}

	pageData.getSelectedBookPgNo = function(){
		return selectedBookPgNo;
	}

	pageData.getSelectedBookPgItems = function(){
		return selectedBookPgItems;
	}

	pageData.getSelectedCharPgNo = function(){
		return selectedCharPgNo;
	}

	pageData.getSelectedCharPgItems = function(){
		return selectedCharPgItems;
	}

	pageData.getSelectedHousePgNo = function(){
		return selectedHousePgNo;
	}

	pageData.getSelectedHousePgItems = function(){
		return selectedHousePgItems;
	}

	pageData.setSelectedBookPgNo = function(selBookPgNo){
		selectedBookPgNo = selBookPgNo;
	}

	pageData.setSelectedBookPgItems = function(selBookPgItems){
		selectedBookPgItems = selBookPgItems;
	}

	pageData.setSelectedCharPgNo = function(selCharPgNo){
		selectedCharPgNo = selCharPgNo;
	}

	pageData.setSelectedCharPgItems = function(selCharPgItems){
		selectedCharPgItems = selCharPgItems;
	}

	pageData.setSelectedHousePgNo = function(selHousePgNo){
		selectedHousePgNo = selHousePgNo;
	}

	pageData.setSelectedHousePgItems = function(selHousePgItems){
		selectedHousePgItems = selHousePgItems;
	}

	return pageData;
});

myApp.factory('ItemDetailService', function($http){
	var itemDetail = {}
	var bUrl = "";
	var cUrl = "";
	var hUrl = "";
	var bookInd = "";
	var charInd = "";
	var houseInd = "";

	var storeBookUrl = function(bookUrl){
		bUrl = bookUrl;
	}

	var returnBookUrl = function(){
		return bUrl;
	}

	var getIndividualBookData = function(bookUrl){
		return $http({
			method : 'GET',
			url : bookUrl
		})
	}

	var storeCharUrl = function(charUrl){
		cUrl = charUrl;
	}

	var returnCharUrl = function(){
		return cUrl;
	}

	var getIndividualCharData = function(charUrl){
		return $http({
			method : 'GET',
			url : charUrl
		})
	}

	var storeHouseUrl = function(houseUrl){
		hUrl = houseUrl;
	}

	var returnHouseUrl = function(){
		return hUrl;
	}

	var getIndividualHouseData = function(houseUrl){
		return $http({
			method : 'GET',
			url : houseUrl
		})
	}

	var storeBookIndicator = function(indType){
		bookInd = indType;
	}
	var returnBookIndicator = function(){
		return bookInd;
	}

	var storeCharIndicator = function(indType){
		charInd = indType;
	}
	var returnCharIndicator = function(){
		return charInd;
	}

	var storeHouseIndicator = function(indType){
		houseInd = indType;
	}
	var returnHouseIndicator = function(){
		return houseInd;
	}

	return {
		storeBookUrl : storeBookUrl,
		returnBookUrl : returnBookUrl,
		getIndividualBookData : getIndividualBookData,
		storeCharUrl : storeCharUrl,
		returnCharUrl : returnCharUrl,
		getIndividualCharData : getIndividualCharData,
		storeHouseUrl : storeHouseUrl,
		returnHouseUrl : returnHouseUrl,
		getIndividualHouseData : getIndividualHouseData,
		storeBookIndicator: storeBookIndicator,
		returnBookIndicator : returnBookIndicator,
		storeCharIndicator : storeCharIndicator,
		returnCharIndicator : returnCharIndicator,
		storeHouseIndicator : storeHouseIndicator,
		returnHouseIndicator : returnHouseIndicator
	};
})