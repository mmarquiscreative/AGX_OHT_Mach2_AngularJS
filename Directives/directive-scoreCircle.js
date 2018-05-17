angular.module('formApp').directive('scoreCircle', function(){
    
    return {
        restrict: 'E',
        scope: {
            whichcircle: '=whichCircle',
            circleid: '@circleId'
        },
        template: '<!-- Circle results --><div id=" {{circleid}} " class="radial-progress" ><div class="circle"><div class="mask full"><div ng-style="{\'transform\': whichcircle.fillRotation, \'background-color\': whichcircle.color }" class="fill"></div><div ng-style="{\'background-color\': \'red\' }" class="fill fix"></div></div><div ng-style="{\'transform\': whichcircle.halfRotation, \'border\': whichcircle.border}" class="mask half"><div ng-style="{\'transform\': whichcircle.fillRotation,  \'background-color\': whichcircle.color }" class="fill"></div></div><div class="mask full"><div ng-style="{\'transform\': whichcircle.fillRotation, \'background-color\': whichcircle.color }" class="fill"></div><div ng-style="{\'transform\': whichcircle.halfRotation }" class="mask half"><div ng-style="{\'transform\': whichcircle.fillRotation,  \'background-color\': whichcircle.color }" class="fill"></div></div></div><div class="shadow"></div></div><div class="inset"><h1>{{ whichcircle.percentScore }}</h1></div></div><!-- END Circle results -->'
     }
});
