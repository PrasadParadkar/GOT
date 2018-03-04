myApp.controller('BookListController',['$http', 'StoreDetailService', 'PageDataService', 'ItemDetailService', function($http,StoreDetailService,PageDataService,ItemDetailService){
	angular.element('body').css('background', 'url("img/booklistBack.jpg")');

	var main = this;
	main.order = "name";
	main.searchedText = "";
	main.dupes = {};
	main.booksDatalist = [];
	main.publisherList = [];
	main.authorList = [];
	main.pageNo = PageDataService.getSelectedBookPgNo();
	main.items_per_page = 10;
	main.total_count = 12;
	angular.element('#ddlAuthorList').hide();
	angular.element('#ddlPublisherList').hide();

	angular.element('#ddlBookPageList li >a').click(function() {
		angular.element('#ddlNoOfBookPages').text(angular.element(this).text());
		if(angular.element(this).text() == "No Of Records"){
			main.getBooksData(main.pageNo, main.items_per_page);
		}
		else{
			main.getBooksData(main.pageNo, angular.element(this).text());
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
		main.searchedText = angular.element(document.getElementById("txtBookName")).val();
		main.readyFunction();
	}

	this.loadBooksArray = function(){
		main.booksDatalist = StoreDetailService.getBookData();
		main.dupes = {};
		main.authorList = [];
		main.publisherList = [];
		angular.element('#ddlAuthorList').hide();
		angular.element('#ddlPublisherList').hide();
		main.authFilter = "";
		main.publFilter = "";
		main.searchedText = "";
		main.readyFunction();
	}
	
	this.loadBooksArray();

	this.getBooksData = function(bookPageNo, bookPageSize){
		main.pageNo = bookPageNo;
		main.items_per_page = bookPageSize;

		PageDataService.loadBooksDataForPage(bookPageNo, bookPageSize)
		.then(function successCallback(response){
			StoreDetailService.addBookData(response.data);
			main.loadBooksArray();
		}, function errorCallback(response){
			alert("Some error occurred in loadBooksDataForPage() check the console");
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

	main.showAuthor = function(){
		angular.element('#ddlAuthorList').toggle();
		angular.forEach(main.booksDatalist, function(authorsArray){
			angular.forEach(authorsArray.authors, function(author){
				if (!main.dupes[author]) {
			        main.dupes[author] = true;
			        main.authorList.push(author);
			    }
			})
		});
		main.authorList.unshift("Select Author");
		angular.element('#selectedAuthor').html(main.authorList[0]);
	}

	main.showPublisher = function(){
		angular.element('#ddlPublisherList').toggle();
		angular.forEach(main.booksDatalist, function(value){
			if (!main.dupes[value.publisher]) {
		        main.dupes[value.publisher] = true;
		        main.publisherList.push(value.publisher);
		    }
		});
		main.publisherList.unshift("Select Publisher");
		angular.element('#selectedPublisher').html(main.publisherList[0]);
	}

	main.authorSelected = function (author){
		if(author =="Select Author")
		{
			main.authFilter = "";
			angular.element('#selectedAuthor').html(main.authorList[0]);
			main.readyFunction();
		}
		else
		{
        	angular.element('#selectedAuthor').html(author);
        	main.authFilter = author;
        	main.readyFunction();
    	}
    }

    main.publisherSelected = function (publisher){
		if(publisher == "Select Publisher")
		{
			main.publFilter = "";
			angular.element('#selectedPublisher').html(main.publisherList[0]);
			main.readyFunction();
		}
		else
		{
        	angular.element('#selectedPublisher').html(publisher);
        	main.publFilter = publisher;
        	main.readyFunction();
    	}
    }

    main.getBookDetail = function(bookUrl){
    	ItemDetailService.storeBookUrl(bookUrl);
    }
}])