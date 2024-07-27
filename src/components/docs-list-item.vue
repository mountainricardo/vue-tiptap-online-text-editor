<template>
  <section>
    <v-card
      cols="12"
      flat
      hover
      class="docs-list-item d-flex flex-no-wrap justify-space-between"
    >
      <v-card-title
        v-if="!document.archived"
        class="py-0 d-flex editor-link"
        @click="openEditor()"
      >
        <v-img
          src="@/assets/img/document_icon.svg"
          width="40px"
          max-width="40px"
          class="mr-4"
        ></v-img>
        <div class="d-flex flex-column">
          <span class="body-1 font-weight-bold">{{ document.name }}</span>
          <span class="body-1 text--secondary">
            {{
              $store.state.folders.allFolders.find( folder => folder.id === document.dir_id).name
                + ' &bull; '
                + $t('document.created')
                + ': '
            }}
            {{
              document.created | moment("from", "now")
            }}
            {{
              ' &bull; '
            }}
            {{
              $t('document.updated')
                + ': '
            }}
            {{
              document.updated | moment("from", "now")
            }}
            {{
              ' &bull; '
            }}
            {{
              $t('document.opened')
                + ': '
            }}
            {{
              document.openend | moment("from", "now")
            }}
          </span>
          <!-- <span class="subtitle-1">{{ document.created | moment(process.env.VUE_APP_MOMENT_FORMAT) }}</span> -->
        </div>
      </v-card-title>
      <v-card-title
        v-else
        class="py-0 d-flex no-link"
      >
        <v-img
          src="@/assets/img/document_icon.svg"
          width="40px"
          max-width="40px"
          class="mr-4"
        ></v-img>
        <div class="d-flex flex-column">
          <span class="body-1 font-weight-bold">{{ document.name }}</span>
          <span class="body-1 text--secondary">
            {{
              $t('document.created')
                + ': '
            }}
            {{
              document.created | moment("from", "now")
            }}
            {{
              ' &bull; '
            }}
            {{
              $t('document.updated')
                + ': '
            }}
            {{
              document.updated | moment("from", "now")
            }}
            {{
              ' &bull; '
            }}
            {{
              $t('document.opened')
                + ': '
            }}
            {{
              document.openend | moment("from", "now")
            }}
          </span>
          <!-- <span class="subtitle-1">{{ document.created | moment(process.env.VUE_APP_MOMENT_FORMAT) }}</span> -->
        </div>
      </v-card-title>
      <document-item-menu :document="document"></document-item-menu>
    </v-card>
  </section>
</template>

<script>
import { api } from "@/config"
import { mapActions } from 'vuex'
import DocumentItemMenu from '@/components/menus/document-item-menu.vue'
import router from '../router/index.js'
export default  {
  name: 'DocsListItem',
  components: {
    DocumentItemMenu
  },
  props: {
    document: Object
  },
  data () {
    return {

    }
  },
  computed: {
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
  },
  created () {
    this.api = api
  },
  mounted () {

  },
  methods: {
    ...mapActions('editor', ['getDocumentContent', 'resetEditor']),
    openEditor: async function () {
      // Reset editor state from former editions
      await this.resetEditor()
      // Get document content and set Editor state
      // then route to TextEditor component
      const {user, workspace, document} = this
      await this.getDocumentContent ({user, workspace, document})
      router.push(`${
        this.api.user.users
        + this.user.id
        + this.api.workspace.workspaces}/${this.workspace
        + this.api.directory.directories}/${this.document.dir_id
        + this.api.file.files}/${this.document.id
        + this.api.file.content
        }`)
    },
  }
}
</script>

<style scoped lang="scss">
  .docs-list-item {
    .no-link {
			cursor: default;
		}
		.editor-link {
      cursor: pointer;
      text-decoration: none;
      &:hover {
        text-decoration:none;
      }
    }
  }
</style>
