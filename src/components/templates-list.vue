<template>
  <v-container
    fluid
  >
    <v-data-iterator
      :items="templates"
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
                class="d-flex justify-space-between"
              >
                <v-toolbar-title>
                  <h2 class="document">
                    {{ title }}
                  </h2>
                </v-toolbar-title>
              </v-col>

              <v-col
                cols="12"
                md="8"
                class="d-flex justify-end"
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
                  <u-select
                    :items="sortKeys"
                    :label="$t('sort.sort-by')"
                    :item-text="'name'"
                    :item-value="'value'"
                    @select="changeSort"
                  ></u-select>
                </template>
              </v-col>
            </v-row>
          </v-container>
        </v-toolbar>
      </template>
      <template v-slot:default="{items}">
        <v-row>
          <v-col
            v-for="template in items"
            :key="template.id"
            cols="12"
          >
            <templates-list-item
              :template="template"
              @templateClick="saveTemplateAsFile"
            ></templates-list-item>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script lang="js">
import TemplatesListItem from "@/components/templates-list-item.vue"
import USelect from '@/components/elements/u-select.vue'

export default {
  name: 'TemplatesList',
  components: {
    TemplatesListItem,
    USelect
  },
  props: ['title', 'templates'],
  data () {
    return {
        search: '',
        filter: {},
        pageItems: Number(process.env.VUE_APP_DOCS_PER_PAGE),
        sortBy: 'created',
        sortDesc: true,
        sortKeys: [
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
        return this.templates.length <= this.pageItems
      }
    }
  },
  mounted () {

  },
  methods: {
    changeSort (value) {
      this.sortBy = value
    },
		saveTemplateAsFile() {
			// Notify from TemplatesListItem component to Templates view
			this.$emit('templateClick')
		}
  }
}

</script>

<style scoped lang="scss">
.templates-list {
  border-radius:.62em;
  .v-list.v-select-list {
    padding: .62em;
    .v-list-item.v-list-item--link{
      &:before{
        border-radius: .44em!important;
      }
    }
  }
}
</style>
