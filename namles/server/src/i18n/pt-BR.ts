const ptBR = {
  app: {
    title: 'Nowspeed',
  },

  validation: {
    inValidWithdrawPassword: 'Sua senha de saque não está correta, por favor verifique novamente',
    exceedsBalance: 'Parece que seu valor de saque excede seu saldo',
    missingWalletAddress: 'Por favor, vá para a seção "Carteira" para vincular seu endereço USDT (TRC20) ou ERC20 antes de enviar uma solicitação de saque.',
    requiredAmount: 'Por favor, escreva o valor',
    notFoundTransaction: 'Transação não encontrada',
    permissoin: "Por favor, tente entrar em contato com o suporte ao cliente para obter ajuda",
    duplicateSubsctription: 'Você já está inscrito neste plano',
    InsufficientBalance: 'Saldo insuficiente',
    requiredSubscription: 'Por favor, selecione um plano de assinatura',
    moretasks: 'Este é o seu limite. Por favor, entre em contato com o suporte ao cliente para mais tarefas',
    deposit: "Saldo insuficiente, por favor faça um upgrade."
  },

  auth: {
    userNotFound: `Desculpe, não reconhecemos suas credenciais`,
    wrongPassword: `Desculpe, não reconhecemos suas credenciais`,
    weakPassword: 'Esta senha é muito fraca',
    emailAlreadyInUse: 'Nome de usuário já está em uso',
    invitationCode: 'por favor escreva um código de convite correto',
    invalidEmail: 'Por favor, forneça um email válido',
    passwordReset: {
      invalidToken: 'O link de redefinição de senha é inválido ou expirou',
      error: `Email não reconhecido`,
    },
    emailAddressVerificationEmail: {
      invalidToken: 'O link de verificação de email é inválido ou expirou.',
      error: `Email não reconhecido.`,
      signedInAsWrongUser: `Esta confirmação de email foi enviada para {0} mas você está conectado como {1}.`,
    },
    passwordChange: {
      invalidPassword: 'A senha antiga é inválida',
    },
  },

  user: {
    errors: {
      userAlreadyExists: 'Usuário com este email já existe.',
      userNotFound: 'Usuário não encontrado.',
      destroyingHimself: `Você não pode deletar a si mesmo.`,
      revokingOwnPermission: `Você não pode revocar sua própria permissão de administrador.`,
      revokingPlanUser: `Você não pode revocar a permissão de administrador do gerente do plano.`,
      destroyingPlanUser: `Você não pode deletar o gerente do plano.`,
    },
  },

  tenant: {
    exists: 'Já existe um workspace nesta aplicação.',
    url: {
      exists: 'Esta URL de workspace já está em uso.',
    },
    invitation: {
      notSameEmail: `Este convite foi enviado para {0} mas você está conectado como {1}.`,
    },
    planActive: `Há um plano ativo para este workspace. Por favor, cancele o plano primeiro.`,
    stripeNotConfigured: 'Stripe não está configurado.',
  },

  importer: {
    errors: {
      invalidFileEmpty: 'O arquivo está vazio',
      invalidFileExcel: 'Apenas arquivos Excel (.xlsx) são permitidos',
      invalidFileUpload: 'Arquivo inválido. Certifique-se de que está usando a última versão do modelo.',
      importHashRequired: 'Hash de importação é necessário',
      importHashExistent: 'Os dados já foram importados',
    },
  },

  errors: {
    notFound: {
      message: 'Não encontrado',
    },
    forbidden: {
      message: 'Proibido',
    },
    validation: {
      message: 'Ocorreu um erro',
    },
  },

  email: {
    error: `Provedor de email não está configurado.`,
  },

  preview: {
    error: 'Desculpe, esta operação não é permitida no modo de visualização.',
  },
};

export default ptBR;