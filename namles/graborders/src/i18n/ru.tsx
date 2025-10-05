import Withdraw from "src/view/pages/withdraw/Withdraw";

const ru = {
  app: {
    title: "Nowspeed"
  },




  pages: {
    home: {
      levels: "VIP Уровни",
      chooseLevel: "Выберите свой уровень, чтобы максимизировать доход",
      welcome: "Добро пожаловать",
      announcement: "Уважаемые пользователи, платформа Nowspeed вернулась к лучшему и нормальному состоянию, продолжайте зарабатывать как можно больше с платформы",

      // Action Buttons
      services: "Сервисы",
      events: "События",
      about: "О нас",
      terms: "Условия",
      certificate: "Сертификат",
      faqs: "ЧаВО",

      // VIP Level Cards
      currentLevel: "Текущий",
      upgrade: "Обновить",
      profitNormal: "прибыль с обычных продуктов",
      profitPremium: "прибыль с премиум продуктов",
      maxOrders: "Макс. заказов в день",

      // Modal
      modal: {
        levelDetails: "Детали Уровня",
        levelLimit: "Лимит Уровня",
        dailyOrders: "Ежедневные Заказы",
        commissionRate: "Ставка Комиссии",
        cancel: "Отмена",
        upgradeNow: "Обновить Сейчас"
      }
    },
    tabBottomNavigator: {
      home: "Главная",
      grap: "Захват",
      records: "Записи",
      starting: "Старт"
    } ,
    transaction: {
      title: "История Транзакций",
      filters: {
        all: "Все",
        withdraw: "Вывод",
        deposit: "Пополнение"
      },
      recentTransactions: "Недавние Транзакции",
      transactionCount: "{0} транзакций",
      types: {
        deposit: "Пополнение",
        withdrawal: "Вывод"
      },
      status: {
        completed: "Завершено",
        processing: "В обработке",
        canceled: "Отменено"
      },
      amount: {
        deposit: "+${0}",
        withdraw: "-${0}",
        canceled: "${0}"
      }
    },

    profile: {
      title: "Профиль",
      invitationCode: "Код Приглашения",
      creditScore: "Кредитный Рейтинг",
      balance: "Баланс",
      todayProfit: "Сегодняшняя Прибыль",
      frozenAmount: "Замороженная Сумма",
      usd: "USD",

      // Menu Sections
      myFinancial: "Мои Финансы",
      myDetails: "Мои Данные",
      other: "Другое",

      // Financial Items
      recharge: "Пополнить",
      withdraw: "Вывести",

      // Details Items
      contactUs: "Связаться с нами",
      profile: "Профиль",
      updateWithdrawal: "Обновить данные вывода",

      // Other Items
      transaction: "Транзакция",
      tasksHistory: "История Задач",
      security: "Безопасность",
      notifications: "Уведомления",
      languages: "Языки",

      // Buttons
      logout: "Выйти",
      confirm: "Подтвердить",
      copied: "Скопировано",

      // Modals
      rechargeModal: {
        title: "Пополнение",
        text: "Пожалуйста, свяжитесь со службой поддержки для пополнения"
      },
      withdrawModal: {
        title: "Вывод",
        text: "Пожалуйста, свяжитесь со службой поддержки для продолжения вывода."
      }
    },

    team: {
      title: "Профиль",
      personalInformation: "Личная Информация",
      accountDetails: "Ваши данные аккаунта и личная информация",

      // Info Items
      fullName: "Полное Имя",
      email: "Электронная почта",
      phoneNumber: "Номер Телефона",
      country: "Страна",
      gender: "Пол",
      invitationCode: "Код Приглашения",

      // Gender Values
      genderNotSpecified: "Не указано",

      // Placeholders
      notAvailable: "—"
    },

    language: {
      title: "Язык Приложения",
      selectLanguage: "Выбрать Язык",
      choosePreferred: "Выберите предпочитаемый язык",
      searchPlaceholder: "Поиск языков...",
      currentLanguage: "Текущий Язык",

      // Language names (if needed for dynamic content)
      languages: {
        english: "Английский",
        french: "Французский",
        russian: "Русский",
        german: "Немецкий",
        spanish: "Испанский"
      },
      nativeNames: {
        english: "English",
        french: "Français",
        russian: "Русский",
        german: "Deutsch",
        spanish: "Español"
      }
    },

    online: {
      title: "Служба Поддержки",
      description: "Если у вас есть вопросы или возникли проблемы, пожалуйста, напишите нам или пообщайтесь с нашей онлайн-службой поддержки.",
      contactWhatsApp: "Связаться в WhatsApp",
      contactTelegram: "Связаться в Telegram"
    },

    notifications: {
      title: "Уведомления",
      filters: {
        all: "Все",
        deposit: "Пополнение",
        withdraw: "Вывод"
      },
      unreadCount: "{0} непрочитанных",
      emptyState: {
        title: "Уведомления не найдены",
        description: "У вас пока нет {0} уведомлений."
      },

      // Notification Types
      types: {
        deposit_success: "Пополнение Успешно",
        deposit_canceled: "Пополнение Отменено",
        withdraw_success: "Вывод Успешен",
        withdraw_canceled: "Вывод Отменен",
        system: "Системное Уведомление",
        alert: "Важное Оповещение",
        default: "Уведомление"
      },

      // Notification Messages
      messages: {
        deposit_success: "Ваше пополнение на ${0} успешно завершено.",
        deposit_canceled: "Ваш запрос на пополнение ${0} отменен.",
        withdraw_success: "Ваш вывод ${0} успешно завершен.",
        withdraw_canceled: "Ваш запрос на вывод ${0} отменен.",
        system: "Системное уведомление",
        alert: "Важное оповещение",
        default: "Обновление уведомления"
      },

      // Status
      status: {
        unread: "непрочитано",
        read: "прочитано"
      }
    },

    portfolio: {
      // Status Tabs
      completed: "Завершены",
      pending: "В Ожидании",
      canceled: "Отменены",

      // Order Information
      orderTime: "Время Заказа",
      orderNumber: "Номер Заказа",
      totalOrderAmount: "Общая сумма заказа",
      commission: "Комиссия",
      estimatedReturn: "Ожидаемый доход",

      // Product Details
      quantity: "X 1",
      currency: "USD",

      // Status Labels
      status: {
        completed: "Завершен",
        pending: "В Ожидании",
        canceled: "Отменен"
      }
    },

    changePassword: {
      title: "Сменить Пароль",
      header: "Сменить Пароль",
      oldPassword: "Старый Пароль",
      newPassword: "Новый Пароль",
      confirmPassword: "Подтвердить Пароль",
      submit: "Отправить",
      note: "Пожалуйста, внимательно заполните эту информацию",
      requiredField: "*"
    },

    withdraw: {
      title: "Вывод",
      withdrawAmount: "Сумма Вывода",
      withdrawPassword: "Пароль Вывода",
      availableBalance: "Доступный баланс",
      confirm: "Подтвердить",
      rulesDescription: "Описание Правил",
      rules: {
        minimum: "(1) Минимальный вывод составляет 100 USD",
        paymentTime: "(2) Платеж будет произведен в течение следующего часа после одобрения заявки на вывод.",
        orderCompletion: "(3) Неполное выполнение ежедневных заказов приводит к отсутствию вывода, все продукты должны быть отправлены для вывода"
      }
    },

    wallet: {
      title: "Кошелек",
      withdrawalMethod: "Информация о методе вывода",
      username: "Имя Пользователя",
      walletName: "Название Кошелька",
      choosePreferredCoin: "Выберите предпочтительную монету",
      walletAddress: "Адрес Кошелька",
      withdrawPassword: "Пароль Вывода",
      submit: "Отправить",
      note: "Пожалуйста, будьте внимательны при заполнении этой информации",
      requiredField: "*"
    },

    grab: {
      // Header Section
      greeting: "Привет {0} 👏",

      // Stats Cards
      totalAmount: "Общая Сумма",
      profitsAdded: "Прибыль будет добавлена сюда",
      todaysCommission: "Сегодняшняя Комиссия",
      commissionEarned: "Заработанная Комиссия",
      currency: "USD",

      // Optimization Section
      startOptimization: "Начать Оптимизацию",
      progressCount: "{0}/{1}",

      // Game Section
      commissionRate: "Ставка Комиссии",
      exclusiveChannel: "Эксклюзивный канал для эксклюзивных участников",
      startButton: "Начать",
      processing: "Обработка...",

      // Notice Section
      notice: "Уведомление",
      supportHours: "Время работы поддержки 10:00 - 22:00",
      contactSupport: "Пожалуйста, свяжитесь с онлайн-поддержкой для получения помощи!"
    },

    grapModal: {
      orderTime: "Время Заказа",
      orderNumber: "Номер Заказа",
      totalOrderAmount: "Общая сумма заказа",
      commission: "Комиссия",
      estimatedReturn: "Ожидаемый доход",
      cancel: "Отмена",
      submit: "Отправить",
      quantity: "X 1",
      currency: "USD"
    },

    actions: {
      event: "События",
      tc: "Условия и Положения",
      certificate: "Сертификат",
      faq: "Часто Задаваемые Вопросы",
      company: "Компания"
    },

    auth: {
      signin: {
        welcomeBack: "С возвращением!",
        signinToAccount: "Войдите в свой маркетинговый аккаунт",
        signinButton: "Войти",
        noAccount: "Нет аккаунта?",
        signupHere: "Зарегистрируйтесь здесь."
      },
      signup: {
        createAccount: "Создать Аккаунт",
        signupForAccount: "Зарегистрируйтесь для маркетингового аккаунта",
        signupButton: "Зарегистрироваться",
        alreadyHaveAccount: "Уже есть аккаунт?",
        phonePlaceholder: "Введите ваш номер телефона",
        searchCountries: "Поиск стран..."
      }
    },

    csPage: {
      customerSupport: "Служба Поддержки",
      hereToHelp: "Мы здесь, чтобы помочь вам!",
      howCanWeHelp: "Как мы можем помочь вам сегодня?",
      platformNames: {
        whatsapp: "WhatsApp",

        telegram: "Telegram"
      }
    },
  },




  entities: {
    record: {
      menu: "Записи",
      fields: {
        user: "пользователь",
        product: "продукт",
        number: "номер записи",
        status: "статус",
      },
      list: {
        title: "Список записей",
      },
      view: {
        title: "Детали записи",
      },
      edit: {
        title: "Редактировать запись",
      },
      create: {
        success: "Продукт успешно отправлен.",
      },
      update: {
        success: "Продукт успешно отправлен.",
      },
      destroy: {
        success: "Запись успешно удалена",
      },
      destroyAll: {
        success: "Запись успешно удалена",
      },
      enumerators: {
        status: {
          pending: "В ожидании",
          completed: "Завершено",
          canceled: "Отменено",
        },
      },
    },

    category: {
      name: "категория",
      label: "Категории",
      menu: "Категории",
      exporterFileName: "категория_экспорт",
      list: {
        menu: "Категории",
        title: "Категории",
      },
      create: {
        success: "Категория успешно сохранена",
      },
      update: {
        success: "Категория успешно сохранена",
      },
      destroy: {
        success: "Категория успешно удалена",
      },
      destroyAll: {
        success: "Категория(и) успешно удалены",
      },
      edit: {
        title: "Редактировать категорию",
      },
      fields: {
        id: "Id",
        name: "Название",
        slug: "Слаг",
        photo: "Фото",
        metaKeywords: "Мета-ключевые слова",
        metaDescriptions: "Мета-описания",
        status: "Статус",
        isFeature: "Рекомендуемая",
        serialRange: "Серийный номер",
        serial: "Серийный номер",
        createdAt: "Создано в",
        updatedAt: "Обновлено в",
        createdAtRange: "Создано в",
      },
      enumerators: {
        status: {
          enable: "Включено",
          disable: "Выключено",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Новая категория",
      },
      view: {
        title: "Просмотр категории",
      },
      importer: {
        title: "Импорт категорий",
        fileName: "шаблон_импорта_категорий",
        hint: "Столбцы Файлы/Изображения должны содержать URL-адреса файлов, разделенные пробелом.",
      },
    },

    product: {
      name: "продукт",
      label: "Продукты",
      menu: "Продукты",
      exporterFileName: "продукт_экспорт",
      list: {
        menu: "Продукты",
        title: "Продукты",
      },
      create: {
        success: "Продукт успешно сохранен",
      },
      update: {
        success: "Продукт успешно сохранен",
      },
      destroy: {
        success: "Продукт успешно удален",
      },
      destroyAll: {
        success: "Продукт(ы) успешно удалены",
      },
      edit: {
        title: "Редактировать продукт",
      },
      fields: {
        id: "Id",
        name: "Название",
        slug: "Слаг",
        tags: "Теги",
        video: "Видео",
        specificationName: "Название характеристики",
        specificationDesciption: "Описание характеристики",
        isSpecification: "Является характеристикой",
        details: "Детали",
        photo: "Фото",
        discountPriceRange: "Цена со скидкой",
        discountPrice: "Текущая цена",
        previousPriceRange: "Предыдущая цена",
        previousPrice: "Предыдущая цена",
        stockRange: "Запас",
        stock: "Запас",
        metaKeywords: "Мета-ключевые слова",
        metaDesctiption: "Краткое описание",
        status: "Статус",
        isType: "Тип",
        dateRange: "Дата",
        date: "Дата",
        itemType: "Тип товара",
        file: "Файл",
        link: "Ссылка",
        fileType: "Тип файла",
        taxe: "Налог",
        category: "Категория",
        subcategory: "Подкатегория",
        childcategory: "Дочерняя категория",
        brand: "Бренд",
        gallery: "Галерея",
        createdAt: "Создано в",
        updatedAt: "Обновлено в",
        createdAtRange: "Создано в",
      },
      enumerators: {
        status: {
          enable: "Включено",
          disable: "Выключено",
        },
        itemType: {
          physical: "Физический",
          digitale: "Цифровой",
        },
        fileType: {
          file: "Файл",
          link: "Ссылка",
        },
        isType: {
          new_arrival: "Новое поступление",
          feature_product: "Рекомендуемый товар",
          top_pdroduct: "Топ товар",
          best_product: "Лучший товар",
          flash_deal_product: "Товар по акции",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Новый продукт",
      },
      view: {
        title: "Просмотр продукта",
      },
      importer: {
        title: "Импорт продуктов",
        fileName: "шаблон_импорта_продуктов",
        hint: "Столбцы Файлы/Изображения должны содержать URL-адреса файлов, разделенные пробелом.",
      },
    },
    transaction: {
      name: "транзакция",
      label: "Транзакции",
      menu: "Транзакции",
      exporterFileName: "транзакция_экспорт",
      list: {
        menu: "Транзакции",
        title: "Транзакции",
      },
      create: {
        success: "Транзакция успешно отправлена",
      },
      update: {
        success: "Транзакция успешно сохранена",
      },
      destroy: {
        success: "Транзакция успешно удалена",
      },
      destroyAll: {
        success: "Транзакция(и) успешно удалены",
      },
      edit: {
        title: "Редактировать транзакцию",
      },
      fields: {
        id: "Id",
        amountRange: "Сумма",
        amount: "Сумма",
        email: "Email",
        tax: "Налог",
        currencySign: "Знак валюты",
        currencyValue: "Значение валюты",
        orderId: "ID заказа",
        createdAt: "Создано в",
        updatedAt: "Обновлено в",
        createdAtRange: "Создано в",
      },
      enumerators: {
        status: {
          pending: "В ожидании",
          completed: "Успешно",
          canceled: "Отменено",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Новая транзакция",
      },
      view: {
        title: "Просмотр транзакции",
      },
      importer: {
        title: "Импорт транзакций",
        fileName: "шаблон_импорта_транзакций",
        hint: "Столбцы Файлы/Изображения должны содержать URL-адреса файлов, разделенные пробелом.",
      },
    },


    order: {
      name: "заказ",
      label: "Заказы",
      menu: "Заказы",
      exporterFileName: "заказ_экспорт",
      list: {
        menu: "Заказы",
        title: "Заказы",
      },
      create: {
        success: "Заказ успешно сохранен",
      },
      update: {
        success: "Заказ успешно сохранен",
      },
      destroy: {
        success: "Заказ успешно удален",
      },
      destroyAll: {
        success: "Заказ(ы) успешно удалены",
      },
      edit: {
        title: "Редактировать заказ",
      },
      fields: {
        id: "Id",
        userId: "Пользователь",
        cart: "Корзина",
        shipping: "Доставка",
        discountRange: "Скидка",
        discount: "Скидка",
        paymentMethod: "Метод оплаты",
        taxe: "Налог",
        transactionNumber: "Номер транзакции",
        orderStatus: "Статус заказа",
        createdAt: "Создано в",
        updatedAt: "Обновлено в",
        createdAtRange: "Создано в",
      },
      enumerators: {
        orderStatus: {
          pending: "В ожидании",
          in_progress: "В процессе",
          delivered: "Доставлено",
          canceled: "Отменено",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Новый заказ",
      },
      view: {
        title: "Просмотр заказа",
      },
      importer: {
        title: "Импорт заказов",
        fileName: "шаблон_импорта_заказов",
        hint: "Столбцы Файлы/Изображения должны содержать URL-адреса файлов, разделенные пробелом.",
      },
    },
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

  user: {
    fields: {
      genre: "Пол",
      username: "Имя пользователя",
      walletName: "Название кошелька",
      id: "ID",
      confirmPassword: "Подтвердите пароль",
      avatars: "Аватар",
      invitationcode: "Пригласительный код",
      email: "Электронная почта",
      emails: "Электронная почта(ы)",
      erc20: "Адрес кошелька ERC20",
      trc20: "Адрес кошелька TRC20",
      fullName: "Имя",
      balance: "Баланс",
      firstName: "Имя",
      lastName: "Фамилия",
      status: "Статус",
      phoneNumber: "Номер телефона",
      withdrawPassword: "Пароль для вывода",
      sector: "Сектор",
      employer: "Работодатель",
      profession: "Профессия",
      address: "Адрес",
      birthDate: "Дата рождения",
      maritalStatus: "Семейное положение",
      facebookLink: "Ссылка на Facebook",
      sponsor: "Спонсор",
      role: "Роль",
      createdAt: "Создано",
      updatedAt: "Обновлено",
      roleUser: "Роль/Пользователь",
      roles: "Роли",
      createdAtRange: "Создано",
      password: "Пароль",
      oldPassword: "Старый пароль",
      newPassword: "Новый пароль",
      newPasswordConfirmation: "Подтверждение нового пароля",
      rememberMe: "Запомнить меня",
    },
    sector: {
      AGRO_ALIMENTAIRE: "Пищевая промышленность",
      ASSURANCES: "Страхование",
      AUDIOVISUEL: "Аудиовизуальный",
      BANCAIRE: "Банковское дело",
      CHIMIE: "Химия",
      COMPOSANTS_AUTOMOBILES: "Автомобильные компоненты",
      DISTRIBUTION: "Дистрибуция",
      DISTRIBUTION_AUTOMOBILE: "Автомобильная дистрибуция",
      DIVERS: "Разное",
      FINANCIER: "Финансовый",
      HOLDING: "Холдинг",
      IMMOBILIER: "Недвижимость",
      INDUSTRIEL: "Промышленный",
      LEASING: "Лизинг",
      LOGISTIQUE_TRANSPORT: "Логистика и транспорт",
      PHARMACEUTIQUE: "Фармацевтика",
      SANTÉ: "Здоровье",
      TOURSIME: "Туризм",
      INFORMATION_TECHNOLOGY: "Информационные технологии",
    },
    maritalStatus: {
      célébataire: "Холост",
      marié: "Женат/Замужем",
    },
    status: {
      active: "Активный",
      invited: "Приглашенный",
      "empty-permissions": "Ожидание разрешений",
      inactive: "Неактивный",
    },

    enumerators: {
      status: {
        USDT: "USDT",
        ETH: "ETH",
        BTC: "BTC",
      },
      gender: {
        male: "мужской",
        female: "женский",
      }
    },
    invite: "Пригласить",
    validations: {
      // eslint-disable-next-line
      email: "Электронная почта ${value} недействительна",
    },
    title: "Пользователи",
    menu: "Пользователи",
    doAddSuccess: "Пользователь(и) успешно сохранены",
    doUpdateSuccess: "Пользователь успешно сохранен",
    exporterFileName: "экспорт_пользователей",
    doDestroySuccess: "Пользователь успешно удален",
    doDestroyAllSelectedSuccess: "Пользователи успешно удалены",
    edit: {
      title: "Редактировать пользователя",
    },
    new: {
      title: "Пригласить пользователя(ей)",
      titleModal: "Пригласить пользователя",
      emailsHint:
        "Разделите несколько адресов электронной почты с помощью запятой.",
    },
    view: {
      title: "Просмотр пользователя",
      activity: "Активность",
    },
    importer: {
      title: "Импорт пользователей",
      fileName: "шаблон_импорта_пользователей",
      hint: "Столбцы Файлы/Изображения должны содержать URL-адреса файлов, разделенные пробелом. Отношения должны быть ID ссылочных записей, разделенные пробелом. Роли должны быть ID ролей, разделенные пробелом.",
    },
    errors: {
      userAlreadyExists: "Пользователь с таким email уже существует",
      userNotFound: "Пользователь не найден",
      revokingOwnPermission: `Вы не можете отозвать свои собственные права администратора`,
    },
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
    creationtime: "Время создания",

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
