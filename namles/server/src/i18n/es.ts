const es = {
  app: {
    title: 'Aplicación',
  },

  validation: {
    inValidWithdrawPassword: 'Su contraseña de retiro no es correcta, por favor verifique nuevamente',
    exceedsBalance: 'Parece que su monto de retiro excede su saldo',
    missingWalletAddress: 'Por favor, vaya a la sección "Billetera" para vincular su dirección USDT (TRC20) o ERC20 antes de enviar una solicitud de retiro.',
    requiredAmount: 'Por favor escriba el monto',
    notFoundTransaction: 'Transacción no encontrada',
    permissoin: "Por favor, intente contactar al servicio al cliente para obtener ayuda",
    duplicateSubsctription: 'Ya está suscrito a este plan',
    InsufficientBalance: 'Saldo insuficiente',
    requiredSubscription: 'Por favor seleccione un plan de suscripción',
    moretasks: 'Este es su límite. Por favor contacte al servicio al cliente para más tareas',
    deposit: "Saldo insuficiente, por favor actualice."
  },

  auth: {
    userNotFound: `Lo sentimos, no reconocemos sus credenciales`,
    wrongPassword: `Lo sentimos, no reconocemos sus credenciales`,
    weakPassword: 'Esta contraseña es demasiado débil',
    emailAlreadyInUse: 'El nombre de usuario ya está en uso',
    invitationCode: 'por favor escriba un código de invitación correcto',
    invalidEmail: 'Por favor proporcione un email válido',
    passwordReset: {
      invalidToken: 'El enlace de restablecimiento de contraseña es inválido o ha expirado',
      error: `Email no reconocido`,
    },
    emailAddressVerificationEmail: {
      invalidToken: 'El enlace de verificación de email es inválido o ha expirado.',
      error: `Email no reconocido.`,
      signedInAsWrongUser: `Esta confirmación de email fue enviada a {0} pero usted ha iniciado sesión como {1}.`,
    },
    passwordChange: {
      invalidPassword: 'La contraseña anterior es inválida',
    },
  },

  user: {
    errors: {
      userAlreadyExists: 'Ya existe un usuario con este email.',
      userNotFound: 'Usuario no encontrado.',
      destroyingHimself: `No puede eliminarse a sí mismo.`,
      revokingOwnPermission: `No puede revocar sus propios permisos de administrador.`,
      revokingPlanUser: `No puede revocar los permisos de administrador del administrador del plan.`,
      destroyingPlanUser: `No puede eliminar al administrador del plan.`,
    },
  },

  tenant: {
    exists: 'Ya existe un workspace en esta aplicación.',
    url: {
      exists: 'Esta URL de workspace ya está en uso.',
    },
    invitation: {
      notSameEmail: `Esta invitación fue enviada a {0} pero usted ha iniciado sesión como {1}.`,
    },
    planActive: `Hay un plan activo para este workspace. Por favor cancele el plan primero.`,
    stripeNotConfigured: 'Stripe no está configurado.',
  },

  importer: {
    errors: {
      invalidFileEmpty: 'El archivo está vacío',
      invalidFileExcel: 'Solo se permiten archivos de Excel (.xlsx)',
      invalidFileUpload: 'Archivo inválido. Asegúrese de estar usando la última versión de la plantilla.',
      importHashRequired: 'Se requiere hash de importación',
      importHashExistent: 'Los datos ya han sido importados',
    },
  },

  errors: {
    notFound: {
      message: 'No encontrado',
    },
    forbidden: {
      message: 'Prohibido',
    },
    validation: {
      message: 'Ocurrió un error',
    },
  },

  email: {
    error: `El proveedor de email no está configurado.`,
  },

  preview: {
    error: 'Lo sentimos, esta operación no está permitida en modo de vista previa.',
  },
};

export default es;