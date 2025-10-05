
const it = {
    app: {
        title: "The Light Cinema"
    },
    inputs: {
        username: "Nome utente",
        password: "password",
        phoneNumber: "Numero di telefono",
        withdrawPassword: "Password di prelievo",
        confirmPassword: "Conferma password",
        invitationcode: "Codice di invito",
        walletaddress: "Indirizzo del portafoglio"

    },

    buttons: {
        login: "Accedi",
        registerNow: "Registrati ora",
        signup: "Iscriviti",
        start: "Inizia",
        orders: "Ordini",
        submit: "Invia",
        backtohome: "Torna alla home",
        confirm: "Conferma",
        logout: "Disconnetti",
        getstarted: "Inizia",
    },
    text: {
        welcome: "Benvenuto",
        discover: "Scopri offerte esclusive solo per te",
        signin: "Accedi",
        haveaccount: "Hai già un account",
        noaccount: "Non hai un account",
        showingnow: "In programmazione",
        comingsoon: "Prossimamente",
        termsconditions: "Termini e condizioni",
        todayearning: "Guadagni di oggi",
        accountbalance: "Saldo del conto",
        freezebalance: "Saldo bloccato",
        sumbitInformation: "Invia informazioni",
        order: "Ordine",
        pending: "In sospeso",
        completed: "Completato",
        canceled: "Annullato",
        notransaction: "Nessuna transazione fino ad ora!",
        createdtime: "Ora di creazione",
        creationtime: "Tempo di creazione",
        orderNumber: "Numero d'ordine",
        orderamount: "Importo dell'ordine",
        income: "Reddito",
        buyerating: "Valutazione dell'acquirente",
        uid: "UID",
        promotioncode: "Codice promozionale",
        walletamount: "Importo portafoglio",
        creditassesment: "Valutazione del credito",
        myfinance: "Le mie finanze",
        withdraw: "Prelievo",
        mydetails: "I miei dettagli",
        profile: "Profilo",
        wallet: "Portafoglio",
        other: "Altro",
        customersupport: "Supporto clienti",
        transaction: "Transazione",
        taskshistory: "Cronologia attività",
        security: "Sicurezza",
        sponsor: "La nostra sicurezza è la nostra massima priorità e vogliamo assicurarci che tu sia protetto da eventuali rischi. Ti informiamo che non ti chiederemo mai di inviare denaro a un indirizzo sconosciuto. Prima di effettuare pagamenti, ti chiediamo gentilmente di verificare i dettagli con noi.",
    },
    errors: {
        backToHome: "Torna alla home",
        403: "Spiacente, non hai accesso a questa pagina",
        404: "Spiacente, la pagina che hai visitato non esiste",
        500: "Spiacente, il server sta segnalando un errore",
        429: "Troppe richieste. Riprova più tardi.",
        forbidden: {
            message: "Vietato",
        },
        validation: {
            message: "Si è verificato un errore",
        },
        defaultErrorMessage: "Ops, si è verificato un errore",
    },

    withdraw: {
        withdrawamount: "Importo del prelievo",
        Withdrawpassword: "Password di prelievo",
        availablebalance: "Saldo disponibile",
        rules: "Descrizione delle regole",
        rule1: "Il prelievo minimo è di 20$",
        rule2: "Il pagamento verrà effettuato entro 24 ore dalla richiesta di prelievo",
        rule3: "La mancata presentazione dell'ordine giornaliero comporta l'impossibilità di prelevare, tutti i prodotti devono essere presentati per il prelievo"
    },

    profile: {
        profile: "Profilo",
        fullname: "Nome completo",
        email: "Email",
        phonenumber: "Numero di telefono",
        country: "Paese",
        Invitationcode: "Codice di invito"
    },

    wallet: {
        wallet: "Portafoglio",
        info: "Informazioni sul metodo di prelievo",
        username: "Nome utente",
        walletname: "Nome del portafoglio",
        walletaddress: "Indirizzo del portafoglio",
        note: "Nota",
        notedesctiption: "Si prega di prestare attenzione nella compilazione di queste informazioni."
    },

    cs: {
        cs: "Servizio clienti",
        note: "Se hai domande o riscontri problemi, inviaci un'email o chatta con il nostro team di supporto online.",
        contactnow: "Contatta ora"
    },

    transaction: {
        transaction: "Transazione",
        all: "Tutti",
        withdraw: "Prelievo",
        dposit: "Deposito",
        notransaction: "Nessuna transazione fino ad ora!"
    },

    tabbarmenue: {
        home: "Home",
        rate: "Valutazione",
        profile: "Profilo"
    },

    validation: {
        mixed: {
            default: "${path} non è valido",
            required: "${path} è obbligatorio",
            oneOf: "${path} deve essere uno dei seguenti valori: ${values}",
            notOneOf: "${path} non deve essere uno dei seguenti valori: ${values}",
            notType: ({ path, type }) => `${path} deve essere un ${type}`,
        },
        string: {
            length: "${path} deve essere esattamente di ${length} caratteri",
            min: "${path} deve avere almeno ${min} caratteri",
            max: "${path} deve avere al massimo ${max} caratteri",
            matches: "${path} deve corrispondere a: \"${regex}\"",
            email: "${path} deve essere un'email valida",
            url: "${path} deve essere un URL valido",
        },
    },

    fileUploader: {
        upload: "Carica",
        image: "Devi caricare un'immagine",
        size: "Il file è troppo grande. La dimensione massima consentita è {0}",
        formats: "Formato non valido. Deve essere uno di: {0}."
    }
};

export default it;
