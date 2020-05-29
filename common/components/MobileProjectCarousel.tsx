import map from 'lodash/map';
import React, { FC, useRef } from 'react';

import PROJECTS, { Project } from '../../content/projects';
import useDimensions from '../hooks/useDimensions';
import Carousel, { CAROUSEL_ACTIONS, useCarouselReducer } from './Carousel';
import CarouselIndicator from './CarouselIndicator';
import ProjectCard from './ProjectCard';

/** A carousel of vertical project cards for navigating projects on mobile
 * devices */
const MobileProjectCarousel: FC<{ projects: Project[] }> = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dimensions = useDimensions(containerRef);
  const containerWidth = dimensions?.width || 0;

  /** Tag size and spacing in each ProjectCard depends on the container width */
  const tagSize = containerWidth < 340 ? 'small' : 'medium';
  const tagSpacing = containerWidth < 340 ? '0.4em' : '0.6em';

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
                orientation="vertical"
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
  );
};

export default MobileProjectCarousel;
