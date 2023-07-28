import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={`${styles.footer} flex relative w-full min-h-screen`}>
      <div className="absolute left-1/2 border-l-2 border-dashed border-grey"></div>
    </footer>
  );
};

export default Footer;
