Vue.component('filter-comp', {
    props: ['userSearch'],
    template: `<form action="#" class="search-form" @submit.prevent="$parent.filter(user-search)">
    <input type="text" class="search-field" v-model="$root.userSearch">
    <button type="submit" class="btn-search"><i class="fas fa-search"></i></button>
    </form>`
});