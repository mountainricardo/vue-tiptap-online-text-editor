<template>
  <v-dialog
    id="account-settings-dialog"
    v-model="dialog"
    max-width="600px"
    class="account-settings-dialog"
    value="dialog"
    persistent
  >
    <v-card>
      <v-card-title class="d-flex">
        <h3 class="headline">
          {{ $t('account.settings') }}
        </h3>
        <!-- <v-row>
          <v-col cols="3">
            <v-avatar
              size="56"
              elevation="1"
              outlined
              color="secondary light"
            >
              <v-icon x-large>
                icon-account
              </v-icon>
            </v-avatar>
          </v-col>
          <v-col cols="9">
            <v-row>
              <v-col cols="6">
                <v-btn
                  rounded
                  large
                  color="primary "
                  class="text-none"
                  elevation="0"
                >
                  {{ $t('account.avatar.new') }}
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  rounded
                  large
                  class="text-none"
                  elevation="0"
                >
                  {{ $t('account.avatar.delete') }}
                </v-btn>
              </v-col>
              <v-col cols="12">
                <p class="caption text--secondary">
                  {{ $t('account.avatar.desc') }}
                </p>
              </v-col>
            </v-row>
          </v-col>
        </v-row> -->
      </v-card-title>
      <v-card-text class="d-flex">
        <v-row>
          <v-col cols="12">
            <v-divider></v-divider>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
          >
            <v-text-field
              :label="$t('account.first-name') + '*'"
              persistent-hint
              required
              solo
              flat
              background-color="grey lighten-3"
              filled
              shaped
              outlined
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
          >
            <v-text-field
              :label="$t('account.last-name') + '*'"
              persistent-hint
              required
              solo
              flat
              background-color="grey lighten-3"
              filled
              shaped
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              :label="$t('account.email') + '*'"
              persistent-hint
              required
              solo
              flat
              background-color="grey lighten-3"
              filled
              shaped
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-divider></v-divider>
          </v-col>
          <v-col cols="12">
            <h4>{{ $t('account.pwd.change') }}</h4>
          </v-col>
          <v-col cols="6">
            <v-text-field
              :label="$t('account.pwd.old') + '*'"
              type="password"
              required
              solo
              flat
              background-color="grey lighten-3"
              filled
              shaped
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              :label="$t('account.pwd.new') + '*'"
              type="password"
              required
              solo
              flat
              background-color="grey lighten-3"
              filled
              shaped
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <small cols="12">*indicates required field</small>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="d-flex">
        <v-row>
          <v-col
            cols="12"
            md="4"
            offset-md="4"
          >
            <v-btn
              rounded
              large
              class="text-none"
              elevation="0"
              block
              @click="closeDialog()"
            >
              {{ $t('account.cancel') }}
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-btn
              color="primary"
              rounded
              large
              class="text-none"
              elevation="0"
              block
              @click="closeDialog()"
            >
              {{ $t('account.update') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'AccountSettingsDialog',
  props: {
    dialog: Boolean
  },
  data () {
    return {

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    closeDialog () {
      this.$store.commit('openAccountSettingsDialog', !this.dialog)
    }
  }
}

</script>

<style scoped lang="scss">
  .account-settings-dialog {
  }
</style>
