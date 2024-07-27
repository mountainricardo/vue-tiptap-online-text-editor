<template>
  <section class="nav-menu">
    <v-list
      nav
      dense
    >
      <v-list-item-group

        v-model="selectedFolder"
        active-class="router-link-active"
      >
        <template>
          <div
            v-for="(folder, i) in directories"
            :key="i"
          >
            <v-list-item
              v-if="folder.name !== 'Documents'"
              class="side-nav"
            >
              <router-link
                :to="`${api.user.users + user.id + api.workspace.workspaces}/${workspace + api.directory.directories}/${folder.id}`"
                class="d-flex"
              >
                <v-list-item-icon>
                  <v-icon v-text="'icon-folder'"></v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  id="folder.id"
                  v-text="folder.name"
                >
                </v-list-item-content>
              </router-link>
            </v-list-item>
          </div>
          <v-list-item>
            <v-list-item-icon>
              <v-icon v-text="'icon-add-new'"></v-icon>
            </v-list-item-icon>
            <v-list-item-content
              id="new-folder-dialog-activator"
              @click.stop="openNewFolderDialog()"
              v-text="$t('nav.new-folder')"
            ></v-list-item-content>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </section>
</template>

<script>
import { api } from "@/config";
export default {
  name: "NavMenuFolders",
  props: {

  },
  data() {
    return {
    };
  },
  computed: {
    logged: {
      get: function () {
        return this.$store.state.account.status.loggedIn
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
    directories: {
      get: function () {
        return this.$store.state.folders.folders
      }
    }
  },
  mounted() {

  },
  beforeDestroy() {

  },
  created() {
    this.api = api
  },
  methods: {
    openNewFolderDialog() {
      this.$store.commit("openNewFolderDialog", true);
    }
  },
};
</script>

<style scoped lang="scss">
.nav-menu {
}
.logging{
  position: absolute;
  top: 40%;
  left: 40%;
}
</style>
