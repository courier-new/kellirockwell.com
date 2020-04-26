import { DateTime, Interval } from 'luxon';

/** Type representing a conference's details */
export type Conference = {
  // TODO: Add location/url branded string types
  /** When the conference occurred, either as a single DateTime or an Interval */
  date: DateTime | Interval;
  /** Where the conference occurred */
  location: string;
  /** The display name for the conference */
  name: string;
  /** The website URL for the conference */
  website: string;
  /** Any optional label about the conference, e.g. "Cancelled" */
  label?: string;
};
