(function(){
'use strict';

angular.module('LunchApp', [])
.controller('LunchController', LunchController);

LunchController.$inject = ['$scope'];

function LunchController($scope){
    $scope.data = '';
    $scope.message = '';
    $scope.color = 'black';
    $scope.checkIfTooMuch = function(){
        if($scope.data ==''){
            $scope.message = 'Please enter data first';
            $scope.color = 'red';
        }else{
            var splitData = $scope.data.split(',');
            $scope.color = 'green';
            if(splitData.length<=3){
                $scope.message = 'Enjoy';
            }else{
                $scope.message = 'Too much!!';
            }
        }
       
    }

    
}

})();