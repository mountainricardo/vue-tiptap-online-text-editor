<template>
  <v-menu
    close-on-content-click
    offset-y
    bottom
    right
    nudge-right="30"
    nudge-top="20"
    rounded="lg"
    content-class="editor-doc-section-menu"
    class="section-menu"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        width="2rem"
        max-width="2rem"
        class="pa-0"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon small>
          icon-menu-vertical
        </v-icon>
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item-group>
        <v-list-item
          v-for="(o, index) in options"
          :key="index"
          :disabled="o.disabled"
        >
          <template v-if="o.icon === 'divider'">
            <v-divider></v-divider>
          </template>

          <template v-else>
            <v-list-item-icon>
              <v-icon v-text="o.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content
              id="theme-activator"
              :key="index"
              @click="o.text.endsWith('rename') ? openRenameSectionDialog()
                : o.text.endsWith('color') ? deploySwapColors()
                  : o.text.endsWith('duplicate') ? duplicateSection()
                    : o.text.endsWith('delete') ? deleteSection() 
                      : null"
              v-text="$t(o.text)"
            ></v-list-item-content>
            <!-- <v-list-item-content></v-list-item-content> -->
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script lang="js">
// import { mapActions } from 'vuex'
export default {
  name: 'EditorDocSectionMenu',
  props: {
		document: Object
	},
  data () {
		return {

			options: [
				{
					icon: 'icon-rename',
					text: 'editor.section-menu.rename',
					disabled: false,
          href: ''
        },
        {
					icon: 'icon-paint-palette',
					text: 'editor.section-menu.swap-color',
					disabled: true,
          href: ''
        },
        {
					icon: 'icon-duplicate',
					text: 'editor.section-menu.duplicate',
					disabled: false,
          href: ''
        },
        {
					icon: 'divider',
					text: '',
					disabled: true,
          href: ''
        },
        {
					icon: 'icon-trash',
					text: 'editor.section-menu.delete',
					disabled: false,
          href: ''
        }
      ]
    }
  },
	computed: {

	},
	mounted () {},
  methods: {
    // ...mapActions('folders', ['duplicateDocument', 'archiveDocument', 'deleteDocument']),
    // TODO RenameSectionDialog
    openRenameSectionDialog () {
      // this.$store.commit('openRenameSectionDialog', true)
      this.$emit('rename', 'newname event for section')
    },
    deploySwapColors() {},
    duplicateSection() {
      this.$emit('duplicate', 'duplicate event for section')
    },
    deleteSection() {
      this.$emit('delete', 'delete event section')
    },
     
  }
}

</script>

<style scoped lang="scss">
.section-menu::v-deep .v-btn {
    max-width: 2rem;
    padding: 0;
    // color: map-get($shades, 'white');
  }
.editor-doc-section-menu {
  border-radius:.62em;
  .v-list {
    padding: .62em;
    &::v-deep .v-list-item.v-list-item--link{
      margin-top: .3em;
      &:before {
        border-radius: .44em!important;
      }
    }
  }
}

</style>
