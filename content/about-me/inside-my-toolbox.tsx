import flow from 'lodash/flow';
import includes from 'lodash/includes';
import map from 'lodash/map';
import reverse from 'lodash/reverse';
import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import React, { FC } from 'react';
import { FaHeart, FaStar } from 'react-icons/fa';

import Tag from '../../common/components/Tag';
import useDisplaySize from '../../common/hooks/useDisplaySize';
import generateTitleProps from '../utilities/for-content';
import TOOLS, { Tool } from './tools';

/** Styled heart icon */
const Heart: FC<{}> = () => (
  <FaHeart className="text-mauve" size="0.7em" style={{ margin: '.05em 0 0 .3em' }} />
);

/** Styled star icon */
const Star: FC<{}> = () => (
  <FaStar className="text-cheddar" size="0.75em" style={{ margin: '0 0 0 .3em' }} />
);

/** The content for the Inside-my-toolbox section of the About Me page */
const InsideMyToolboxContent: FC<{}> = () => {
  const [displaySize] = useDisplaySize();
  const tagSpacing = displaySize === 'MOBILE' ? '0.4em' : '0.6em';

  return (
    <>
      <p className="padding-sm-bottom">
        <Heart /> = Personal favorite!
        {displaySize === 'MOBILE' ? <br /> : null}
        <Star /> = Most experienced at it!
      </p>
      <div className="flex-row" style={{ flexWrap: 'wrap' }}>
        {flow(
          (tools: Tool[]): Tool[] => uniqBy(tools, 'name'),
          (tools: Tool[]): Tool[] => sortBy(tools, 'name'),
          reverse,
          (tools: Tool[]): Tool[] => sortBy(tools, (tool) => tool.marks?.length || 0),
          reverse,
          (tools: Tool[]): JSX.Element[] =>
            map(tools, (tool) => (
              <Tag key={tool.name} spacing={tagSpacing}>
                {tool.name}
                {includes(tool.marks || [], 'hearted') ? <Heart /> : null}
                {includes(tool.marks || [], 'starred') ? <Star /> : null}
              </Tag>
            )),
        )(TOOLS)}
      </div>
    </>
  );
};

export default {
  ...generateTitleProps('Inside my toolbox'),
  content: <InsideMyToolboxContent key="inside-my-toolbox" />,
};
