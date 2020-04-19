function getBaseBackEndUrl() {
    return "https://artemignatiev908976.github.io/diplomTest/login.html";
}

function getBaseFrontEndUrl() {
    return "https://artemignatiev908976.github.io/diplomTest/login.html";
}

function getLoginPageUrl() {
    return getBaseFrontEndUrl() + "/login";
}

function getMainPageUrl() {
    return getBaseFrontEndUrl();
}

function getAllTasksUrl() {
    return getBaseFrontEndUrl() + "/allTasks";
}

function getCreateTaskUrl() {
    return getBaseFrontEndUrl() + "/createTask";
}

function getTaskViewUrl() {
    return getBaseFrontEndUrl() + "/task-view";
}

function getTaskAnotherViewUrl() {
    return getBaseFrontEndUrl() + "/task-another-view";
}

function getExecutorsUrl() {
    return getBaseFrontEndUrl() + "/executors";
}

function checkStatusCodeAndRedirectToLoginPage(response) {
    console.log('request succeeded with JSON response', response);
    if (response.status === 500 || response.status === 403) {
        if (response.status === 500) {
            Promise.resolve(response.json()).then(function (json) {
                alert("Возникла ошибка " + json.message);
            });
        } else {
            alert("Вы не авторизованы");
        }

        window.location = getLoginPageUrl();
    }
}


function getPersonBySessionIdAnd(sessionId, functionToApply) {
    var url = getBaseBackEndUrl() + "/auth/person?" + $.param({sessionId: sessionId});
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (data) {
        checkStatusCodeAndRedirectToLoginPage(data);
        return data.json();
    }).then(function (json) {
        functionToApply(json);
    }).catch(function (error) {
        console.log('request failed', error);
    });
}

function createTask(sessionId, json) {
    var url = getBaseBackEndUrl() + "/task?" + $.param({sessionId: sessionId});
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    }).then(function (data) {
        checkStatusCodeAndRedirectToLoginPage(data);
        window.location = getAllTasksUrl();
    }).catch(function (error) {
        console.log('request failed', error);
    });
}

function checkAndCreateMain() {
    let cookie = getCookie("session-id");
    if (typeof cookie === "undefined") {
        alert("Вы не авторизованы");
        window.location = getLoginPageUrl();
    } else {
        window.location = getCreateTaskUrl();
    }
}


function loadTaskAnd(functionToApply) {

    var sessionId = getCookie("session-id");
    var taskId = getCookie("task-id");
    console.log(taskId + " id задачи");
    var url = getBaseBackEndUrl() + "/task?" + $.param({id: taskId}) + "&" + $.param({sessionId: sessionId});
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(function (result) {
        checkStatusCodeAndRedirectToLoginPage(result);
        return result.json();
    }).then(function (json) {
        functionToApply(json);
    });

}

function fetchGetRequestAndProcessJson(url, functionToApply) {
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(function (result) {
        checkStatusCodeAndRedirectToLoginPage(result);
        return result.json();
    }).then(function (json) {
        console.log("json from js = " + json);
        functionToApply(json);
    });
}

function showTask(json) {
    var name = $("#task-description").val(json.name);
    var categoryName = $("#category-select").val(json.category.name);
    var descriptionText = $("#task-description-full").val(json.description);
    var priceText = $("#range").val(json.priceAmount);
    var addressText = $("#address-input").val(json.address);
    var customerName = $("#customer-name").val(json.person.firstName);
    var customerPhone = $("#customer-phone").val(json.person.phone);
    var startDate = $("#initial-date").val(json.startDate);
    var endDate = $("#complete-date").val(json.endDate);
}

function redirectToAnotherViewIfNeeds(isAnotherView) {
    console.log("redirect input " + isAnotherView);
    if (isAnotherView) {
        window.location = getTaskAnotherViewUrl();
        throw new Error();
    }
}

function checkAndRedirectToAnotherView() {
    getAnotherViewAnd(redirectToAnotherViewIfNeeds);
}

function getAnotherViewAnd(functionToApply) {
    var sessionId = getCookie("session-id");
    var taskId = getCookie("task-id");
    var url = getBaseBackEndUrl() + "/task/view/isAnother?" + $.param({taskId: taskId}) + "&" + $.param({sessionId: sessionId});
    fetchGetRequestAndProcessJson(url, function (json) {
        var isView = json.anotherView;
        functionToApply(isView);
    });
}

function offerMyself() {
    var sessionId = getCookie("session-id");
    var taskId = getCookie("task-id");
    var url = getBaseBackEndUrl() + "/task/add/respond?" + $.param({taskId: taskId}) + "&" + $.param({sessionId: sessionId});
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (data) {
        checkStatusCodeAndRedirectToLoginPage(data);
        alert("Вы успешно откликнулись на задачу");
        window.location = getAllTasksUrl();
    }).catch(function (error) {
        console.log('request failed', error);
    });
}

function loadRespondsAnd(functionToApply) {
    var sessionId = getCookie("session-id");
    var taskId = getCookie("task-id");
    console.log(taskId + " id задачи");
    var url = getBaseBackEndUrl() + "/task/show/responds?" + $.param({taskId: taskId}) + "&" + $.param({sessionId: sessionId});
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(function (result) {
        checkStatusCodeAndRedirectToLoginPage(result);
        return result.json();
    }).then(function (json) {
        functionToApply(json);
    });
}

function chooseExecutor(executorId) {
    var sessionId = getCookie("session-id");
    var taskId = getCookie("task-id");
    var url = getBaseBackEndUrl() + "/task/add/executor?" + $.param({taskId: taskId}) + "&" + $.param({executorId: executorId}) + "&" + $.param({sessionId: sessionId});
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (data) {
        checkStatusCodeAndRedirectToLoginPage(data);
        alert("Вы успешно выбрали исполнителя");
        window.location = getAllTasksUrl();
    }).catch(function (error) {
        console.log('request failed', error);
    });
}

function getRuDate() {
    return {
        previousMonth : 'Предыдущий месяц',
        nextMonth     : 'Следующий месяц',
        months        : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        weekdays      : ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
        weekdaysShort : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
    };
}

function appendZero(number) {
   return number < 10 ? "0" + number : number;
}

function getRuDatePickerById(idOfDatePicker) {
    return new Pikaday({
        field: document.getElementById(idOfDatePicker),
        i18n: getRuDate(),
        firstDay: 1,
        format: 'DD MM YYYY',
        toString: function(date, format) {
            // you should do formatting based on the passed format,
            // but we will just return 'D/M/YYYY' for simplicity
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            return appendZero(day) + "-" + appendZero(month) + "-" + year;
        },
        parse: function(dateString, format) {
            // dateString is the result of `toString` method
            var parts = dateString.split('-');
            var day = parseInt(parts[0], 10);
            var month = parseInt(parts[1] - 1, 10);
            var year = parseInt(parts[2], 10);
            return new Date(year, month, day);
        }
    });
}