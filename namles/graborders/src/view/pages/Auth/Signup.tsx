import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import actions from "src/modules/auth/authActions";
import selectors from "src/modules/auth/authSelectors";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import InputFormItem from "src/shared/form/InputFormItem";
import SelectFormItem from "src/shared/form/SelectFormItem";
import ButtonIcon from "src/shared/ButtonIcon";
import userEnumerators from "src/modules/user/userEnumerators";
import CsPage from "./CsPage";

// ✅ Validation Schema
const schema = yup.object().shape({
  email: yupFormSchemas.string(i18n("user.fields.username"), {
    required: true,
  }),
  password: yupFormSchemas.string(i18n("user.fields.password"), {
    required: true,
  }),
  newPasswordConfirmation: yupFormSchemas
    .string(i18n("user.fields.newPasswordConfirmation"), {
      required: true,
    })
    .oneOf([yup.ref("password")], i18n("auth.passwordChange.mustMatch")),
  phoneNumber: yupFormSchemas.string(i18n("user.fields.phoneNumber"), {
    required: true,
  }),
  withdrawPassword: yupFormSchemas.string(
    i18n("user.fields.withdrawPassword"),
    { required: true }
  ),
  invitationcode: yupFormSchemas.string(i18n("user.fields.invitationcode"), {
    required: true,
  }),
  rememberMe: yupFormSchemas.boolean(i18n("user.fields.rememberMe")),
});

