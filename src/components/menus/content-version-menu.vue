<template>
  <v-menu
    offset-y
    top
    right
    nudge-left="0"
    nudge-top="10"
    rounded="lg"
    content-class="content-version-menu"
    :return-value="contentVersion"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        elevation="1"
        rounded
        outlined
        large
        class="content-version-menu-wrapper text-none"
        v-bind="attrs"
        v-on="on"
      >
        {{ allContentVersions[contentVersion].versionName ?
          allContentVersions[contentVersion].versionName :
          'Version ' + (contentVersion + 1) }}
        <v-icon
          small
          class="ml-3"
          v-text="'icon-expand-arrow'"
        ></v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item-group>
        <template
          v-for="(o, index) in allContentVersions"
        >
          <v-list-item
            :key="index"
            @click.stop="selectVersion(index)"
          >
            <v-list-item-icon>
              <v-icon v-text="'icon-document'"></v-icon>
            </v-list-item-icon>
            <v-list-item-content
              v-text="o.versionName ? o.versionName : 'Version ' + (index + 1)"
            ></v-list-item-content>
            <content-version-item-menu
              :version="index"
              @deletion="versionDeleted"
            ></content-version-item-menu>
          </v-list-item>
        </template>

        <v-divider class="mt-1"></v-divider>
        <v-list-item
          @click="insertNewVersion()"
        >
          <v-list-item-icon>
            <v-icon v-text="'icon-add'"></v-icon>
          </v-list-item-icon>
          <v-list-item-content
            
            v-text="$t('editor.version-menu.add-version')"
          ></v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script lang="js">
import ContentVersionItemMenu from '@/components/menus/content-version-item-menu.vue'
import { mapActions } from 'vuex'
export default {
	name: 'ContentVersionMenu',
  components: {
    ContentVersionItemMenu
  },	
  props: {
    
  },
  data () {
    return {
      // dark: false,
      versions: [
        {
          icon: 'icon-document',
          text: 'Version 1',
          disabled: false,
          href: ''
        },
        {
          icon: 'icon-document',
          text: 'Version 2',
          disabled: false,
          href: ''
        },
      ]
    }
  },
  computed: {
    contentVersion: {
      get: function () {
        return this.$store.state.editor.contentVersion
      },
      set: function (newValue) {
        const version = newValue
        this.changeEditorVersion({version})
      }
    },
    content: {
      get: function () {
        return this.allContentVersions[this.contentVersion]
      },
      set: function (newValue) {
        const version = newValue
        this.changeVersion({ version })
      }

    },
    allContentVersions: {
      get: function () {
        if (this.$store.state.editor.allContentVersions) {
          return this.$store.state.editor.allContentVersions
        } else {
          return []
        }
      }
    },

	},
  mounted () {

	},
	methods: {
    ...mapActions('editor', ['newVersion', 'changeVersion']),

    insertNewVersion () {
      // console.log('new empty version')
      this.newVersion()
      this.$emit('selection', this.contentVersion)
    },
    selectVersion (version) {
      this.$emit('selection', version)
    },
		versionDeleted () {
      // console.log('version deleted', this.contentVersion)
			this.$emit('selection', this.contentVersion)
		}

	},
}

</script>

<style scoped>

.content-version-menu{
  border-radius:.62em;
}
.content-version-menu .v-list {
    padding: .62em;
}
.content-version-menu .v-list >>> .v-list-item.v-list-item--link{
  margin-top: .3em;
}
.content-version-menu .v-list >>> .v-list-item.v-list-item--link:before{
  border-radius: .44em!important;
}
.content-version-menu-wrapper {
	color:grey
}
</style>
