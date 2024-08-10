const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let memos = {};

function generateCalendar(month, year) {
    const daysContainer = document.getElementById('days');
    daysContainer.innerHTML = '';
    const monthYear = document.getElementById('month-year');
    monthYear.innerHTML = `${monthNames[month]} ${year}`;
    
    const firstDay = new Date(year, month, 1).getDay(); // 달의 첫 번째 날짜를 기반으로 요일을 계산
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 현재 달의 일수를 계산

    // 첫째 날 이전의 빈 칸 채우기
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('empty');
        daysContainer.appendChild(emptyCell);
    }
    
    // 각 날짜 칸 채우기
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.innerHTML = day;
        dayCell.onclick = () => openPopup(day, month, year);
        daysContainer.appendChild(dayCell);
        
        // 메모가 있는 날짜에 표시
        if (memos[`${year}-${month + 1}-${day}`]) { // month + 1로 저장된 메모 확인
            const memoDot = document.createElement('span');
            memoDot.style.color = 'red';
            memoDot.innerHTML = '•';
            dayCell.appendChild(memoDot);
        }
    }
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
}

document.addEventListener('DOMContentLoaded', () => {
    generateCalendar(currentMonth, currentYear);
});

function openPopup(day, month, year) {
    const popup = document.getElementById('memoPopup');
    popup.style.display = 'block';
    popup.setAttribute('data-date', `${year}-${month + 1}-${day}`); // month + 1로 조정
}

function closePopup() {
    const popup = document.getElementById('memoPopup');
    popup.style.display = 'none';
}

function saveMemo() {
    const popup = document.getElementById('memoPopup');
    const date = popup.getAttribute('data-date');
    const memoText = document.getElementById('memoText').value;
    
    if (memoText) {
        memos[date] = memoText;
    } else {
        delete memos[date];
    }

    closePopup();
    generateCalendar(currentMonth, currentYear);
}

function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value.trim();
    
    if (todoText) {
        const todoItems = document.getElementById('todoItems');
        const todoItem = document.createElement('li');
        
        const todoTextSpan = document.createElement('span');
        todoTextSpan.appendChild(document.createTextNode(todoText));
        
        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('todo-actions');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.onclick = () => toggleComplete(todoItem);
        
        const deleteSpan = document.createElement('span');
        deleteSpan.classList.add('delete');
        deleteSpan.innerHTML = '&times;';
        deleteSpan.onclick = () => deleteTodo(deleteSpan);

        actionsDiv.appendChild(checkbox);
        actionsDiv.appendChild(deleteSpan);

        todoItem.appendChild(todoTextSpan);
        todoItem.appendChild(actionsDiv);
        
        todoItems.appendChild(todoItem);
        todoInput.value = '';
    }
}

function deleteTodo(element) {
    const todoItem = element.parentElement.parentElement;
    todoItem.remove();
}

function toggleComplete(todoItem) {
    todoItem.classList.toggle('completed');
}
