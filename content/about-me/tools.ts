/** Type of a tool in my toolbox */
export type Tool = {
  /**
   * A list of ways a tool can be highlighted; "hearted" indicates a tool I
   * really enjoy and "starred" indicates a tool I have a lot of experience using
   */
  marks?: ('hearted' | 'starred')[];
  /** The display name for the tool */
  name: string;
};

const TOOLS: Tool[] = [
  { marks: ['hearted', 'starred'], name: 'TypeScript' },
  { name: 'JavaScript ES6+' },
  { name: 'Elixir' },
  { marks: ['hearted'], name: 'GraphQL' },
  { name: 'Git' },
  { name: 'GitHub' },
  { name: 'Bitbucket' },
  { marks: ['starred'], name: 'React Native' },
  { name: 'Fastlane' },
  { name: 'HTML5' },
  { name: 'CSS3' },
  { marks: ['hearted', 'starred'], name: 'React' },
  { marks: ['starred'], name: 'Redux' },
  { marks: ['hearted'], name: 'NextJS' },
  { name: 'Go' },
  { name: 'Ruby on Rails' },
  { name: 'Ruby' },
  { name: 'RSpec' },
  { name: 'ReasonML' },
  { name: 'PostgreSQL' },
  { name: 'Serverless' },
  { name: 'MySQL' },
  { marks: ['hearted'], name: 'FaunaDB' },
  { name: 'AWS' },
  { name: 'Electron' },
  { name: 'Docker' },
  { name: 'Koa' },
  { name: 'PHP' },
  { name: 'Wordpress' },
  { name: 'NodeJS' },
  { name: 'Express' },
  { marks: ['starred'], name: 'Markdown' },
  { marks: ['hearted'], name: 'MDX' },
  { name: 'Python' },
  { name: 'Flask' },
  { name: 'Phoenix' },
  { name: 'pandas' },
  { marks: ['hearted'], name: 'elm' },
  { name: 'Sass' },
  { name: 'CSS-in-JS' },
  { name: 'AngularJS' },
  { name: 'Heroku' },
  { name: 'Elasticsearch' },
  { name: 'Figma' },
  { name: 'Storybook' },
  { name: 'Firebase' },
  { marks: ['starred'], name: 'Adobe Photoshop' },
  { name: 'Adobe Illustrator' },
  { name: 'Docusaurus' },
  { name: 'Jira' },
  { name: 'Agile' },
  { name: 'Jest/Enzyme' },
  { name: 'Jasmine' },
  { name: 'Mocha/Chai/Sinon' },
  { name: 'Cypress' },
  { name: 'Testing Library' },
  { name: 'Bash' },
];

export default TOOLS;
