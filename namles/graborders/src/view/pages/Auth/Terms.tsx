import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CompanyService from "src/modules/company/companyService";
import LoadingModal from "src/shared/LoadingModal";
import { i18n } from "../../../i18n";

function Terms() {
  const [loading, setLoading] = useState(true);
  const [tc, setTc] = useState("");

  useEffect(() => {
    const fetchTc = async () => {
      try {
        const response = await CompanyService.findPublicTc();
        setTc(response?.tc || "");
      } finally {
        setLoading(false);
      }
    };

    fetchTc();
  }, []);

  return (
    <div className="terms__page">
      <div className="terms__header">
        <Link to="/auth/signup" className="terms__back">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <h3 className="terms__title">
          {i18n("pages.actions.tc")}
        </h3>
      </div>

      <div className="terms__content">
        {loading && <LoadingModal />}
        {!loading && tc && (
          <p dangerouslySetInnerHTML={{ __html: tc }} />
        )}
        {!loading && !tc && (
          <p className="terms__empty">
            {i18n("pages.auth.signup.termsNotAvailable")}
          </p>
        )}
      </div>

      <style>{`
        .terms__page {
          min-height: 100vh;
          background: #0f172a;
          color: #e2e8f0;
        }

        .terms__header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border-bottom: 1px solid #374151;
          position: sticky;
          top: 0;
        }

        .terms__back {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(30, 41, 59, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #e2e8f0;
          text-decoration: none;
        }

        .terms__title {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
          color: #f1f5f9;
        }

        .terms__content {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px;
          white-space: pre-line;
          line-height: 1.6;
        }

        .terms__empty {
          color: #94a3b8;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Terms;
