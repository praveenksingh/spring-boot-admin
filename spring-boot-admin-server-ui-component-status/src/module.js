/*
 * Copyright 2014 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var angular = require('angular');

var module = angular.module('sba-applications-component-status', ['sba-applications']);
global.sbaModules.push(module.name);

module.service('ComponentStatus', require('./services/componentStatusService.js'));
module.controller('componentStatusCtrl', require('./controllers/componentStatusCtrl.js'));

module.config(function ($stateProvider) {
  $stateProvider.state('applications.componentStatus', {
    url: '/componentstatus',
    templateUrl: 'applications-component-status/views/componentstatus.html',
    controller: 'componentStatusCtrl',
    resolve: {
      componentstatus: function ($stateParams, ComponentStatus) {
          return ComponentStatus.get({
              id: $stateParams.id
          }).$promise;
      }
    }
  });
});

module.run(function (ApplicationViews, $sce, $q, $http) {
  var isEventSourceAvailable = function (url) {
    var deferred = $q.defer();

    $http.get(url, {
      eventHandlers: {
        'progress': function (event) {
          deferred.resolve(event.target.status === 200);
          event.target.abort();
        },
        'error': function () {
          deferred.resolve(false);
        }
      }
    });

    return deferred.promise;
  };

  ApplicationViews.register({
    order: 150,
    title: $sce.trustAsHtml('<i class="fa fa-gear fa-fw"></i>Component Status'),
    state: 'applications.componentStatus',
    show: function (application) {
      return isEventSourceAvailable('api/applications/' + application.id + '/env');
    }
  });
});
