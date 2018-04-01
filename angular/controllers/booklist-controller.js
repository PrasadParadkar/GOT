myApp.controller('BookListController',['$http', 'StoreDetailService', 'PageDataService', 'ItemDetailService', function($http,StoreDetailService,PageDataService,ItemDetailService){
	angular.element('body').css('background', 'url("img/booklistBack.jpg")');
	angular.element('#divJumbo').addClass('ng-hide');
	angular.element(document).ready(function(){
	    $(this).scrollTop(0);
	});

	var main = this;
	main.order = "name";
	main.searchedText = "";
	main.dupes = {};
	main.booksDatalist = [];
	main.publisherList = [];
	main.authorList = [];
	main.pageNo = PageDataService.getSelectedBookPgNo();
	main.items_per_page = PageDataService.getSelectedBookPgItems();
	main.total_count = 12;
	angular.element('#ddlAuthorList').hide();
	angular.element('#ddlPublisherList').hide();
	main.linkInd = ItemDetailService.returnBookIndicator();

	if(main.linkInd == "book"){
		main.btnText = PageDataService.getSelectedBookPgItems();
	}
	else{
		main.btnText = "No Of Records";
	}

	angular.element('#ddlBookPageList li >a').click(function() {
		angular.element('#ddlNoOfBookPages').text(angular.element(this).text());
		if(angular.element(this).text() == "No Of Records"){
			main.getBooksData(main.pageNo, 10);
			main.btnText = "No Of Records";
			ItemDetailService.storeBookIndicator("", "");
		}
		else{
			main.getBooksData(main.pageNo, angular.element(this).text());
			main.btnText = angular.element(this).text();
		}
	});

	this.textChanged = function(){
		main.searchedText = angular.element(document.getElementById("txtBookName")).val();
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
		angular.element('#ddlNoOfBookPages').text(main.btnText);
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
		}
		else
		{
        	angular.element('#selectedAuthor').html(author);
        	main.authFilter = author;
    	}
    }

    main.publisherSelected = function (publisher){
		if(publisher == "Select Publisher")
		{
			main.publFilter = "";
			angular.element('#selectedPublisher').html(main.publisherList[0]);
		}
		else
		{
        	angular.element('#selectedPublisher').html(publisher);
        	main.publFilter = publisher;
    	}
    }

    main.getBookDetail = function(bookUrl){
    	ItemDetailService.storeBookUrl(bookUrl);
    	if(main.btnText != "No Of Records"){	
    		ItemDetailService.storeBookIndicator("book");
    	}
    }
}])