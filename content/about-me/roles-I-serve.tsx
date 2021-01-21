import map from 'lodash/map';
import React, { FC } from 'react';
import { BsGearFill } from 'react-icons/bs';
import { FaAngleDoubleUp, FaBook, FaTicketAlt, FaTools } from 'react-icons/fa';
import { IconType } from 'react-icons/lib/cjs';
import { MdRateReview } from 'react-icons/md';

import useDisplaySize from '../../common/hooks/useDisplaySize';
import generateTitleProps from '../utilities/for-content';

type RoleContentProps = {
  /** A breakdown of three practical ways I embody the role */
  practiceExamples: {
    /** The icon to show for this example */
    Icon: IconType;
    /** List of examples breaking down the ways I practice this value */
    exampleItems: string[];
    /** Main descriptive label of examples broken down by this block */
    exampleLabel: string;
  }[];
  /** A short description of what the role means to me */
  whatItMeans: string | JSX.Element;
  /** A short explanation of why I value this role so strongly */
  whyItsMyPriority: string | JSX.Element;
};

/** A block of a section detailing what a role is and how it manifests in my work */
const RoleContent: FC<RoleContentProps> = ({
  practiceExamples,
  whatItMeans,
  whyItsMyPriority,
}) => {
  const [displaySize] = useDisplaySize();

  /** The padding class sets the spacing "between columns" and is thus dependent
   * on both the columns lay out (which sections have need column gaps?) and the
   * display size (how large should the column gap be?) */
  let paddingClass = '';
  switch (displaySize) {
    case 'SMALL':
      paddingClass = 'padding-med-left';
      break;
    case 'MEDIUM':
    case 'LARGE':
      paddingClass = 'padding-lg-left';
      break;
    case 'XLARGE':
      paddingClass = 'padding-xl-left';
      break;
    default:
      break;
  }

  const examplesLayout = displaySize === 'MOBILE' ? 'column' : 'row';

  return (
    <React.Fragment key="roles-I-serve">
      <div className={displaySize === 'MOBILE' ? '' : 'flex-row'}>
        <div className="flex-column flex-1">
          <h3>What it means</h3>
          <p>{whatItMeans}</p>
        </div>
        <div className={`flex-column flex-1 ${paddingClass}`}>
          <h3>Why it&apos;s my priority</h3>
          <p>{whyItsMyPriority}</p>
        </div>
      </div>
      <h3>How I practice it</h3>
      {map(practiceExamples, ({ Icon, exampleItems, exampleLabel }) => (
        <PracticeExample
          exampleItems={exampleItems}
          exampleLabel={exampleLabel}
          Icon={Icon}
          key={exampleLabel}
          layout={examplesLayout}
        />
      ))}
    </React.Fragment>
  );
};

type PracticeExampleProps = {
  /** The icon to show for this example */
  Icon: IconType;
  /** List of examples breaking down the ways I practice this value */
  exampleItems: string[];
  /** Main descriptive label of examples broken down by this block */
  exampleLabel: string;
  /** Whether to render the example as a row or as a column */
  layout: 'row' | 'column';
};

