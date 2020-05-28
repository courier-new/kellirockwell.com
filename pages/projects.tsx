import Color from 'color';
import map from 'lodash/map';
import React, { FC, useRef } from 'react';

import Carousel, {
  CAROUSEL_ACTIONS,
  useCarouselReducer,
} from '../common/components/Carousel';
import CarouselIndicator from '../common/components/CarouselIndicator';
import ProjectCard from '../common/components/ProjectCard';
import { useThemeState } from '../common/context/themeState';
import useDimensions from '../common/hooks/useDimensions';
import useDisplaySize from '../common/hooks/useDisplaySize';
import PROJECTS from '../content/projects';

/**
 * Screen component for primary screen "Projects"
 */
const ProjectsScreen: FC<{}> = () => {
  const themeState = useThemeState();
  const [displaySize] = useDisplaySize();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dimensions = useDimensions(containerRef);
  const containerWidth = dimensions?.width || 0;

  /** Tag size and spacing in each ProjectCard depends on the container width */
  const tagSize = containerWidth < 340 ? 'small' : 'medium';
  const tagSpacing = containerWidth < 340 ? '0.4em' : '0.6em';
  /** On mobile we display vertically stacked swipeable ProjectCards in a carousel */
  const cardOrientation = displaySize === 'MOBILE' ? 'vertical' : 'horizontal';

  const [carouselState, carouselDispatch] = useCarouselReducer(PROJECTS.length);

  /**
   * Handler to trigger a sliding animation on the carousel
   *
   * @param slideDirection the direction to slide the contents of the carousel
   */
  const onSlide = (
    slideDirection: typeof CAROUSEL_ACTIONS.NEXT | typeof CAROUSEL_ACTIONS.PREV,
  ): void => {
    carouselDispatch(slideDirection);
    setTimeout(() => carouselDispatch(CAROUSEL_ACTIONS.STOP), 50);
  };

  return (
    <>
      <div className="full-width flex-column non-scrollable" ref={containerRef}>
        <div className="full-width flex-row flex-justify-center padding-sm-v">
          <CarouselIndicator
            currentIndex={carouselState.position}
            numberOfItems={PROJECTS.length}
          />
        </div>
        <section className="full-height scrollable-y">
          <Carousel
            carouselState={carouselState}
            items={map(PROJECTS, (project) => ({
              element: (
                <ProjectCard
                  {...project}
                  orientation={cardOrientation}
                  primaryColor={
                    themeState?.theme === 'dark'
                      ? Color(project.primaryColor).darken(0.4).hex()
                      : project.primaryColor
                  }
                  tagSize={tagSize}
                  tagSpacing={tagSpacing}
                />
              ),
              key: project.name,
            }))}
            onSlide={onSlide}
          />
        </section>
      </div>
    </>
  );
};

export default ProjectsScreen;
