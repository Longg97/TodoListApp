// Lấy các phần tử DOM
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Hàm thêm công việc
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        // Tạo phần tử li mới
        const li = document.createElement('li');
        li.textContent = taskText;

        // Tạo nút xóa
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Xóa';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(li);
        });

        // Thêm sự kiện click để đánh dấu hoàn thành
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        // Thêm nút xóa vào li
        li.appendChild(deleteBtn);

        // Thêm li vào danh sách
        taskList.appendChild(li);

        // Xóa nội dung input
        taskInput.value = '';
    }

    const taskDate = document.getElementById('task-date').value;
    li.dataset.date = taskDate;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Sửa';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', () => {
        const newText = prompt('Sửa công việc:', li.textContent.replace('Xóa', '').trim());
        if (newText !== null) {
            li.textContent = newText;
            li.appendChild(deleteBtn);
            li.appendChild(editBtn);
            saveTasks();
        }
    });
    li.appendChild(editBtn);
}

// Thêm sự kiện click cho nút "Thêm"
addTaskBtn.addEventListener('click', addTask);

// Thêm sự kiện Enter để thêm công việc
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Lưu danh sách công việc vào localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach((li) => {
        tasks.push({
            text: li.textContent.replace('Xóa', '').trim(),
            completed: li.classList.contains('completed'),
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Tải danh sách công việc từ localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('completed');
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Xóa';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks();
        });

        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Gọi hàm loadTasks khi trang được tải
document.addEventListener('DOMContentLoaded', loadTasks);

// Gọi hàm saveTasks mỗi khi thay đổi danh sách
addTaskBtn.addEventListener('click', () => {
    addTask();
    saveTasks();
});

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
        saveTasks();
    }
});

function filterTasksByDate(date) {
    const tasks = taskList.querySelectorAll('li');
    tasks.forEach((task) => {
        if (task.dataset.date === date) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}