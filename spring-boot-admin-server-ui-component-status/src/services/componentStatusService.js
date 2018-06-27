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

module.exports = function ($resource, $http) {
    'ngInject';

    var ComponentServices = $resource('api/applications/:id', { id: '@id' }, {
        query: {
            method: 'GET',
            isArray: true
        }, get: {
            method: 'GET'
        }, remove: {
            method: 'DELETE'
        }
    });

    var convert = function (response) {
        delete response.data['_links'];
        return response;
    };

    ComponentServices.prototype.getApplicationConfiguration = function () {
        return $http.get('v1/springactuatorserv/api/getApplicationConfiguration').then(convert);
    };

    ComponentServices.prototype.getAeroHystrixComponentStats = function (reset) {
        return $http.get('v1/springactuatorserv/api/getAeroHystrixComponentStats', {params: { reset: reset }}).then(convert);
    };

    ComponentServices.prototype.getApplicationBuildInformation = function () {
        return $http.get('v1/springactuatorserv/api/getApplicationBuildInformation').then(convert);
    };

    ComponentServices.prototype.getHostInformation = function () {
        return $http.get('v1/springactuatorserv/api/getHostInformation').then(convert);
    };

    ComponentServices.prototype.getCommandStageHandlerComponentStatus = function () {
        return $http.get('v1/springactuatorserv/api/getCommandStageHandlerComponentStatus').then(convert);
    };

    ComponentServices.prototype.getRaptorCommandHandlerComponentStatus = function () {
        return $http.get('v1/springactuatorserv/api/getRaptorCommandHandlerComponentStatus').then(convert);
    };

    ComponentServices.prototype.getRaptorBundleComponentStatus = function () {
        return $http.get('v1/springactuatorserv/api/getRaptorBundlesComponentStatus').then(convert);
    };

    ComponentServices.prototype.getJavaCalServiceInformation = function () {
        return $http.get('v1/springactuatorserv/api/getJavaCalServiceInfo').then(convert);
    };

    ComponentServices.prototype.getJavaCpuTimeStats = function () {
        return $http.get('v1/springactuatorserv/api/getJavaCpuTimeStats').then(convert);
    };

    return ComponentServices;
};