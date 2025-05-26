import {defineType} from 'sanity'

export default defineType({
  name: 'imageGallery',
  title: 'Image Gallery',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Gallery Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: Rule => Rule.required()
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string'
            }
          ],
          preview: {
            select: {
              media: 'image',
              title: 'alt',
              subtitle: 'caption'
            }
          }
        }
      ],
      validation: Rule => Rule.min(1)
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Grid', value: 'grid'},
          {title: 'Masonry', value: 'masonry'},
          {title: 'Carousel', value: 'carousel'}
        ]
      },
      initialValue: 'grid'
    },
    {
      name: 'columns',
      title: 'Columns (Grid/Masonry)',
      type: 'object',
      fields: [
        {name: 'mobile', title: 'Mobile', type: 'number', initialValue: 1},
        {name: 'tablet', title: 'Tablet', type: 'number', initialValue: 2},
        {name: 'desktop', title: 'Desktop', type: 'number', initialValue: 3}
      ],
      hidden: ({parent}) => parent?.layout === 'carousel'
    },
    {
      name: 'aspectRatio',
      title: 'Image Aspect Ratio',
      type: 'string',
      options: {
        list: [
          {title: 'Original', value: 'original'},
          {title: 'Square (1:1)', value: 'square'},
          {title: 'Landscape (4:3)', value: 'landscape'},
          {title: 'Portrait (3:4)', value: 'portrait'},
          {title: 'Wide (16:9)', value: 'wide'}
        ]
      },
      initialValue: 'original'
    }
  ],
  preview: {
    select: {
      title: 'title',
      images: 'images'
    },
    prepare(selection) {
      const {title, images} = selection
      return {
        title: `Gallery: ${title || 'Untitled'}`,
        subtitle: `${images?.length || 0} images`
      }
    }
  }
})