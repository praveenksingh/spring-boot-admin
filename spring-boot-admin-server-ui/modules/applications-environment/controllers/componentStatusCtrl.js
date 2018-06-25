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

module.exports = function ($scope, $http, application) {
  'ngInject';

  $scope.application = application;
  $scope.refreshSupported = false;
  $scope.conf = undefined;
  $scope.buildInfo = undefined;
  $scope.hostInfo = undefined;
  $scope.cmdStHndlrCmptStatInfo = undefined;
  $scope.raptorCmdHndlrCmptStat = undefined;
  $scope.raptorBundleCmptStat = undefined;
  $scope.javaCalServInfo = undefined;
  $scope.javaCpuTimeStats = undefined;
  $scope.aeroHystrixInfo = undefined;
  $scope.loadAeroHystrixComponentStatus = loadAeroHystrixComponentStatus;
  $scope.getAeroHystrixComponentStatus = getAeroHystrixComponentStatus;
  $scope.loadBuildInformation = loadBuildInformation;
  $scope.loadHostInformation = loadHostInformation;
  $scope.loadJavaCpuTimeStats = loadJavaCpuTimeStats;
  $scope.loadCommandStageHandlerComponentStatus = loadCommandStageHandlerComponentStatus;
  $scope.loadRaptorBundleComponentStatus = loadRaptorBundleComponentStatus;
  $scope.loadRaptorCommandHandlerComponentStatus = loadRaptorCommandHandlerComponentStatus;
  $scope.loadJavaCalServiceInformation = loadJavaCalServiceInformation;

  $http.head('api/applications/' + application.id + '/refresh').catch(function (response) {
    $scope.refreshSupported = response.status === 405; //If method not allowed is returned the endpoint is present.
  });

  var toArray = function (obj) {
    return Object.getOwnPropertyNames(obj).map(function (key) {
      var value = obj[key] instanceof Object ? toArray(obj[key]) : obj[key];
      return {
        name: key,
        value: value
      };
    });
  };

  $scope.refresh = function () {
    $scope.env = [];
    $scope.profiles = [];

    application.getEnv().then(function (response) {
      var env = response.data;
      $scope.profiles = env.profiles;
      delete env.profiles;
      $scope.env = toArray(env); // to get the env-sources in correct order we have to convert to an array
    }).catch(function (response) {
      $scope.error = response.data;
    });
  };

  function loadAeroHystrixComponentStatus(){
    if ($scope.aeroHystrixInfo === undefined) {
      $scope.getAeroHystrixComponentStatus(false);
    }
  }

  function  getAeroHystrixComponentStatus(reset){
    $scope.aeroHystrixInfo = "";
    application.getAeroHystrixComponentStats(reset).then(function (response) {
      $scope.aeroHystrixInfo = response.data;
      console.log($scope.aeroHystrixInfo);
    }).catch(function (response) {
      $scope.error = response.data;
    });
  }

  $scope.loadApplicationConf = function(){
    if ($scope.conf === undefined) {
      $scope.getApplicationConfiguration();
    }
  };

  $scope.getApplicationConfiguration = function(){
    $scope.conf = "";
    application.getApplicationConfiguration().then(function (response) {
        $scope.conf = response.data;
    }).catch(function (response) {
        $scope.error = response.data;
    });
  };

  function loadBuildInformation(){
    if ($scope.buildInfo === undefined) {
      $scope.buildInfo = "";
      application.getApplicationBuildInformation().then(function (response) {
          $scope.buildInfo = toArray(response.data[0]);
      }).catch(function (response) {
          $scope.error = response.data;
      });
    }
  }

  function loadHostInformation(){
    if ($scope.hostInfo === undefined) {
      $scope.hostInfo = "";
      application.getHostInformation().then(function (response) {
        $scope.hostInfo = toArray(response.data[0]);
      }).catch(function (response) {
        $scope.error = response.data;
      });
    }
  }

  function loadCommandStageHandlerComponentStatus(){
    if ($scope.cmdStHndlrCmptStatInfo === undefined) {
      $scope.cmdStHndlrCmptStatInfo = "";
      application.getCommandStageHandlerComponentStatus().then(function (response) {
        $scope.cmdStHndlrCmptStatInfo = response.data;
      }).catch(function (response) {
        $scope.error = response.data;
      });
    }
  }

  function loadRaptorBundleComponentStatus(){
    if ($scope.raptorBundleCmptStat === undefined) {
      $scope.raptorBundleCmptStat = "";
      application.getRaptorBundleComponentStatus().then(function (response) {
        $scope.raptorBundleCmptStat = response.data;
      }).catch(function (response) {
        $scope.error = response.data;
      });
    }
  }

  function loadRaptorCommandHandlerComponentStatus(){
    if ($scope.raptorCmdHndlrCmptStat === undefined) {
      $scope.raptorCmdHndlrCmptStat = "";
      application.getRaptorCommandHandlerComponentStatus().then(function (response) {
        $scope.raptorCmdHndlrCmptStat = response.data;
      }).catch(function (response) {
        $scope.error = response.data;
      });
    }
  }

  function loadJavaCalServiceInformation(){
    if ($scope.javaCalServInfo === undefined) {
      $scope.javaCalServInfo = "";
      application.getJavaCalServiceInformation().then(function (response) {
        $scope.javaCalServInfo = response.data;
      }).catch(function (response) {
        $scope.error = response.data;
      });
    }
  }

  function loadJavaCpuTimeStats(){
    if ($scope.javaCpuTimeStats === undefined) {
      $scope.javaCpuTimeStats = "";
      application.getJavaCpuTimeStats().then(function (response) {
        $scope.javaCpuTimeStats = response.data;
      }).catch(function (response) {
        $scope.error = response.data;
      });
    }
  }

  $scope.refresh();
};
