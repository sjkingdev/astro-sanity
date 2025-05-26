import {defineType} from 'sanity'

export default defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'blockContent'
    },
    {
      name: 'width',
      title: 'Content Width',
      type: 'string',
      options: {
        list: [
          {title: 'Narrow', value: 'narrow'},
          {title: 'Medium', value: 'medium'},
          {title: 'Wide', value: 'wide'},
          {title: 'Full Width', value: 'full'}
        ]
      },
      initialValue: 'medium'
    },
    {
      name: 'alignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'}
        ]
      },
      initialValue: 'left'
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Light Gray', value: '#F9FAFB'},
          {title: 'Dark Gray', value: '#111827'},
          {title: 'Blue', value: '#3B82F6'},
          {title: 'Purple', value: '#8B5CF6'},
        ]
      },
      initialValue: 'none'
    },
    {
      name: 'padding',
      title: 'Padding',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Small', value: 'small'},
          {title: 'Medium', value: 'medium'},
          {title: 'Large', value: 'large'}
        ]
      },
      initialValue: 'medium'
    }
  ],
  preview: {
    select: {
      content: 'content'
    },
    prepare(selection) {
      const block = (selection.content || []).find((block: any) => block._type === 'block')
      return {
        title: 'Text Block',
        subtitle: block ? block.children?.filter((child: any) => child._type === 'span')
          .map((span: any) => span.text).join('') : 'No content'
      }
    }
  }
})