(function() {
    'use strict';

    angular
        .module(APP_NAME)
        .controller('BetsController', BetsController);

    BetsController
        .$inject = [
            'Bet',
            '$routeParams'
        ]

    function BetsController(Bet, $routeParams) {
        var vm = this;
        vm.buyBets = [];
        vm.sellBets = [];
        vm.matchName = "";
        vm.placeBet = placeBet;
        vm.addPrice = addPrice;
        vm.addSize = addSize;
        vm.getNumber = getNumber;
        vm.isBuy = true;
        vm.price = 0;
        vm.size = 0;
        vm.largest = 0;
        activate();

        function getNumber() {
            var ar = [];
            for(var i = 0; i < vm.largest; i++) {
                ar.push(i);
            } 
            return ar;
        }

        function setBuy(val) {
            vm.isBuy = val;
        }

        function addPrice(val) {
            var nextPrice = vm.price + val; 
            if(nextPrice > 0 && nextPrice <100) {
                vm.price = nextPrice;
            }
        }

        function addSize(val) {
            var nextSize = vm.size + val;
            if(nextSize > 0) {
                vm.size = nextSize;
            }
        }

        function activate() {
            Bet.get({id: $routeParams.id}, function(data) {
                vm.buyBets = data.buyBets;
                vm.sellBets = data.sellBets;
                vm.matchName = data.matchName;
                vm.largest = vm.buyBets.length > vm.sellBets.length ? vm.buyBets.length : vm.sellBets.length
            });
        }

        function placeBet() {
            var bet = new Bet();
            bet.side = vm.side;
            bet.size = vm.size;
            bet.price = vm.price;
            bet.matchId = $routeParams.id;
            bet.$place(function() {
                activate();
            });
        }
    }
})();