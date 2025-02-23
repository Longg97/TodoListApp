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
}

// Thêm sự kiện click cho nút "Thêm"
addTaskBtn.addEventListener('click', addTask);

// Thêm sự kiện Enter để thêm công việc
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});