import { ContentSection, SectionRefsMap } from '../../../content/utilities/types';
import useScreen from '../useScreen';
import useSectionIndexController from './useSectionIndexController';
import useSectionRefs from './useSectionRefs';

/**
 * Hook for configuring common controls for a regular page using a `Screen`
 * component with dedicated sections and a sidebar. For a screen without
 * sections, use `useScreen` instead
 *
 * Returns a ref to attach to the outermost scrollable container of the main
 * screen content, a method to reset the scroll position to the top of the
 * screen on route change, and a `SectionRefsMap` of the different sections of
 * the page in order
 *
 * @param sections the `ContentSection`s to render on this screen, in order
 */
const useScreenSections = (
  sections: ContentSection<string, React.ReactNode>[] = [],
): {
  ref: React.RefObject<HTMLDivElement>;
  resetScroll: () => void;
  sectionRefsMap: SectionRefsMap;
} => {
  const { ref, resetScroll } = useScreen();

  const sectionRefsMap = useSectionRefs(sections);

  // Measure the section starting positions for each section on this screen
  useSectionIndexController(ref, sectionRefsMap);

  return {
    ref,
    resetScroll,
    sectionRefsMap,
  };
};

export default useScreenSections;
