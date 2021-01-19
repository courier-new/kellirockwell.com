import flow from 'lodash/flow';
import includes from 'lodash/includes';
import map from 'lodash/map';
import reverse from 'lodash/reverse';
import sortBy from 'lodash/sortBy';
import toLower from 'lodash/toLower';
import uniqBy from 'lodash/uniqBy';
import React, { FC } from 'react';
import { FaBolt, FaHeart, FaStar } from 'react-icons/fa';

import Tag from '../../common/components/Tag';
import useDisplaySize from '../../common/hooks/useDisplaySize';
import generateTitleProps from '../utilities/for-content';
import { ContentSection } from '../utilities/types';

/** Type of a tool in my toolbox */
export type Tool = {
  /** Unique identifier */
  _id: string;
  /**
   * A list of ways a tool can be highlighted; "hearted" indicates a tool I
   * really enjoy and "starred" indicates a tool I have a lot of experience using
   */
  marks?: ('HEARTED' | 'STARRED' | 'LEARNING')[];
  /** The display name for the tool */
  name: string;
};

/** Styled heart icon */
const Heart: FC = () => (
  <FaHeart className="text-mauve" size="0.7em" style={{ margin: '.05em 0 0 .3em' }} />
);

/** Styled star icon */
const Star: FC = () => (
  <FaStar className="text-cheddar" size="0.75em" style={{ margin: '0 0 0 .3em' }} />
);

/**
 * Styled lightning icon
 *
 * @param props the functional component props
 * @param props.className the classname to assign to the lightning bolt element
 */
const Lightning: FC<{ className?: string }> = ({ className = 'text-magnolia' }) => (
  <FaBolt className={className} size="0.75em" style={{ margin: '.1em -.1em 0 .2em' }} />
);

/**
 * The content for the Inside-my-toolbox section of the About Me page
 *
 * @param props the functional component props
 * @param props.tools array of `Tool`s to render
 */
const InsideMyToolboxContent: FC<{ tools: Tool[] }> = ({ tools }) => {
  const [displaySize] = useDisplaySize();
  const tagSpacing = displaySize === 'MOBILE' ? '0.4em' : '0.6em';

  return (
    <>
      <p className="padding-sm-bottom">
        <Heart /> = Personal favorite!
        {displaySize === 'MOBILE' ? <br /> : null}
        <Star /> = Most experienced at it!
        {displaySize === 'MOBILE' ? <br /> : null}
        <Lightning className="text-maastricht" /> = Learning it!
      </p>
      <div className="flex-row" style={{ flexWrap: 'wrap' }}>
        {flow(
          (tools: Tool[]): Tool[] => uniqBy(tools, 'name'),
          (tools: Tool[]): Tool[] => sortBy(tools, (tool) => toLower(tool.name)),
          reverse,
          (tools: Tool[]): Tool[] => sortBy(tools, (tool) => tool.marks?.length || 0),
          reverse,
          (tools: Tool[]): JSX.Element[] =>
            map(tools, (tool) => (
              // eslint-disable-next-line no-underscore-dangle
              <Tag key={tool._id} spacing={tagSpacing}>
                {tool.name}
                {includes(tool.marks || [], 'HEARTED') ? <Heart /> : null}
                {includes(tool.marks || [], 'STARRED') ? <Star /> : null}
                {includes(tool.marks || [], 'LEARNING') ? <Lightning /> : null}
              </Tag>
            )),
        )(tools)}
      </div>
      <p>
        I built this site with{' '}
        <a href="https://nextjs.org/" title="Next.js homepage">
          Next.js
        </a>{' '}
        and deployed it with{' '}
        <a href="https://vercel.com/" title="Vercel homepage">
          Vercel
        </a>
        .
      </p>
    </>
  );
};

/**
 * Builder for toolbox content
 *
 * @param tools array of `Tool`s to use to render the section content
 */
const buildInsideMyToolbox = (
  tools: Tool[],
): ContentSection<'Inside my toolbox', JSX.Element> => ({
  ...generateTitleProps('Inside my toolbox'),
  content: <InsideMyToolboxContent key="inside-my-toolbox" tools={tools} />,
});

export default buildInsideMyToolbox;
