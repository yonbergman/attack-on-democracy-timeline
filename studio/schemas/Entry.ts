import {RTLStringInput} from '../components/RTLStringInput'
import {CustomField} from '../components/RTLField'
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
      title: 'כותרת',
      type: 'string',
      validation: (Rule) => Rule.required(),
      components: {
        field: CustomField,
        input: RTLStringInput,
      },
    },
    {
      name: 'datetime',
      title: 'תאריך ושעה',
      description: 'במידה ומדובר רק ביום, לשים בשעה 00:00',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      components: {
        field: CustomField,
      },
    },
    {
      name: 'icon',
      title: 'אייקון / צלמית',
      type: 'string',
      components: {
        field: CustomField,
        input: RTLStringInput,
      },
      options: {
        list: [
          {
            title: 'הפגנות (דגל)',
            value: 'flag',
          },
          {
            title: 'ימים מיוחדים (לוח שנה)',
            value: 'calendar-days',
          },
          {
            title: 'החלטות ממשלה (בניין ממשלה)',
            value: 'landmark',
          },
          {
            title: 'צבאי (שני אנשי צבא)',
            value: 'person-military-to-person',
          },
          {
            title: 'טיסות (מטוס)',
            value: 'plane-departure',
          },
          {
            title: 'תקשרות (מיקרופון)',
            value: 'microphone',
          },
          {
            title: 'בין לאומי (גלובוס)',
            value: 'globe',
          },
          {
            title: 'חקיקה (מגילה)',
            value: 'scroll',
          },
          {
            title: 'טרור ואלימות (איש עם רובה)',
            value: 'person-rifle',
          },
          {
            title: 'הסכמים (לחיצת יד)',
            value: 'handshake',
          },
          {
            title: '(בניין עם דגל)',
            value: 'building-flag',
          },
          {
            title: 'דברים רעים (פח אשפה בוער)',
            value: 'dumpster-fire',
          },
          {
            title: 'בית משפט (פטיש)',
            value: 'gavel',
          },
          {
            title: 'מכתבים (מכתב פתוח)',
            value: 'envelope-open-text',
          },
          {
            title: 'אנשים רשמיים (איש בעניבה)',
            value: 'user-tie',
          },
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'categories',
      title: 'קטגוריות',
      components: {
        field: CustomField,
        input: RTLStringInput,
      },
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
      title: 'צבע',
      type: 'string',
      description: 'הצבע של העיגול מסביב לאייקון',
      options: {
        list: [
          {
            title: 'כחול',
            value: 'blue',
          },
          {
            title: 'אדום (דברים בעייתים)',
            value: 'red',
          },
        ],
      },
      initialValue: 'blue',
      components: {
        field: CustomField,
        input: RTLStringInput,
      },
    },
    {
      name: 'slug',
      title: 'קישור ייחודי לפריט',
      type: 'slug',
      options: {
        source: (doc) => {
          if (doc.slug?.current) return doc.slug?.current
          if (doc.datetime) {
            const date = new Date(doc.datetime)
            const dd = String(date.getDate()).padStart(2, '0')
            const mm = String(date.getMonth() + 1).padStart(2, '0')
            const dateString = dd + '-' + mm
            return 'slug ' + doc.title + ' ' + dateString
          }
          // format date string to dd-mm format
          return doc.title
        },
      },
      components: {
        field: CustomField,
      },
      description: 'כדי שהקישור יעבוד תמיד יש להשתמש תמיד באותיות אנגלית קטנות מקפים ומספרים',
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'body',
      title: 'תוכן',
      components: {
        field: CustomField,
        input: RTLStringInput,
      },
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'תמונה',
      type: 'image',
      description:
        'יש להשתמש רק בתוכן שאפשר להשתמש בו (נניח תצלומים מויקיפדיה) או מ״הארץ״ בקרדיט או ל״הארץ״,  וקישור לכתבה.',
      components: {
        field: CustomField,
      },
      validation: (Rule) => Rule.optional(),
      fields: [
        {
          name: 'alt',
          title: 'טקסט חלופי',
          type: 'string',
          components: {
            field: CustomField,
            input: RTLStringInput,
          },
        },
        {
          name: 'caption',
          title: 'תיאור מתחת לתמונה',
          type: 'string',
          components: {
            field: CustomField,
            input: RTLStringInput,
          },
        },
        {
          name: 'link',
          title: 'קישור',
          type: 'url',
          components: {
            field: CustomField,
          },
        },
      ],
    },
    {
      name: 'links',
      title: 'קישורים',
      type: 'array',
      components: {
        field: CustomField,
      },
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              components: {
                input: RTLStringInput,
              },
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
      title: 'מספר מפגינים',
      description: 'יש לעדכן רק כאשר מספר המפגינים עולה על המספר המירבי עד אותו יום',
      type: 'number',
      components: {
        field: CustomField,
      },
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
