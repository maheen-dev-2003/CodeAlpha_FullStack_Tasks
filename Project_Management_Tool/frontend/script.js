const API_URL = "http://127.0.0.1:5000/api";

/* =========================
   CHECK BACKEND
========================= */

async function checkServer() {
  const status = document.getElementById("serverStatus");
  const statusCard = document.getElementById("serverStatusCard");

  try {
    const response = await fetch(`${API_URL}/health`);

    if (!response.ok) {
      throw new Error("Backend is not responding");
    }

    await response.json();

    if (status) {
      status.textContent = "Online";
      status.style.color = "#16a36a";
    }

    if (statusCard) {
      statusCard.textContent = "Online";
      statusCard.style.color = "#16a36a";
    }

  } catch (error) {
    console.error("Backend error:", error);

    if (status) {
      status.textContent = "Offline";
      status.style.color = "#e63972";
    }

    if (statusCard) {
      statusCard.textContent = "Offline";
      statusCard.style.color = "#e63972";
    }
  }
}


/* =========================
   LOAD PROJECTS
========================= */

async function loadProjects() {
  const projectsList =
    document.getElementById("projectsList");

  const projectCount =
    document.getElementById("projectCount");

  if (!projectsList) return;

  try {
    projectsList.innerHTML =
      "<p>Loading projects...</p>";

    const response =
      await fetch(`${API_URL}/projects`);

    if (!response.ok) {
      throw new Error(
        `Projects API error: ${response.status}`
      );
    }

    const projects =
      await response.json();

    console.log("Projects:", projects);

    if (projectCount) {
      projectCount.textContent =
        projects.length;
    }

    if (!projects.length) {

      projectsList.innerHTML = `
        <div class="empty-tasks">
          <h3>📂 No Projects Yet</h3>
          <p>Create your first project above.</p>
        </div>
      `;

      return;
    }

    projectsList.innerHTML = "";

    projects.forEach((project) => {

      const card =
        document.createElement("div");

      card.className = "project-card";

      card.innerHTML = `
        <div class="project-header">

          <h3>
            📂 ${escapeHTML(
              project.name || "Untitled Project"
            )}
          </h3>

        </div>

        <p>
          ${escapeHTML(
            project.description ||
            "No description available"
          )}
        </p>

        <div class="project-status">
          <strong>Status:</strong>
          <span>
            ${escapeHTML(
              project.status || "Planning"
            )}
          </span>
        </div>
      `;

      projectsList.appendChild(card);
    });

  } catch (error) {

    console.error(
      "Projects loading error:",
      error
    );

    projectsList.innerHTML = `
      <div class="empty-tasks">
        <h3>⚠️ Unable to Load Projects</h3>
        <p>
          Please make sure the backend server is running.
        </p>
      </div>
    `;
  }
}


/* =========================
   LOAD TASKS
========================= */

async function loadTasks() {

  const tasksList =
    document.getElementById("tasksList");

  const taskCount =
    document.getElementById("taskCount");

  if (!tasksList) return;

  try {

    tasksList.innerHTML =
      "<p>Loading tasks...</p>";

    const response =
      await fetch(`${API_URL}/tasks`);

    if (!response.ok) {
      throw new Error(
        `Tasks API error: ${response.status}`
      );
    }

    const tasks =
      await response.json();

    if (taskCount) {
      taskCount.textContent =
        tasks.length;
    }

    if (!tasks.length) {

      tasksList.innerHTML = `
        <div class="empty-tasks">
          <h3>✓ No Tasks Yet</h3>
          <p>Create your first task above.</p>
        </div>
      `;

      return;
    }

    tasksList.innerHTML = "";

    tasks.forEach((task) => {

      const card =
        document.createElement("div");

      card.className = "task-card";

      const status =
        task.status || "Pending";

      const priority =
        task.priority || "Medium";

      let dueDate =
        "No due date";

      if (task.dueDate) {

        dueDate =
          new Date(
            task.dueDate
          ).toLocaleDateString();
      }

      card.innerHTML = `
        <div class="task-header">

          <h3>
            ${escapeHTML(
              task.title || "Untitled Task"
            )}
          </h3>

          <div class="task-actions">

            <button
              class="edit-task"
              onclick="editTask('${task._id}')"
              title="Edit Task">
              ✏️
            </button>

            <button
              class="delete-task"
              onclick="deleteTask('${task._id}')"
              title="Delete Task">
              🗑️
            </button>

          </div>

        </div>

        <p class="task-description">
          ${escapeHTML(
            task.description ||
            "No description"
          )}
        </p>

        <div class="task-info">

          <span class="status-badge">
            ${escapeHTML(status)}
          </span>

          <span class="priority-badge">
            ${escapeHTML(priority)}
          </span>

        </div>

        <div class="task-date">
          📅 ${dueDate}
        </div>
      `;

      tasksList.appendChild(card);
    });

  } catch (error) {

    console.error(
      "Tasks loading error:",
      error
    );

    tasksList.innerHTML = `
      <div class="empty-tasks">
        <h3>⚠️ Unable to Load Tasks</h3>
        <p>
          Please make sure the backend server is running.
        </p>
      </div>
    `;
  }
}


/* =========================
   DELETE TASK
========================= */

async function deleteTask(taskId) {

  const confirmDelete =
    confirm(
      "Are you sure you want to delete this task?"
    );

  if (!confirmDelete) return;

  try {

    const response =
      await fetch(
        `${API_URL}/tasks/${taskId}`,
        {
          method: "DELETE"
        }
      );

    if (!response.ok) {
      throw new Error(
        "Failed to delete task"
      );
    }

    await response.json();

    await loadTasks();

  } catch (error) {

    console.error(
      "Delete task error:",
      error
    );

    alert(
      "Failed to delete task."
    );
  }
}


