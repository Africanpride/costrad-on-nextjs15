export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'College of Sustainable Transformation and Development (COSTrAD)',
  description: "Strategic Voting, Voting Strategies, Election Strategy, Territorial Vision, Leadership Development, Governance, Sustainable Institutions, National Development, Economic Growth, Political Participation, Civic Engagement, Community Building, Social Responsibility, Ethical Leadership, Spiritual Leadership, God's Mission, Dominance Mandate, Ruling with God, Strategic Stewardship, Kingship, Priesthood, Visionary Leadership, Effective Governance, Responsible Leadership, Political Engagement, Social Impact, Community Impact, Economic Impact",
  author: 'Pius Opoku-Fofie',
  year: new Date().getFullYear(),
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'About',
      href: '/about'
    },
    {
      label: 'Contact',
      href: '/contact'
    },


  ],
  navMenuItems: [
    {
      label: 'Profile',
      href: '/profile',
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Team',
      href: '/team',
    },
    {
      label: 'Calendar',
      href: '/calendar',
    },
    {
      label: 'Settings',
      href: '/settings',
    },
    {
      label: 'Help & Feedback',
      href: '/help-feedback',
    },
    {
      label: 'Logout',
      href: '/logout',
    },
  ],

  links: {
    github: 'https://github.com/nextui-org/nextui',
    twitter: 'https://twitter.com/getnextui',
    docs: 'https://nextui.org',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev',
  },
};

export const quickLinks =[
  {
    label: 'Privacy Policy',
    href: '/privacy'
  },
  {
    label: 'Terms & Consitions',
    href: '/terms'
  },
  {
    label: 'Cookies',
    href: '/cookies'
  },
]
export const affiliateMenu =[
  {
    label: 'COSTrAD',
    href: 'https://www.costrad.org'
  },
  {
    label: 'GAPNET',
    href: 'https://www.gapnetwork.org'
  },
  {
    label: 'Logos-Rhema Foundation',
    href: 'https://www.logosrhema.org'
  },
]
export const menuItems = [
  { number: '01', label: 'Welcome', href: '/' },
  { number: '02', label: 'The Book', href: '/the-book' },
  { number: '03', label: 'The Author', href: '/the-author' },
  {
    number: '04',
    label: 'Strategic Voter 101',
    href: '/strategic-voter-101',
  },
  // { number: '05', label: 'Events & Webinars', href: '/events-and-webinar' },
  { number: '05', label: 'contact', href: '/contact' },
];


export const shareSocial = {
  url: 'https://www.thestrategicvoter.com',
  title: 'The Strategic Voter - By: Dr. Abu Bako'
}