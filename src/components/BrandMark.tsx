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
    <>
      <img
        src="/dhinova.png"
        alt=""
        width={36}
        height={36}
        className={cn("h-9 w-9 object-contain", iconClassName)}
      />
      <span
        className={cn(
          "font-display text-lg font-bold tracking-tight text-brand-gradient",
          textClassName
        )}
      >
        DhiNova
      </span>
    </>
  );

  if (!asLink) {
    return <span className={cn("inline-flex items-center gap-2.5", className)}>{content}</span>;
  }

  return (
    <Link to="/" className={cn("inline-flex shrink-0 items-center gap-2.5", className)} aria-label="Dhinova">
      {content}
    </Link>
  );
};

export default BrandMark;
