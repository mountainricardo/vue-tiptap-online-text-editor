<template>
  <v-menu
    close-on-content-click
    offset-y
    top
    right
    nudge-right="70"
    nudge-top="-40"
    rounded="lg"		
    content-class="content-version-item-menu"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-show="version === contentVersion"
        icon
        tile
        v-bind="attrs"
        class="ml-4 mt-0"
        :disabled="version !== contentVersion"
        v-on="on"
      >
        <v-icon medium>
          icon-menu-vertical
        </v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item-group>
        <template
          v-for="(o, index) in options"
        >
          <template v-if="o.icon === 'divider'">
            <v-divider
              :key="index"
              class="mt-1"
            ></v-divider>
          </template>

          <template v-else>
            <v-list-item
              :key="index"
              @click="o.icon.endsWith('rename') ? openRenameVersionDialog()
                : o.icon.endsWith('trash') ? deleteFileVersion()
                  : duplicateFileVersion()"
            >
              <v-list-item-icon>
                <v-icon v-text="o.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content
                :key="index"
                v-text="$t(o.text)"
              ></v-list-item-content>
            </v-list-item>
          </template>
        </template>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script lang="js">
import { mapActions } from 'vuex'
export default {
  name: 'ContentVersionItemMenu',
  props: {
		version: Number
	},
  data () {
		return {
			options: [
				{
					icon: 'icon-rename',
					text: 'editor.version-menu.rename-version',
					disabled: false,
          href: ''
        },
        {
					icon: 'icon-duplicate',
					text: 'editor.version-menu.duplicate-version',
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
					text: 'editor.version-menu.delete-version',
					disabled: false,
          href: ''
        }
      ]
    }
  },
	computed: {
    contentVersion: {
      get: function () {
        return this.$store.state.editor.contentVersion
      }
    }

	},
	mounted () {
    // console.log('version %o contentVersion %o', this.version, this.contentVersion)
  },
  methods: {
	...mapActions('editor', ['duplicateVersion', 'deleteVersion']),
    openRenameVersionDialog () {
			this.$store.commit('openRenameVersionDialog', true)
		},
		duplicateFileVersion () {
			this.duplicateVersion()
		},
		async deleteFileVersion () {
			await this.deleteVersion()
			this.$emit('deletion')
		}
  }
}

</script>

<style scoped>
.content-version-item-menu{
  border-radius:.62em;
}
.content-version-item-menu .v-list {
    padding: .62em;
}
.content-version-item-menu .v-list >>> .v-list-item.v-list-item--link{
  margin-top: .3em;
}
.content-version-item-menu .v-list >>> .v-list-item.v-list-item--link:before{
  border-radius: .44em!important;
}
</style>
