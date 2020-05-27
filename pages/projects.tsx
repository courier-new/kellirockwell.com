import map from 'lodash/map';
import React, { FC } from 'react';

import VerticalProjectCard from '../common/components/ProjectCard';
import useDisplaySize from '../common/hooks/useDisplaySize';
import PROJECTS, { Project } from '../content/projects';

/**
 * Maps over the projects and renders each as a ProjectCard tailored to the
 * user's display size
 *
 * @param projects the filtered list of projects to show
 * @param orientation display "vertical" cards on mobile, "horizontal" on desktop
 * @param tagSpacing the spacing between tags on each ProjectCard
 */
const renderProjects = (
  projects: Project[],
  orientation: 'vertical' | 'horizontal',
  tagSpacing: string,
) => {
  return map(projects, (project) => (
    <VerticalProjectCard key={project.name} project={project} tagSpacing={tagSpacing} />
  ));
};

/**
 * Screen component for primary screen "Projects"
 */
const ProjectsScreen: FC<{}> = () => {
  const [displaySize] = useDisplaySize();
  const tagSpacing = displaySize === 'MOBILE' ? '0.4em' : '0.6em';

  return (
    <>
      <div className="full-width flex-column non-scrollable">
        <div className="full-width flex-row flex-justify-center padding-sm-v">
          Fake nav bar
        </div>
        <section className="flex-1 scrollable-y">
          {renderProjects(PROJECTS, 'vertical', tagSpacing)}
        </section>
      </div>
    </>
  );
};

export default ProjectsScreen;
