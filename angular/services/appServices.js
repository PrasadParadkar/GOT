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

	pageData.loadBooksDataForPage = function(bookPageNo, bookPageSize){
		selectedBookPgNo = bookPageNo;
		return $http({
			method : 'GET',
			url : baseUrl+'/books?page='+bookPageNo+'&pageSize='+bookPageSize
		})
	}

	pageData.loadCharsDataForPage = function(charPageNo, charPageSize){
		selectedCharPgNo = charPageNo;
		return $http({
			method : 'GET',
			url : baseUrl+'/characters?page='+charPageNo+'&pageSize='+charPageSize
		})
	}

	pageData.loadHousesDataForPage = function(housePageNo, housePageSize){
		selectedHousePgNo = housePageNo;
		return $http({
			method : 'GET',
			url : baseUrl+'/houses?page='+housePageNo+'&pageSize='+housePageSize
		})
	}

	pageData.getSelectedBookPgNo = function(){
		return selectedBookPgNo;
	}

	pageData.getSelectedCharPgNo = function(){
		return selectedCharPgNo;
	}

	pageData.getSelectedHousePgNo = function(){
		return selectedHousePgNo;
	}

	pageData.setSelectedBookPgNo = function(selBookPgNo){
		selectedBookPgNo = selBookPgNo;
	}

	pageData.setSelectedCharPgNo = function(selCharPgNo){
		selectedCharPgNo = selCharPgNo;
	}

	pageData.setSelectedHousePgNo = function(selHousePgNo){
		selectedHousePgNo = selHousePgNo;
	}

	return pageData;
});

myApp.factory('ItemDetailService', function($http){
	var itemDetail = {}
	var bUrl = "";
	var cUrl = "";
	var hUrl = "";

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

	return {
		storeBookUrl : storeBookUrl,
		returnBookUrl : returnBookUrl,
		getIndividualBookData : getIndividualBookData,
		storeCharUrl : storeCharUrl,
		returnCharUrl : returnCharUrl,
		getIndividualCharData : getIndividualCharData,
		storeHouseUrl : storeHouseUrl,
		returnHouseUrl : returnHouseUrl,
		getIndividualHouseData : getIndividualHouseData
	};
})