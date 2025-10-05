const fr = {
  app: {
    title: 'Nowspeed',
  },

  validation: {
    inValidWithdrawPassword: 'Votre mot de passe de retrait est incorrect, veuillez vérifier à nouveau',
    exceedsBalance: 'Il semble que votre montant de retrait dépasse votre solde',
    missingWalletAddress: 'Veuillez aller dans la section "Portefeuille" pour lier votre adresse USDT (TRC20) ou ERC20 avant de soumettre une demande de retrait.',
    requiredAmount: 'Veuillez écrire le montant',
    notFoundTransaction: 'Transaction non trouvée',
    permissoin: "Veuillez essayer de contacter le service client pour obtenir de l'aide",
    duplicateSubsctription: 'Vous êtes déjà abonné à ce plan',
    InsufficientBalance: 'Solde insuffisant',
    requiredSubscription: 'Veuillez sélectionner un plan d\'abonnement',
    moretasks: 'Ceci est votre limite. Veuillez contacter le service client pour plus de tâches',
    deposit: "Solde insuffisant, veuillez mettre à niveau."
  },

  auth: {
    userNotFound: `Désolé, nous ne reconnaissons pas vos identifiants`,
    wrongPassword: `Désolé, nous ne reconnaissons pas vos identifiants`,
    weakPassword: 'Ce mot de passe est trop faible',
    emailAlreadyInUse: 'Le nom d\'utilisateur est déjà utilisé',
    invitationCode: 'Veuillez écrire un code d\'invitation correct',
    invalidEmail: 'Veuillez fournir un email valide',
    passwordReset: {
      invalidToken: 'Le lien de réinitialisation du mot de passe est invalide ou a expiré',
      error: `Email non reconnu`,
    },
    emailAddressVerificationEmail: {
      invalidToken: 'Le lien de vérification d\'email est invalide ou a expiré.',
      error: `Email non reconnu.`,
      signedInAsWrongUser: `Cette confirmation d'email a été envoyée à {0} mais vous êtes connecté en tant que {1}.`,
    },
    passwordChange: {
      invalidPassword: 'L\'ancien mot de passe est invalide',
    },
  },

  user: {
    errors: {
      userAlreadyExists: 'Un utilisateur avec cet email existe déjà.',
      userNotFound: 'Utilisateur non trouvé.',
      destroyingHimself: `Vous ne pouvez pas vous supprimer vous-même.`,
      revokingOwnPermission: `Vous ne pouvez pas révoquer vos propres permissions d'administrateur.`,
      revokingPlanUser: `Vous ne pouvez pas révoquer les permissions d'administrateur du gestionnaire de plan.`,
      destroyingPlanUser: `Vous ne pouvez pas supprimer le gestionnaire de plan.`,
    },
  },

  tenant: {
    exists: 'Il y a déjà un espace de travail sur cette application.',
    url: {
      exists: 'Cette URL d\'espace de travail est déjà utilisée.',
    },
    invitation: {
      notSameEmail: `Cette invitation a été envoyée à {0} mais vous êtes connecté en tant que {1}.`,
    },
    planActive: `Il y a un plan actif pour cet espace de travail. Veuillez d'abord annuler le plan.`,
    stripeNotConfigured: 'Stripe n\'est pas configuré.',
  },

  importer: {
    errors: {
      invalidFileEmpty: 'Le fichier est vide',
      invalidFileExcel: 'Seuls les fichiers Excel (.xlsx) sont autorisés',
      invalidFileUpload: 'Fichier invalide. Assurez-vous d\'utiliser la dernière version du modèle.',
      importHashRequired: 'Le hachage d\'importation est requis',
      importHashExistent: 'Les données ont déjà été importées',
    },
  },

  errors: {
    notFound: {
      message: 'Non trouvé',
    },
    forbidden: {
      message: 'Interdit',
    },
    validation: {
      message: 'Une erreur est survenue',
    },
  },

  email: {
    error: `Le fournisseur d'email n'est pas configuré.`,
  },

  preview: {
    error: 'Désolé, cette opération n\'est pas autorisée en mode aperçu.',
  },
};

export default fr;