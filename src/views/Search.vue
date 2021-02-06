<template>
  <main>
    <div class="h-auto border-b border-gray-200">
      <ul class="flex flex-wrap items-center p-2 bg-white">
        <span class="mr-2 text-xs"> Filters: </span>
        <li
          v-for="(filter, index) in filters"
          :key="index"
          :class="['px-2 py-1 mr-2 text-xs rounded-full', filter.class]"
        >
          {{ filter.name }}
        </li>
      </ul>
    </div>
    <div
      class="grid grid-rows-2 md:grid-rows-none md:grid-cols-4 container-height"
    >
      <!-- <div
        class="absolute top-0 left-0 z-10 w-screen h-screen transition duration-300 ease-in-out bg-green-600 opacity-25"
        v-if="showSort"
      ></div> -->

      <div
        id="column"
        class="relative order-2 md:overflow-y-scroll md:order-1 md:col-span-1"
      >
        <ul class="">
          <li
            v-for="(card, index) in cards"
            :key="index"
            class="px-2 mb-4 md:px-4 lg:px-6 xl:px-10 first:mt-4"
          >
            <div
              class="overflow-hidden border border-gray-200 rounded-md shadow-sm"
            >
              <div class="w-full bg-white border-b border-gray-200 h-44"></div>
              <div class="w-full bg-white h-14"></div>
            </div>
          </li>
        </ul>
      </div>
      <div
        id="map"
        class="relative order-1 overflow-hidden bg-gray-200 md:order-2 md:col-span-3"
      >
        <span
          class="absolute top-0 z-20 transition-all duration-200 ease-in-out transform -right-4 hover:-translate-x-2"
        >
          <button
            @click="showSort = !showSort"
            class="p-4 pr-4 mt-4 bg-white rounded-l-full shadow-sm cursor-pointer focus:ring-4 ring-green-500 ring-offset-4 ring-offset-white ring-opacity-50 focus:outline-none"
          >
            <svg
              v-if="!showSort"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-8 h-8 text-gray-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-8 h-8 text-gray-600"
              v-else
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </span>

        <!-- <transition
          appear
          enter-class="translate-x-full"
          enter-active-class="transition duration-700 ease-in-out transform"
          enter-to-class="translate-x-0"
          leave-class="translate-x-0"
          leave-active-class="transition duration-700 ease-in-out transform"
          leave-to-class="translate-x-full"
        > -->
        <div
          class="absolute top-0 right-0 z-20 w-1/3 mt-24 mr-2 shadow w-sm"
          v-show="showSort"
        >
          <div class="w-full p-4 bg-white rounded-md">
            <div class="grid grid-flow-row">
              <div class="inline-grid">
                <input
                  type="text"
                  @keydown.enter="searchTerm = $event.target.value"
                  class="px-2 py-2 my-2 border border-gray-200 rounded-lg focus:ring-4 ring-green-500 ring-offset-4 ring-offset-white ring-opacity-50 focus:outline-none"
                  placeholder="Search State, City or Zip"
                />
                <small> Press <kbd>enter</kbd> to Search </small>
              </div>
              <div class="inline-grid">
                <label for="bedroomMin"> Has Hoa </label>
                <input
                  name="bedroomMin"
                  v-model="hasHOA"
                  class="w-auto my-2 rounded-full focus:ring-4 ring-green-500 ring-offset-4 ring-offset-white ring-opacity-50 focus:outline-none"
                  type="checkbox"
                />
              </div>
              <div class="inline-grid">
                <label for="bedroomMin"> Bedroom Min {{ bedroomMin }} </label>
                <input
                  name="bedroomMin"
                  v-model="bedroomMin"
                  class="w-auto my-2 rounded-full focus:ring-4 ring-green-500 ring-offset-4 ring-offset-white ring-opacity-50 focus:outline-none"
                  type="range"
                  min="0"
                  max="5"
                />
              </div>
              <div class="inline-grid">
                <label for="bedroomMin"> Bedroom Max {{ bedroomMax }}</label>
                <input
                  name="bedroomMin"
                  v-model="bedroomMax"
                  class="w-auto my-2 rounded-full focus:ring-4 ring-green-500 ring-offset-4 ring-offset-white ring-opacity-50 focus:outline-none"
                  type="range"
                  min="0"
                  max="5"
                />
              </div>
              <div class="inline-grid">
                <label for="bathroomMin">
                  Bathroom Min {{ bathroomMin }}
                </label>
                <input
                  name="bathroomMin"
                  v-model="bathroomMin"
                  class="w-auto my-2 rounded-full focus:ring-4 ring-green-500 ring-offset-4 ring-offset-white ring-opacity-50 focus:outline-none"
                  type="range"
                  min="0"
                  max="5"
                />
              </div>
              <div class="inline-grid">
                <label for="bathroomMax"> Bathroom Max {{ bathroomMax }}</label>
                <input
                  name="bathroomMax"
                  v-model="bathroomMax"
                  class="w-auto my-2 rounded-full focus:ring-4 ring-green-500 ring-offset-4 ring-offset-white ring-opacity-50 focus:outline-none"
                  type="range"
                  min="0"
                  max="5"
                />
              </div>
              <div class="inline-grid">
                <label for="priceMin"> Price Min {{ priceMin }} </label>
                <input
                  name="priceMin"
                  v-model="priceMin"
                  class="w-auto my-2 rounded-full focus:ring-4 ring-green-500 ring-offset-4 ring-offset-white ring-opacity-50 focus:outline-none"
                  type="range"
                  step="100000"
                  min="150000"
                  max="2000000"
                />
              </div>
              <div class="inline-grid">
                <label for="priceMax"> Price Max {{ priceMax }}</label>
                <input
                  name="priceMax"
                  v-model="priceMax"
                  class="w-auto my-2 rounded-full focus:ring-4 ring-green-500 ring-offset-4 ring-offset-white ring-opacity-50 focus:outline-none"
                  type="range"
                  step="100000"
                  min="150000"
                  max="2000000"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- </transition> -->
      </div>
    </div>
  </main>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
    cards: 20,
    hasHOA: false,
    showSort: false,
    searchTerm: '',
    bedroomMin: 0,
    bedroomMax: 0,
    bathroomMin: 0,
    bathroomMax: 0,
    priceMin: 0,
    priceMax: 0,
  }),
  methods: {
    handleSearch(value) {
      this.searchTerm = value
    },
  },
  computed: {
    filters() {
      return [
        {
          name: 'Bedrooms',
          type: 'MINMAX',
          min: this.bedroomMin,
          max: this.bedroomMax,
          class: 'bg-yellow-400',
          filter: null,
        },
        {
          name: 'Bathrooms',
          type: 'MINMAX',
          min: this.bathroomMin,
          max: this.bathroomMax,
          class: 'bg-indigo-400',
          filter: null,
        },
        {
          name: 'Price',
          type: 'MINMAX',
          min: this.priceMin,
          max: this.priceMax,
          class: 'bg-green-400',
          filter: 'currency',
        },
        {
          name: 'Search Term',
          type: 'EQUALS',
          value: this.searchTerm,
          class: 'bg-gray-400',
          filter: null,
        },
        {
          trueStatement: 'Homes with HOA',
          falseStatement: 'Homes without HOA',
          type: 'STATEMENT',
          boolean: this.hasHOA,
          class: 'bg-red-400',
          filter: null,
        },
      ]
        .filter((f) => f.boolean !== false)
        .filter((f) => f.value !== '')
        .filter((f) => f.min != 0 || f.max != 0)
        .map((obj) => {
          if (obj.type === 'MINMAX') {
            return Object.assign(obj, {
              name: `${obj.name} ${
                obj.min === 0
                  ? 'Any'
                  : typeof obj.filter === 'string'
                  ? this.$options.filters[obj.filter](obj.min)
                  : obj.min
              } - ${
                obj.max === 0
                  ? 'Any'
                  : typeof obj.filter === 'string'
                  ? this.$options.filters[obj.filter](obj.max)
                  : obj.max
              }`,
            })
          } else if (obj.type === 'EQUALS') {
            return Object.assign(obj, {
              name: `Searching for homes in ${obj.value}`,
            })
          } else if (obj.type === 'STATEMENT') {
            return Object.assign(obj, {
              name: `${obj.boolean ? obj.trueStatement : obj.falseStatement}`,
            })
          }
        })
    },
  },
  filters: {
    currency(value) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
      })
      if (typeof value !== 'number') {
        const newValue = parseInt(value)
        return formatter.format(newValue)
      } else {
        return formatter.format(value)
      }
    },
  },
})
</script>

<style>
.container-height {
  /* height: 100%; */
  /* @screen md { */
  /* } */
  height: calc(100vh - 105px);
}
</style>
