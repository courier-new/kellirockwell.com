import map from 'lodash/map';
import React, { FC } from 'react';

import MobileProjectCarousel from '../common/components/MobileProjectCarousel';
import ProjectCard from '../common/components/ProjectCard';
import Screen from '../common/components/Screen';
import { MAIN_CONTENT_MAX_WIDTH, SIDEBAR_WIDTH } from '../common/constants/content-sizes';
import useDisplaySize from '../common/hooks/useDisplaySize';
import useScreen from '../common/hooks/useScreen';
import PROJECTS from '../content/projects';

/**
 * Screen component for primary screen "Projects"
 */
const ProjectsScreen: FC = () => {
  const [displaySize] = useDisplaySize();

  const { ref, resetScroll } = useScreen();

  const content =
    displaySize === 'MOBILE' ? (
      <MobileProjectCarousel projects={PROJECTS} />
    ) : (
      <>
        <div className="flex-column flex-align-center padding-med">
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

  return (
    <Screen ref={ref} resetScroll={resetScroll}>
      {content}
    </Screen>
  );
};

export default ProjectsScreen;
