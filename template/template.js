// Для форматирования даты
Handlebars.registerHelper('formatDate', function(dateString) {
    if (!dateString) return 'Не указана';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
});

// Шаблон для таблицы всех посетителей
const tableTemplate = Handlebars.compile(`
    {{#if visitors.length}}
        <table class="visitor-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>ФИО пациента</th>
                    <th>Врач</th>
                    <th>Дата посещения</th>
                </tr>
            </thead>
            <tbody>
                {{#each visitors}}
                <tr>
                    <td><strong>{{id}}</strong></td>
                    <td>{{fullName}}</td>
                    <td>{{doctor}}</td>
                    <td>{{formatDate lastVisit}}</td>
                </tr>
                {{/each}}
            </tbody>
        </table>
        
        <div class="doctor-list">
            <h4>Список врачей:</h4>
            <ol>
                {{#each uniqueDoctors}}
                <li>{{this}}</li>
                {{/each}}
            </ol>
        </div>
    {{else}}
        <p style="text-align: center; padding: 30px;">Нет данных о посетителях</p>
    {{/if}}
`);

// Шаблон для карточки посетителя
const cardTemplate = Handlebars.compile(`
    {{#if visitor}}
    <div class="visitor-card">
        <h3>👤 Карточка пациента #{{visitor.id}}</h3>
        <p><strong>ФИО:</strong> {{visitor.fullName}}<br>
        <strong>Адрес:</strong> {{visitor.address}}<br>
        <strong>Телефон:</strong> {{visitor.phone}}<br>
        <strong>Врач:</strong> {{visitor.doctor}}<br>
        <strong>Последний визит:</strong> {{formatDate visitor.lastVisit}}</p>
        
        {{#if visitor.isRecent}}
            <p style="color: #27ae60; font-weight: bold;">✅ Пациент посещал клинику недавно</p>
        {{else}}
            <p style="color: #e67e22; font-weight: bold;">⚠️ Пациент давно не посещал клинику</p>
        {{/if}}
    </div>
    {{else}}
        <div class="visitor-card">
            <p style="text-align: center;">Посетитель с указанным ID не найден</p>
        </div>
    {{/if}}
`);