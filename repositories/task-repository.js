function TaskRepository() {
    this.tasks = [];
    this.nextId = 1;
}

TaskRepository.prototype.find = function (id) {
    var task = this.tasks.filter(function(item) {
        return item.taskId == id;
    })[0];
    if (null == task) {
        throw new Error('task not found');
    }
    return task;
}

TaskRepository.prototype.findIndex = function (id) {
    var index = null;
    this.tasks.forEach(function(item, key) {
        if (item.taskId == id) {
            index = key;
        }
    });
    if (null == index) {
        throw new Error('task not found');
    }
    return index;
}

TaskRepository.prototype.findAll = function () {
    return this.tasks;
}

TaskRepository.prototype.save = function (task) {
    if (task.taskId == null || task.taskId == 0) {
        task.taskId = this.nextId;
        this.tasks.push(task);
        this.nextId++;
    } else {
        var index = this.findIndex(task.taskId);
        this.tasks[index] = task;
    }

}

TaskRepository.prototype.remove = function (id) {
    var index = this.findIndex(id);
    this.tasks.splice(index, 1);
}