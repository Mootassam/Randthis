const ru = {
  app: {
    title: 'Nowspeed',
  },

  validation: {
    inValidWithdrawPassword: 'Ваш пароль вывода неверен, пожалуйста, проверьте еще раз',
    exceedsBalance: 'Похоже, ваша сумма вывода превышает ваш баланс',
    missingWalletAddress: 'Пожалуйста, перейдите в раздел "Кошелек", чтобы привязать ваш адрес USDT (TRC20) или ERC20 перед отправкой запроса на вывод.',
    requiredAmount: 'Пожалуйста, напишите сумму',
    notFoundTransaction: 'Транзакция не найдена',
    permissoin: "Пожалуйста, попробуйте связаться со службой поддержки для получения помощи",
    duplicateSubsctription: 'Вы уже подписаны на этот план',
    InsufficientBalance: 'Недостаточно средств',
    requiredSubscription: 'Пожалуйста, выберите план подписки',
    moretasks: 'Это ваш лимит. Пожалуйста, свяжитесь со службой поддержки для получения дополнительных задач',
    deposit: "Недостаточно средств, пожалуйста, пополните баланс."
  },

  auth: {
    userNotFound: `Извините, мы не узнаем ваши учетные данные`,
    wrongPassword: `Извините, мы не узнаем ваши учетные данные`,
    weakPassword: 'Этот пароль слишком слабый',
    emailAlreadyInUse: 'Имя пользователя уже используется',
    invitationCode: 'пожалуйста, напишите правильный код приглашения',
    invalidEmail: 'Пожалуйста, предоставьте действительный email',
    passwordReset: {
      invalidToken: 'Ссылка для сброса пароля недействительна или истекла',
      error: `Email не распознан`,
    },
    emailAddressVerificationEmail: {
      invalidToken: 'Ссылка для подтверждения email недействительна или истекла.',
      error: `Email не распознан.`,
      signedInAsWrongUser: `Это подтверждение email было отправлено на {0}, но вы вошли как {1}.`,
    },
    passwordChange: {
      invalidPassword: 'Старый пароль недействителен',
    },
  },

  user: {
    errors: {
      userAlreadyExists: 'Пользователь с этим email уже существует.',
      userNotFound: 'Пользователь не найден.',
      destroyingHimself: `Вы не можете удалить себя.`,
      revokingOwnPermission: `Вы не можете отозвать свои собственные права администратора.`,
      revokingPlanUser: `Вы не можете отозвать права администратора у менеджера плана.`,
      destroyingPlanUser: `Вы не можете удалить менеджера плана.`,
    },
  },

  tenant: {
    exists: 'В этом приложении уже есть рабочее пространство.',
    url: {
      exists: 'Этот URL рабочего пространства уже используется.',
    },
    invitation: {
      notSameEmail: `Это приглашение было отправлено на {0}, но вы вошли как {1}.`,
    },
    planActive: `Для этого рабочего пространства есть активный план. Пожалуйста, сначала отмените план.`,
    stripeNotConfigured: 'Stripe не настроен.',
  },

  importer: {
    errors: {
      invalidFileEmpty: 'Файл пуст',
      invalidFileExcel: 'Разрешены только файлы Excel (.xlsx)',
      invalidFileUpload: 'Неверный файл. Убедитесь, что вы используете последнюю версию шаблона.',
      importHashRequired: 'Требуется хэш импорта',
      importHashExistent: 'Данные уже были импортированы',
    },
  },

  errors: {
    notFound: {
      message: 'Не найдено',
    },
    forbidden: {
      message: 'Запрещено',
    },
    validation: {
      message: 'Произошла ошибка',
    },
  },

  email: {
    error: `Провайдер электронной почты не настроен.`,
  },

  preview: {
    error: 'Извините, эта операция не разрешена в режиме предварительного просмотра.',
  },
};

export default ru;