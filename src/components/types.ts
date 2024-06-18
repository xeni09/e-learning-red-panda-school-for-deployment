export interface NavItem {
  name: string;
  href: string;
}
export interface SectionProps {
  color: string;
  title: string;
  image?: string;
  imagePosition?: "left" | "right";
  imageSize?: number;
  text: string;
}
