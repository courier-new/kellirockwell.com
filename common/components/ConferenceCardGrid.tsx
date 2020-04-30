import map from 'lodash/map';
import React, { FC, useRef } from 'react';

import { Conference } from '../../content/conferences/Conference';
import useDimensions from '../hooks/useDimensions';
import useDisplaySize from '../hooks/useDisplaySize';
import ConferenceCard from './ConferenceCard';

type ConferenceCardGridProps = {
  /** The list of conferences to render in this grid */
  conferences: Conference[];
};

const GRID_GAP = 20;

/**
 * Builds a <ul> of ConferenceCards for a list of conferences in a grid layout
 */
const ConferenceCardGrid: FC<ConferenceCardGridProps> = ({ conferences }) => {
  const [displaySize] = useDisplaySize();
  const gridRef = useRef<HTMLUListElement | null>(null);
  const gridDimensions = useDimensions(gridRef);

  /** The number of columns to show, based on the display size and dividing the
   * screen by the minimum desired width of a column */
  let numberOfColumns = 1;
  switch (displaySize) {
    case 'XLARGE':
    case 'LARGE':
    case 'MOBILE':
      numberOfColumns = gridDimensions ? Math.floor(gridDimensions.width / 260) : 3;
      break;
    case 'MEDIUM':
    case 'SMALL':
      numberOfColumns = 2;
      break;
    default:
      break;
  }

  /** The percentage (as a float between 1 and 100) of the screen width for
   * each column */
  const columnWidthPercentage = 100 / numberOfColumns;
  /** The amount of grid gap to be subtracted from each column's width; there
   * will be one less gap than there are columns, e.g. 5 columns => 4 gaps */
  const gridGapPerColumn = (GRID_GAP * (numberOfColumns - 1)) / numberOfColumns;
  /** The CSS expression of this percentage width, minus the amount of grid
   * gap */
  const maxColumnWidthCSS = `calc(${columnWidthPercentage}% - ${gridGapPerColumn}px)`;
  const conferenceListStyle: React.CSSProperties = {
    gridGap: `${GRID_GAP}px`,
    gridTemplateColumns: `repeat(${numberOfColumns}, ${maxColumnWidthCSS})`,
  };

  return (
    <ul className="grid border-box padding-0" ref={gridRef} style={conferenceListStyle}>
      {map(conferences, (conference, index) => (
        <ConferenceCard key={`conference-${index}`} {...conference} />
      ))}
    </ul>
  );
};

export default ConferenceCardGrid;
