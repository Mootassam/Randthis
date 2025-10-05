
const ptBR = {
  app: {
    title: "The Light Cinema"
  },
  inputs: {
    username: "Nome de Usuário",
    password: "Senha",
    phoneNumber: "Número de Telefone",
    withdrawPassword: "Senha de Saque",
    confirmPassword: "Confirmar Senha",
    invitationcode: "Código de Convite",
    walletaddress: "Endereço da carteira"

  },

  buttons: {
    login: "Entrar",
    registerNow: "Registrar Agora",
    signup: "Cadastrar-se",
    start: "Iniciar",
    orders: "Pedidos",
    submit: "Enviar",
    backtohome: "Voltar para a Página Inicial",
    confirm: "Confirmar",
    logout: "Sair",
    getstarted: "Começar",
  },
  text: {
    welcome: "Bem-vindo",
    discover: "Descubra ofertas exclusivas para você",
    signin: "Entrar",
    haveaccount: "Já tem uma conta?",
    noaccount: "Não tem uma conta?",
    showingnow: "Em Exibição",
    comingsoon: "Em Breve",
    termsconditions: "Termos & Condições",
    todayearning: "Ganhos de Hoje",
    accountbalance: "Saldo da Conta",
    freezebalance: "Saldo Congelado",
    sumbitInformation: "Enviar Informações",
    order: "Pedido",
    pending: "Pendente",
    completed: "Concluído",
    canceled: "Cancelado",
    notransaction: "Nenhuma transação até agora!",
    createdtime: "Data de Criação",
    creationtime:"Hora de criação",
    orderNumber: "Número do Pedido",
    orderamount: "Valor do Pedido",
    income: "Rendimento",
    buyerating: "Avaliação do Comprador",
    uid: "UID",
    promotioncode: "Código Promocional",
    walletamount: "Saldo da Carteira",
    creditassesment: "Avaliação de Crédito",
    myfinance: "Minhas Finanças",
    withdraw: "Saque",
    mydetails: "Meus Dados",
    profile: "Perfil",
    wallet: "Carteira",
    other: "Outros",
    customersupport: "Atendimento ao Cliente",
    transaction: "Transação",
    taskshistory: "Histórico de Tarefas",
    security: "Segurança",
    sponsor: `Nossa segurança é nossa maior prioridade e queremos garantir que 
              você esteja protegido contra qualquer risco potencial. Lembre-se 
              de que nunca pediremos para enviar dinheiro para um endereço desconhecido. 
              Antes de fazer qualquer pagamento, pedimos que verifique as informações conosco.`,
  },
  errors: {
    backToHome: "Voltar para a Página Inicial",
    403: "Desculpe, você não tem acesso a esta página",
    404: "Desculpe, a página que você visitou não existe",
    500: "Desculpe, o servidor está reportando um erro",
    429: "Muitas solicitações. Tente novamente mais tarde.",
    forbidden: {
      message: "Acesso Negado",
    },
    validation: {
      message: "Ocorreu um erro",
    },
    defaultErrorMessage: "Ops, ocorreu um erro",
  },

  withdraw: {
    withdrawamount: "Valor do Saque",
    Withdrawpassword: "Senha de Saque",
    availablebalance: "Saldo Disponível",
    rules: "Descrição das Regras",
    rule1: "O saque mínimo é de $20",
    rule2: "O pagamento será feito dentro de 24 horas após a solicitação de saque",
    rule3: "A submissão incompleta dos pedidos diários impede o saque; todos os produtos devem ser enviados para retirada"
  },
  profile: {
    profile: "Perfil",
    fullname: "Nome Completo",
    email: "E-mail",
    phonenumber: "Número de Telefone",
    country: "País",
    Invitationcode: "Código de Convite"
  },
  wallet: {
    wallet: "Carteira",
    info: "Informações sobre o método de saque",
    username: "Nome de Usuário",
    walletname: "Nome da Carteira",
    walletaddress: "Endereço da Carteira",
    note: "Nota",
    notedesctiption: "Por favor, preencha estas informações com cuidado."
  },

  cs: {
    cs: "Atendimento ao Cliente",
    note: "Se tiver alguma dúvida ou encontrar problemas, envie-nos um e-mail ou converse com nossa equipe de suporte online.",
    contactnow: "Entre em Contato Agora"
  },
  transaction: {
    transaction: "Transação",
    all: "Todos",
    withdraw: "Saque",
    dposit: "Depósito",
    notransaction: "Nenhuma transação até agora!"
  },
  order: {
    order: "Pedido",
    completed: "Concluído",
    pending: "Pendente",
    canceled: "Cancelado",
    ordertime: "Hora do Pedido",
    ordernumber: "Número do Pedido",
    total: "Valor Total do Pedido",
    commission: "Comissão",
    return: "Retorno Estimado"
  },

  security: {
    changepassword: "Alterar Senha",
    oldpassword: "Senha Antiga",
    newpassword: "Nova Senha",
    confirmpassword: "Confirmar Senha",
    note: "Nota",
    notedesc: "Por favor, preencha estas informações com cuidado"
  },

  auth: {
    tenants: "Espaços de Trabalho",
    singindesc: "Digite seu e-mail e senha para entrar",
    signupdesc: "Digite seu e-mail e senha para se cadastrar",
    profile: {
      title: "Perfil",
      success: "Perfil atualizado com sucesso",
      vip: "Parabéns por sua assinatura",
    },
    createAnAccount: "Criar uma Conta",
    rememberMe: "Lembrar-me",
    forgotPassword: "Esqueceu a Senha",
    signin: "Entrar",
    signup: "Cadastrar-se",
    signout: "Sair",
    alreadyHaveAnAccount: "Já tem uma conta? Faça login.",
    social: {
      errors: {
        "auth-invalid-provider":
          "Este e-mail já está registrado em outro provedor.",
        "auth-no-email": "O e-mail associado a esta conta é privado ou inexistente.",
      },
    },
    signinWithAnotherAccount: "Entrar com outra conta",
    emailUnverified: {
      message: `Por favor, confirme seu e-mail em <strong>{0}</strong> para continuar.`,
      submit: "Reenviar e-mail de verificação",
    },
    emptyPermissions: {
      message: "Você ainda não tem permissões. Aguarde a concessão de privilégios pelo administrador.",
    },
    passwordResetEmail: {
      message: "Enviar e-mail para redefinição de senha",
      error: "E-mail não reconhecido",
    },
    passwordReset: {
      message: "Redefinir Senha",
    },
    passwordChange: {
      title: "Alterar Senha",
      success: "Senha alterada com sucesso",
      mustMatch: "As senhas devem coincidir",
    },
    emailAddressVerificationEmail: {
      error: "E-mail não reconhecido",
    },
    verificationEmailSuccess: "E-mail de verificação enviado com sucesso",
    passwordResetEmailSuccess: "E-mail de redefinição de senha enviado com sucesso",
    passwordResetSuccess: "Senha alterada com sucesso",
    verifyEmail: {
      success: "E-mail verificado com sucesso.",
      message: "Aguarde um momento, seu e-mail está sendo verificado...",
    },
  },

  tabbarmenue: {
    home: "Início",
    rate: "Avaliar",
    profile: "Perfil"
  },
  validation: {
    mixed: {
      default: "${path} é inválido",
      required: "${path} é obrigatório",
      oneOf: "${path} deve ser um dos seguintes valores: ${values}",
      notOneOf: "${path} não deve ser um dos seguintes valores: ${values}",
      notType: ({ path, type, value, originalValue }) => {
        return `${path} deve ser um ${type}`;
      },
    },
    string: {
      length: "${path} deve ter exatamente ${length} caracteres",
      min: "${path} deve ter pelo menos ${min} caracteres",
      max: "${path} deve ter no máximo ${max} caracteres",
      matches: '${path} deve corresponder ao seguinte padrão: "${regex}"',
      email: "${path} deve ser um e-mail válido",
      url: "${path} deve ser um URL válido",
      trim: "${path} deve ser uma string sem espaços extras",
      lowercase: "${path} deve estar em letras minúsculas",
      uppercase: "${path} deve estar em letras maiúsculas",
      selected: "${path} deve ser selecionado",
    },
    number: {
      min: "${path} deve ser maior ou igual a ${min}",
      max: "${path} deve ser menor ou igual a ${max}",
      lessThan: "${path} deve ser menor que ${less}",
      moreThan: "${path} deve ser maior que ${more}",
      notEqual: "${path} não deve ser igual a ${notEqual}",
      positive: "${path} deve ser um número positivo",
      negative: "${path} deve ser um número negativo",
      integer: "${path} deve ser um número inteiro",
    },
    date: {
      min: "${path} deve ser posterior a ${min}",
      max: "${path} deve ser anterior a ${max}",
    },
    boolean: {},
    object: {
      noUnknown:
        "${path} não pode conter chaves não especificadas na estrutura do objeto",
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} é obrigatório`
          : `${path} deve ter pelo menos ${min} itens`,
      max: "${path} deve ter no máximo ${max} itens",
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: "Enviar",
    image: "Você deve enviar uma imagem",
    size: "O arquivo é muito grande. O tamanho máximo permitido é {0}",
    formats: `Formato inválido. Deve ser um dos seguintes: {0}.`,
  },



};

export default ptBR;
