document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTaskButton");
  const taskList = document.getElementById("taskList");
  const clearTasksButton = document.getElementById("clearTasksButton");
  const noTasksMessage = document.getElementById("noTasksMessage");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.innerHTML = `<input type="checkbox" ${
        task.completed ? "checked" : ""
      } data-index="${index}">
                ${task.text}
                <button class="deleteTaskButton" data-index="${index}">Удалить</button>`;
      taskList.appendChild(li);
    });

    noTasksMessage.classList.toggle("hidden", tasks.length > 0);
    clearTasksButton.disabled = tasks.length === 0;

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
      tasks.push({ text: taskText, completed: false });
      taskInput.value = "";
      renderTasks();
    }
  });

  taskList.addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
      const index = e.target.dataset.index;
      tasks[index].completed = e.target.checked;
      renderTasks();
    }
  });

  taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteTaskButton")) {
      const index = e.target.dataset.index;
      tasks.splice(index, 1);
      renderTasks();
    }
  });

  clearTasksButton.addEventListener("click", () => {
    tasks = [];
    renderTasks();
  });

  renderTasks();
});
