// وظيفة التنقل بين الصفحات
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// --- 1. مشروع قائمة المهام ---
let tasks = [];
function addTask() {
    let input = document.getElementById('taskInput');
    if (input.value.trim() === "") return;
    tasks.push(input.value);
    input.value = '';
    renderTasks();
}
function renderTasks() {
    let list = document.getElementById('taskList');
    list.innerHTML = tasks.map((t, i) => `<li>${t} <button onclick="removeTask(${i})" style="background:#ef4444; color:#fff; padding:2px 8px;">حذف</button></li>`).join('');
}
function removeTask(i) {
    tasks.splice(i, 1);
    renderTasks();
}

// --- 2. مشروع الألوان ---
function generatePalette() {
    let container = document.getElementById('palette');
    container.innerHTML = '';
    for(let i=0; i<5; i++) {
        let color = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        let box = document.createElement('div');
        box.className = 'color-box';
        box.style.backgroundColor = color;
        box.innerText = color.toUpperCase();
        container.appendChild(box);
    }
}

// --- 3. مشروع الجدول التفاعلي (التعديل الجديد) ---
let tableData = [];

function addRow() {
    let name = document.getElementById('userName').value;
    let job = document.getElementById('userJob').value;
    let status = document.getElementById('userStatus').value;

    if (name === "" || job === "" || status === "") {
        alert("برجاء إدخال كافة البيانات");
        return;
    }

    // إضافة صف جديد للمصفوفة
    tableData.push([tableData.length + 1, name, job, status]);

    // مسح الخانات بعد الإضافة
    document.getElementById('userName').value = "";
    document.getElementById('userJob').value = "";
    document.getElementById('userStatus').value = "";

    renderTable();
}

function renderTable() {
    let wrapper = document.getElementById('tableContent');
    if (tableData.length === 0) {
        wrapper.innerHTML = "<p>لا توجد بيانات حالياً.</p>";
        return;
    }

    let html = `<table>
        <thead>
            <tr>
                <th>ID</th>
                <th>الاسم</th>
                <th>الوظيفة</th>
                <th>الحالة</th>
            </tr>
        </thead>
        <tbody>`;
    
    tableData.forEach(row => {
        html += `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`;
    });

    html += `</tbody></table>`;
    wrapper.innerHTML = html;
}

// تشغيل بعض الوظائف عند فتح الصفحة
window.onload = () => {
    generatePalette();
    renderTable();
};

