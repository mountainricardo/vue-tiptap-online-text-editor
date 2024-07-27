<template>
  <v-menu
    close-on-content-click
    offset-y
    top
    left
    class="template-menu"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        class="ml-4 mt-2"
        v-on="on"
      >
        <v-icon small>
          icon-more
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

          <template v-else-if="o.icon === 'icon-rename'">
            <v-list-item-icon>
              <v-icon v-text="o.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content
              id="theme-activator"
              :key="index"
              @click="openRenameTemplateDialog()"
              v-text="$t(o.text)"
            ></v-list-item-content>
          </template>
          <template v-else-if="o.icon === 'icon-trash'">
            <v-list-item-icon>
              <v-icon v-text="o.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content
              id="theme-activator"
              :key="index"
              @click="templateDelete()"
              v-text="$t(o.text)"
            ></v-list-item-content>
          </template>
          <template v-else>
            <v-list-item-icon>
              <v-icon v-text="o.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content
              id="theme-activator"
              :key="index"
              @click="templateDuplicate()"
              v-text="$t(o.text)"
            ></v-list-item-content>
            <!-- @click="templateDelete()" -->
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script lang="js">
import { mapActions } from 'vuex'
export default {
  name: 'DocumentItemMenu',
  props: {
		template: Object
	},
  data () {
		return {

			options: [
				{
					icon: 'icon-rename',
					text: 'template.menu.rename',
					disabled: false,
          href: ''
        },
        {
					icon: 'icon-duplicate',
					text: 'template.menu.duplicate',
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
					text: 'template.menu.delete',
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
    }

	},
	mounted () {},
  methods: {
	...mapActions('templates', ['deleteTemplate', 'duplicateTemplate']),
    openRenameTemplateDialog () {
			// console.log('openRenameTemplateDialog', this.template.name)
			this.$store.commit('setCurrentItem', this.template)
			this.$store.commit('openRenameTemplateDialog', true)
		},
		async templateDelete () {
			const { user, template} = this
			// TODO deleteTemplate snackbar
			this.$store.commit('setCurrentItem', template)
			this.deleteTemplate({user, template })
		},
		async templateDuplicate () {
			const { user, template} = this
			console.log('template-item-menu.templateDuplicate user %o, template %o')
			await this.duplicateTemplate({user, template })
			// TODO duplicateTemplate snackbar
		}
  },	
}

</script>

<style scoped lang="scss">
.template-menu {
}
</style>
