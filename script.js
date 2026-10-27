// Load saved tasks when the page opens.
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

const input = document.getElementById("task-input");
const preview = document.getElementById("task-preview");
const list = document.getElementById("task-list");

// Save the state, then redraw the task list.
function updatePage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  list.replaceChildren();

  tasks.forEach((task, index) => {
    const item = document.createElement("li");
    item.className = "task-item";
    if (task.done) item.classList.add("done");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      tasks[index].done = checkbox.checked;
      updatePage();
    });

    const text = document.createElement("span");
    text.textContent = task.text;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      updatePage();
    });

    item.append(checkbox, text, removeButton);
    list.append(item);
  });
}

// Show a live preview while the user types.
input.addEventListener("input", () => {
  preview.textContent = input.value || "Type something and watch this update...";
});

// Add a task when the form is submitted.
document.getElementById("task-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ text: text, done: false });
  input.value = "";
  preview.textContent = "Type something and watch this update...";
  updatePage();
});

updatePage();
