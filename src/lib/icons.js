const ICONS = [
  {
    title: 'Protests',
    value: 'flag',
  },
  {
    title: 'Special Events',
    value: 'calendar-days',
  },
  {
    title: 'Government',
    value: 'landmark',
  },
  {
    title: 'Military',
    value: 'person-military-to-person',
  },
  {
    title: 'Travel',
    value: 'plane-departure',
  },
  {
    title: 'Media',
    value: 'microphone',
  },
  {
    title: 'International',
    value: 'globe',
  },
  {
    title: 'Legislation',
    value: 'scroll',
  },
  {
    title: 'Terror & Violence',
    value: 'person-rifle',
  },
  {
    title: "Agreements & Treaties",
    value: 'handshake',
  },
  {
    title: 'Buildings',
    value: 'building-flag',
  },
  {
    title: 'Fire',
    value: 'dumpster-fire',
  },
  {
    title: 'Court',
    value: 'gavel',
  },
  {
    title: 'Letter',
    value: 'envelope-open-text',
  },
  {
    title: 'Official',
    value: 'user-tie',
  }
];

module.exports = {
  icons: ICONS,
  findIcon: (value) => ICONS.find((icon) => icon.value === value),
};
