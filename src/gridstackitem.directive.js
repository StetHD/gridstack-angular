(function() {
'use strict';

var app = angular.module('gridstack-angular');

app.directive('gridstackItem', ['$timeout', function($timeout) {

  return {
    restrict: 'A',
    controller: 'GridstackController',
    require: '^gridstack',
    scope: {
      gridstackItem: '=',
      onItemAdded: '&',
      onItemRemoved: '&',
      gsItemId: '=?',
      gsItemX: '=',
      gsItemY: '=',
      gsItemWidth: '=',
      gsItemHeight: '=',
      gsItemAutopos: '=',
      gsItemMinHeight: '=?',
      gsItemMaxHeight: '=?',
      gsItemMinWidth: '=?',
      gsItemMaxWidth: '=?'
    },
    link: function(scope, element, attrs, controller) {
      if (scope.gsItemId) {
        $(element).attr('data-gs-id', scope.gsItemId);
      }
      $(element).attr('data-gs-x', scope.gsItemX);
      $(element).attr('data-gs-y', scope.gsItemY);
      $(element).attr('data-gs-width', scope.gsItemWidth);
      $(element).attr('data-gs-height', scope.gsItemHeight);
      $(element).attr('data-gs-min-width', scope.gsItemMinWidth);
      $(element).attr('data-gs-min-height', scope.gsItemMinHeight);
      $(element).attr('data-gs-max-width', scope.gsItemMaxWidth);
      $(element).attr('data-gs-max-height', scope.gsItemMaxHeight);
      $(element).attr('data-gs-auto-position', scope.gsItemAutopos);
      var widget = controller.addItem(element);
      var item = element.data('_gridstack_node');
      $timeout(function() {
        scope.onItemAdded({item: item});
      });

      scope.$watch(function() { return $(element).attr('data-gs-id'); }, function(val) {
        scope.gsItemId = val;
      });

      scope.$watch(function() { return $(element).attr('data-gs-x'); }, function(val) {
        scope.gsItemX = Number(val);
      });

      scope.$watch(function() { return $(element).attr('data-gs-y'); }, function(val) {
        scope.gsItemY = Number(val);
      });

      scope.$watch(function() { return $(element).attr('data-gs-width'); }, function(val) {
        scope.gsItemWidth = Number(val);
      });

      scope.$watch(function() { return $(element).attr('data-gs-height'); }, function(val) {
        scope.gsItemHeight = Number(val);
      });

      scope.$watch(function() { return $(element).attr('data-gs-min-width'); }, function(val) {
        scope.gsItemMinWidth = Number(val);
      });

      scope.$watch(function() { return $(element).attr('data-gs-min-height'); }, function(val) {
        scope.gsItemMinHeight = Number(val);
      });

      scope.$watch(function() { return $(element).attr('data-gs-max-width'); }, function(val) {
        scope.gsItemMaxWidth = Number(val);
      });

      scope.$watch(function() { return $(element).attr('data-gs-max-height'); }, function(val) {
        scope.gsItemMaxHeight = Number(val);
      });

      element.bind('$destroy', function() {
        var item = element.data('_gridstack_node');
        scope.onItemRemoved({item: item});
        controller.removeItem(element);
      });

    }

  };

}]);
})();
