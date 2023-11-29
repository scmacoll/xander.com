import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer
      className={`flex pt-10`}
    >
      {/* <div className="absolute inset-y-0 left-1/2 border-l-2 border-dashed border-grey"></div> */}
      <div className={`flex py-8 w-95% border-t border-solid border-foreground justify-center mx-auto`}>
        <div className={`flex justify-evenly w-95% text-gray-500 text-xs`}>
          <nav className="flex flex-col gap-2">
            <header className="pb-2 font-bold">Services</header>
            <div className="text-gray-400 hover:underline cursor-pointer font-bold">Design</div>
            <div className="text-gray-400 hover:underline cursor-pointer font-bold">Marketing</div>
            <div className="text-gray-400 hover:underline cursor-pointer font-bold">Advertisement</div>
          </nav>
          <nav className="flex flex-col gap-2">
            <header className="pb-2 font-bold">Company</header>
            <div className="text-gray-400 hover:underline cursor-pointer font-bold">About</div>
            <div className="text-gray-400 hover:underline cursor-pointer font-bold">Contact</div>
            <div className="text-gray-400 hover:underline cursor-pointer font-bold">Press Kit</div>
          </nav>
          <nav className="flex flex-col gap-2">
            <header className="pb-2 font-bold">Legal</header>
            <div className="text-gray-400 hover:underline cursor-pointer font-bold">Terms of use</div>
            <div className="text-gray-400 hover:underline cursor-pointer font-bold">Privacy Policy</div>
            <div className="text-gray-400 hover:underline cursor-pointer font-bold">Cookie policy</div>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
