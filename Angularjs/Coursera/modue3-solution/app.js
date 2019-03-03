(function () {
    'use strict';
    
    angular.module('NarrowItDown', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .directive('foundItems', FoundItemsDirective);
    
    function FoundItemsDirective() {
        var ddo = {
          templateUrl: 'foundItems.html',
          scope: {
            items: '=',
            badRemove: '=',
            onRemove: '&'
          },
          controller: NarrowItDownController,
          controllerAs: 'ctrl',
          bindToController: true
        };
      
        return ddo;
      }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
       var ndController = this;

       ndController.searchItem = '';

       ndController.filteredItems = '';

       ndController.getMatchedMenuItems = function(searchTerm){

        var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

        promise.then(function(response){
            ndController.filteredItems = response;
        }).catch(function(error){
            console.log('error occured while fetching filtered data');
        })
       }

       ndController.removeItem = function(index){

        ndController.filteredItems = MenuSearchService.removeItem(index);
       }
    }

    MenuSearchService.$inject = ['$http' , 'ApiBasePath'];
    function MenuSearchService($http , ApiBasePath) {
        var service = this;
        var foundItems =[];
        service.getMatchedMenuItems = function(searchTerm){
           return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
              }).then(function(result){
                  foundItems = [];
                  for(var i=0 ;i<result.data.menu_items.length;i++){
                      var item = result.data.menu_items[i];
                      if(item.description.search(searchTerm)!=-1){
                          foundItems.push(item);
                      }
                  }

                  return foundItems;
              });
        }
        service.removeItem = function(index){
            foundItems.splice(index,1);
            return foundItems;
        }
        
    } 
    })();
    