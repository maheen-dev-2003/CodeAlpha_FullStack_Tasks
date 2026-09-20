```js
const API_URL = "http://localhost:5000";

// Check server status
async function checkServer() {
  try {
    const response = await fetch(`${API_URL}/api/health`);
    const data = await response.json();

    document.getElementById("serverStatus").textContent = "Online";
  } catch (error) {
    document.getElementById("serverStatus").textContent = "Offline";
    console.error("Server connection failed:", error);
  }
}

// Load projects
async function loadProjects() {
  try {
    const response = await fetch(`${API_URL}/api/projects`);
    const projects = await response.json();

    document.getElementById("projectCount").textContent = projects.length;

    const projectsList = document.getElementById("projectsList");
    projectsList.innerHTML = "";

    if (projects.length === 0) {
      projectsList.innerHTML = "<p>No projects found.</p>";
      return;
    }

    projects.forEach((project) => {
      const projectCard = document.createElement("div");
      projectCard.className = "project-card";

      projectCard.innerHTML = `
        <h3>${project.name}</h3>
        <p>${project.description || "No description"}</p>
        <p><strong>Status:</strong> ${project.status}</p>
      `;

      projectsList.appendChild(projectCard);
    });
  } catch (error) {
    console.error("Failed to load projects:", error);
  }
}

// Load tasks
async function loadTasks() {
  try {
    const response = await fetch(`${API_URL}/api/tasks`);
    const tasks = await response.json();

    document.getElementById("taskCount").textContent = tasks.length;
  } catch (error) {
    console.error("Failed to load tasks:", error);
  }
}

// Add project
document.getElementById("projectForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const projectName = document.getElementById("projectName").value;
  const projectDescription =
    document.getElementById("projectDescription").value;
  const projectStatus = document.getElementById("projectStatus").value;

  try {
    const response = await fetch(`${API_URL}/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: projectName,
        description: projectDescription,
        status: projectStatus
      })
    });

    if (!response.ok) {
      throw new Error("Failed to create project");
    }

    document.getElementById("projectForm").reset();

    await loadProjects();
  } catch (error) {
    console.error("Failed to create project:", error);
  }
});

// Start dashboard
checkServer();
loadProjects();
loadTasks();
```
