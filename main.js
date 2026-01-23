let tasks = [];

function addTask() {
    const taskName = document.getElementById('taskInput').value;
    const taskDate = document.getElementById('dateInput').value;
    const taskDesc = document.getElementById('descInput').value;

    if (!taskName || !taskDate) {
        alert("Nama kegiatan dan tanggal harus diisi!");
        return;
    }

    const newTask = {
        id: Date.now(),
        name: taskName,
        date: new Date(taskDate),
        desc: taskDesc,
        createdAt: new Date()
    };

    tasks.push(newTask);
    clearInputs();
    renderTasks();
}

function clearInputs() {
    document.getElementById('taskInput').value = '';
    document.getElementById('dateInput').value = '';
    document.getElementById('descInput').value = '';
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function renderTasks() {
    const listElement = document.getElementById('taskList');
    const sortBy = document.getElementById('sortFilter').value;
    listElement.innerHTML = '';

    // Logika Pengurutan
    let sortedTasks = [...tasks];
    if (sortBy === 'newest') sortedTasks.sort((a, b) => b.createdAt - a.createdAt);
    if (sortBy === 'oldest') sortedTasks.sort((a, b) => a.createdAt - b.createdAt);
    if (sortBy === 'nearest') sortedTasks.sort((a, b) => a.date - b.date);
    if (sortBy === 'farthest') sortedTasks.sort((a, b) => b.date - a.date);

    sortedTasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h4>${task.name}</h4>
            <span class="date-tag">📅 Jadwal: ${task.date.toDateString()}</span>
            <p>${task.desc}</p>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Hapus</button>
        `;
        listElement.appendChild(li);
    });
}