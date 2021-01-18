import map from 'lodash/map';
import React, { FC, useRef } from 'react';

import MobileProjectCarousel from '../common/components/MobileProjectCarousel';
import ProjectCard from '../common/components/ProjectCard';
import { MAIN_CONTENT_MAX_WIDTH, SIDEBAR_WIDTH } from '../common/constants/content-sizes';
import useDisplaySize from '../common/hooks/useDisplaySize';
import PROJECTS from '../content/projects';
import useScrollPositionController from '../common/hooks/useScrollPositionController';

/**
 * Screen component for primary screen "Projects"
 */
const ProjectsScreen: FC = () => {
  const [displaySize] = useDisplaySize();

  const outerRef = useRef<HTMLDivElement>(null);
  useScrollPositionController(outerRef);

  return displaySize === 'MOBILE' ? (
    <MobileProjectCarousel projects={PROJECTS} />
  ) : (
    <>
      <div
        className="flex-column flex-align-center full-width padding-med scrollable-y"
        ref={outerRef}
      >
        <div style={{ maxWidth: MAIN_CONTENT_MAX_WIDTH + SIDEBAR_WIDTH }}>
          {map(PROJECTS, (project, index) => (
            <div
              className={index === PROJECTS.length - 1 ? '' : 'margin-med-bottom'}
              key={project.name}
            >
              <ProjectCard
                orientation={displaySize === 'SMALL' ? 'vertical' : 'horizontal'}
                {...project}
                tagSize="medium"
                tagSpacing="0.6em"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectsScreen;
