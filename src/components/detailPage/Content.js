import React from "react";
import ReactDOM from "react-dom";

import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

function Content(props) {
  const contentData = props.content;

  const Bold = ({ children }) => <span className="font-bold">{children}</span>;
  const H3 = ({ children }) => <h3 className="text-3xl">{children}</h3>;

  const Text = ({ children }) => <p className="align-center">{children}</p>;

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    },

    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
      [BLOCKS.HEADING_3]: (node, children) => <H3>{children}</H3>,
    },
  };

  return <>{documentToReactComponents(contentData, options)}</>;
}

export default Content;
