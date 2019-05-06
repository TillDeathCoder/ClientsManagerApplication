export const environment = {
    production: true,
    databaseConfiguration: {
        type: 'sqlite',
        database: 'c://clients_manager_database',
        logging: false,
    },
    clients: {
        ACTIVE_STATUS: 'ACTIVE'
    },
    operationTypes: {
        SIMPLE_EYELASH_EXTENSION_TYPE_ID: 1,
        EYELASH_REMOVAL_TYPE_ID: 2,
        COMBO_TYPE_ID: 3
    },
    operations: {
        DEFAULT_START: '10:00',
        DEFAULT_FINISH: '12:00',
        DEFAULT_PRICE: 25,
        OPEN_STATUS: 'OPEN',
        CLOSED_STATUS: 'CLOSED',
        CANCELLED_STATUS: 'CANCELED'
    },
    calendar: {
        colors: {
            SIMPLE_EYELASH_EXTENSION_TYPE_COLOR: '#ffab82',
            EYELASH_REMOVAL_TYPE_COLOR: '#84ff78',
            COMBO_TYPE_COLOR: '#8298ff',
            DEFAULT_COLOR: '#ff62ee'
        },
        configuration: {
            header: {
                left: 'createEventButton today prev,next',
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
            customButtons: {
                createEventButton: {
                    text: 'Добавить запись',
                    click(element: JQuery): void {
                    }
                }
            },
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
