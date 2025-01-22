import { useState } from "react";
import {
  ObjectInputProps,
  SlugOptions,
  SlugSchemaType,
  SlugValue,
} from "sanity";
import { Text, Flex, Box } from "@sanity/ui";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from "sanity/router";
import { useDataset } from "sanity";
import { IWorkspace } from "../../utils/types";
import { getBaseUrl } from "../../utils/get-base-url";

interface CustomSlugSchemaType extends Omit<SlugSchemaType, "options"> {
  options?: SlugOptions & {
    prefix?: string;
    isFixed?: boolean;
  };
}

type CustomSlugInputProps = ObjectInputProps<SlugValue, CustomSlugSchemaType>;

/**
 * This custom slug component renders the full url above the default slug input field
 */
export default function SlugInput(props: CustomSlugInputProps) {
  /**
   * Here we are using type asserting to improve dataset
   * typesafety.
   * This will make sure we check dataset for all
   * possible values when creating the base url
   */
  const dataset = useDataset() as IWorkspace;

  const { renderDefault, value, schemaType } = props;

  /**
   * This variable is used to control the following:
   * - render size of the link
   * - whether or not to render the slug input.
   * We don't render the slug input for fixed pages. We
   * only show page slug.
   */
  let isFixed = false;

  if (schemaType.options && schemaType.options.isFixed) {
    isFixed = schemaType.options.isFixed;
  }

  // Handle Link Style
  const [linkHoverState, setLinkHoverState] = useState<boolean>(false);
  const linkCommonStyle = {
    color: linkHoverState ? "#2874A6" : "#85929E",
    transition: "ease-in-out",
    transitionDuration: "150ms",
  };

  const url: string[] = [getBaseUrl(dataset)];

  if (schemaType.options && schemaType.options.prefix) {
    url.push(schemaType.options.prefix);
  }

  if (value && value.current) {
    url.push(value.current);
  }

  return (
    <Flex gap={3} direction={"column"}>
      <Box
        flex={"auto"}
        style={{
          maxWidth: "fit-content",
        }}
        onMouseEnter={() => setLinkHoverState(true)}
        onMouseLeave={() => setLinkHoverState(false)}
        hidden={!isFixed && value?.current == undefined}
      >
        <Link
          href={url.join("/")}
          style={{ textDecoration: "none" }}
          target="_blank"
          rel="external"
        >
          <Flex gap={2} direction={"row"} align={"center"}>
            <Text size={isFixed ? 2 : 1} readOnly style={linkCommonStyle}>
              {url.join("/").replace(new RegExp("^https?://"), "")}
            </Text>
            <Text size={1} readOnly style={linkCommonStyle}>
              <HiOutlineExternalLink />
            </Text>
          </Flex>
        </Link>
      </Box>

      {!isFixed && renderDefault(props)}
    </Flex>
  );
}
