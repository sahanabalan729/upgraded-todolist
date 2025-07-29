function addTask() {
    const input = document.getElementById("taskInput");
    const date = document.getElementById("dueDate");
    const taskText = input.value.trim();
    const due = date.value;
  
    if (taskText === "") return;
  
    const li = document.createElement("li");
    li.setAttribute("draggable", "true");
  
    const span = document.createElement("span");
    span.textContent = taskText + (due ? ` (Due: ${due})` : "");
    span.onclick = () => li.classList.toggle("completed");
  
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = () => {
      const newText = prompt("Edit task:", taskText);
      if (newText !== null) {
        span.textContent = newText.trim() + (due ? ` (Due: ${due})` : "");
      }
    };
  
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = () => li.remove();
  
    const btnGroup = document.createElement("div");
    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(deleteBtn);
  
    li.appendChild(span);
    li.appendChild(btnGroup);
    document.getElementById("taskList").appendChild(li);
  
    input.value = "";
    date.value = "";
  
    enableDragAndDrop();
  }
  
  function filterTasks(type) {
    const tasks = document.querySelectorAll("#taskList li");
    tasks.forEach(task => {
      switch (type) {
        case "all":
          task.style.display = "flex";
          break;
        case "active":
          task.style.display = task.classList.contains("completed") ? "none" : "flex";
          break;
        case "completed":
          task.style.display = task.classList.contains("completed") ? "flex" : "none";
          break;
      }
    });
  }
  
  document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
  
  function enableDragAndDrop() {
    const list = document.getElementById("taskList");
    let draggedItem = null;
  
    list.querySelectorAll("li").forEach(item => {
      item.addEventListener("dragstart", () => {
        draggedItem = item;
        setTimeout(() => item.style.display = "none", 0);
      });
  
      item.addEventListener("dragend", () => {
        setTimeout(() => {
          draggedItem.style.display = "flex";
          draggedItem = null;
        }, 0);
      });
  
      item.addEventListener("dragover", e => e.preventDefault());
  
      item.addEventListener("drop", e => {
        e.preventDefault();
        if (draggedItem !== item) {
          list.insertBefore(draggedItem, item);
        }
      });
    });
  }
  