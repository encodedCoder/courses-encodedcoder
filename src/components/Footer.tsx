import SocialIcons from "./SocialIcons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container mx-auto text-center pb-4 content-width">
        <SocialIcons />
        <p className="footer-mobile-text">
          Copyright &copy; {new Date().getFullYear()} encodedCoder · Suresh.{" "}
          <span>All rights reserved.</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
