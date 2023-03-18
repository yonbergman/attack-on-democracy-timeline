import {
  FaAmilia,
  FaBuilding,
  FaCalendarDay,
  FaDumpsterFire,
  FaEnvelopeOpenText,
  FaFlag,
  FaGavel,
  FaGlobe,
  FaHandshake,
  FaLandmark,
  FaMicrophone,
  FaPersonBooth,
  FaPlaneDeparture,
  FaQuestionCircle,
  FaRegFileImage,
  FaScroll,
  FaUserTie,
} from 'react-icons/fa'

const icons = {
  flag: FaFlag,
  'calendar-days': FaCalendarDay,
  landmark: FaLandmark,
  'person-military-to-person': FaPersonBooth,
  'plane-departure': FaPlaneDeparture,
  microphone: FaMicrophone,
  globe: FaGlobe,
  scroll: FaScroll,
  'person-rifle': FaRegFileImage,
  'person-military-rifle': FaAmilia,
  handshake: FaHandshake,
  'building-flag': FaBuilding,
  'dumpster-fire': FaDumpsterFire,
  gavel: FaGavel,
  'envelope-open-text': FaEnvelopeOpenText,
  'user-tie': FaUserTie,
}

export const Entry = {
  name: 'entry',
  type: 'document',
  title: 'Entry',
  preview: {
    select: {
      title: 'title',
      subtitle: 'datetime',
      media: 'icon',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: new Date(subtitle).toLocaleDateString('he-IL'),
        media: icons[media] || FaQuestionCircle,
      }
    },
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: 'The title of the entry.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'datetime',
      title: 'Date',
      description: 'The date and time of the entry.',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon',
      description: 'The icon of the entry.',
      type: 'string',
      options: {
        list: [
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
            title: 'Agreements & Treaties',
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
          },
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          'ממשלה',
          'מחאה',
          'חקיקה',
          'תגובות בעולם',
          'תקשורת',
          'תקציבים',
          'בג״צ',
          'בושה',
          'נשיא המדינה',
          'בטחוני',
          'תגובות בארץ',
        ],
      },
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'The color of the entry icon.',
      options: {list: ['blue', 'red']},
      initialValue: 'blue',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      description: 'The ID of the entry.',
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'body',
      title: 'Body',
      description: 'The content of the entry.',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule) => Rule.optional(),
      fields: [
        {
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
        },
        {
          name: 'link',
          title: 'Link',
          type: 'url',
        },
      ],
    },
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
          ],
        },
      ],
    },
    {
      name: 'protesterAmount',
      title: 'Protester Amount',
      type: 'number',
      description: 'The amount of protesters.',
    },
  ],
  orderings: [
    {
      title: 'Event Date, Latest',
      name: 'eventDateDesc',
      by: [{field: 'datetime', direction: 'desc'}],
    },
    {
      title: 'Event Date, Oldest',
      name: 'eventDateAsc',
      by: [{field: 'datetime', direction: 'asc'}],
    },
  ],
}
