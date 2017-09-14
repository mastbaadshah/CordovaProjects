angular.module('todoApp', []).controller('TodoListController', function ($scope) {

    var todoList = this;

    var activeID = 0;

    $scope.doMessage = function (description, id) {
        activeID = id;
        if (description == 'Photo') {getPhoto(); }
        if (description == 'Email') { }
    };

    function getPhoto() {
        navigator.camera.getPicture(onCameraSuccess, onCameraError, null);
    }
    function onCameraSuccess(imageURI) {
        alert('Set ID ' + activeID + ' to URI ' + imageURI);
    }
    function onCameraError() { }

    todoList.setCompleteFilter = function () {
        $scope.doneFilter = true;
    };

    todoList.setIncompleteFilter = function () {
        $scope.doneFilter = false;
    };

    todoList.saveData = function () {
        window.localStorage.setItem(1, JSON.stringify(todoList.todos));
    }

    todoList.loadData = function () {
        todoList.todos = [];
        var values = window.localStorage.getItem(1);
        if (values != null) { todoList.todos = JSON.parse(values); }
    }

    //This function adds and object to the model array 'todos'. This function is called as a result of
    //the button inside the form element being clicked <form ng-submit="todoList.addTodo()"> the value
    //of 'todoText' (which is the input element) is available to be assigned to the 'text' property.
    todoList.addTodo = function () {
        var max = 0;
        angular.forEach(todoList.todos, function (todo) { if (max < todo.id) max = todo.id; });
        max++;
        todoList.todos.push({ id: max, text: todoList.todoText, done: false });
        todoList.saveData();
        todoList.todoText = '';
    };

    //This function goes through the array 'todos' and tallies up how many are not completed
    //eg done == false. The value this function returns is 
    todoList.remaining = function() {
        var count = 0;
        if (todoList.todos.length == 0) { return 0; }
        angular.forEach(todoList.todos, function(todo) { count += todo.done ? 0 : 1; });
        return count;
    };

    todoList.clearAll = function () {
        todoList.todos = [];
        saveData();
    }

    //This function removes completed tasks, it is called via <a href="" ng-click="todoList.archive()">archive</a>
    //in the HTML file. It first copies the array / model to a new array and resets the model array to empty. It
    //then iterates through the copied array and only places unfinished items on the the model array.
    todoList.archive = function() {
        var oldTodos = todoList.todos;
        todoList.todos = [];
        angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
        });
        todoList.saveData();
    };

    var init = function () {
        todoList.loadData();
        todoList.setIncompleteFilter();
    };
    
    init();
});

