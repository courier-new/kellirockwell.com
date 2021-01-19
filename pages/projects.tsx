import map from 'lodash/map';
import React, { FC, useRef } from 'react';

import MobileProjectCarousel from '../common/components/MobileProjectCarousel';
import ProjectCard from '../common/components/ProjectCard';
import Screen from '../common/components/Screen';
import { MAIN_CONTENT_MAX_WIDTH, SIDEBAR_WIDTH } from '../common/constants/content-sizes';
import useDisplaySize from '../common/hooks/useDisplaySize';
import useScrollPositionController from '../common/hooks/useScrollPositionController';
import PROJECTS from '../content/projects';

/**
 * Screen component for primary screen "Projects"
 */
const ProjectsScreen: FC = () => {
  const [displaySize] = useDisplaySize();

  const outerRef = useRef<HTMLDivElement>(null);
  useScrollPositionController(outerRef);

  const content =
    displaySize === 'MOBILE' ? (
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

  return <Screen>{content}</Screen>;
};

export default ProjectsScreen;
