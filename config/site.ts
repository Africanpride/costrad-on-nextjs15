export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'The Strategic Voter - THE KINGDOM PATTERNS SERIES v1',
  description: 'Make beautiful websites regardless of your design experience.',
  author: 'Pius Opoku-Fofie',
  year: new Date().getFullYear(),
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Docs',
      href: '/docs',
    },
    {
      label: 'Pricing',
      href: '/pricing',
    },
    {
      label: 'Blog',
      href: '/blog',
    },
    {
      label: 'About',
      href: '/about',
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

export const menuItems = [
  { number: '01', label: 'Welcome', href: '/' },
  { number: '02', label: 'The Book', href: '/the-book' },
  { number: '03', label: 'The Author', href: '/the-author' },
  {
    number: '04',
    label: 'Strategic Voter 101',
    href: '/strategic-voter-101',
  },
  { number: '05', label: 'Events & Webinars', href: '/events-and-webinar' },
  { number: '06', label: 'contact', href: '/contact' },
];


export const shareSocial = {
  url: 'https://www.thestrategicvoter.com',
  title: 'The Strategic Voter - By: Dr. Abu Bako'
}