import { Mark } from 'tiptap'
import { toggleMark } from 'tiptap-commands'

export default class HighlightText extends Mark {

  get name() {
    return 'highlight_text'
  }

  get schema() {
    return {
      attrs: {
        color: {
          default: 'pink',
        },
      },
      parseDOM: [
        {
          tag: 'span',
        },
        {
          style: 'background-color',
          getAttrs: value => ({ color: value }),
        },
      ],
      toDOM: mark => ['span', { style: `background-color: ${mark.attrs.color}; display: inline;` }, 0],
    }
  }

  commands({ type }) {
    return attrs => toggleMark(type, attrs)
  }

}