/* =========================
   EDIT TASK
========================= */

async function editTask(taskId) {

  try {

    const response =
      await fetch(`${API_URL}/tasks`);

    if (!response.ok) {
      throw new Error(
        "Failed to load task"
      );
    }

    const tasks =
      await response.json();

    const task =
      tasks.find(
        (item) => item._id === taskId
      );

    if (!task) {
      alert("Task not found.");
      return;
    }

    const title =
      prompt(
        "Task Title:",
        task.title || ""
      );

    if (title === null) return;

    const description =
      prompt(
        "Task Description:",
        task.description || ""
      );

    if (description === null) return;

    const status =
      prompt(
        "Status: Pending / In Progress / Completed",
        task.status || "Pending"
      );

    if (status === null) return;

    const priority =
      prompt(
        "Priority: Low / Medium / High",
        task.priority || "Medium"
      );

    if (priority === null) return;

    let oldDate = "";

    if (task.dueDate) {

      oldDate =
        new Date(task.dueDate)
          .toISOString()
          .split("T")[0];
    }

    const dueDate =
      prompt(
        "Due Date (YYYY-MM-DD):",
        oldDate
      );

    if (dueDate === null) return;

    const updateResponse =
      await fetch(
        `${API_URL}/tasks/${taskId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            title,
            description,
            status,
            priority,
            dueDate
          })
        }
      );

    if (!updateResponse.ok) {
      throw new Error(
        "Failed to update task"
      );
    }

    await updateResponse.json();

    await loadTasks();

    alert(
      "Task updated successfully! ✅"
    );

  } catch (error) {

    console.error(
      "Edit task error:",
      error
    );

    alert(
      "Failed to update task."
    );
  }
}


/* =========================
   CREATE PROJECT
========================= */

const projectForm =
  document.getElementById("projectForm");

if (projectForm) {

  projectForm.addEventListener(
    "submit",
    async function (event) {

      event.preventDefault();

      const name =
        document.getElementById(
          "projectName"
        ).value.trim();

      const description =
        document.getElementById(
          "projectDescription"
        ).value.trim();

      const status =
        document.getElementById(
          "projectStatus"
        ).value;

      const message =
        document.getElementById(
          "projectMessage"
        );

      try {

        const response =
          await fetch(
            `${API_URL}/projects`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({
                name,
                description,
                status
              })
            }
          );

        if (!response.ok) {
          throw new Error(
            "Failed to create project"
          );
        }

        await response.json();

        if (message) {

          message.textContent =
            "Project added successfully! ✅";

          message.style.color =
            "#16a36a";
        }

        projectForm.reset();

        await loadProjects();

        await loadProjectOptions();

      } catch (error) {

        console.error(
          "Create project error:",
          error
        );

        if (message) {

          message.textContent =
            "Failed to add project.";

          message.style.color =
            "#e63972";
        }
      }
    }
  );
}


/* =========================
   PROJECT DROPDOWN
========================= */

async function loadProjectOptions() {

  const select =
    document.getElementById(
      "taskProject"
    );

  if (!select) return;

  try {

    const response =
      await fetch(
        `${API_URL}/projects`
      );

    if (!response.ok) {
      throw new Error(
        "Failed to load projects"
      );
    }

    const projects =
      await response.json();

    select.innerHTML =
      `<option value="">
        Select Project
      </option>`;

    projects.forEach((project) => {

      const option =
        document.createElement(
          "option"
        );

      option.value =
        project._id;

      option.textContent =
        project.name;

      select.appendChild(option);
    });

  } catch (error) {

    console.error(
      "Project dropdown error:",
      error
    );
  }
}


/* =========================
   CREATE TASK
========================= */

const taskForm =
  document.getElementById(
    "taskForm"
  );

if (taskForm) {

  taskForm.addEventListener(
    "submit",
    async function (event) {

      event.preventDefault();

      const title =
        document.getElementById(
          "taskTitle"
        ).value.trim();

      const description =
        document.getElementById(
          "taskDescription"
        ).value.trim();

      const status =
        document.getElementById(
          "taskStatus"
        ).value;

      const priority =
        document.getElementById(
          "taskPriority"
        ).value;

      const dueDate =
        document.getElementById(
          "taskDueDate"
        ).value;

      const project =
        document.getElementById(
          "taskProject"
        ).value;

      const message =
        document.getElementById(
          "taskMessage"
        );

      try {

        const response =
          await fetch(
            `${API_URL}/tasks`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({
                title,
                description,
                status,
                priority,
                dueDate,
                project:
                  project || null
              })
            }
          );

        if (!response.ok) {
          throw new Error(
            "Failed to create task"
          );
        }

        await response.json();

        if (message) {

          message.textContent =
            "Task added successfully! ✅";

          message.style.color =
            "#16a36a";
        }

        taskForm.reset();

        await loadTasks();

      } catch (error) {

        console.error(
          "Create task error:",
          error
        );

        if (message) {

          message.textContent =
            "Failed to add task.";

          message.style.color =
            "#e63972";
        }
      }
    }
  );
}


/* =========================
   SECURITY HELPER
========================= */

function escapeHTML(value) {

  const div =
    document.createElement("div");

  div.textContent =
    value;

  return div.innerHTML;
}


/* =========================
   START DASHBOARD
========================= */

checkServer();
loadProjects();
loadTasks();
loadProjectOptions();