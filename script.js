document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task");
  const addTaskButton = document.getElementById("addTask");
  const taskList = document.getElementById("taskList");

  // Load tasks from Local Storage
  loadTasks();

  // Add task event
  addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
      addTask(taskText);
      saveTasks();
      taskInput.value = "";
    }
  });

  // Function to add task to UI
  function addTask(text) {
    const li = document.createElement("li");
    li.innerHTML = `
            <span>${text}</span>
            <button class="delete-btn">Delete</button>
        `;

    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });

    li.querySelector(".delete-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      li.remove();
      saveTasks();
    });

    taskList.appendChild(li);
  }

  // Save tasks to Local Storage
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach((li) => {
      tasks.push({
        text: li.firstElementChild.textContent,
        completed: li.classList.contains("completed"),
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Load tasks from Local Storage
  function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach((task) => {
      const li = document.createElement("li");
      li.innerHTML = `
                <span>${task.text}</span>
                <button class="delete-btn">Delete</button>
            `;

      if (task.completed) li.classList.add("completed");

      li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
      });

      li.querySelector(".delete-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        li.remove();
        saveTasks();
      });

      taskList.appendChild(li);
    });
  }
});
