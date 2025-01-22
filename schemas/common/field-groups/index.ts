import { FaGlobe } from "react-icons/fa6";
import { SiSanity } from "react-icons/si";
import { FieldGroupDefinition } from "sanity";

export const seoGroup: FieldGroupDefinition = {
  name: "seo",
  title: "SEO",
  icon: FaGlobe,
};

export const contentGroup: FieldGroupDefinition = {
  name: "content",
  title: "Content",
  icon: SiSanity,
};
