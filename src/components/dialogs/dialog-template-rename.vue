<template>
  <v-dialog
    id="rename-template-dialog"
    v-model="dialog"
    max-width="400px"
    content-class="new-template"
    value="dialog"
    persistent
  >
    <v-card>
      <v-card-title>
        <p class="h6">
          {{ $t('dialog.template.rename') }}
        </p>
        <p
          class="body-1 text--secondary"
          v-html="$t('dialog.template.rename-desc')"
        ></p>
      </v-card-title>
      <v-card-text class="d-flex">
        <v-row>
          <v-col cols="12">
            <v-text-field
              ref="templatename"
              v-model="templatename"
              tabindex="1"
              autofocus
              :label="$t('dialog.template.name')"
              persistent-hint
              flat
              :background-color="`${(!dark)? 'white': null}`"
              :color="`${(!dark)? 'gray': null}`"
              outlined
              rounded
              clearable
              clear-icon="icon-delete"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="d-flex">
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-btn
              tabindex="3"
              rounded
              large
              block
              class="text-none"
              elevation="0"
              @click="closeDialog()"
            >
              {{ $t('dialog.cancel') }}
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-btn
              tabindex="2"
              color="primary"
              rounded
              large
              block
              class="text-none"
              elevation="0"
              @click="templateNewName()"
            >
              {{ $t('dialog.done') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: 'DialogTemplateRename',
  props: {
    dialog: Boolean
  },
  data () {
    return {
      templatename: null
      // templatename: this.template.name || ''
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
		template: {
			get: function () {
				return this.$store.state.item.current
			}
		},		
    form () {
			return {
				templatename: this.templatename
      }
    }
  },
  mounted () {

  },
  methods: {
    ...mapActions("templates", ["renameTemplate"]),
    closeDialog () {
			// this.$store.commit('setCurrentItem', null)
			this.$store.commit('openRenameTemplateDialog', !this.dialog)
    },
    async templateNewName () {
			const { user, template, form: {templatename: newname}} = this
      const renamed = await this.renameTemplate({user, template, newname })
      // TODO renameTemplate snackbar
      this.$store.commit('setCurrentItem', renamed)

this.closeDialog()
    }
  }
}

</script>

<style scoped lang="scss">
  .new-template {
    fieldset{
      &.v-text-field--outlined{
        border-color: grey lighten-3!important;
      }
    }
  }
</style>
