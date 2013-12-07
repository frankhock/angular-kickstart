/* ng-kickstart - v0.0.1 - 2013-12-07 */
window.app=window.app||{},app.bootstrap=function(){angular.bootstrap(document,["app"])},app.init=function(){app.bootstrap()},app.config={apiUrl:"api/v1",version:"0.0.1"},angular.element(document).ready(function(){app.init()}),angular.module("app",["templates.app","templates.common","app.home","app.notes","app.docs","ngRoute","ngAnimate","chieffancypants.loadingBar","common.directives.appVersion","common.directives.plusOne","common.interceptors.http"]).config(["$provide","$routeProvider","$locationProvider","$httpProvider",function($provide,$routeProvider,$locationProvider){$locationProvider.html5Mode(!0),$provide.decorator("$sniffer",function($delegate){return $delegate.history=!1,$delegate}),$routeProvider.otherwise({redirectTo:"/home"})}]).run(["$rootScope","$window",function($rootScope,$window){$rootScope.config=$window.app.config,$rootScope.$on("$routeChangeSuccess",function(){$window.scrollTo(0,0)})}]).controller("AppCtrl",["$scope","$location",function($scope,$location){$scope.title="ng-kickstart - Speed up your AngularJS development whith a great build system.",$scope.isActive=function(viewLocation){return viewLocation===$location.path()}}]),angular.module("app.docs",[]).config(["$routeProvider",function($routeProvider){$routeProvider.when("/gettingStarted",{templateUrl:"app/docs/docs.tpl.html"})}]),angular.module("app.home",["ngRoute"]).config(["$routeProvider",function($routeProvider){$routeProvider.when("/home",{controller:"HomeCtrl",templateUrl:"app/home/home.tpl.html"})}]).controller("HomeCtrl",function(){}),angular.module("app.notes",["ngRoute","notes.service"]).config(["$routeProvider",function($routeProvider){$routeProvider.when("/notes",{controller:"NotesCtrl as notesCtrl",templateUrl:"app/notes/notes.tpl.html",resolve:{notesList:function(NotesService){return NotesService.get()}}})}]).controller("NotesCtrl",["$scope","NotesService","notesList",function($scope,NotesService,notesList){function store(copy,message){NotesService.put(copy).then(function(){app.notes=copy,alertify.log(message),app.reset()})}var app=this;app.notes=notesList,app.reset=function(){$scope.addForm.$setPristine(),app.newNote=""},app.addNote=function(newNote){if($scope.addForm.$valid){var copy=angular.copy(app.notes);copy.push({id:copy.length,note:newNote}),store(copy,"note saved :)")}},app.deleteNote=function(index){var copy=angular.copy(app.notes);copy.splice(index,1),store(copy,"note deleted :)")},app.updateNote=function(note){{var copy=angular.copy(app.notes);_.each(copy,function(element){element.id===note.id&&(element.note=note.note)})}store(copy,"note updated :)")}}]),angular.module("notes.service",[]).factory("NotesService",["$q","$timeout","cfpLoadingBar",function($q,$timeout,cfpLoadingBar){var STORAGE_ID="ng-kickstart",get=function(){cfpLoadingBar.start();var deferred=$q.defer();return $timeout(function(){var data=JSON.parse(localStorage.getItem(STORAGE_ID)||"[]");cfpLoadingBar.complete(),deferred.resolve(data)},200),deferred.promise},put=function(elems){cfpLoadingBar.start();var deferred=$q.defer();return $timeout(function(){localStorage.setItem(STORAGE_ID,JSON.stringify(elems)),cfpLoadingBar.complete(),deferred.resolve()},200),deferred.promise};return{get:get,put:put}}]),angular.module("common.directives.appVersion",[]).directive("appVersion",function(){return{restrict:"A",template:"v{{config.version}}"}}),angular.module("common.directives.plusOne",[]).directive("plusOne",function(){return{link:function(scope,element){gapi.plusone.render(element[0],{size:"medium",href:"http://bit.ly/ng-kickstart"})}}}),angular.module("common.interceptors.http",[]).config(["$provide","$httpProvider",function($provide,$httpProvider){$httpProvider.interceptors.push(function($q){return{responseError:function(rejection){return alertify.error(rejection.data.message),$q.reject(rejection)}}})}]),angular.module("templates.app",["app/docs/docs.tpl.html","app/home/home.tpl.html","app/notes/notes.tpl.html"]),angular.module("app/docs/docs.tpl.html",[]).run(["$templateCache",function($templateCache){$templateCache.put("app/docs/docs.tpl.html",'<p class="panel">\n    <strong>Note that this is only a getting started guide, for more detailed information about the build system, the available tasks, the configuration of the build or anything else, please refer to the <a href="https://github.com/vesparny/ng-kickstart/#readme" target="_blank">documentation</a> on the GitHub project.</strong>\n</p>\n<h3>What and Why</h3>\n<p>\n\n    <code>ng-kickstart</code> is an opinionated kickstart for single page application development in AngularJS 1.2 . It makes you development easy, keeps the structure of the project consistent and allows you to create a fully optimized production release whith a single grunt task. I decided to build this tool because of the lack of a build system that let me develop a single page application keeping an organized file structure, and in the meantime that allows me to develop on a index.html file generated at build time, tied to my real backend.\n</p>\n<h3>Getting started</h3>\n<p>\n 	Install\n    <strong><a href="https://github.com/joyent/node/wiki/installation" target="_blank">node.js</a></strong>. Then\n    <strong>sass, karma and bower</strong> if you haven\'t yet.\n</p>\n\n<pre>\n    <code>\n    $ gem install sass\n    $ sudo npm -g install grunt-cli karma bower\n    </code>\n</pre>\n\n<p>\n    After that, install\n    <code>ng-kickstart</code> download the <a href="https://github.com/vesparny/ng-kickstart/archive/v0.0.1.zip">latest</a> release (or clone the master branch if want to run the development version).\n    Unzip the project and cd into it, then install bower and npm dependencies, and run the application in development mode.\n</p>\n\n<pre>\n    <code>\n    $ npm install\n    $ bower install\n    $ grunt serve\n    </code>\n</pre>\n\n<p>\n    You are now ready to go, your applcation is available at\n    <code>http://127.0.0.1:9000</code>. Every request to\n    <code>/api</code> will be proxied to\n    <code>http://127.0.0.1:9001/api</code>.\n</p>\n<p>\n    In the\n    <strong>/backend</strong> folder, you can find two examples of RESTFul backend.\n     One using <strong> Silex PHP micro-framework + SQLite</strong> and another using <strong>expressjs + MongoDB</strong>. Refer to the README.md into its folder to launch the desired backend (or run your own). Then go to\n    <code>http://127.0.0.1:9000/notes</code>. You are now ready to start coding, every file you add, edit or delete into the\n    <strong>/twebapp</strong> folder, will be handled by the build system.\n</p>\n<p>\n    When you are ready to build a production release there is a task for that.\n</p>\n\n<pre>\n    <code>\n    $ grunt dist\n    </code>\n</pre>\n\n<p>\n    After the task has finished you can find an optimized version of your project into the\n    <strong>/build/dist</strong> folder.\n</p>\n<p class="text-center">\n    <a href="https://github.com/vesparny/ng-kickstart/#readme" target="_blank" class="button expand">\n            <i class="fa fa-share"></i>&nbsp;&nbsp;Full documentation on GitHub\n        </a>\n</p>\n<hr/>\n<p class="text-center">\n    <strong>Inspired by ng-boilerplate, yeoman and so many other beautiful projects.</strong>\n</p>\n</div>\n')}]),angular.module("app/home/home.tpl.html",[]).run(["$templateCache",function($templateCache){$templateCache.put("app/home/home.tpl.html",'<div class="row">\n    <div class="large-9 columns">\n        <blockquote>\n            <h3>Speed up your <strong>AngularJS 1.2</strong> development with a complete and scalable build system that scaffolds the project for you. Just focus on your app,\n                <code>ng-kickstart</code> will take care of the rest.</h3>\n        </blockquote>\n    </div>\n    <div class="large-3 columns">\n        <a href="https://github.com/vesparny/ng-kickstart/archive/v0.0.1.zip" class="button expand">\n            <i class="fa fa-download"></i>&nbsp;&nbsp;Download\n        </a>\n        <a href="https://github.com/vesparny/ng-kickstart/#readme" target="_blank" class="button secondary expand">\n            <i class="fa fa-share"></i>&nbsp;&nbsp;Docs on GitHub\n        </a>\n    </div>\n</div>\n\n<div class="text-center">\n    <ul class="inline-list">\n        <li>\n            <iframe class="github-btn" src="http://ghbtns.com/github-btn.html?user=vesparny&amp;repo=ng-kickstart&amp;type=watch&amp;count=false" allowtransparency="true" frameborder="0" scrolling="0" width="85px" height="20px"></iframe>\n        </li>\n        <li>\n            <iframe class="github-btn" src="http://ghbtns.com/github-btn.html?user=vesparny&amp;repo=ng-kickstart&amp;type=fork&amp;count=false" allowtransparency="true" frameborder="0" scrolling="0" width="85px" height="20px"></iframe>\n        </li>\n        <li class="tweet-btn">\n\n            <iframe allowtransparency="true" frameborder="0" scrolling="no" src="https://platform.twitter.com/widgets/tweet_button.html?url=http%3A%2F%2Fbit.ly%2Fng-kickstart&amp;counturl=http%3A%2F%2Fvesparny.github.io%2Fng-kickstart&amp;text=Try%20ng-kickstart%20-%20Speed%20up%20your%20AngularJS%20development&amp;hashtags=angularjs, gruntjs, foundationzurb, bower&amp;via=vesparny&amp;related=vesparny" style="width:130px; height:20px;"></iframe>\n        </li>\n        <li>\n            <div plus-one></div>\n        </li>\n    </ul>\n</div>\n<hr/>\n<div class="row">\n    <div class="large-4 columns">\n        <div class="text-center">\n            <img src="assets/img/angular-logo.png">\n        </div>\n        <h4>AngularJS</h4>\n        <p>The best JavaScript framework out there will power up your awesome app.\n        </p>\n    </div>\n\n    <div class="large-4 columns">\n        <div class="text-center">\n            <img src="assets/img/grunt-logo.png">\n        </div>\n        <h3>Grunt</h3>\n        <p>A smart and scalable <a href="http://gruntjs.com" target="_blank">grunt</a> based build system will take care of your development workflow, as well as the optimization process for production release. <a ng-href="gettingStarted">read more...</a>\n        </p>\n    </div>\n\n    <div class="large-4 columns">\n        <div class="text-center">\n            <img src="assets/img/bower-logo.png">\n        </div>\n        <h3>Bower</h3>\n        <p><a href="http://bower.io" target="_blank">Bower</a> will handle your front-end dependencies.</p>\n    </div>\n\n</div>\n\n<div class="row">\n    <div class="large-4 columns">\n        <h4>Sass + Zurb Foundation</h4>\n        <p><a href="http://sass-lang.com/" target="_blank">Sass</a> is the most mature, stable, and powerful professional grade CSS extension language. Write your CSS in a modular way, the build system will compile your .scss files into a single css files. It should be easy to integrate less, stylus or any other preprocessor if you prefer. <a href="http://foundation.zurb.com/" target="_blank">Zurb Foundation</a> is the default CSS framework.</p>\n    </div>\n\n    <div class="large-4 columns">\n        <h4>API Proxy</h4>\n        <p>If you are developing a single page application tied to a\n            <code> real backend</code>, ng-kickstart will proxy every request to your backend listening on another port. You can configure this of course. <a ng-href="gettingStarted">read more...</a>\n        </p>\n    </div>\n\n    <div class="large-4 columns">\n        <h4>Modular Structure</h4>\n        <p>Instead of angular-seed monolithic files structure, ng-kickstart comes with a\n            <code> by feature files organization</code>, keeping your code organized, especially if you are working on a large code base. If you don\'t like it, just use your preferred structure, and the build system will still work. <a ng-href="gettingStarted">read more...</a>\n        </p>\n    </div>\n\n</div>\n\n<div class="row">\n    <div class="large-4 columns">\n        <h4>Keep Your Code Reusable</h4>\n        <p>Every general purpose directive, service or filter, should be placed into a common directory, in this way you can copy and paste the directory into another project, require the module you need, and you are ready to go with your new project.\n        </p>\n    </div>\n\n    <div class="large-4 columns">\n        <h4>Unit Testing</h4>\n        <p>The build system comes with a special task for running test using <a href="http://karma-runner.github.io/" target="_blank">Karma Test Runner</a>. Every time you make a production release, unit tests will be run for you.\n        </p>\n    </div>\n\n    <div class="large-4 columns">\n        <h4>RESTFul Backend Included</h4>\n        <p>ng-kickstart ships with a working\n            <code>REST api</code> written in 2 version: One using <strong> Silex PHP micro-framework + SQLite</strong> and another using <strong>expressjs + MongoDB</strong> See the <a ng-href="gettingStarted">getting started section</a> for more informations. It would be awesome to have more working examples with other technologies. Please feel free to code, hack and <a href="https://github.com/vesparny/ng-kickstart/blob/master/CONTRIBUTING.md">send PR</a>.</p>\n    </div>\n</div>\n')}]),angular.module("app/notes/notes.tpl.html",[]).run(["$templateCache",function($templateCache){$templateCache.put("app/notes/notes.tpl.html",'<div class="panel text-center">\n    <h4>This demo stores data into localStorage. Download the latest\n        <a href="https://github.com/vesparny/ng-kickstart/archive/v0.0.1.zip">ng-kickstart</a> release and take a look at the <a href="gettingStarted"> getting started</a> section to obtain version of the project working with a real RESTFul backend</h4>\n</div>\n<div class="notes">\n    <form ng-submit="notesCtrl.addNote(notesCtrl.newNote)" novalidate name="addForm">\n        <div class="row">\n            <div class="large-12 columns">\n                <small class="error" ng-show="addForm.newNote.$invalid && !addForm.newNote.$pristine">Please fill the input</small>\n                <input type="text" ng-model="notesCtrl.newNote" name="newNote" required autofocus placeholder="Write a new note and hit enter..." maxlength="100" class="noteInput">\n            </div>\n        </div>\n    </form>\n    <form ng-repeat="note in notesCtrl.notes" class="" novalidate ng-submit="notesCtrl.updateNote(note)">\n        <div class="row">\n            <div class="large-8 columns large-centered">\n                <div class="row collapse">\n                    <div class="small-11 columns">\n                        <input type="text" class="" ng-model="note.note">\n                    </div>\n                    <div class="small-1 columns">\n                        <a ng-click="notesCtrl.deleteNote($index, note.id)" class="button postfix"><i class="fa fa-minus-circle" ></i></a>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </form>\n</div>\n')}]),angular.module("templates.common",[]);
