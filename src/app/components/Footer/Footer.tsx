import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer
      className={`flex pt-10`}
    >
      {/* <div className="absolute inset-y-0 left-1/2 border-l-2 border-dashed border-grey"></div> */}
      <div className={`flex py-3 w-95% border-t border-solid border-foreground justify-center mx-auto`}>
        <div className={`flex justify-evenly w-full text-gray-500 text-sm`}>
          <div>About</div>
          <div>Contact</div>
          <div>Support</div>
          <div>Terms of Service</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
