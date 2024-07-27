import { Mark } from 'tiptap'
import { toggleMark } from 'tiptap-commands'

export default class SmallText extends Mark {

  get name() {
    return 'small_text'
  }

  get schema() {
    return {
      parseDOM: [
        {
          tag: 'small',
        }
      ],
      toDOM: () => ['small', 0],
    }
  }

  commands({ type }) {
    return () => toggleMark(type)
  }

}