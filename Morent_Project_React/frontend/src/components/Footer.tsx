import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="logo">MORENT</h3>
            <p>Our vision is to provide convenience and help increase your sales business.</p>
          </div>

          <div className="footer-section">
            <h4>{t('footer.about')}</h4>
            <ul>
              <li><a href="#">{t('footer.howItWorks')}</a></li>
              <li><a href="#">{t('footer.featured')}</a></li>
              <li><a href="#">{t('footer.partnership')}</a></li>
              <li><a href="#">{t('footer.business')}</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>{t('footer.community')}</h4>
            <ul>
              <li><a href="#">{t('footer.events')}</a></li>
              <li><a href="#">{t('footer.blog')}</a></li>
              <li><a href="#">{t('footer.podcast')}</a></li>
              <li><a href="#">{t('footer.invite')}</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>{t('footer.socials')}</h4>
            <ul>
              <li><a href="#">{t('footer.discord')}</a></li>
              <li><a href="#">{t('footer.instagram')}</a></li>
              <li><a href="#">{t('footer.twitter')}</a></li>
              <li><a href="#">{t('footer.facebook')}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t('footer.copyright')}</p>
          <div className="footer-links">
            <a href="#">{t('footer.privacy')}</a>
            <a href="#">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;