import React from 'react';
import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { Link } from 'react-router-dom';

function Company() {
  const menuItems = [
    {
      path: '/logo',
      icon: 'fa-solid fa-cog',
      title: 'Settings',
      color: '#3B82F6'
    },
    {
      path: '/companydetail',
      icon: 'fa-solid fa-circle-exclamation',
      title: 'About',
      color: '#10B981'
    },
    {
      path: '/tc',
      icon: 'fa-solid fa-file-contract',
      title: 'Terms & Conditions',
      color: '#F59E0B'
    },
    {
      path: '/faqs',
      icon: 'fa-solid fa-question',
      title: 'FAQs',
      color: '#8B5CF6'
    }
  ];

  return (
    <div className="company-page">
      <style>{`
        .company-page {
          min-height: 100vh;
          background: #f8fafc;
        }
        
        .company-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 15px;
        }
        
        .company-header {
          text-align: center;
          margin-bottom: 30px;
          padding: 20px;
        }
        
        .company-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 8px;
        }
        
        .company-subtitle {
          color: #6B7280;
          font-size: 1rem;
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.5;
        }
        
        .company-grid {
          display: flex;
          justify-content: center;
          align-items: stretch;
          flex-wrap: wrap;
          gap: 20px;
          padding: 10px;
        }
        
        .company-card {
          background: white;
          border-radius: 12px;
          padding: 25px 20px;
          text-decoration: none;
          display: block;
          transition: all 0.2s ease;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          width: 220px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .company-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--card-color), transparent);
        }
        
        .company-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
          border-color: transparent;
        }
        
        .card-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 24px;
          color: white;
          background: linear-gradient(135deg, var(--card-color), var(--card-color));
        }
        
        .card-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #1F2937;
          margin-bottom: 8px;
        }
        
        .card-description {
          color: #6B7280;
          font-size: 0.85rem;
          line-height: 1.4;
        }
        
        @media (max-width: 1024px) {
          .company-grid {
            gap: 15px;
          }
          
          .company-card {
            width: 200px;
            padding: 20px 15px;
          }
        }
        
        @media (max-width: 768px) {
          .company-grid {
            justify-content: center;
            gap: 15px;
          }
          
          .company-card {
            width: 180px;
            padding: 18px 12px;
          }
          
          .company-header {
            padding: 15px;
            margin-bottom: 20px;
          }
          
          .company-title {
            font-size: 1.8rem;
          }
        }
        
        @media (max-width: 640px) {
          .company-grid {
            flex-direction: column;
            align-items: center;
          }
          
          .company-card {
            width: 100%;
            max-width: 300px;
            display: flex;
            align-items: center;
            padding: 15px 20px;
            text-align: left;
          }
          
          .card-icon {
            margin: 0 20px 0 0;
            flex-shrink: 0;
          }
          
          .card-content {
            flex-grow: 1;
          }
        }
        
        @media (max-width: 480px) {
          .company-container {
            padding: 10px;
          }
          
          .company-card {
            padding: 12px 16px;
          }
          
          .card-icon {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }
        }
      `}</style>

      <ContentWrapper>
        <div className="company-container">
          <div className="company-header">
            <PageTitle className="company-title">
              {i18n('entities.company.title')}
            </PageTitle>
            <p className="company-subtitle">
              Manage company settings and information
            </p>
          </div>

          <div className="company-grid">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="company-card"
                style={{ '--card-color': item.color } as React.CSSProperties}
              >
                <div className="card-icon">
                  <i className={item.icon}></i>
                </div>
                
                <div className="card-content">
                  <h3 className="card-title">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default Company;