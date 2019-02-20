(function () {
    'use strict';
    
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
    
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var buy = this;
        buy.buy = ShoppingListCheckOffService.getBuyItems();
        buy.buyItem = function(index){
            return ShoppingListCheckOffService.buyItem(index);
        }

        buy.isEmpty = ShoppingListCheckOffService.isBuyEmpty;
    }
    
    
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
      var bought = this;

      bought.bought = ShoppingListCheckOffService.getBoughtItems();

      bought.isEmpty = ShoppingListCheckOffService.isBoughtEmpty;
    }
    
    
    function ShoppingListCheckOffService() {
      var service = this;
    
      var toBuy = [{ name: "cookies", quantity: 10 } , { name: "cakes", quantity: 20 },
                    { name: "pizza", quantity: 2 },{ name: "burger", quantity: 15 }];

      var bought = [];

      service.getBuyItems = function(){
          return toBuy;
      }

      service.getBoughtItems = function(){
          return bought;
      }

      service.buyItem = function(index){
        bought.push(toBuy[index]);
        toBuy.splice(index ,1);
      }

      service.isBoughtEmpty = function(){
          return (bought.length==0);
      }

      service.isBuyEmpty = function(){
        return (toBuy.length==0);
    }
    }
    
    })();
    