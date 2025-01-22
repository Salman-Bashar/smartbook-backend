import { useCallback } from "react";
import {
  set,
  unset,
  useFormValue,
  StringInputProps,
  StringOptions,
  TextOptions,
  SanityDocument,
  TextSchemaType,
  PortableTextBlock,
} from "sanity";
import { TextArea, Button, Flex, Box, Stack } from "@sanity/ui";
import { get as getSourceFieldValue } from "@sanity/util/paths";
import { toPlainText } from "./utils";

/**
 * TODO: Investigate type merging to bring type safety
 * For a more type safe approach check into defineField doc & https://www.typescriptlang.org/docs/handbook/declaration-merging.html
 */
interface CustomTextSchemaType extends Omit<TextSchemaType, "options"> {
  options?: StringOptions &
    TextOptions & {
      source?: string;
    };
}

/**
 * ## WARNING:
 * This feature is incomplete. This might not function properly. Please
 * check carefully before using this.
 *
 * ## Decription
 * This custom component returns the first 250 characters from the provided source field. The source field type is provided through options => source.
 * Source field type: string, text, PortableTextBlock[]
 */
export default function CopyContent(
  props: StringInputProps<CustomTextSchemaType>
) {
  const { value, onChange, schemaType } = props;
  const document = useFormValue([]) as SanityDocument;

  let sourceFieldName: string | undefined;
  let sourceFieldValue: string | PortableTextBlock[] | undefined;

  if (schemaType.options) {
    sourceFieldName = schemaType.options.source;
  }

  if (sourceFieldName) {
    /**
     * This built-in sanity function takes the parent document and a field name within that parent document, and returns the field value
     * Implementation Resource: https://github.com/sanity-io/sanity/blob/e74126bdd6f95d98aae8032eb078edb082ce593b/packages/%40sanity/form-builder/src/inputs/Slug/SlugInput.tsx#L40
     */
    sourceFieldValue = getSourceFieldValue<string | PortableTextBlock[]>(
      document,
      sourceFieldName
    );

    /**
     * We are checking if the value is of array type, as PortableTextBlock[] is an array of blocks
     */
    if (Array.isArray(sourceFieldValue)) {
      sourceFieldValue = toPlainText(sourceFieldValue);
    }
  }

  // useCallback will help with performance
  const onGenerate = useCallback(
    (inputValue: string | undefined) => {
      // if the value exists, set the data, if not, unset the data
      onChange(inputValue ? set(inputValue) : unset());
    },
    [onChange]
  );

  return (
    <Stack>
      <Flex
        gap={1}
        direction={schemaType.rows && schemaType.rows > 1 ? "column" : "row"}
      >
        <Box flex={1}>
          <TextArea
            {...props}
            value={value ? value : ""}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              onGenerate(e.target.value);
            }}
            rows={schemaType.rows}
          />
        </Box>

        {sourceFieldName && (
          <Box>
            <Button
              text={"Generate"}
              mode={"ghost"}
              type={"button"}
              onMouseDown={() => {
                onGenerate(
                  typeof sourceFieldValue == "string"
                    ? // Max character limit for the output value is 250
                      sourceFieldValue.slice(0, 249)
                    : ""
                );
              }}
              disabled={!sourceFieldName}
            />
          </Box>
        )}
      </Flex>
    </Stack>
  );
}
