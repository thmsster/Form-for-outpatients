// Класс для хранения информации о посетителе
class Visitor {
    constructor(id, fullName, address, phone, lastVisit, doctor) {
        this.id = id;
        this.fullName = fullName;
        this.address = address;
        this.phone = phone;
        this.lastVisit = lastVisit;
        this.doctor = doctor;
    }

    // Проверка, был ли визит в последние 30 дней
    isRecent() {
        const today = new Date();
        const visitDate = new Date(this.lastVisit);
        const diffDays = Math.ceil((today - visitDate) / (1000 * 60 * 60 * 24));
        return diffDays <= 30;
    }
}

// Класс для управления коллекцией посетителей
class ClinicRegistry {
    constructor() {
        this.visitors = new Map();
        this.nextId = 1;
    }

    // Добавление посетителя
    add(fullName, address, phone, lastVisit, doctor) {
        const visitor = new Visitor(this.nextId++, fullName, address, phone, lastVisit, doctor);
        this.visitors.set(visitor.id, visitor);
        return visitor;
    }

    // Получение всех посетителей
    getAll() {
        return Array.from(this.visitors.values());
    }

    // Получение посетителя по ID
    get(id) {
        return this.visitors.get(Number(id));
    }

    // Удаление посетителя по ID
    delete(id) {
        return this.visitors.delete(Number(id));
    }

    // Получение уникальных врачей
    getUniqueDoctors() {
        const doctors = new Set();
        this.visitors.forEach(visitor => doctors.add(visitor.doctor));
        return Array.from(doctors);
    }
}

// Инициализация
const registry = new ClinicRegistry();

// Получение ссылки на DOM-элементы
const outputDiv = document.getElementById('output');
const idSelector = document.getElementById('idSelector');

// Обновление выпадающего списка ID
function updateIdSelector() {
    idSelector.innerHTML = '<option value="">-- Выберите ID --</option>';
    
    registry.getAll().forEach(visitor => {
        const option = document.createElement('option');
        option.value = visitor.id;
        option.textContent = `${visitor.id}: ${visitor.fullName}`;
        idSelector.appendChild(option);
    });
}

// Отображение всех посетителей
function showAllVisitors() {
    const visitors = registry.getAll().map(visitor => ({
        ...visitor,
        isRecent: visitor.isRecent()
    }));
    
    outputDiv.innerHTML = tableTemplate({
        visitors: visitors,
        uniqueDoctors: registry.getUniqueDoctors()
    });
}

// Очистка формы
function clearForm() {
    document.getElementById('fullName').value = '';
    document.getElementById('address').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('lastVisit').value = '';
    document.getElementById('doctor').value = '';
}

// Обработчики кнопок
document.getElementById('addBtn').addEventListener('click', () => {
    const fullName = document.getElementById('fullName').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const lastVisit = document.getElementById('lastVisit').value;
    const doctor = document.getElementById('doctor').value;
    
    if (fullName && address && phone && lastVisit && doctor) {
        registry.add(fullName, address, phone, lastVisit, doctor);
        updateIdSelector();
        showAllVisitors();
        clearForm();
    } else {
        alert('Пожалуйста, заполните все поля!');
    }
});

document.getElementById('clearBtn').addEventListener('click', clearForm);

document.getElementById('deleteBtn').addEventListener('click', () => {
    const selectedId = idSelector.value;
    if (selectedId && confirm(`Удалить запись с ID ${selectedId}?`)) {
        registry.delete(selectedId);
        updateIdSelector();
        showAllVisitors();
    } else if (!selectedId) {
        alert('Выберите ID для удаления!');
    }
});

document.getElementById('showAllBtn').addEventListener('click', showAllVisitors);

document.getElementById('showByIdBtn').addEventListener('click', () => {
    const selectedId = idSelector.value;
    if (selectedId) {
        const visitor = registry.get(selectedId);
        outputDiv.innerHTML = cardTemplate({
            visitor: visitor ? {...visitor, isRecent: visitor.isRecent()} : null
        });
    } else {
        alert('Выберите ID для просмотра!');
    }
});

// Данные по умолчанию
setTimeout(() => {
    registry.add('Иванов Иван Петрович', 'ул. Ленина, 10', '+375(29)456-78-90', '2024-01-15', 'Терапевт');
    registry.add('Петрова Анна Сергеевна', 'пр. Мира, 25', '+375(29)654-32-10', '2024-02-20', 'Кардиолог');
    registry.add('Сидоров Петр Иванович', 'ул. Гагарина, 5', '+375(29)123-45-67', '2024-01-10', 'Хирург');
    registry.add('Козлова Елена Владимировна', 'ул. Пушкина, 15', '+375(29)888-99-00', '2024-02-01', 'Невролог');
    updateIdSelector();
    showAllVisitors();
}, 100);