let tasks =
JSON.parse(localStorage.getItem("tasks"))
|| [];

function saveTasks(){

    localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
    );
}

function renderTasks(filter="all"){

    const taskList =
    document.getElementById("taskList");

    taskList.innerHTML = "";

    let filtered = tasks;

    if(filter==="active"){

        filtered =
        tasks.filter(t=>!t.completed);
    }

    if(filter==="completed"){

        filtered =
        tasks.filter(t=>t.completed);
    }

    filtered.forEach((task,index)=>{

        const li =
        document.createElement("li");

        li.className =
        task.completed
        ? "task completed"
        : "task";

        li.innerHTML = `
        <span>${task.text}</span>

        <div class="actions">

            <button
            class="complete"
            onclick="toggleTask(${index})">
            ✓
            </button>

            <button
            class="edit"
            onclick="editTask(${index})">
            ✎
            </button>

            <button
            class="delete"
            onclick="deleteTask(${index})">
            🗑
            </button>

        </div>
        `;

        taskList.appendChild(li);
    });

    document.getElementById(
    "taskCount"
    ).innerText =
    `${tasks.length} Tasks`;
}

function addTask(){

    const input =
    document.getElementById(
    "taskInput"
    );

    const text =
    input.value.trim();

    if(text==="") return;

    tasks.push({
        text,
        completed:false
    });

    input.value="";

    saveTasks();

    renderTasks();
}

function toggleTask(index){

    tasks[index].completed =
    !tasks[index].completed;

    saveTasks();

    renderTasks();
}

function editTask(index){

    let updated =
    prompt(
    "Edit Task",
    tasks[index].text
    );

    if(updated){

        tasks[index].text =
        updated;

        saveTasks();

        renderTasks();
    }
}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    renderTasks();
}

function filterTasks(type){

    renderTasks(type);
}

renderTasks();