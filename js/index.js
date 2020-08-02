var activityArr = [];

function Activity(name, status) {
  this.name = name;
  this.status = status;
}

var addTask = function () {
  var activityInput = document.getElementById("task").value;
  var isValid = true;

  isValid &= checkRiquired(
    activityInput,
    "Bạn vui lòng nhập vào công việc cân làm",
    "taskErr"
  );

  if (isValid) {
    var status = 1;

    for (var i = 0; i < activityArr.length; i++) {
      var currentActivity = activityArr[i];
      if (currentActivity.name === activityInput)
        return alert("Đã có công việc trong Task");
    }
    var activity = new Activity(activityInput, status);
    activityArr.push(activity);
    document.getElementById("task").value = "";
    saveData();
    renderActivity();
    document.getElementById("taskErr").innerHTML = "Bạn đã thêm một công việc";
  }
};

var checkRiquired = function (value, message, err) {
  if (!value.length) {
    document.getElementById(err).innerHTML = message;
    return false;
  }
  document.getElementById(err).innerHTML = "";
  return true;
};

var renderActivity = function () {
  var htmlActivityWorking = "";
  var htmlActivityDone = "";
  for (var i = activityArr.length - 1; i > -1; i--) {
    var currentActivity = activityArr[i];
    if (currentActivity.status === 1) {
      htmlActivityWorking += `
    <div class="form-group mt-3 task__form">
    <textarea class="task__content" name="message" style="width: 100%, height: 50px;
    ">${currentActivity.name}</textarea>
            <button onclick="checkTask('${currentActivity.name}')" class="task__icon__check"><i class="far fa-check-circle"></i></button>
            <button onclick="deleteTask('${currentActivity.name}')" class="task__icon__delete"><i class="far fa-trash-alt"></i></button>
          </div>
    `;
    }
    if (currentActivity.status === 2) {
      htmlActivityDone += `
    <div class="form-group mt-3 task__form">
    <textarea class="task__content" name="message" style="width: 100%, height: 50px;
    ">${currentActivity.name}</textarea>
            <button onclick="checkTask('${currentActivity.name}')" class="task__iconCheckDone"><i class="far fa-check-circle"></i></button>
            <button onclick="deleteTask('${currentActivity.name}')" class="task__icon__delete"><i class="far fa-trash-alt"></i></button>
          </div>
    `;
    }
  }
  document.getElementById(
    "showActivityWorking"
  ).innerHTML = htmlActivityWorking;

  document.getElementById("showActivityDone").innerHTML = htmlActivityDone;
};

var findIndexActivity = function (name) {
  for (var i = 0; i < activityArr.length; i++) {
    var currentActivity = activityArr[i];
    if (currentActivity.name === name) return i;
  }
  return alert("không tìm thấy công việc cần xóa");
};

var deleteTask = function (name) {
  var index = findIndexActivity(name);
  activityArr.splice(index, 1);
  document.getElementById("taskErr").innerHTML =
    "Đã xóa một công việc ra khỏi Task";
  saveData();
  renderActivity();
};

var checkTask = function (name) {
  var index = findIndexActivity(name);
  var currentActivity = activityArr[index];
  if (currentActivity.status === 1) {
    currentActivity.status = 2;
    document.getElementById("taskErr").innerHTML =
      "Một công việc đã hoàn thành";
  } else {
    currentActivity.status = 1;
    document.getElementById("taskErr").innerHTML = "Bạn đã thêm một công việc";
  }
  saveData();
  renderActivity();
};
const saveData = function () {
  //chuyển sang chuỗi JSON
  const activityArrJSON = JSON.stringify(activityArr);
  localStorage.setItem("activity", activityArrJSON);
};

const getData = function () {
  // //lúc vào trang,
  // /**
  //  * 1.Xuống dưới local lấy danh sách cũ lên
  //  * 2.Chuyển từ chuỗi ra mảng (lúc lưu là lưu chuỗi => lấy là lấy chuỗi)
  //  * 3.gán employeeList = mảng data cũ
  //  *
  //  */
  var activityArrJSON = localStorage.getItem("activity");
  //check nếu data cũ có tồn tại, lấy lên gán vào employeeList
  if (activityArrJSON) {
    const activityArrFromLocal = JSON.parse(activityArrJSON);

    for (var i = 0; i < activityArrFromLocal.length; i++) {
      const currentAct = activityArrFromLocal[i];
      const newActivity = new Activity(currentAct.name, currentAct.status);
      activityArr.push(newActivity);
    }
    //   /**
    //    * 1. viết hàm map:
    //    * [EMP1, EMP2] => [new Employee(EMP1), new Employee(EMP2)]
    //    *
    //    */

    renderActivity();
  }
};

getData();