/** A detail element of examples of the way I practice a value */
const PracticeExample: FC<PracticeExampleProps> = ({
  Icon,
  exampleItems,
  exampleLabel,
  layout,
}) => {
  const iconBubbleSize = layout === 'row' ? '10vh' : '20vh';
  const iconSize = layout === 'row' ? '6vh' : '13vh';

  return (
    <div
      className={`${
        layout === 'row' ? 'flex-row' : 'flex-column'
      } flex-align-center flex-justify-center full-width`}
    >
      <style jsx>
        {`
          .icon {
            border-radius: 50%;
            height: ${iconBubbleSize};
            width: ${iconBubbleSize};
          }
        `}
      </style>
      <div className="background-space icon flex-row flex-align-center flex-justify-center">
        <Icon className="text-magnolia" size={iconSize} />
      </div>
      <div
        className={
          layout === 'row' ? 'flex-1 padding-med-left' : 'full-width margin-med-bottom'
        }
      >
        <h4>{exampleLabel}</h4>
        <ul className="padding-med-left">
          {map(exampleItems, (exampleItem, index) => (
            <li key={index}>{exampleItem}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const asynchronousContentProps: RoleContentProps = {
  practiceExamples: [
    {
      exampleItems: [
        'Providing concrete, actionable feedback and mitigating scope changes',
        'Citing previous reviews, existing code, tickets, library documentation, and external sources whenever possible',
        'Maintaining clean commit histories and sensible branching schemes',
      ],
      exampleLabel: 'Code reviews',
      Icon: MdRateReview,
    },
    {
      exampleItems: [
        'Cataloguing comprehensive acceptance criteria',
        'Linking related tickets, code, and other resources',
        'Clarifying and recording decisions on the tickets',
      ],
      exampleLabel: 'Ticket grooming',
      Icon: FaTicketAlt,
    },
    {
      exampleItems: [
        'Owning maintenance efforts of API documents and resources',
        'Instituting systems to record architectural decisions, track areas needing refactoring, and autogenerate developer documentation',
        'Detailing team processes, onboarding procedures, and product timelines',
      ],
      exampleLabel: 'Project documentation',
      Icon: FaBook,
    },
  ],
  whatItMeans:
    'I value communicating in a way that does not require immediate engagement or response and in a way that retains meaning even without the original context.',
  whyItsMyPriority: (
    <>
      It encourages thoughtfulness and empathy, accelerates (something), preserves a
      historical record of decisions, and{' '}
      <a href="https://doist.com/blog/asynchronous-communication/">boosts productivity</a>
      .
    </>
  ),
};

const dxheroContentProps: RoleContentProps = {
  // TODO: Mention considerate API design
  practiceExamples: [
    {
      exampleItems: [
        'Leveraging static type systems, IDE intellisense, and code comment notations like JSDoc',
        'Incorporating impactful debugging features and hidden "developer mode" settings',
        'Test-running libraries before introducing them and replacing libraries that are no longer providing benefit',
      ],
      exampleLabel: 'Improving the toolbox',
      Icon: FaTools,
    },
    {
      exampleItems: [
        'Setting up code autoformatting, git hook-based workflows, and custom linter rules',
        'Configuring robust integrations between tools',
        'Abstracting regular tasks with metaprogramming/codemodding, documentation generation, and other scripts',
      ],
      exampleLabel: 'Integration and automation',
      Icon: BsGearFill,
    },
    {
      exampleItems: [
        'Planning ahead to do things right the first time',
        'Refactoring as a mechanism for learning and pair programming as a mechanism for gaining perspective',
        'Embracing the direction that the greater developer community is headed',
      ],
      exampleLabel: 'Opportunities for growth',
      Icon: FaAngleDoubleUp,
    },
  ],
  whatItMeans:
    'I prioritize identifying and eliminating the pain points, slow downs, and ambiguity that myself and developers on my team encounter.',
  whyItsMyPriority:
    'I firmly believe that great UX is a byproduct of great DX, and one of our uniquest strengths is that we can develop software to make us better at developing software.',
};

export default {
  ...generateTitleProps('The roles I serve'),
  content: (
    <React.Fragment key="roles-intro">
      <p>Asdf</p>
    </React.Fragment>
  ),
  subsections: [
    {
      ...generateTitleProps('As an asynchronous communicator'),
      content: <RoleContent key="async-comm" {...asynchronousContentProps} />,
    },
    {
      ...generateTitleProps('As a developer experience hero'),
      content: <RoleContent key="dx-hero" {...dxheroContentProps} />,
    },
    { ...generateTitleProps('As a state management manager') },
    { ...generateTitleProps('As an equity and inclusion advocate') },
  ],
};
