Vue.component('my-error', {
    props: ['error'],
    template: ` <div v-if="error" class="error-block visible">Произошла ошибка</div>
    <div v-else="error" class="error-block invisible"></div>`
});