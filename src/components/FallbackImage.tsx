import { useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type FallbackImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
  fallbackClassName?: string;
};

const FallbackImage = ({
  src,
  className,
  fallbackSrc = "/dhinova.png",
  fallbackClassName,
  onError,
  ...props
}: FallbackImageProps) => {
  const [hasFailed, setHasFailed] = useState(false);

  return (
    <img
      {...props}
      src={hasFailed ? fallbackSrc : src}
      className={cn(className, hasFailed && fallbackClassName)}
      onError={(event) => {
        if (!hasFailed) setHasFailed(true);
        onError?.(event);
      }}
    />
  );
};

export default FallbackImage;