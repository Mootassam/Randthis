import Withdraw from "src/view/pages/withdraw/Withdraw";

const fr = {
  app: {
    title: "Le Cinéma Lumière"
  },

  inputs: {
    username: `Nom d'utilisateur`,
    password: 'Mot de passe',
    phoneNumber: 'Numéro de téléphone',
    withdrawPassword: "Mot de passe de retrait",
    confirmPassword: 'Confirmer le mot de passe',
    invitationcode: 'Code d’invitation',
    walletaddress: "Adresse du portefeuille"
  },
  buttons: {
    login: "Connexion",
    registerNow: "Inscrivez-vous maintenant",
    signup: "S'inscrire",
    start: "Commencer",
    orders: "Commandes",
    submit: "Soumettre",
    backtohome: "Retour à l'accueil",
    confirm: "Confirmer",
    logout: "Déconnexion",
    getstarted: "Commencer",
  },
  text: {
    welcome: "Bienvenue",
    discover: "Découvrez des offres exclusives juste pour vous",
    signin: "Se connecter",
    haveaccount: "Vous avez déjà un compte",
    noaccount: "Vous n'avez pas de compte",
    showingnow: "Actuellement à l'affiche",
    comingsoon: "Prochainement",
    termsconditions: "Termes et conditions",
    todayearning: "Gains du jour",
    accountbalance: "Solde du compte",
    freezebalance: "Solde gelé",
    sumbitInformation: "Soumettre les informations",
    order: "Commande",
    pending: "En attente",
    completed: "Complété",
    canceled: "Annulé",
    notransaction: "Aucune transaction pour le moment !",
    createdtime: "Heure de création",
    creationtime: "Heure de création",
    orderNumber: "Numéro de commande",
    orderamount: "Montant de la commande",
    income: "Revenu",
    buyerating: "Évaluation de l'acheteur",
    uid: "UID",
    promotioncode: "Code de promotion",
    walletamount: "Montant du portefeuille",
    creditassesment: "Évaluation du crédit",
    myfinance: "Mes finances",
    withdraw: "Retirer",
    mydetails: "Mes informations",
    profile: "Profil",
    wallet: "Portefeuille",
    other: "Autre",
    customersupport: "Support client",
    transaction: "Transaction",
    taskshistory: "Historique des tâches",
    security: "Sécurité",
    sponsor: `Notre sécurité est notre priorité absolue, et nous voulons nous assurer que vous
              êtes protégé contre tout risque potentiel. Sachez que nous
              ne vous demanderons jamais d'envoyer de l'argent à une adresse inconnue. Avant
              d'effectuer un paiement, nous vous demandons de vérifier les détails avec nous d'abord.`,
  },
  errors: {
    backToHome: "Retour à l'accueil",
    403: `Désolé, vous n'avez pas accès à cette page`,
    404: "Désolé, la page que vous avez visitée n'existe pas",
    500: "Désolé, le serveur signale une erreur",
    429: "Trop de requêtes. Veuillez réessayer plus tard.",
    forbidden: {
      message: "Interdit",
    },
    validation: {
      message: "Une erreur s'est produite",
    },
    defaultErrorMessage: "Oups, une erreur s'est produite",
  },

  withdraw: {
    withdrawamount: "Montant du retrait",
    Withdrawpassword: "Mot de passe de retrait",
    availablebalance: "Solde disponible",
    rules: "Description des règles",
    rule1: "Le retrait minimum est de 20 $",
    rule2: "Le paiement sera effectué dans les 24 heures suivant la demande de retrait",
    rule3: "L'absence de soumission des commandes quotidiennes entraîne l'impossibilité de retrait, tous les produits doivent être soumis pour retrait"
  },
  profile: {
    profile: "Profil",
    fullname: "Nom complet",
    email: "Email",
    phonenumber: "Numéro de téléphone",
    country: "Pays",
    Invitationcode: "Code d’invitation"
  },
  wallet: {
    wallet: "Portefeuille",
    info: "Informations sur la méthode de retrait",
    username: "Nom d'utilisateur",
    walletname: 'Nom du portefeuille',
    walletaddress: 'Adresse du portefeuille',
    note: "Remarque",
    notedesctiption: "Veuillez remplir ces informations avec précaution."
  },


  cs: {
    cs: "Service client",
    note: "Si vous avez des questions ou rencontrez des problèmes, veuillez nous envoyer un email ou discuter avec notre équipe de support client en ligne.",
    contactnow: "Contacter maintenant"
  },
  transaction: {
    transaction: "Transaction",
    all: "Tout",
    withdraw: "Retrait",
    dposit: "Dépôt",
    notransaction: "Aucune transaction pour le moment !"
  },
  order: {
    order: "Commande",
    completed: "Complété",
    pending: "En attente",
    canceled: "Annulé",
    ordertime: "Heure de la commande",
    ordernumber: "Numéro de commande",
    total: "Montant total de la commande",
    commission: "Commission",
    return: "Retour estimé"
  },

  security: {
    changepassword: "Changer le mot de passe",
    oldpassword: "Ancien mot de passe",
    newpassword: "Nouveau mot de passe",
    confirmpassword: "Confirmer le mot de passe",
    note: "Remarque",
    notedesc: "Veuillez remplir ces informations avec précaution"
  },

  auth: {
    tenants: "Espaces de travail",
    singindesc: "Entrez votre email et votre mot de passe pour vous connecter",
    signupdesc: "Entrez votre email et votre mot de passe pour vous inscrire",
    profile: {
      title: "Profil",
      success: "Profil mis à jour avec succès",
      vip: "Félicitations pour votre abonnement",
    },
    createAnAccount: "Créer un compte",
    rememberMe: "Se souvenir de moi",
    forgotPassword: "Mot de passe oublié",
    signin: "Se connecter",
    signup: "S'inscrire",
    signout: "Se déconnecter",
    alreadyHaveAnAccount: "Vous avez déjà un compte ? Connectez-vous.",
    social: {
      errors: {
        "auth-invalid-provider":
          "Cet email est déjà enregistré avec un autre fournisseur.",
        "auth-no-email": `L'email associé à ce compte est privé ou inexistant.`,
      },
    },
    signinWithAnotherAccount: "Se connecter avec un autre compte",
    emailUnverified: {
      message: `Veuillez confirmer votre email à <strong>{0}</strong> pour continuer.`,
      submit: `Renvoyer l'email de vérification`,
    },
    emptyPermissions: {
      message: `Vous n'avez encore aucune permission. Attendez que l'administrateur vous accorde des privilèges.`,
    },
    passwordResetEmail: {
      message: "Envoyer un email de réinitialisation du mot de passe",
      error: `Email non reconnu`,
    },
    passwordReset: {
      message: "Réinitialiser le mot de passe",
    },
    passwordChange: {
      title: "Changer le mot de passe",
      success: "Mot de passe changé avec succès",
      mustMatch: "Les mots de passe doivent correspondre",
    },
    emailAddressVerificationEmail: {
      error: `Email non reconnu`,
    },
    verificationEmailSuccess: `Email de vérification envoyé avec succès`,
    passwordResetEmailSuccess: `Email de réinitialisation du mot de passe envoyé avec succès`,
    passwordResetSuccess: `Mot de passe changé avec succès`,
    verifyEmail: {
      success: "Email vérifié avec succès.",
      message: "Un instant, votre email est en cours de vérification...",
    },
  },

  tabbarmenue: {
    home: "Accueil",
    rate: "Évaluer",
    profile: "Profil"
  },


  validation: {
    mixed: {
      default: "${path} est invalide",
      required: "${path} est requis",
      oneOf: "${path} doit être l'une des valeurs suivantes : ${values}",
      notOneOf: "${path} ne doit pas être l'une des valeurs suivantes : ${values}",
      notType: ({ path, type, value, originalValue }) => {
        return `${path} doit être un(e) ${type}`;
      },
    },
    string: {
      length: "${path} doit contenir exactement ${length} caractères",
      min: "${path} doit contenir au moins ${min} caractères",
      max: "${path} doit contenir au maximum ${max} caractères",
      matches: '${path} doit correspondre au format suivant : "${regex}"',
      email: "${path} doit être une adresse e-mail valide",
      url: "${path} doit être une URL valide",
      trim: "${path} doit être une chaîne sans espaces au début et à la fin",
      lowercase: "${path} doit être en minuscules",
      uppercase: "${path} doit être en majuscules",
      selected: "${path} doit être sélectionné",
    },
    number: {
      min: "${path} doit être supérieur ou égal à ${min}",
      max: "${path} doit être inférieur ou égal à ${max}",
      lessThan: "${path} doit être inférieur à ${less}",
      moreThan: "${path} doit être supérieur à ${more}",
      notEqual: "${path} ne doit pas être égal à ${notEqual}",
      positive: "${path} doit être un nombre positif",
      negative: "${path} doit être un nombre négatif",
      integer: "${path} doit être un nombre entier",
    },
    date: {
      min: "${path} doit être postérieur à ${min}",
      max: "${path} doit être antérieur à ${max}",
    },
    boolean: {},
    object: {
      noUnknown:
        "${path} ne doit pas contenir de clés non spécifiées dans l'objet",
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} est requis`
          : `${path} doit contenir au moins ${min} éléments`,
      max: "${path} doit contenir au maximum ${max} éléments",
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: "Téléverser",
    image: "Vous devez téléverser une image",
    size: "Le fichier est trop volumineux. La taille maximale autorisée est de {0}",
    formats: `Format invalide. Doit être l'un des suivants : {0}.`,
  },


};

export default fr;
