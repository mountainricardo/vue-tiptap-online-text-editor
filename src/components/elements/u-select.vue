<template>
  <v-select
    :ref="reference" 
    v-model="selected"
    :items="items"
    :item-text="itemText"
    :item-value="itemValue"
    :label="label"
    :hide-details="hide"
    rounded
    outlined
    disable-lookup
    append-icon="icon-expand-arrow"
    :item-icon="itemIcon"
    :background-color="`${(!dark)? 'white': null}`"
    :color="`${(!dark)? 'gray': null}`"
    :class="selectClass"
    :menu-props="{contentClass: 'unity-select', rounded: 'lg', }"
    @change="onChange"
  >
    <template v-slot:item="data">
      <!-- <v-list-item-icon v-if="itemIcon">
        <v-icon v-text="data.item.icon"></v-icon>
      </v-list-item-icon> -->
      <v-list-item-icon v-if="data.item.icon">
        <v-icon v-text="data.item.icon"></v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="data.item.name"></v-list-item-title>
      </v-list-item-content> 
    </template>
  </v-select>
</template>

<script lang="js">
  export default  {
    name: 'USelect',
    // props: [],
    props: {
      items: Array,
      itemText: String,
      itemValue: String,
      label: String,

    },
    data () {
      return {
        selected: '',
        reference: '',
        hide: true,
        selectClass: '',
        itemIcon: '',
				tabindex: null
      }
    },
    computed: {
      dark: {
        get: function () {
          return this.$store.state.theme.dark
        }
      },
      modelValue: {
        get: function () {
          return this.model
        },
        set (newValue) {
          this.model =newValue
        }
      }
    },
    mounted () {

    },
    methods: {
      onChange (value) {
        this.$emit('select', value)
        
      }
    }
}


</script>

<style scoped >
.v-application >>> .unity-select{
  border-radius:.62em!important;
  border: 1px solid #4e4e4e!important;
}
.unity-select .v-list.v-select-list {
    padding: .62em;
}
.unity-select .v-list.v-select-list >>> .v-list-item.v-list-item--link{
  margin-top: .3em;
}
.unity-select .v-list.v-select-list >>> .v-list-item.v-list-item--link:before{
  border-radius: .44em!important;
}
</style>
