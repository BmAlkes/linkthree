import { ReactNode } from "react";

interface SocialProps {
  url: string;
  children: ReactNode;
}

export const Social = ({ url, children }: SocialProps) => {
  return <a href={url}>{children}</a>;
};
