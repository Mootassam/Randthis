
import Withdraw from "src/view/pages/withdraw/Withdraw";

const tr = {
  app: {
    title: "The Light Sinema"
  },
  inputs: {
    username: "Kullanıcı Adı",
    password: "Şifre",
    phoneNumber: "Telefon Numarası",
    withdrawPassword: "Çekim Şifresi",
    confirmPassword: "Şifreyi Onayla",
    invitationcode: "Davet Kodu",
    walletaddress: "Cüzdan adresi"   

    
  },

  buttons: {
    login: "Giriş Yap",
    registerNow: "Şimdi Kaydol",
    signup: "Kayıt Ol",
    start: "Başla",
    orders: "Siparişler",
    submit: "Gönder",
    backtohome: "Ana Sayfaya Dön",
    confirm: "Onayla",
    logout: "Çıkış Yap",
    getstarted: "Başla",
  },
  text: {
    welcome: "Hoş Geldiniz",
    discover: "Size özel fırsatları keşfedin",
    signin: "Giriş Yap",
    haveaccount: "Zaten bir hesabınız var mı?",
    noaccount: "Hesabınız yok mu?",
    showingnow: "Şu An Gösterimde",
    comingsoon: "Yakında",
    termsconditions: "Şartlar & Koşullar",
    todayearning: "Bugünkü Kazanç",
    accountbalance: "Hesap Bakiyesi",
    freezebalance: "Dondurulmuş Bakiye",
    sumbitInformation: "Bilgileri Gönder",
    order: "Sipariş",
    pending: "Beklemede",
    completed: "Tamamlandı",
    canceled: "İptal Edildi",
    notransaction: "Henüz işlem bulunmamaktadır!",
    createdtime: "Oluşturulma Zamanı",
    creationtime:"Oluşturma zamanı",
    orderNumber: "Sipariş Numarası",
    orderamount: "Sipariş Tutarı",
    income: "Gelir",
    buyerating: "Alıcı Puanı",
    uid: "UID",
    promotioncode: "Promosyon Kodu",
    walletamount: "Cüzdan Bakiyesi",
    creditassesment: "Kredi Değerlendirmesi",
    myfinance: "Finanslarım",
    withdraw: "Para Çek",
    mydetails: "Bilgilerim",
    profile: "Profil",
    wallet: "Cüzdan",
    other: "Diğer",
    customersupport: "Müşteri Desteği",
    transaction: "İşlem",
    taskshistory: "Görev Geçmişi",
    security: "Güvenlik",
    sponsor: `Güvenliğimiz en büyük önceliğimizdir ve sizi 
              potansiyel risklerden korumak istiyoruz. Lütfen unutmayın, 
              asla bilinmeyen bir adrese para göndermenizi istemeyiz. 
              Ödeme yapmadan önce lütfen bilgileri bizimle doğrulayın.`,
  },
  errors: {
    backToHome: "Ana Sayfaya Dön",
    403: "Üzgünüz, bu sayfaya erişim yetkiniz yok",
    404: "Üzgünüz, ziyaret ettiğiniz sayfa mevcut değil",
    500: "Üzgünüz, sunucu bir hata bildiriyor",
    429: "Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyin.",
    forbidden: {
      message: "Erişim Engellendi",
    },
    validation: {
      message: "Bir hata oluştu",
    },
    defaultErrorMessage: "Üzgünüz, bir hata oluştu",
  },

  withdraw: {
    withdrawamount: "Çekilecek Tutar",
    Withdrawpassword: "Çekim Şifresi",
    availablebalance: "Mevcut Bakiye",
    rules: "Kurallar Açıklaması",
    rule1: "Minimum çekim tutarı 20$",
    rule2: "Çekim talebi yapıldıktan sonra ödeme 24 saat içinde yapılacaktır",
    rule3: "Günlük siparişlerin tamamı verilmezse çekim yapılamaz, tüm ürünler sunulmalıdır"
  },
  profile: {
    profile: "Profil",
    fullname: "Tam Ad",
    email: "E-Posta",
    phonenumber: "Telefon Numarası",
    country: "Ülke",
    Invitationcode: "Davet Kodu"
  },
  wallet: {
    wallet: "Cüzdan",
    info: "Çekim yöntemi bilgileri",
    username: "Kullanıcı Adı",
    walletname: "Cüzdan Adı",
    walletaddress: "Cüzdan Adresi",
    note: "Not",
    notedesctiption: "Lütfen bu bilgileri doldururken dikkatli olun."
  },

  cs: {
    cs: "Müşteri Hizmetleri",
    note: "Sorularınız veya sorunlarınız varsa, lütfen bize e-posta gönderin veya çevrimiçi müşteri destek ekibimizle sohbet edin.",
    contactnow: "Şimdi İletişime Geç"
  },
  transaction: {
    transaction: "İşlem",
    all: "Tümü",
    withdraw: "Para Çekme",
    dposit: "Para Yatırma",
    notransaction: "Henüz işlem bulunmamaktadır!"
  },
  order: {
    order: "Sipariş",
    completed: "Tamamlandı",
    pending: "Beklemede",
    canceled: "İptal Edildi",
    ordertime: "Sipariş Zamanı",
    ordernumber: "Sipariş Numarası",
    total: "Toplam Sipariş Tutarı",
    commission: "Komisyon",
    return: "Tahmini Getiri"
  },

  security: {
    changepassword: "Şifre Değiştir",
    oldpassword: "Eski Şifre",
    newpassword: "Yeni Şifre",
    confirmpassword: "Şifreyi Onayla",
    note: "Not",
    notedesc: "Lütfen bu bilgileri dikkatlice doldurun"
  },

  auth: {
    tenants: "Çalışma Alanları",
    singindesc: "Giriş yapmak için e-postanızı ve şifrenizi girin",
    signupdesc: "Kaydolmak için e-postanızı ve şifrenizi girin",
    profile: {
      title: "Profil",
      success: "Profil başarıyla güncellendi",
      vip: "Aboneliğiniz için tebrikler",
    },
    createAnAccount: "Hesap Oluştur",
    rememberMe: "Beni Hatırla",
    forgotPassword: "Şifremi Unuttum",
    signin: "Giriş Yap",
    signup: "Kaydol",
    signout: "Çıkış Yap",
    alreadyHaveAnAccount: "Zaten bir hesabınız var mı? Giriş yapın.",
    social: {
      errors: {
        "auth-invalid-provider":
          "Bu e-posta başka bir sağlayıcıda zaten kayıtlı.",
        "auth-no-email": "Bu hesapla ilişkilendirilen e-posta özel veya mevcut değil.",
      },
    },
    signinWithAnotherAccount: "Başka bir hesapla giriş yap",
    emailUnverified: {
      message: `Lütfen devam etmek için e-postanızı <strong>{0}</strong> adresinde onaylayın.`,
      submit: "E-posta Doğrulamasını Tekrar Gönder",
    },
    emptyPermissions: {
      message: "Henüz herhangi bir izniniz yok. Yönetici tarafından yetki verilmesini bekleyin.",
    },
    passwordResetEmail: {
      message: "Şifre sıfırlama e-postası gönder",
      error: "E-posta tanınmıyor",
    },
    passwordReset: {
      message: "Şifreyi Sıfırla",
    },
    passwordChange: {
      title: "Şifreyi Değiştir",
      success: "Şifre başarıyla değiştirildi",
      mustMatch: "Şifreler eşleşmelidir",
    },
    emailAddressVerificationEmail: {
      error: "E-posta tanınmıyor",
    },
    verificationEmailSuccess: "Doğrulama e-postası başarıyla gönderildi",
    passwordResetEmailSuccess: "Şifre sıfırlama e-postası başarıyla gönderildi",
    passwordResetSuccess: "Şifre başarıyla değiştirildi",
    verifyEmail: {
      success: "E-posta başarıyla doğrulandı.",
      message: "Biraz bekleyin, e-postanız doğrulanıyor...",
    },
  },

  tabbarmenue: {
    home: "Ana Sayfa",
    rate: "Değerlendir",
    profile: "Profil"
  },
  validation: {
    mixed: {
      default: "${path} geçersiz",
      required: "${path} zorunludur",
      oneOf: "${path} şu değerlerden biri olmalıdır: ${values}",
      notOneOf: "${path} şu değerlerden biri olmamalıdır: ${values}",
      notType: ({ path, type, value, originalValue }) => {
        return `${path} bir ${type} olmalıdır`;
      },
    },
    string: {
      length: "${path} tam olarak ${length} karakter olmalıdır",
      min: "${path} en az ${min} karakter olmalıdır",
      max: "${path} en fazla ${max} karakter olmalıdır",
      matches: '${path} şu desenle eşleşmelidir: "${regex}"',
      email: "${path} geçerli bir e-posta adresi olmalıdır",
      url: "${path} geçerli bir URL olmalıdır",
      trim: "${path} başında ve sonunda boşluk olmamalıdır",
      lowercase: "${path} küçük harflerden oluşmalıdır",
      uppercase: "${path} büyük harflerden oluşmalıdır",
      selected: "${path} seçilmelidir",
    },
    number: {
      min: "${path} ${min} veya daha büyük olmalıdır",
      max: "${path} ${max} veya daha küçük olmalıdır",
      lessThan: "${path} ${less} değerinden küçük olmalıdır",
      moreThan: "${path} ${more} değerinden büyük olmalıdır",
      notEqual: "${path} ${notEqual} değerine eşit olmamalıdır",
      positive: "${path} pozitif bir sayı olmalıdır",
      negative: "${path} negatif bir sayı olmalıdır",
      integer: "${path} bir tam sayı olmalıdır",
    },
    date: {
      min: "${path} ${min} tarihinden sonra olmalıdır",
      max: "${path} ${max} tarihinden önce olmalıdır",
    },
    boolean: {},
    object: {
      noUnknown:
        "${path} belirtilmeyen anahtarlar içermemelidir",
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} zorunludur`
          : `${path} en az ${min} öğe içermelidir`,
      max: "${path} en fazla ${max} öğe içermelidir",
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: "Yükle",
    image: "Bir resim yüklemelisiniz",
    size: "Dosya çok büyük. Maksimum izin verilen boyut {0}",
    formats: `Geçersiz format. Şunlardan biri olmalıdır: {0}.`,
  },

};

export default tr;
