import Withdraw from "src/view/pages/withdraw/Withdraw";

const de = {
  app: {
    title: "Das Licht Kino"
  },
  inputs: {
    username: "Benutzername",
    password: "Passwort",
    phoneNumber: "Telefonnummer",
    withdrawPassword: "Auszahlungs-Passwort",
    confirmPassword: "Passwort bestätigen",
    invitationcode: "Einladungscode",
    walletaddress: "Wallet-Adresse"
  },

  buttons: {
    login: "Anmelden",
    registerNow: "Jetzt registrieren",
    signup: "Registrieren",
    start: "Start",
    orders: "Bestellungen",
    submit: "Absenden",
    backtohome: "Zurück zur Startseite",
    confirm: "Bestätigen",
    logout: "Abmelden",
    getstarted: "Loslegen",
  },
  text: {
    welcome: "Willkommen",
    discover: "Entdecken Sie exklusive Angebote nur für Sie",
    signin: "Anmelden",
    haveaccount: "Bereits ein Konto?",
    noaccount: "Noch kein Konto?",
    showingnow: "Jetzt im Kino",
    comingsoon: "Demnächst",
    termsconditions: "Allgemeine Geschäftsbedingungen",
    todayearning: "Heutiges Einkommen",
    accountbalance: "Kontostand",
    freezebalance: "Eingefrorenes Guthaben",
    sumbitInformation: "Informationen übermitteln",
    order: "Bestellung",
    pending: "Ausstehend",
    completed: "Abgeschlossen",
    canceled: "Storniert",
    notransaction: "Es gibt noch keine Transaktionen!",
    createdtime: "Erstellungszeit",
    creationtime: "Erstellungszeit",
    orderNumber: "Bestellnummer",
    orderamount: "Bestellbetrag",
    income: "Einkommen",
    buyerating: "Käuferbewertung",
    uid: "UID",
    promotioncode: "Rabattcode",
    walletamount: "Wallet-Betrag",
    creditassesment: "Kreditbewertung",
    myfinance: "Meine Finanzen",
    withdraw: "Auszahlen",
    mydetails: "Meine Daten",
    profile: "Profil",
    wallet: "Wallet",
    other: "Andere",
    customersupport: "Kundensupport",
    transaction: "Transaktion",
    taskshistory: "Aufgabenverlauf",
    security: "Sicherheit",
    sponsor: `Unsere Sicherheit hat oberste Priorität, und wir möchten sicherstellen, dass
              Sie vor potenziellen Risiken geschützt sind. Bitte beachten Sie, dass wir
              Sie niemals auffordern werden, Geld an eine unbekannte Adresse zu senden. Bevor
              Sie Zahlungen tätigen, überprüfen Sie bitte die Details bei uns.`,
  },
  errors: {
    backToHome: "Zurück zur Startseite",
    403: "Entschuldigung, Sie haben keinen Zugriff auf diese Seite",
    404: "Entschuldigung, die von Ihnen besuchte Seite existiert nicht",
    500: "Entschuldigung, der Server meldet einen Fehler",
    429: "Zu viele Anfragen. Bitte versuchen Sie es später erneut.",
    forbidden: {
      message: "Zugriff verweigert",
    },
    validation: {
      message: "Ein Fehler ist aufgetreten",
    },
    defaultErrorMessage: "Hoppla, ein Fehler ist aufgetreten",
  },

  withdraw: {
    withdrawamount: "Auszahlungsbetrag",
    Withdrawpassword: "Auszahlungs-Passwort",
    availablebalance: "Verfügbares Guthaben",
    rules: "Regelbeschreibung",
    rule1: "Der Mindestbetrag für eine Auszahlung beträgt 20 $",
    rule2: "Die Zahlung erfolgt innerhalb von 24 Stunden nach Beantragung der Auszahlung",
    rule3: "Unvollständige tägliche Bestellungen können nicht ausgezahlt werden, alle Produkte müssen eingereicht werden"
  },
  profile: {
    profile: "Profil",
    fullname: "Vollständiger Name",
    email: "E-Mail",
    phonenumber: "Telefonnummer",
    country: "Land",
    Invitationcode: "Einladungscode"
  },
  wallet: {
    wallet: "Wallet",
    info: "Informationen zur Auszahlungsmethode",
    username: "Benutzername",
    walletname: "Wallet-Name",
    walletaddress: "Wallet-Adresse",
    note: "Hinweis",
    notedesctiption: "Bitte seien Sie vorsichtig beim Ausfüllen dieser Informationen."
  },

  cs: {
    cs: "Kundendienst",
    note: "Wenn Sie Fragen haben oder auf Probleme stoßen, senden Sie uns eine E-Mail oder chatten Sie mit unserem Online-Kundendienstteam.",
    contactnow: "Jetzt kontaktieren"
  },
  transaction: {
    transaction: "Transaktion",
    all: "Alle",
    withdraw: "Auszahlung",
    dposit: "Einzahlung",
    notransaction: "Es gibt noch keine Transaktionen!"
  },
  order: {
    order: "Bestellung",
    completed: "Abgeschlossen",
    pending: "Ausstehend",
    canceled: "Storniert",
    ordertime: "Bestellzeit",
    ordernumber: "Bestellnummer",
    total: "Gesamtbetrag der Bestellung",
    commission: "Provision",
    return: "Geschätzte Rückzahlung"
  },

  security: {
    changepassword: "Passwort ändern",
    oldpassword: "Altes Passwort",
    newpassword: "Neues Passwort",
    confirmpassword: "Passwort bestätigen",
    note: "Hinweis",
    notedesc: "Bitte füllen Sie diese Informationen sorgfältig aus"
  },

  auth: {
    tenants: "Arbeitsbereiche",
    singindesc: "Geben Sie Ihre E-Mail und Ihr Passwort ein, um sich anzumelden",
    signupdesc: "Geben Sie Ihre E-Mail und Ihr Passwort ein, um sich zu registrieren",
    profile: {
      title: "Profil",
      success: "Profil erfolgreich aktualisiert",
      vip: "Herzlichen Glückwunsch zum Abonnement",
    },
    createAnAccount: "Ein Konto erstellen",
    rememberMe: "Angemeldet bleiben",
    forgotPassword: "Passwort vergessen?",
    signin: "Anmelden",
    signup: "Registrieren",
    signout: "Abmelden",
    alreadyHaveAnAccount: "Haben Sie bereits ein Konto? Anmelden.",
    social: {
      errors: {
        "auth-invalid-provider":
          "Diese E-Mail ist bereits bei einem anderen Anbieter registriert.",
        "auth-no-email": "Die mit diesem Konto verknüpfte E-Mail ist privat oder nicht vorhanden.",
      },
    },
    signinWithAnotherAccount: "Mit einem anderen Konto anmelden",
    emailUnverified: {
      message: `Bitte bestätigen Sie Ihre E-Mail unter <strong>{0}</strong>, um fortzufahren.`,
      submit: "E-Mail-Bestätigung erneut senden",
    },
    emptyPermissions: {
      message: "Sie haben noch keine Berechtigungen. Warten Sie, bis der Administrator Ihnen Zugriffsrechte erteilt.",
    },
    passwordResetEmail: {
      message: "E-Mail zum Zurücksetzen des Passworts senden",
      error: "E-Mail nicht erkannt",
    },
    passwordReset: {
      message: "Passwort zurücksetzen",
    },
    passwordChange: {
      title: "Passwort ändern",
      success: "Passwort erfolgreich geändert",
      mustMatch: "Die Passwörter müssen übereinstimmen",
    },
    emailAddressVerificationEmail: {
      error: "E-Mail nicht erkannt",
    },
    verificationEmailSuccess: "Bestätigungs-E-Mail erfolgreich gesendet",
    passwordResetEmailSuccess: "Passwort-Reset-E-Mail erfolgreich gesendet",
    passwordResetSuccess: "Passwort erfolgreich geändert",
    verifyEmail: {
      success: "E-Mail erfolgreich bestätigt.",
      message: "Einen Moment, Ihre E-Mail wird überprüft...",
    },
  },

  tabbarmenue: {
    home: "Startseite",
    rate: "Bewerten",
    profile: "Profil"
  },

  validation: {
    mixed: {
      default: "${path} ist ungültig",
      required: "${path} ist erforderlich",
      oneOf: "${path} muss einer der folgenden Werte sein: ${values}",
      notOneOf: "${path} darf keiner der folgenden Werte sein: ${values}",
      notType: ({ path, type, value, originalValue }) => {
        return `${path} muss ein ${type} sein`;
      },
    },
    string: {
      length: "${path} muss genau ${length} Zeichen lang sein",
      min: "${path} muss mindestens ${min} Zeichen lang sein",
      max: "${path} darf höchstens ${max} Zeichen lang sein",
      matches: '${path} muss folgendem Muster entsprechen: "${regex}"',
      email: "${path} muss eine gültige E-Mail-Adresse sein",
      url: "${path} muss eine gültige URL sein",
      trim: "${path} darf keine führenden oder nachgestellten Leerzeichen enthalten",
      lowercase: "${path} muss in Kleinbuchstaben sein",
      uppercase: "${path} muss in Großbuchstaben sein",
      selected: "${path} muss ausgewählt sein",
    },
    number: {
      min: "${path} muss größer oder gleich ${min} sein",
      max: "${path} muss kleiner oder gleich ${max} sein",
      lessThan: "${path} muss kleiner als ${less} sein",
      moreThan: "${path} muss größer als ${more} sein",
      notEqual: "${path} darf nicht gleich ${notEqual} sein",
      positive: "${path} muss eine positive Zahl sein",
      negative: "${path} muss eine negative Zahl sein",
      integer: "${path} muss eine ganze Zahl sein",
    },
    date: {
      min: "${path} muss nach ${min} liegen",
      max: "${path} muss vor ${max} liegen",
    },
    boolean: {},
    object: {
      noUnknown:
        "${path} darf keine nicht definierten Schlüssel enthalten",
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} ist erforderlich`
          : `${path} muss mindestens ${min} Elemente enthalten`,
      max: "${path} darf höchstens ${max} Elemente enthalten",
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: "Hochladen",
    image: "Sie müssen ein Bild hochladen",
    size: "Die Datei ist zu groß. Die maximal erlaubte Größe beträgt {0}",
    formats: `Ungültiges Format. Muss eines der folgenden sein: {0}.`,
  },

};

export default de;