function Signup() {
  const dispatch = useDispatch();
  const loading = useSelector(selectors.selectLoading);
  const externalErrorMessage = useSelector(selectors.selectErrorMessage);

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [initialValues] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    withdrawPassword: "",
    invitationcode: "",
    gender: '',
    rememberMe: true,
  });

  // ✅ Fetch countries + IP country detection
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,flags,idd,cca2"
        );

        const countriesData = response.data
          .filter((c) => c.idd?.root)
          .map((country) => ({
            value:
              country.idd.root +
              (country.idd.suffixes ? country.idd.suffixes[0] : ""),
            label: country.name.common,
            code: country.cca2,
            flag: country.flags.svg,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));

        setCountries(countriesData);

        try {
          const ipResponse = await axios.get("https://ip2c.org/s");
          const countryCode = ipResponse.data.split(";")[1];
          const defaultCountry = countriesData.find(
            (c) => c.code === countryCode
          );
          setSelectedCountry(defaultCountry || countriesData[0]);
        } catch {
          setSelectedCountry(countriesData[0]);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current?.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  const onSubmit = ({
    email,
    password,
    phoneNumber,
    withdrawPassword,
    invitationcode,
    gender,
  }) => {
    const fullPhoneNumber = `${selectedCountry?.value || "+1"}${phoneNumber}`;
    dispatch(
      actions.doRegisterEmailAndPassword(
        email,
        password,
        fullPhoneNumber,
        withdrawPassword,
        invitationcode,
        gender
      )
    );
  };

  return (
    <div className="auth__page">
      <div className="header__signup">
        <h1 className="auth__title">Create Account</h1>
        <span className="auth__description __v2">
          Sign up for a Marketing account.
        </span>
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="auth__form">
            <InputFormItem
              type="text"
              name="email"
              placeholder={i18n("user.fields.username")}
              className="auth__input"
              externalErrorMessage={externalErrorMessage}
            />

            {/* ✅ Improved Phone Number Input with Integrated Country Selector */}
            <div className="phone-input-wrapper">
              <div
                className={`phone-input-container ${dropdownOpen ? 'dropdown-open' : ''}`}
                ref={dropdownRef}
              >
                <div className="phone-input-inner">
                  {/* Country Selector */}
                  <div
                    className="country-selector"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {selectedCountry && (
                      <div className="country-selected">
                        <img
                          src={selectedCountry.flag}
                          alt={selectedCountry.label}
                          className="country-flag"
                        />
                        <span className="country-code">{selectedCountry.value}</span>
                        <span className="dropdown-arrow">▾</span>
                      </div>
                    )}
                  </div>

                  {/* Phone Number Input */}
                  <div className="phone-number-input">
                    <InputFormItem
                      type="tel"
                      name="phoneNumber"
                      placeholder="Enter your phone number"
                      className="auth__input phone-input"
                    />
                  </div>
                </div>

                {/* Country Dropdown */}
                {dropdownOpen && (
                  <div className="country-dropdown">
                    <div className="dropdown-search">
                      <input
                        type="text"
                        placeholder="Search countries..."
                        className="search-input"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <div className="dropdown-list">
                      {countries.map((country) => (
                        <div
                          key={country.code}
                          className={`country-option ${selectedCountry?.code === country.code ? "selected" : ""
                            }`}
                          onClick={() => {
                            setSelectedCountry(country);
                            setDropdownOpen(false);
                          }}
                        >
                          <img
                            src={country.flag}
                            alt={country.label}
                            className="country-flag"
                          />
                          <span className="country-name">{country.label}</span>
                          <span className="country-dial-code">{country.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <InputFormItem
              type="password"
              name="withdrawPassword"
              placeholder={i18n("user.fields.withdrawPassword")}
              className="auth__input"
            />

            <InputFormItem
              type="password"
              name="password"
              placeholder={i18n("user.fields.password")}
              className="auth__input"
            />

            <InputFormItem
              type="password"
              name="newPasswordConfirmation"
              autoComplete="new-password"
              placeholder={i18n("user.fields.confirmPassword")}
              className="auth__input"
            />

            <SelectFormItem
              name="gender"
              placeholder={i18n("user.fields.genre")}
              options={userEnumerators.genre.map((value) => ({
                value,
                label: i18n(`user.enumerators.genre.${value}`),
              }))}
              required
            />

            <InputFormItem
              type="text"
              name="invitationcode"
              placeholder={i18n("user.fields.invitationcode")}
              className="auth__input"
              externalErrorMessage={externalErrorMessage}
            />
          </div>

          <div className="auth__bottom">
            <button className="auth__button" disabled={loading} type="submit">
              <ButtonIcon loading={loading} />
              <span>Sign up</span>
            </button>

            <Link to="/auth/signin" className="remove__ligne">
              <span className="auth__link">Already have an account?</span>
            </Link>
          </div>
        </form>
      </FormProvider>

      <CsPage />
      <style>{`


/* Phone Input Styles */
.phone-input-wrapper {
  margin-bottom: 1rem;
}

.phone-input-wrapper .form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
  font-size: 0.9rem;
}

.phone-input-container {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fff;
  transition: all 0.2s ease;
}

.phone-input-container:focus-within,
.phone-input-container.dropdown-open {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.phone-input-inner {
  display: flex;
  align-items: stretch;
  min-height: 48px;
}

.country-selector {
  flex: 0 0 auto;
  border-right: 1px solid #eee;
  background: #f8f9fa;
  border-radius: 6px 0 0 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.country-selector:hover {
  background: #e9ecef;
}

.country-selected {
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: 100%;
  min-width: 100px;
}

.country-flag {
  width: 20px;
  height: 15px;
  object-fit: cover;
  border-radius: 2px;
  margin-right: 8px;
}

.country-code {
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
  margin-right: 8px;
}

.dropdown-arrow {
  color: #666;
  font-size: 12px;
  transition: transform 0.2s ease;
}

.phone-input-container.dropdown-open .dropdown-arrow {
  transform: rotate(180deg);
}

.phone-number-input {
  flex: 1;
}

.phone-input {
  border: none !important;
  border-radius: 0 6px 6px 0 !important;
  padding-left: 12px !important;
  height: 100% !important;
  box-shadow: none !important;
}

.phone-input:focus {
  outline: none;
  box-shadow: none !important;
}

/* Country Dropdown */
.country-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  margin-top: 4px;
  max-height: 300px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.dropdown-search {
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
}

.dropdown-list {
  flex: 1;
  overflow-y: auto;
  max-height: 250px;
}

.country-option {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #f5f5f5;
}

.country-option:last-child {
  border-bottom: none;
}

.country-option:hover {
  background: #f8f9fa;
}

.country-option.selected {
  background: #e3f2fd;
}

.country-option .country-flag {
  margin-right: 10px;
  flex-shrink: 0;
}

.country-option .country-name {
  flex: 1;
  font-size: 0.9rem;
  color: #333;
}

.country-option .country-dial-code {
  font-size: 0.85rem;
  color: #666;
  font-weight: 500;
  margin-left: 8px;
}

/* Scrollbar Styling */
.dropdown-list::-webkit-scrollbar {
  width: 6px;
}

.dropdown-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.dropdown-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.dropdown-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Responsive Design */
@media (max-width: 768px) {
  .phone-input-inner {
    flex-direction: column;
    min-height: auto;
  }
  
  .country-selector {
    border-right: none;
    border-bottom: 1px solid #eee;
    border-radius: 6px 6px 0 0;
  }
  
  .phone-number-input .auth__input {
    border-radius: 0 0 6px 6px !important;
  }
  
  .country-selected {
    min-width: auto;
    justify-content: space-between;
    padding: 8px 12px;
  }
}
      `}</style>
    </div>
  );
}

export default Signup;