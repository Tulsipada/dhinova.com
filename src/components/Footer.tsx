const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-1">Dhinova Technology Pvt Ltd</h3>
            <p className="text-sm text-primary-foreground/80">
              Innovative Technology Solutions
            </p>
          </div>
          <div className="text-center md:text-right text-sm text-primary-foreground/80">
            <p>&copy; {new Date().getFullYear()} Dhinova Technology. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
