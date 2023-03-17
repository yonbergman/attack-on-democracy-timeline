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
      // title: 'Icon',
      description: 'The icon of the entry.',
      type: 'string',
      options: {
        list: ['cat', 'dog'],
        layout: 'dropdown',
      },
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: ['cat', 'dog'],
      },
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'The color of the entry icon.',
      options: {list: ['blue', 'red', 'green']},
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
}
