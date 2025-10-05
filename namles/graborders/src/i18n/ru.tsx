import Withdraw from "src/view/pages/withdraw/Withdraw";

const ru = {
  app: {
    title: "Кинотеатр Свет"
  },
  inputs: {
    username: "Имя пользователя",
    password: "Пароль",
    phoneNumber: "Номер телефона",
    withdrawPassword: "Пароль для вывода",
    confirmPassword: "Подтвердите пароль",
    invitationcode: "Код приглашения",
    walletaddress: "Адрес кошелька"   
  },

  buttons: {
    login: "Войти",
    registerNow: "Зарегистрироваться сейчас",
    signup: "Регистрация",
    start: "Начать",
    orders: "Заказы",
    submit: "Отправить",
    backtohome: "Вернуться на главную",
    confirm: "Подтвердить",
    logout: "Выйти",
    getstarted: "Начать",
  },
  text: {
    welcome: "Добро пожаловать",
    discover: "Откройте для себя эксклюзивные предложения специально для вас",
    signin: "Войти",
    haveaccount: "Уже есть аккаунт?",
    noaccount: "Нет аккаунта?",
    showingnow: "Сейчас в прокате",
    comingsoon: "Скоро в кино",
    termsconditions: "Условия и положения",
    todayearning: "Заработок за сегодня",
    accountbalance: "Баланс счета",
    freezebalance: "Замороженный баланс",
    sumbitInformation: "Отправить информацию",
    order: "Заказ",
    pending: "В ожидании",
    completed: "Завершено",
    canceled: "Отменено",
    notransaction: "Транзакций пока нет!",
    createdtime: "Время создания",
    creationtime:"Время создания",

    orderNumber: "Номер заказа",
    orderamount: "Сумма заказа",
    income: "Доход",
    buyerating: "Рейтинг покупателя",
    uid: "UID",
    promotioncode: "Промокод",
    walletamount: "Сумма в кошельке",
    creditassesment: "Кредитная оценка",
    myfinance: "Мои финансы",
    withdraw: "Вывести",
    mydetails: "Мои данные",
    profile: "Профиль",
    wallet: "Кошелек",
    other: "Другое",
    customersupport: "Поддержка клиентов",
    transaction: "Транзакция",
    taskshistory: "История задач",
    security: "Безопасность",
    sponsor: `Наша безопасность - наш главный приоритет, и мы хотим убедиться, что
              вы защищены от любых потенциальных рисков. Имейте в виду, что
              мы никогда не попросим вас отправить деньги на неизвестный адрес. Перед
              совершением платежей, пожалуйста, проверьте детали у нас.`,
  },
  errors: {
    backToHome: "Вернуться на главную",
    403: "Извините, у вас нет доступа к этой странице",
    404: "Извините, страница, которую вы посетили, не существует",
    500: "Извините, сервер сообщает об ошибке",
    429: "Слишком много запросов. Пожалуйста, попробуйте позже.",
    forbidden: {
      message: "Доступ запрещен",
    },
    validation: {
      message: "Произошла ошибка",
    },
    defaultErrorMessage: "Ой, произошла ошибка",
  },

  withdraw: {
    withdrawamount: "Сумма вывода",
    Withdrawpassword: "Пароль для вывода",
    availablebalance: "Доступный баланс",
    rules: "Описание правил",
    rule1: "Минимальная сумма вывода $20",
    rule2: "Платеж будет выполнен в течение 24 часов после запроса на вывод",
    rule3: "Незавершенные ежедневные заказы не подлежат выводу, все товары должны быть отправлены для вывода"
  },
  profile: {
    profile: "Профиль",
    fullname: "Полное имя",
    email: "Электронная почта",
    phonenumber: "Номер телефона",
    country: "Страна",
    Invitationcode: "Код приглашения"
  },
  wallet: {
    wallet: "Кошелек",
    info: "Информация о способе вывода",
    username: "Имя пользователя",
    walletname: "Название кошелька",
    walletaddress: "Адрес кошелька",
    note: "Примечание",
    notedesctiption: "Пожалуйста, будьте осторожны при заполнении этой информации."
  },

  cs: {
    cs: "Служба поддержки",
    note: "Если у вас есть вопросы или возникли проблемы, напишите нам на почту или свяжитесь с нашей онлайн-службой поддержки.",
    contactnow: "Связаться сейчас"
  },
  transaction: {
    transaction: "Транзакция",
    all: "Все",
    withdraw: "Вывод",
    dposit: "Депозит",
    notransaction: "Транзакций пока нет!"
  },
  order: {
    order: "Заказ",
    completed: "Завершено",
    pending: "В ожидании",
    canceled: "Отменено",
    ordertime: "Время заказа",
    ordernumber: "Номер заказа",
    total: "Общая сумма заказа",
    commission: "Комиссия",
    return: "Ожидаемая прибыль"
  },

  security: {
    changepassword: "Сменить пароль",
    oldpassword: "Старый пароль",
    newpassword: "Новый пароль",
    confirmpassword: "Подтвердите пароль",
    note: "Примечание",
    notedesc: "Пожалуйста, внимательно заполните эту информацию"
  },

  auth: {
    tenants: "Рабочие пространства",
    singindesc: "Введите ваш email и пароль для входа",
    signupdesc: "Введите ваш email и пароль для регистрации",
    profile: {
      title: "Профиль",
      success: "Профиль успешно обновлен",
      vip: "Поздравляем с подпиской",
    },
    createAnAccount: "Создать аккаунт",
    rememberMe: "Запомнить меня",
    forgotPassword: "Забыли пароль?",
    signin: "Войти",
    signup: "Регистрация",
    signout: "Выйти",
    alreadyHaveAnAccount: "Уже есть аккаунт? Войти.",
    social: {
      errors: {
        "auth-invalid-provider":
          "Этот email уже зарегистрирован у другого провайдера.",
        "auth-no-email": "Email, связанный с этой учетной записью, скрыт или не существует.",
      },
    },
    signinWithAnotherAccount: "Войти с другой учетной записью",
    emailUnverified: {
      message: `Пожалуйста, подтвердите вашу почту на <strong>{0}</strong>, чтобы продолжить.`,
      submit: "Отправить повторное подтверждение",
    },
    emptyPermissions: {
      message: "У вас пока нет разрешений. Дождитесь их предоставления администратором.",
    },
    passwordResetEmail: {
      message: "Отправить письмо для сброса пароля",
      error: "Email не распознан",
    },
    passwordReset: {
      message: "Сбросить пароль",
    },
    passwordChange: {
      title: "Смена пароля",
      success: "Пароль успешно изменен",
      mustMatch: "Пароли должны совпадать",
    },
    emailAddressVerificationEmail: {
      error: "Email не распознан",
    },
    verificationEmailSuccess: "Письмо для подтверждения успешно отправлено",
    passwordResetEmailSuccess: "Письмо для сброса пароля успешно отправлено",
    passwordResetSuccess: "Пароль успешно изменен",
    verifyEmail: {
      success: "Email успешно подтвержден.",
      message: "Подождите немного, ваш email проверяется...",
    },
  },

  tabbarmenue: {
    home: "Главная",
    rate: "Оценить",
    profile: "Профиль"
  },

  validation: {
    mixed: {
      default: "${path} недопустимо",
      required: "${path} обязательно для заполнения",
      oneOf: "${path} должно быть одним из следующих значений: ${values}",
      notOneOf: "${path} не должно быть одним из следующих значений: ${values}",
      notType: ({ path, type, value, originalValue }) => {
        return `${path} должно быть типа ${type}`;
      },
    },
    string: {
      length: "${path} должно содержать ровно ${length} символов",
      min: "${path} должно содержать минимум ${min} символов",
      max: "${path} должно содержать максимум ${max} символов",
      matches: '${path} должно соответствовать следующему шаблону: "${regex}"',
      email: "${path} должно быть действительным адресом электронной почты",
      url: "${path} должен быть действительным URL",
      trim: "${path} должно быть строкой без пробелов в начале и конце",
      lowercase: "${path} должно быть строкой в нижнем регистре",
      uppercase: "${path} должно быть строкой в верхнем регистре",
      selected: "${path} должно быть выбрано",
    },
    number: {
      min: "${path} должно быть больше или равно ${min}",
      max: "${path} должно быть меньше или равно ${max}",
      lessThan: "${path} должно быть меньше ${less}",
      moreThan: "${path} должно быть больше ${more}",
      notEqual: "${path} не должно быть равно ${notEqual}",
      positive: "${path} должно быть положительным числом",
      negative: "${path} должно быть отрицательным числом",
      integer: "${path} должно быть целым числом",
    },
    date: {
      min: "${path} должно быть позже ${min}",
      max: "${path} должно быть раньше ${max}",
    },
    boolean: {},
    object: {
      noUnknown:
        "${path} не должно содержать неизвестные ключи, не указанные в объекте",
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} обязательно для заполнения`
          : `${path} должно содержать не менее ${min} элементов`,
      max: "${path} должно содержать не более ${max} элементов",
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: "Загрузить",
    image: "Вы должны загрузить изображение",
    size: "Файл слишком большой. Максимально допустимый размер: {0}",
    formats: `Недопустимый формат. Должен быть одним из: {0}.`,
  },

};

export default ru;
