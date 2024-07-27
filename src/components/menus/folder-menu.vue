<template>
  <v-menu
    close-on-content-click
    offset-y
    bottom
    right
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        class="ml-4"
        v-on="on"
      >
        <v-icon small>
          icon-more_outlined
        </v-icon>
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item-group>
        <v-list-item
          v-for="(f, index) in folder"
          :key="index"
          :disabled="f.disabled"
        >
          <template v-if="f.icon === 'icon-rename'">
            <v-list-item-icon>
              <v-icon v-text="f.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content
              id="folder-dialog-activator"
              :key="index"
              @click="openRenameFolderDialog()"
              v-text="$t(f.text)"
            ></v-list-item-content>
          </template>

          <template v-else-if="f.icon === 'icon-trash'">
            <v-list-item-icon>
              <v-icon v-text="f.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content
              id="theme-activator"
              :key="index"
              @click="deleteDirectory()"
              v-text="$t(f.text)"
            ></v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script lang="js">
import { mapActions } from 'vuex'
import router from '@/router/index.js'
import { api } from "@/config";
export default {
  name: 'FolderMenu',
  props: [],
  data () {
		return {
      folder: [
				{
					icon: 'icon-rename',
          text: 'dialog.folder.menu.rename',
          disabled: false,
          href: ''
        },
        {
					icon: 'icon-trash',
          text: 'dialog.folder.menu.delete',
          disabled: false,
          href: ''
        }
      ]
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
    directory: {
      get: function () {
        if(this.selectedFolder) {
          return this.$store.state.folders.folders[this.selectedFolder - 1].id
        } else {
          return ''
        }
      }
    },
    selectedFolder: {
      get: function () {
        return this.$store.state.nav.selectedFolder;
      },
      set: function (newValue) {
        this.$store.commit("selectFolders", newValue);
      },
    },


	},
  mounted () {},
  created() {
    this.api = api
  },  
  methods: {
		...mapActions('folders', ['deleteFolder']),
    openRenameFolderDialog () {
			this.$store.commit('openRenameFolderDialog', true)
		},
		async deleteDirectory () {
			const { user, workspace, directory} = this
      const deleted = await this.deleteFolder({user, workspace, directory })
      if ( deleted && this.selectedFolder > 0) {
        this.selectedFolder --
        router.push(`${
          this.api.user.users
          + this.user.id
          + this.api.workspace.workspaces}/${this.workspace
          + this.api.directory.directories}/${this.directory
        }`)
        // `${api.user.users + user.id + api.workspace.workspaces}/${workspace + api.directory.directories}/${folder.id}`"

      }
		}
  }	
}

</script>

<style scoped lang="scss">
.user-menu {
}
</style>
