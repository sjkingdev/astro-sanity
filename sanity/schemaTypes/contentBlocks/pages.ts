import {defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 96)
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: Rule => Rule.max(60).warning('Meta titles should be under 60 characters')
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: Rule => Rule.max(155).warning('Meta descriptions should be under 155 characters')
        },
        {
          name: 'ogImage',
          title: 'Social Share Image',
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
        }
      ],
      options: {
        collapsible: true,
        collapsed: false
      }
    },
    {
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [
        {type: 'hero'},
        {type: 'textBlock'},
        {type: 'imageGallery'},
        {type: 'contactForm'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug'
    },
    prepare(selection) {
      const {title, slug} = selection
      return {
        title,
        subtitle: slug?.current ? `/${slug.current}` : 'No slug'
      }
    }
  }
})