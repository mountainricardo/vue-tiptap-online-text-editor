<template>
  <div
    class="text-editor"
  >
    <editor-menu-bar
      v-slot="{ commands }"
      :editor="editor"
    >
      <!-- v-slot="{ commands, isActive }" -->
      <div class="menubar d-flex justify-space-between  elevation-1">
        <v-btn
          fab
          small
          elevation="0"
          class="mt-2 ml-2"
          @click="backToDashboard()"
        >
          <v-icon
            small
            v-text="'icon-arrow-left'"
          ></v-icon>
        </v-btn>

        <editor-file-menu
          @alert="showSuccessAlert"
        ></editor-file-menu>

        <v-divider></v-divider>
        <v-btn
          icon
          large
          class="menubar__button mt-2"
          @click="commands.undo"
        >
          <v-icon v-text="'icon-undo'"></v-icon>
        </v-btn>
        <v-btn
          icon
          large
          class="menubar__button mt-2"
          @click="commands.redo"
        >
          <v-icon v-text="'icon-redo'"></v-icon>
        </v-btn>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-btn
          id="export-control"
          color="primary"
          rounded
          large
          class="text-none mt-3 mr-3"
          elevation="0"
          @click.stop="openExportDialog()"
        >
          {{ $t('editor.export') }}
          <v-icon class="ml-2">
            icon-open-document
          </v-icon>
        </v-btn>
      </div>
    </editor-menu-bar>
    <div
      class="editor pt-2 lighten-4"
      :class="`${(!dark)? 'grey': ''}`"
    >
      <editor-menu-bubble
        v-slot="{ commands, isActive, menu, getMarkAttrs }"
        class="menububble"
        :editor="editor"
        :keep-in-bounds="keepInBounds"
      >
        <div
          class="menububble"
          :class="{ 'is-active': menu.isActive }"
          :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
        >
          <v-btn-toggle
            multiple
            dense
            rounded
            borderless
            class="elevation-4"
          >
            <v-menu
              offset-y
              content-class="paragraph-style-menu"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  class="text-none"
                  v-on="on"
                >
                  {{ $t('editor.styles.styles') }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(s, index) in styles"
                  :key="index"
                  :class="{ 'is-active': isActive.heading({ level: s.value }) }"
                  @click="`${commands.heading({ level: s.value })}`"
                >
                  <v-list-item-title v-html="s.text"></v-list-item-title>
                </v-list-item>
                <v-list-item
                  :class="{ 'is-active': isActive.paragraph() }"
                  @click="`${commands.paragraph()}`"
                >
                  <v-list-item-title v-html="$t('editor.styles.normal')"></v-list-item-title>
                </v-list-item>
                <v-list-item
                  :class="{ 'is-active': isActive.small_text() }"
                  @click="commands.small_text"
                >
                  <v-list-item-title v-html="`<small>${$t('editor.styles.small')}</small>`"></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-divider></v-divider>
            <v-menu
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  icon
                  class="text-none"
                  v-on="on"
                >
                  <v-icon
                    medium
                    v-text="'icon-align-center'"
                  ></v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(a, index) in alignements"
                  :key="index"
                >
                  <v-btn
                    icon
                    tile
                    :class="{ 'is-active': editor.activeMarkAttrs.aligntext.align === a.value }"
                    @click="commands.aligntext({ align: a.value })"
                  >
                    <v-icon
                      v-text="`icon-align-${a.value}`"
                    ></v-icon>
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn
              icon
              tile
              :class="{ 'is-active': isActive.bold() }"
              @click="commands.bold"
            >
              <v-icon
                medium
                v-text="'icon-bold'"
              ></v-icon>
            </v-btn>

            <v-btn
              icon
              tile
              :class="{ 'is-active': isActive.italic() }"
              @click="commands.italic"
            >
              <v-icon
                medium
                v-text="'icon-italic'"
              ></v-icon>
            </v-btn>

            <v-btn
              icon
              tile
              :class="{ 'is-active': isActive.underline() }"
              @click="commands.underline"
            >
              <v-icon
                v-text="'format_underlined'"
              ></v-icon>
            </v-btn>
            <v-btn
              icon
              tile
              :class="{ 'is-active': editor.activeMarkAttrs.highlight_text.color === 'pink' }"
              @click="commands.highlight_text"
            >
              <v-icon
                v-text="'icon-chisel-tip-marker'"
              ></v-icon>
            </v-btn>
            <v-btn
              icon
              tile
              :class="{ 'is-active': isActive.bullet_list() }"
              @click="commands.bullet_list"
            >
              <v-icon
                v-text="'icon-list'"
              ></v-icon>
            </v-btn>
            <form
              v-if="linkMenuIsActive"
              class="menububble__form"
              @submit.prevent="setLinkUrl(commands.link, linkUrl)"
            >
              <v-text-field
                ref="linkInput"
                v-model="linkUrl"
                class="menububble__input elevation-4"
                type="text"
                :placeholder="$t('editor.link.placeholder')"
                clearable
                clear-icon="icon-delete"
                dense
                rounded
                outlined
                hide-details=""
                background-color="white"
                @keydown.esc="hideLinkMenu"
              ></v-text-field>
            </form>
            <template>
              <v-btn
                icon
                tile
                class="pr-3"
                :class="{ 'is-active': isActive.link() }"
                @click="showLinkMenu(getMarkAttrs('link'))"
              >
                <v-icon
                  :color="`${isActive.link() ? 'orange' : 'currentColor' }}`"
                  v-text="'icon-link'"
                ></v-icon>
              </v-btn>
            </template>
          </v-btn-toggle>
        </div>
      </editor-menu-bubble>

      <editor-content
        class=" rounded-lg pa-2 u-editor"
        :editor="editor"
      />
      <!-- :class="`${(!dark)? 'white': 'grey darken-4'}`" -->
      <div class="export-informant">
        <h3>JSON just to be shown during development</h3>
        <pre><code v-html="json"></code></pre>

        <h3>HTML  just to be shown during development</h3>
        <pre><code>{{ html }}</code></pre>
      </div>

      <div class="content-version-menu-wrapper">
        <content-version-menu
          @selection="changeVersion"
        ></content-version-menu>
      </div>
    </div>
    <u-success
      :value="alertValue"
      :text="alertText"
    ></u-success>
    <dialog-version-rename
      :dialog="this.$store.state.dialogs.renameVersionDialog"
    ></dialog-version-rename>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import router from '@/router/index.js'
import EditorFileMenu from '@/components/menus/editor-file-menu.vue'
import USuccess from '@/components/elements/u-success.vue'
import ContentVersionMenu from '@/components/menus/content-version-menu.vue'
import DialogVersionRename from '@/components/dialogs/dialog-version-rename.vue'
import {
  Editor,
  EditorContent,
  EditorMenuBar,
  EditorMenuBubble
} from 'tiptap'
import {
  Heading,
  Bold,
  Italic,
  Underline,
  BulletList,
  ListItem,
  Link,
  History,
  HardBreak
} from 'tiptap-extensions'
import {
  Alignment,
  HighlightText,
  SmallText,
  DocSection
} from '@/tip-tap-extensions'
// import css from '@/assets/css/tip-tap-style.css'

export default {
  name: 'TextEditor',
  components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble,
    EditorFileMenu,
    USuccess,
    ContentVersionMenu,
    DialogVersionRename
  },
  props: [],
  data () {
    return {
      keepInBounds: true,
      editor: new Editor({
        // emptyDocument: this.empty,
        emptyDocument: {
        type: 'doc',
        content: [{
          type: 'block',
          // type: 'doc_section',
        }],
      },
        extensions: [
          new Heading({ levels: [1, 2, 3] }),
          new Bold(),
          new Italic(),
          new Underline(),
          new BulletList(),
          new ListItem(),
          new Link(),
          new History(),
          new HardBreak(),
          new Alignment(),
          new HighlightText(),
          new SmallText(),
          new DocSection(),
        ],
        // onInit: () => {
          
        // },
        onUpdate: ({ getJSON, getHTML }) => {
          this.content = this.json = getJSON()
          this.html = getHTML()
        },
      }),
      linkUrl: null,
      linkMenuIsActive: false,
      json: 'Update content to see changes',
      html: 'Update content to see changes',
      empty: {
                "type": "doc",
                "content": [
                  {
                    "type": "paragraph",
                    "content": [
                      {
                        "type": "text",
                        "text": "This is an empty version"
                      }
                    ]
                  }
                ]
              },
      saveInterval: null,
      alertText: '',
      alertValue: false,
      styles: [
        {
          text: '<h1>Headline 1</h1>',
          command: 'heading',
          value: 1
        },
        {
          text: '<h2>Headline 2</h2>',
          command: 'heading',
          value: 2
        },
        {
          text: '<h3>Subheadline</h3>',
          command: 'heading',
          value: 3
        }
      ],
      alignements: [
        {
          text: 'Left',
          value: 'left'
        },
        {
          text: 'Right',
          value: 'right'
        },
        {
          text: 'Center',
          value: 'center'
        }
      ]
    }
  },
  computed: {
    dark: {
      get: function () {
        return this.$store.state.theme.dark
      }
    },
    user: {
      get: function () {
        return this.$store.state.account.user
      }
    },
    workspace: {
      get: function () {
        return this.$store.state.folders.workspaces[0].id
      }
    },
    document: {
      get: function () {
        return this.$store.state.editor.document
      }
    },
    content: {
      get: function () {
        return this.allContentVersions[this.contentVersion].content
      },
      set: function (newValue) {
        const content = newValue
        const {contentVersion: version} = this
        this.updateContentBuffer({content, version})
      }
    },
    allContentVersions: {
      get: function () {
        if (this.$store.state.editor.allContentVersions) {
          return this.$store.state.editor.allContentVersions
        } else {
          return null
        }
      }
    },
    contentVersion: {
      get: function() {
        return this.$store.state.editor.contentVersion
      },
      set (newValue) {
        const version = newValue
        this.changeEditorVersion({version})
      }
    }    
  },
  mounted () {
    this.saveInterval = setInterval(this.saveContent, process.env.VUE_APP_SAVE_TIMEOUT)
  },
  created() {
    this.$store.commit('changeDrawer', !this.$store.state.nav.drawer)
    this.setEditorContent()
    this.editor.view.dom.classList.add('content-editable')
  },
  beforeDestroy() {
    clearInterval(this.saveInterval)
    this.saveContent()
    this.$store.commit('changeDrawer', !this.$store.state.nav.drawer)
    this.editor.destroy()
  },
  methods: {
    ...mapActions('editor', [
      'closeDocument',
      'updateDocumentContent',
      'changeEditorVersion',
      'updateContentBuffer',
      ]),
    // Event driven methods
    showSuccessAlert (event) {
      this.alertText = event
      this.alertValue = true
      setTimeout(() => {
        this.alertText = ''
        this.alertValue = false
      }, process.env.VUE_APP_SUCCESS_ALERT_TIMEOUT)
    },
    changeVersion (event) {
      this.contentVersion = event
      this.setEditorContent(this.content)
    },
    async backToDashboard () {
      await this.closeDocument()
      router.back()
    },
    openExportDialog() {
      alert('will open a dialog with export options and procedure')
    },
    // Editor methods
    clearContent() {
      this.editor.clearContent(false)
      this.editor.focus()
    },
    setEditorContent() {
      this.editor.setContent(this.allContentVersions[this.contentVersion].content, true)
      this.editor.focus()
    },
    saveContent: async function () {
      const {user, workspace, document, allContentVersions: content} = this
      const updated = await this.updateDocumentContent({user, workspace, document, content})
      if (updated) {
        console.log('Content saved at %o', this.$moment().format(process.env.VUE_APP_MOMENT_FORMAT))
      }
    },
    showLinkMenu(attrs) {
      this.linkUrl = attrs.href
      this.linkMenuIsActive = true
      this.$nextTick(() => {
        this.$refs.linkInput.focus()
      })
    },
    hideLinkMenu() {
      this.linkUrl = null
      this.linkMenuIsActive = false
    },
    setLinkUrl(command, url) {
      command({ href: url })
      this.hideLinkMenu()
    }
  }
}


