export const environment = {
    production: false,
    databaseConfiguration: {
        type: 'sqlite',
        databaseName: 'clients_manager_database_dev.db',
        logging: false,
    },
    clients: {
        ACTIVE_STATUS: 'ACTIVE',
        BANNED_STATUS: 'BANNED'
    },
    operations: {
        DEFAULT_START: '10:00',
        DEFAULT_FINISH: '12:00',
        DEFAULT_PRICE: 25,
        OPEN_STATUS: 'OPEN',
        CLOSED_STATUS: 'CLOSED',
        CANCELLED_STATUS: 'CANCELED',
        ALL_STATUS: 'ALL'
    },
    calendar: {
        colors: {
            CLOSED_COLOR: '#c5ffdd',
            OPEN_COLOR: '#d5ff97',
            CANCELLED_COLOR: '#ffdcac',
            DEFAULT_COLOR: '#e4c5ff'
        },
        titleLogos: {
            CLOSED_LOGO: '<i class="far fa-check-circle"></i> ',
            OPEN_LOGO: '<i class="fas fa-spinner"></i> ',
            CANCELLED_LOGO: '<i class="fas fa-ban"></i> '
        },
        configuration: {
            header: {
                left: 'today prev,next',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            themeSystem: 'jquery-ui',
            themeButtonIcons: true,
            monthNames:
                ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesShort:
                ['Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сент.', 'Окт.', 'Ноя.', 'Дек.'],
            dayNames:
                ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            dayNamesShort:
                ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            allDayText: 'Время',
            buttonText: {
                today: 'Сегодня',
                month: 'Месяц',
                week: 'Неделя',
                day: 'День'
            },
            locale: 'ru',
            editable: true,
            eventLimit: false,
            events: [],
            timeFormat: 'HH:mm'
        }
    },
    formats: {
        PHONE_NUMBER_FORMAT: '(^\\+375(25|29|44|33)\\d{7}$)|(^80(25|29|44|33)\\d{7}$)',
        DATE_FORMAT: 'YYYY-MM-DD'
    },
    messages: {
        errors: {
            GET_ALL__OPERATION_TYPES_COMPONENT: 'Ошибка при загрузке данных для компонента. Тип: Виды услуг.',
            GET_ALL__OPERATIONS_COMPONENT: 'Ошибка при загрузке данных для компонента. Тип: Запись.',
            GET_ALL_CLIENTS_COMPONENT: 'Ошибка при загрузке данных для компонента. Тип: Клиент.',
            DATE_TIME_RANGE_VALIDATION: 'Ошибка во время валидации временного периода.',
            CREATE_CLIENT_COMPONENT: 'Ошибка при создании клиента в компоненте.',
            GET_OPERATION_COMPONENT: 'Ошибка при открытии записи в компоненте.',
            EDIT_OPERATION_COMPONENT: 'Ошибка при создании/редактировании записи в компоненте.',
            DATABASE_FIND_ERROR: 'Ошибка в базе при чтении данных.',
            DATABASE_EDIT_ERROR: 'Ошибка в базе при редактировании данных.',
            DATABASE_SAVE_ERROR: 'Ошибка в базе при сохранении данных.'
        }
    }
};
