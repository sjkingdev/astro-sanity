import {defineType} from 'sanity'

export default defineType({
  name: 'contactForm',
  title: 'Contact Form',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Form Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent'
    },
    {
      name: 'fields',
      title: 'Form Fields',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Field Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'type',
              title: 'Field Type',
              type: 'string',
              options: {
                list: [
                  'text',
                  'email',
                  'tel',
                  'number',
                  'textarea',
                  'select',
                  'checkbox'
                ]
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'options',
              title: 'Options (for select)',
              type: 'array',
              of: [{type: 'string'}],
              hidden: ({parent}) => parent?.type !== 'select'
            },
            {
              name: 'required',
              title: 'Required',
              type: 'boolean',
              initialValue: false
            },
            {
              name: 'placeholder',
              title: 'Placeholder',
              type: 'string'
            },
            {
              name: 'width',
              title: 'Field Width',
              type: 'string',
              options: {
                list: [
                  {title: 'Half', value: 'half'},
                  {title: 'Full', value: 'full'}
                ]
              },
              initialValue: 'full'
            }
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'type',
              required: 'required'
            },
            prepare({title, subtitle, required}) {
              return {
                title: `${title}${required ? ' *' : ''}`,
                subtitle: subtitle
              }
            }
          }
        }
      ]
    },
    {
      name: 'submitText',
      title: 'Submit Button Text',
      type: 'string',
      initialValue: 'Send Message'
    },
    {
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      initialValue: 'Thank you for your message! We\'ll get back to you soon.'
    }
  ],
  preview: {
    select: {
      title: 'title',
      fields: 'fields'
    },
    prepare(selection) {
      const {title, fields} = selection
      return {
        title: `Contact Form: ${title || 'Untitled'}`,
        subtitle: `${fields?.length || 0} fields`
      }
    }
  }
})