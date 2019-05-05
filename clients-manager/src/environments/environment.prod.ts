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
  operations: {
    DEFAULT_START: '10:00',
    DEFAULT_FINISH: '12:00',
    DEFAULT_PRICE: 25,
    OPEN_STATUS: 'OPEN',
    CLOSED_STATUS: 'CLOSED',
    CANCELLED_STATUS: 'CANCELED'
  },
  calendar: {
    SIMPLE_EYELASH_EXTENSION_TYPE_COLOR: '#ffab82',
    EYELASH_REMOVAL_TYPE_COLOR: '#84ff78',
    COMBO_TYPE_COLOR: '#8298ff',
    DEFAULT_COLOR: '#ff62ee'
  },
  operationTypes: {
    SIMPLE_EYELASH_EXTENSION_TYPE_ID: 1,
    EYELASH_REMOVAL_TYPE_ID: 2,
    COMBO_TYPE_ID: 3
  },
  formats: {
    PHONE_NUMBER_FORMAT: '(^\\+375(25|29|44|33)\\d{7}$)|(^80(25|29|44|33)\\d{7}$)',
    DATE_FORMAT: 'YYYY-MM-DD'
  }
};
