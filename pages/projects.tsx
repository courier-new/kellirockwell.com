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
    </div>
  );
};

export default ProjectsScreen;