</script>

<style scoped lang="scss">
  .editor {
    position: relative;
    height: calc( 100% - 62px);
    padding:2rem 12%;
    margin-top: .05em;
    .u-editor{
      padding: 1rem;
      &:hover, &:focus, &:active, &:focus-within {
        outline: none;
      }
      &::v-deep .content-editable {
        padding: 1em;
        &:hover, &:focus, &:active, &:focus-within {
          outline: none;
        }
        .doc-section {
          margin: 0;
          padding: 1rem;
          position: relative;
          border: 1px solid transparent;
          & > .drag-handle {
            display: none;
          }
          & > .new-section-handler {
            display: none;
          }
          & > .section-menu-holder {
            display: none;
          }
          &:hover, &:focus, &:active {
            outline: none;
            // border-color: map-get($blue, 'accent-4'); // #2962FF
            border-color: #4864e7;
            // border-bottom-color: map-get($blue, 'accent-4'); // #2962FF
            border-radius: .5rem;
            border-top-right-radius: 0;
            & > .drag-handle {
              display: block;
            }
            & > .new-section-handler {
              display: block;
            }
            & > .section-menu-holder {
              display: block;
            }
          }
          h1, h2, h3, p {
            background-color: map-get($shades, 'white');
            color: map-get($grey, 'darken-4');
            margin-bottom: 0;
            border: 1px solid map-get($grey, 'lighten-3'); //#eeeeee
            border-bottom-color: transparent;
            padding:  1em .5em;
            &:first-child{
              border-top-right-radius: .3em;
              border-top-left-radius: .3em;
            }
            &:last-child {
              border-bottom-right-radius: .3em;
              border-bottom-left-radius: .3em;
              border-bottom-color: map-get($grey, 'lighten-3'); //#eeeeee
            }
          }
        }
      }
    }
    &__floating-menu {
      position: absolute;
      z-index: 1;
      margin-top: 2rem;
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.2s, visibility 0.2s;
      &.is-active {
        opacity: 1;
        visibility: visible;
      }
    }
  }
  .paragraph-style-menu{
    .v-list-item.is-active{
      .v-list-item__title{
        border-bottom:2px solid orange;
      }
      .v-btn__content{
        border-bottom:2px solid orange;
      }
    }
  }
  .text-editor {
    height: 100%;
      .menubar{
      button{
        &.is-active{
          &:before{
            background-color: currentColor;
          }
          span, span.v-btn__content{
            border-bottom:1px solid orange!important;
          }
        }
      }
      button span {
        font-size: 1.5em
      }
    }
    .actions {
      max-width: 30rem;
      margin: 0 auto 2rem auto;
    }
    .export-informant {
      max-width: 30rem;
      width: 30rem;
      height: 30rem;
      max-height: 30rem;
      overflow-y: auto;
      margin: 0 auto 2rem auto;
      position: absolute;
      top: 25rem;
      right: 2rem;
      opacity: .5;
      pre {
        padding: 1rem;
        border-radius: 5px;
        font-size: 0.8rem;
        font-weight: bold;
        background: rgba(0,0,0, 0.05);
        color: rgba(0,0,0, 0.8);
      }
      code {
        display: block;
        white-space: pre-wrap;
      }
    }
  }
  // floating menu styles
.menububble {
  position: absolute;
  z-index: 20;
  // margin-bottom: 0.5rem;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;

  &.is-active {
    opacity: 1;
    visibility: visible;
  }
  .menububble__form{
    position: absolute;
    top: 2.5em;
    width:auto;
    min-width: 20em;
  }
}
.content-version-menu-wrapper {
	position: absolute!important;
	bottom: 3rem;
	left: 3rem;
}
</style>
