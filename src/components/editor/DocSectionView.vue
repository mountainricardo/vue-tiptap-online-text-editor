<template>
  <div
    data-type="doc_section"
    class="doc-section"
    contenteditable="true"
  >
    <div
      ref="content"
      contenteditable="true"
    >
    </div>

    <div
      data-drag-handle
      class="drag-handle"
    >
      <v-icon
        tag="div"
        class="px-1 py-2 elevation-2 rounded-md drag-handler-icon"
        color="primary"
        v-text="'icon-drag-handler'"
      ></v-icon>
    </div>

    <div
      new-section-handle
      class="new-section-handler"
    >
      <v-btn
        fab
        small
        color="primary"
        class="elevation-2"
      >
        <v-icon
          tag="div"
          small

          @click="newSection"
          v-text="'icon-plus-math'"
        ></v-icon>
      </v-btn>
    </div>
    <div
      section-menu
      class="section-menu-holder"
    >
      <span>
        <!-- {{ sectionname || 'Section'}} -->
        Section
      </span>
      <editor-doc-section-menu
        @rename="renameSection"
        @duplicate="duplicateSection"
        @delete="deleteSection"
      ></editor-doc-section-menu>
    </div>
  </div>
</template>
<script>
import EditorDocSectionMenu from '@/components/menus/editor-doc-section-menu'

export default {
  name: 'DocSectionView',
  components: {
    EditorDocSectionMenu
  },
  props: [],
  data () {
    return {

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    newSection (event) {
      alert('emit new section content event')
      console.log('emit new section event', event)
      this.$emit('newsection', event)
    },
    renameSection(e) {
      alert(e)
    },
    duplicateSection(e) {
      alert(e)
    },
    deleteSection(e) {
      alert(e)
    }
  }
}

</script>

<style scoped lang="scss">
.doc-section::v-deep .section-menu-holder {
  // border-radius:.62em;
  position: absolute;
  top: -2.25rem;
  right: -1px;
  // background-color: map-get($blue , 'accent-4');
  background-color: #4864e7;
  color: map-get($shades, 'white');
  border-top-right-radius: .5rem;
  border-top-left-radius: .5rem;
  padding-left: 1rem;
  .v-btn{
    color: map-get($shades, 'white');
    max-width: 2rem;
    padding: 0;
  }
}
.doc-section::v-deep .drag-handle {
  position: absolute;
  cursor: move;
  left: -0.60rem;
  display: none;
  top: calc( 50% - 2rem);
  border: 0;
  .drag-handler-icon {
    background-color: map-get($shades, 'white');
    border-radius: .35rem;
  }
}
.doc-section::v-deep .new-section-handler {
  cursor: pointer;
  position: absolute;
  bottom: -1rem;
  left: calc(50% - 1.5rem);
}

</style>