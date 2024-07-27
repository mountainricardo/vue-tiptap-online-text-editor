<template>
  <v-dialog
    id="rename-version-dialog"
    v-model="dialog"
    max-width="400px"
    content-class="new-template"
    value="dialog"
    persistent
  >
    <v-card>
      <v-card-title>
        <p class="h6">
          {{ $t('dialog.version.rename') }}
        </p>
        <p
          class="body-1 text--secondary"
          v-html="$t('dialog.version.rename-desc')"
        ></p>
      </v-card-title>
      <v-card-text class="d-flex">
        <v-row>
          <v-col cols="12">
            <v-text-field
              ref="versionname"
              v-model="versionname"
              tabindex="1"
              autofocus
              :label="$t('dialog.version.name')"
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
              @click="versionNewName()"
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
  name: 'DialogVersionRename',
  props: {
    dialog: Boolean
  },
  data () {
    return {
      versionname: null
    }
  },
  computed: {
    dark: {
      get: function () {
        return this.$store.state.theme.dark
      }
    },
		template: {
			get: function () {
				return this.$store.state.item.current
			}
		},		
    form () {
			return {
				versionname: this.versionname
      }
    }
  },
  mounted () {

  },
  methods: {
    ...mapActions("editor", ["renameVersion"]),
    closeDialog () {
			// this.$store.commit('setCurrentItem', null)
			this.$store.commit('openRenameVersionDialog', !this.dialog)
    },
    async versionNewName () {
			const { form: {versionname: newname}} = this
      await this.renameVersion({newname })
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
