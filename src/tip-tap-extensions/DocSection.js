import { Node } from 'tiptap'
import DocSectionView from '@/components/editor/DocSectionView.vue'
import { toggleBlockType } from 'tiptap-commands'

export default class DocSection extends Node {

  get name() {
    return 'doc_section'
  }

  get defaultOptions() {
    return {
      sectionname: 'Document Section',
    }
  }

  get schema() {
    return {
      content: 'block* heading* paragraph*',
      group: 'block',
      draggable: true,
      selectable: true,
      toDOM: () => ['div', { 'data-type': this.name }, 0],
      parseDOM: [{
        tag: `[data-type="${this.name}"]`,
      }],
    }
  }
  get view () {
    return DocSectionView
  }

  commands ({ type, schema }) {
    return attrs => toggleBlockType(type, schema.nodes.paragraph, attrs)
  }

}