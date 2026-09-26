import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  textClassName?: string;
  iconClassName?: string;
  asLink?: boolean;
};

const BrandMark = ({
  className,
  textClassName,
  iconClassName,
  asLink = true,
}: BrandMarkProps) => {
  const content = (
    <img
      src="/nav-logo-light.png"
      alt="DhiNova"
      width={2172}
      height={724}
      className={cn(
        "h-auto w-36 object-contain drop-shadow-[0_0_14px_rgba(14,165,233,0.28)] sm:w-40",
        iconClassName,
        textClassName
      )}
    />
  );

  if (!asLink) {
    return <span className={cn("inline-flex items-center gap-2.5", className)}>{content}</span>;
  }

  return (
    <Link to="/" className={cn("inline-flex shrink-0 items-center gap-3", className)} aria-label="Dhinova">
      {content}
    </Link>
  );
};

export default BrandMark;
