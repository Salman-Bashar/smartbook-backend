import { LoadingBlock, type ObjectInputProps } from "sanity";
import { Flex, Text } from "@sanity/ui";
import ReactPlayer from "react-player";
import { useClient } from "sanity";
import { useEffect, useState } from "react";

export function VideoInputPreview(props: ObjectInputProps) {
  const [fetching, setFetching] = useState<boolean>(false);
  const [url, setUrl] = useState<string | null>(null);

  const client = useClient({ apiVersion: "2021-06-07" });
  const { renderDefault, value } = props;

  const typedValue = value as
    | {
        type?: "file" | "embed";
        embed?: string;
        file?: { asset: { _ref: string } };
      }
    | undefined;

  useEffect(() => {
    setUrl(null);

    async function getFileURL(ref: string) {
      setFetching(true);

      const url = await client.fetch(`*[_id == $id][0].url`, {
        id: ref,
      });

      setUrl(url);
      setFetching(false);
    }

    if (typedValue && typedValue.type == "file" && typedValue.file?.asset) {
      getFileURL(typedValue.file.asset._ref);
    }

    if (typedValue && typedValue.type == "embed" && typedValue.embed) {
      setUrl(typedValue.embed);
    }
  }, [typedValue, client]);

  return (
    <>
      {renderDefault(props)}
      <Flex padding={3} align="center" justify="center">
        {fetching && <LoadingBlock showText={true} title={"Loading video"} />}
        {!fetching && url && <ReactPlayer url={url} controls={true} />}
        {!fetching && !url && <Text>No video source provided</Text>}
      </Flex>
    </>
  );
}
