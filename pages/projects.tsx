import map from 'lodash/map';
import React, { FC } from 'react';

import MobileProjectCarousel from '../common/components/MobileProjectCarousel';
import ProjectCard from '../common/components/ProjectCard';
import { useThemeState } from '../common/context/themeState';
import useDimensions from '../common/hooks/useDimensions';
import useDisplaySize from '../common/hooks/useDisplaySize';
import PROJECTS from '../content/projects';

/**
 * Screen component for primary screen "Projects"
 */
const ProjectsScreen: FC<{}> = () => {
  const [displaySize] = useDisplaySize();

  return displaySize === 'MOBILE' ? (
    <MobileProjectCarousel projects={PROJECTS} />
  ) : (
    <div className="padding-med scrollable-y">
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
  );
};

export default ProjectsScreen;
