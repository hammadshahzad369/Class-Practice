document.addEventListener("DOMContentLoaded", function () {
  
  // 1. Dark Mode Toggle
  const themeToggleBtn = document.querySelector("#themeToggleBtn");
  themeToggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");
    themeToggleBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  });

  // 2. Welcome Greeting Form
  const greetingForm = document.querySelector("#greetingForm");
  const visitorName = document.querySelector("#visitorName");
  const greetingOutput = document.querySelector("#greetingOutput");

  greetingForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = visitorName.value.trim();
    if (name === "") {
      greetingOutput.textContent = "Please enter your name first!";
      visitorName.focus();
      return;
    }
    greetingOutput.textContent = `Hello, ${name}! Welcome to your dashboard.`;
  });

  // 3. Study Planner App (State driven)
  const tasks = [];
  const taskForm = document.querySelector("#taskForm");
  const taskInput = document.querySelector("#taskInput");
  const taskList = document.querySelector("#taskList");
  const taskStats = document.querySelector("#taskStats");

  function renderTasks() {
    taskList.replaceChildren();

    const completedCount = tasks.filter(t => t.completed).length;
    taskStats.textContent = `${completedCount} of ${tasks.length} completed`;

    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = `task-item ${task.completed ? "completed" : ""}`;

      const content = document.createElement("div");
      content.className = "task-content";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", function () {
        tasks[index].completed = checkbox.checked;
        renderTasks();
      });

      const span = document.createElement("span");
      span.textContent = task.text;

      content.append(checkbox, span);

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "btn btn-danger";
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", function () {
        tasks.splice(index, 1);
        renderTasks();
      });

      li.append(content, deleteBtn);
      taskList.append(li);
    });
  }

  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text === "") return;

    tasks.push({ text: text, completed: false });
    taskInput.value = "";
    renderTasks();
  });

  // 4. Tip & Bill Calculator
  const tipForm = document.querySelector("#tipForm");
  const billAmount = document.querySelector("#billAmount");
  const tipPercent = document.querySelector("#tipPercent");
  const tipResult = document.querySelector("#tipResult");
  const tipAmountOutput = document.querySelector("#tipAmountOutput");
  const totalAmountOutput = document.querySelector("#totalAmountOutput");
  const tipError = document.querySelector("#tipError");

  tipForm.addEventListener("submit", function (e) {
    e.preventDefault();
    tipError.textContent = "";

    const bill = Number(billAmount.value);
    const tip = Number(tipPercent.value);

    if (!Number.isFinite(bill) || bill <= 0) {
      tipError.textContent = "Please enter a valid bill amount greater than 0.";
      tipResult.classList.add("hidden");
      return;
    }

    if (!Number.isFinite(tip) || tip < 0) {
      tipError.textContent = "Please enter a valid non-negative tip percentage.";
      tipResult.classList.add("hidden");
      return;
    }

    const tipTotal = bill * (tip / 100);
    const grandTotal = bill + tipTotal;

    tipAmountOutput.textContent = `$${tipTotal.toFixed(2)}`;
    totalAmountOutput.textContent = `$${grandTotal.toFixed(2)}`;
    tipResult.classList.remove("hidden");
  });

  // 5. Note Textarea Character Counter
  const noteInput = document.querySelector("#noteInput");
  const charCount = document.querySelector("#charCount");
  const charWarning = document.querySelector("#charWarning");

  noteInput.addEventListener("input", function () {
    const length = noteInput.value.length;
    charCount.textContent = `${length} / 100 characters`;

    if (length >= 80) {
      charWarning.classList.remove("hidden");
      noteInput.classList.add("warning-border");
    } else {
      charWarning.classList.add("hidden");
      noteInput.classList.remove("warning-border");
    }
  });

});