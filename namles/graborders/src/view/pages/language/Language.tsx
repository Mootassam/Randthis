import React, { useState } from "react";
import I18nSelect from "src/view/layout/I18nSelect";
import SubHeader from "src/view/shared/Header/SubHeader";

function LanguagePage() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [searchTerm, setSearchTerm] = useState("");

  const languages = [
    {
      code: "en",
      name: "English",
      nativeName: "English",
      flag: "🇺🇸"
    },
    {
      code: "fr",
      name: "French",
      nativeName: "Français",
      flag: "🇫🇷"
    },
    {
      code: "ru",
      name: "Russian",
      nativeName: "Русский",
      flag: "🇷🇺"
    },
    {
      code: "de",
      name: "German",
      nativeName: "Deutsch",
      flag: "🇩🇪"
    },
    {
      code: "es",
      name: "Spanish",
      nativeName: "Español",
      flag: "🇪🇸"
    }
  ];

  const filteredLanguages = languages.filter(language =>
    language.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    language.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.name);
    // Here you would typically dispatch an action to change the app language
    console.log(`App language changed to: ${language.name}`);
  };

  return (
    <div className="language-page-container">
      <SubHeader title="App Language" path="/profile" />



      <div style={{ paddingTop: '20px' }}>


        <I18nSelect />

      </div>
    </div>

  );
}

export default LanguagePage;