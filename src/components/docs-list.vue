<template>
  <v-container
    fluid
  >
    <v-data-iterator
      :items="documents"
      item-key="id"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      :items-per-page="pageItems"
      :footer-props="{
        showFirstLastPage: false,
        showCurrentPage: true,
        disableItemsPerPage: true,
        itemsPerPageOptions: [],
        firstIcon: 'icon-arrow-left',
        lastIcon: 'icon-arrow-right',
        prevIcon: 'icon-arrow-left',
        nextIcon: 'icon-arrow-right'
      }"
      :hide-default-footer="pagination"
    >
      <template v-slot:header>
        <v-toolbar
          flat
          min-height="5rem"
          class="pt-3"
        >
          <v-container fluid>
            <v-row no-gutters>
              <v-col
                cols="12"
                md="4"
                class="d-flex justify-space-between mb-2"
              >
                <v-toolbar-title>
                  <h2 class="document">
                    {{ title }}
                    <folder-menu v-if="$store.state.nav.selectedFolder"></folder-menu>
                  </h2>
                </v-toolbar-title>
              </v-col>

              <v-col
                cols="12"
                md="8"
                class="d-flex justify-end mb-2"
              >
                <template>
                  <v-text-field
                    v-model="search"
                    flat
                    clearable
                    clear-icon="icon-delete"
                    prepend-inner-icon="icon-search-big"
                    label="Search"
                    hide-details
                    rounded
                    outlined
                    :background-color="`${(!dark)? 'white': null}`"
                    :color="`${(!dark)? 'gray': null}`"
                    class="mr-3"
                  ></v-text-field>
                  <v-spacer></v-spacer>

                  <u-select
                    :items="sortKeys"
                    :label="$t('sort.sort-by')"
                    :class="'mr-3'"
                    :item-text="'name'"
                    :item-value="'value'"
                    @select="changeSort"
                  ></u-select>

                  <v-spacer></v-spacer>
                  <v-btn
                    v-if="title !== $t('nav.archived')"
                    id="new-document-dialog-activator"
                    color="primary"
                    rounded
                    x-large
                    class="text-none"
                    elevation="0"
                    @click.stop="openNewDocumentDialog()"
                  >
                    <v-icon class="mr-2">
                      icon-add-new
                    </v-icon>
                    {{ $t('document.create') }}
                  </v-btn>
                </template>
              </v-col>
            </v-row>
          </v-container>
        </v-toolbar>
      </template>
      <template v-slot:default="{items}">
        <v-row>
          <v-col
            v-for="doc in items"
            :key="doc.id"
            cols="12"
          >
            <docs-list-item :document="doc"></docs-list-item>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script lang="js">
import DocsListItem from "@/components/docs-list-item.vue"
import FolderMenu from '@/components/menus/folder-menu.vue'
import USelect from '@/components/elements/u-select.vue'

export default {
  name: 'DocsList',
  components: {
    DocsListItem,
    FolderMenu,
    USelect
  },
  props: ['title', 'documents', 'new'],
  data () {
    return {
        search: '',
        filter: {},
        pageItems: Number(process.env.VUE_APP_DOCS_PER_PAGE),
        sortBy: 'created',
        sortDesc: true,
        sortKeys: [
          {
            name: this.$t('sort.last-edited'),
            value: 'edited',
            icon: 'icon-clock'
          },
          {
            name: this.$t('sort.last-created'),
            value: 'created',
            icon: 'icon-edit'
          },
          {
            name: this.$t('sort.abc'),
            value: 'name',
            icon: 'icon-alphabetical-sorting'
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
    pagination: {
      get: function () {
        return this.documents.length <= this.pageItems
      }
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    openNewDocumentDialog() {
      this.$store.commit("openNewDocumentDialog", true);
    },
    changeSort (value) {
      this.sortBy = value
    }
  }
}

</script>

<style scoped>

</style>