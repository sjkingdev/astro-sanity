import {defineType} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    },
    {
      name: 'overlay',
      title: 'Background Overlay',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Overlay',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'opacity',
          title: 'Overlay Opacity',
          type: 'number',
          validation: Rule => Rule.min(0).max(1),
          initialValue: 0.4
        },
        {
          name: 'color',
          title: 'Overlay Color',
          type: 'string',
          options: {
            list: [
              {title: 'Black', value: '#000000'},
              {title: 'Dark Gray', value: '#374151'},
              {title: 'Blue', value: '#3B82F6'},
              {title: 'Purple', value: '#8B5CF6'},
            ]
          },
          initialValue: '#000000'
        }
      ]
    },
    {
      name: 'buttons',
      title: 'Call to Action Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'text', title: 'Button Text', type: 'string'},
            {name: 'url', title: 'Button URL', type: 'url'},
            {
              name: 'style',
              title: 'Button Style',
              type: 'string',
              options: {
                list: [
                  {title: 'Primary', value: 'primary'},
                  {title: 'Secondary', value: 'secondary'},
                  {title: 'Outline', value: 'outline'}
                ]
              },
              initialValue: 'primary'
            }
          ]
        }
      ],
      validation: Rule => Rule.max(2)
    },
    {
      name: 'textAlign',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'}
        ]
      },
      initialValue: 'center'
    },
    {
      name: 'height',
      title: 'Section Height',
      type: 'string',
      options: {
        list: [
          {title: 'Small (50vh)', value: 'small'},
          {title: 'Medium (75vh)', value: 'medium'},
          {title: 'Large (100vh)', value: 'large'}
        ]
      },
      initialValue: 'large'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'backgroundImage'
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: `Hero: ${title}`,
        subtitle: subtitle
      }
    }
  }
})