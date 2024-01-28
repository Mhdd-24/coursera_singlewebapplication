(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuyCtrl = this;
        toBuyCtrl.items = ShoppingListCheckOffService.getToBuyItems();
        toBuyCtrl.buyItem = function (index) {
            ShoppingListCheckOffService.buyItem(index);
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var boughtCtrl = this;
        boughtCtrl.items = ShoppingListCheckOffService.getBoughtItems();
        boughtCtrl.everythingBought = ShoppingListCheckOffService.everythingBought;
    }

    function ShoppingListCheckOffService() {
        var service = this;
        var toBuyItems = [
            { name: 'Cookies', quantity: 10 },
            { name: 'Milk', quantity: 2 },
            { name: 'Bread', quantity: 1 },
            { name: 'Eggs', quantity: 12 },
            { name: 'Apples', quantity: 5 }
        ];
        var boughtItems = [];
        service.everythingBought = false;

        service.getToBuyItems = function () {
            return toBuyItems;
        };

        service.getBoughtItems = function () {
            return boughtItems;
        };

        service.buyItem = function (index) {
            var item = toBuyItems.splice(index, 1)[0];
            boughtItems.push(item);

            if (toBuyItems.length === 0) {
                service.everythingBought = true;
            }
        };
    }
})();
