const PageLoader = () => (
  <div
    className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0a192f]"
    role="status"
    aria-label="Loading"
  >
    <img
      src="/nav-logo-light.webp"
      alt=""
      width={640}
      height={130}
      className="animate-logo-breathe h-auto w-[min(280px,72vw)]"
    />
  </div>
);

export default PageLoader;
