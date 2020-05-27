import map from 'lodash/map';
import React, { FC, useRef } from 'react';

import Carousel from '../common/components/Carousel';
import ProjectCard from '../common/components/ProjectCard';
import useDimensions from '../common/hooks/useDimensions';
import useDisplaySize from '../common/hooks/useDisplaySize';
import PROJECTS from '../content/projects';

/**
 * Screen component for primary screen "Projects"
 */
const ProjectsScreen: FC<{}> = () => {
  const [displaySize] = useDisplaySize();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dimensions = useDimensions(containerRef);
  const containerWidth = dimensions?.width || 0;

  const tagSize = containerWidth < 340 ? 'small' : 'medium';
  const tagSpacing = containerWidth < 340 ? '0.4em' : '0.6em';
  const cardOrientation = displaySize === 'MOBILE' ? 'vertical' : 'horizontal';

  return (
    <>
      <div className="full-width flex-column non-scrollable" ref={containerRef}>
        <div className="full-width flex-row flex-justify-center padding-sm-v">
          Fake nav bar
        </div>
        <section className="full-height scrollable-y">
          <Carousel
            items={map(PROJECTS, (project) => ({
              element: (
                <ProjectCard
                  {...project}
                  orientation={cardOrientation}
                  primaryColor={project.primaryColor}
                  tagSize={tagSize}
                  tagSpacing={tagSpacing}
                />
              ),
              key: project.name,
            }))}
          />
        </section>
      </div>
    </>
  );
};

export default ProjectsScreen;
