import React from "react";

import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

function Content(props) {
  const contentData = props.content;

  const H1 = ({ children }) => (
    <h1 className="text-3xl lg:text-5xl mb-10">{children}</h1>
  );
  const H2 = ({ children }) => (
    <h2 className="text-2xl lg:text-4xl mb-8">{children}</h2>
  );
  const H3 = ({ children }) => (
    <h3 className="text-xl lg:text-3xl mb-6">{children}</h3>
  );
  const H4 = ({ children }) => (
    <h4 className="text-lg lg:text-2xl mb-4">{children}</h4>
  );
  const H5 = ({ children }) => (
    <h5 className="text-base lg:text-xl mb-4">{children}</h5>
  );
  const H6 = ({ children }) => (
    <h6 className="text-sm lg:text-lg mb-4">{children}</h6>
  );

  const Text = ({ children }) => (
    <div className="text-justify mb-4 text-lg">{children}</div>
  );

  const Blockquote = ({ children }) => (
    <blockquote className="border-l-4 border-cyan italic my-8 pl-8 md:pl-12 ml-2 lg:ml-4">
      {children}
    </blockquote>
  );

  const OL_LIST = ({ children }) => (
    <ol className="list-decimal my-8 mx-12">{children}</ol>
  );

  const UL_LIST = ({ children }) => (
    <ul className="list-disc my-8 mx-12">{children}</ul>
  );

  const TextCode = ({ children }) => (
    <div>
      <pre className="bg-[#eee] overflow-auto max-w-4xl rounded-md p-4 my-8 mx-12 [counter-reset: linenumber;]">
        <code className="text-left whitespace-pre [word-spacing: normal] [word-break]">
          {children}
        </code>
      </pre>
    </div>
  );

  const HL = ({ node, children }) => (
    <a
      className="text-blue-500 hover:underline"
      href={node.data.uri}
      rel="noreferrer"
      target="_blank"
    >
      {node.content[0].value}
    </a>
  );

  const HR = () => (
    <hr className="my-8 mx-12 border-1 border-cyan shadow-xl rounded-lg" />
  );

  const AssetsHandler = (node) => {
    const { title, description, file } = node.data.target.fields;
    const mimeType = file.contentType;
    const mimeGroup = mimeType.split("/")[0];

    switch (mimeGroup) {
      case "image":
        return (
          <div className="flex flex-col items-center mb-8">
            <div className="container max-w-screen-lg mx-auto pb-4 flex justify-center">
              <img alt={title} src={file.url} />
            </div>
            <p className="font-bold text-lg">{description}</p>
          </div>
        );
      case "video":
        return (
          <div className="aspect-video m-12">
            <video
              title="video"
              className="w-full h-full object-none"
              src={file.url}
              controls loop autoPlay muted 
            />
          </div>
        );

      default:
        return (
          <span style={{ backgroundColor: "red", color: "white" }}>
            {" "}
            {mimeType} embedded asset{" "}
          </span>
        );
    }
  };

  const Assets = ({ node }) => AssetsHandler(node);

  const Table = ({ node, children }) => {
    return (
      <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-3xl mb-8">
          <table className="w-full text-xl text-left text-black">
            <thead className="font-bold uppercase bg-cyan">
              <tr>
                {children[0].props.children.map((item, index) => {
                  return (
                    <th
                      scope="col"
                      className="pl-6 pt-3"
                      key={item.props.children + index}
                    >
                      {item.props.children}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {children.map((item, index) => {
                if (index !== 0) {
                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-200"
                    >
                      {item.props.children.map((item, index2) => {
                        return (
                          <td
                            className="border px-4 py-2"
                            key={index + "&" + index2}
                          >
                            {item.props.children}
                          </td>
                        );
                      })}
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  const options = {
    renderMark: {
      [MARKS.CODE]: (text) => <TextCode>{text}</TextCode>,
    },

    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => <Assets node={node} />,
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
      [BLOCKS.HEADING_1]: (node, children) => <H1>{children}</H1>,
      [BLOCKS.HEADING_2]: (node, children) => <H2>{children}</H2>,
      [BLOCKS.HEADING_3]: (node, children) => <H3>{children}</H3>,
      [BLOCKS.HEADING_4]: (node, children) => <H4>{children}</H4>,
      [BLOCKS.HEADING_5]: (node, children) => <H5>{children}</H5>,
      [BLOCKS.HEADING_6]: (node, children) => <H6>{children}</H6>,
      [BLOCKS.QUOTE]: (node, children) => <Blockquote>{children}</Blockquote>,
      [BLOCKS.OL_LIST]: (node, children) => <OL_LIST>{children}</OL_LIST>,
      [BLOCKS.UL_LIST]: (node, children) => <UL_LIST>{children}</UL_LIST>,
      [INLINES.HYPERLINK]: (node, children) => (
        <HL node={node}> children={children}</HL>
      ),
      [BLOCKS.HR]: (node, children) => <HR>{children}</HR>,
      [BLOCKS.TABLE]: (node, children) => (
        <Table node={node} children={children} />
      ),
    },
  };

  return (
    <div className="md:m-16">
      {documentToReactComponents(contentData, options)}
    </div>
  );
}

export default Content;
