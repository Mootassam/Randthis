import Withdraw from "src/view/pages/withdraw/Withdraw";

const es = {
  app: {
    title: "El Cine Luz"
  },
  inputs: {
    username: "Nombre de usuario",
    password: "Contraseña",
    phoneNumber: "Número de teléfono",
    withdrawPassword: "Contraseña de retiro",
    confirmPassword: "Confirmar contraseña",
    invitationcode: "Código de invitación",
    walletaddress: "Dirección de billetera"
  },
  buttons: {
    login: "Iniciar sesión",
    registerNow: "Regístrate ahora",
    signup: "Registrarse",
    start: "Comenzar",
    orders: "Pedidos",
    submit: "Enviar",
    backtohome: "Volver a inicio",
    confirm: "Confirmar",
    logout: "Cerrar sesión",
    getstarted: "Empezar",
  },
  text: {
    welcome: "Bienvenido",
    discover: "Descubre ofertas exclusivas solo para ti",
    signin: "Iniciar sesión",
    haveaccount: "¿Ya tienes una cuenta?",
    noaccount: "¿No tienes una cuenta?",
    showingnow: "En cartelera",
    comingsoon: "Próximamente",
    termsconditions: "Términos y condiciones",
    todayearning: "Ganancias de hoy",
    accountbalance: "Saldo de la cuenta",
    freezebalance: "Saldo congelado",
    sumbitInformation: "Enviar información",
    order: "Pedido",
    pending: "Pendiente",
    completed: "Completado",
    canceled: "Cancelado",
    notransaction: "¡No hay transacciones hasta ahora!",
    createdtime: "Hora de creación",
    creationtime: "Hora de creación",
    orderNumber: "Número de pedido",
    orderamount: "Monto del pedido",
    income: "Ingresos",
    buyerating: "Calificación del comprador",
    uid: "UID",
    promotioncode: "Código de promoción",
    walletamount: "Monto de la billetera",
    creditassesment: "Evaluación de crédito",
    myfinance: "Mis finanzas",
    withdraw: "Retirar",
    mydetails: "Mis detalles",
    profile: "Perfil",
    wallet: "Billetera",
    other: "Otro",
    customersupport: "Atención al cliente",
    transaction: "Transacción",
    taskshistory: "Historial de tareas",
    security: "Seguridad",
    sponsor: `Nuestra seguridad es nuestra máxima prioridad y queremos asegurarnos de que
              estés protegido contra cualquier posible riesgo. Ten en cuenta que
              nunca te pediremos que envíes dinero a una dirección desconocida. Antes
              de realizar cualquier pago, te pedimos que verifiques los detalles con nosotros.`,
  },
  errors: {
    backToHome: "Volver a inicio",
    403: "Lo sentimos, no tienes acceso a esta página",
    404: "Lo sentimos, la página que visitaste no existe",
    500: "Lo sentimos, el servidor está reportando un error",
    429: "Demasiadas solicitudes. Por favor, inténtalo más tarde.",
    forbidden: {
      message: "Prohibido",
    },
    validation: {
      message: "Ocurrió un error",
    },
    defaultErrorMessage: "Ups, ocurrió un error",
  },

  withdraw: {
    withdrawamount: "Monto de retiro",
    Withdrawpassword: "Contraseña de retiro",
    availablebalance: "Saldo disponible",
    rules: "Descripción de las reglas",
    rule1: "El retiro mínimo es de $20",
    rule2: "El pago se realizará dentro de las 24 horas posteriores a la solicitud de retiro",
    rule3: "La falta de envío de pedidos diarios completos impide el retiro, todos los productos deben ser enviados para su retiro"
  },
  profile: {
    profile: "Perfil",
    fullname: "Nombre completo",
    email: "Correo electrónico",
    phonenumber: "Número de teléfono",
    country: "País",
    Invitationcode: "Código de invitación"
  },
  wallet: {
    wallet: "Billetera",
    info: "Información del método de retiro",
    username: "Nombre de usuario",
    walletname: "Nombre de la billetera",
    walletaddress: "Dirección de la billetera",
    note: "Nota",
    notedesctiption: "Por favor, ten cuidado al completar esta información."
  },

  cs: {
    cs: "Atención al cliente",
    note: "Si tienes alguna pregunta o encuentras algún problema, envíanos un correo electrónico o chatea con nuestro equipo de soporte en línea.",
    contactnow: "Contactar ahora"
  },
  transaction: {
    transaction: "Transacción",
    all: "Todo",
    withdraw: "Retiro",
    dposit: "Depósito",
    notransaction: "¡No hay transacciones hasta ahora!"
  },
  order: {
    order: "Pedido",
    completed: "Completado",
    pending: "Pendiente",
    canceled: "Cancelado",
    ordertime: "Hora del pedido",
    ordernumber: "Número de pedido",
    total: "Monto total del pedido",
    commission: "Comisión",
    return: "Retorno estimado"
  },

  security: {
    changepassword: "Cambiar contraseña",
    oldpassword: "Contraseña antigua",
    newpassword: "Nueva contraseña",
    confirmpassword: "Confirmar contraseña",
    note: "Nota",
    notedesc: "Por favor, completa esta información con cuidado"
  },

  auth: {
    tenants: "Espacios de trabajo",
    singindesc: "Ingresa tu correo electrónico y contraseña para iniciar sesión",
    signupdesc: "Ingresa tu correo electrónico y contraseña para registrarte",
    profile: {
      title: "Perfil",
      success: "Perfil actualizado con éxito",
      vip: "Felicidades por tu suscripción",
    },
    createAnAccount: "Crear una cuenta",
    rememberMe: "Recuérdame",
    forgotPassword: "Olvidé mi contraseña",
    signin: "Iniciar sesión",
    signup: "Registrarse",
    signout: "Cerrar sesión",
    alreadyHaveAnAccount: "¿Ya tienes una cuenta? Inicia sesión.",
    social: {
      errors: {
        "auth-invalid-provider":
          "Este correo ya está registrado con otro proveedor.",
        "auth-no-email": "El correo asociado a esta cuenta es privado o inexistente.",
      },
    },
    signinWithAnotherAccount: "Iniciar sesión con otra cuenta",
    emailUnverified: {
      message: `Por favor, confirma tu correo en <strong>{0}</strong> para continuar.`,
      submit: "Reenviar correo de verificación",
    },
    emptyPermissions: {
      message: "Aún no tienes permisos. Espera a que el administrador te los otorgue.",
    },
    passwordResetEmail: {
      message: "Enviar correo de restablecimiento de contraseña",
      error: "Correo no reconocido",
    },
    passwordReset: {
      message: "Restablecer contraseña",
    },
    passwordChange: {
      title: "Cambiar contraseña",
      success: "Contraseña cambiada con éxito",
      mustMatch: "Las contraseñas deben coincidir",
    },
    emailAddressVerificationEmail: {
      error: "Correo no reconocido",
    },
    verificationEmailSuccess: "Correo de verificación enviado con éxito",
    passwordResetEmailSuccess: "Correo de restablecimiento de contraseña enviado con éxito",
    passwordResetSuccess: "Contraseña cambiada con éxito",
    verifyEmail: {
      success: "Correo verificado con éxito.",
      message: "Un momento, estamos verificando tu correo...",
    },
  },

  tabbarmenue: {
    home: "Inicio",
    rate: "Calificar",
    profile: "Perfil"
  },

  validation: {
    mixed: {
      default: "${path} no es válido",
      required: "${path} es obligatorio",
      oneOf: "${path} debe ser uno de los siguientes valores: ${values}",
      notOneOf: "${path} no debe ser uno de los siguientes valores: ${values}",
      notType: ({ path, type, value, originalValue }) => {
        return `${path} debe ser un ${type}`;
      },
    },
    string: {
      length: "${path} debe tener exactamente ${length} caracteres",
      min: "${path} debe tener al menos ${min} caracteres",
      max: "${path} debe tener como máximo ${max} caracteres",
      matches: '${path} debe coincidir con el siguiente formato: "${regex}"',
      email: "${path} debe ser un correo electrónico válido",
      url: "${path} debe ser una URL válida",
      trim: "${path} debe ser una cadena sin espacios al inicio y al final",
      lowercase: "${path} debe estar en minúsculas",
      uppercase: "${path} debe estar en mayúsculas",
      selected: "${path} debe ser seleccionado",
    },
    number: {
      min: "${path} debe ser mayor o igual a ${min}",
      max: "${path} debe ser menor o igual a ${max}",
      lessThan: "${path} debe ser menor que ${less}",
      moreThan: "${path} debe ser mayor que ${more}",
      notEqual: "${path} no debe ser igual a ${notEqual}",
      positive: "${path} debe ser un número positivo",
      negative: "${path} debe ser un número negativo",
      integer: "${path} debe ser un número entero",
    },
    date: {
      min: "${path} debe ser posterior a ${min}",
      max: "${path} debe ser anterior a ${max}",
    },
    boolean: {},
    object: {
      noUnknown:
        "${path} no debe contener claves no especificadas en el objeto",
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} es obligatorio`
          : `${path} debe contener al menos ${min} elementos`,
      max: "${path} debe contener como máximo ${max} elementos",
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: "Subir",
    image: "Debe subir una imagen",
    size: "El archivo es demasiado grande. El tamaño máximo permitido es {0}",
    formats: `Formato no válido. Debe ser uno de los siguientes: {0}.`,
  },

};

export default es;
