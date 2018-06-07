<template>
    <header class="navbar">
        <div class="container is-fluid">
            <figure class="logo">
                <img src="../assets/img/hiq-logo.svg" alt="HiQ">
            </figure>
            <form v-if="editMode" @submit.prevent="saveThemeName">
                <label for="theme-name" class="is-visually-hidden"></label>
                <input
                    type="text"
                    id="theme-name"
                    name="theme_name"
                    :value="themeName"
                    ref="input"
                >
                <button type="submit">Save</button>
            </form>
            <div class="theme-name" v-else>
                <span class="theme-name-text">{{ themeName }}</span>
                <button class="edit-theme-name" @click="editMode = true">
                    <icon-base iconName="Edit" iconColor="var(--hiq-gray-light)">
                        <icon-pencil></icon-pencil>
                    </icon-base>
                </button>
            </div>
            <a href="">Sign In</a>
        </div>
    </header>
</template>

<script>
    import IconBase from './icons/IconBase'
    import IconPencil from './icons/IconPencil'

    export default {
        name: 'editor-header',

        components: {
            IconBase,
            IconPencil
        },

        data () {
            return {
                editMode: false
            }
        },

        computed: {
            themeName () {
                return this.$store.state.themeName
            }
        },

        watch: {
            'editMode' (value) {
                this.$nextTick(() => {
                    if (value) this.$refs.input.focus()
                })
            }
        },

        methods: {
            saveThemeName (event) {
                const formData = new FormData(event.target)
                const value = formData.get('theme_name')
                this.$store.commit('setThemeName', value)
                this.editMode = false
            }
        }
    }
</script>

<style scoped>
    .navbar {
        display: flex;
        align-items: center;
        position: relative;
        height: 4rem;
        background-color: var(--navbar-background-color);
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
        & .container {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }

    .logo {
        margin-bottom: 0;
        & img {
            height: 2.75rem;
        }
    }

    .theme-name {
        display: flex;
        align-items: center;
    }

    .theme-name-text {
        font-weight: var(--hiq-font-weight-medium);
        color: var(--hiq-text-color);
    }

    .edit-theme-name {
        height: auto;
        border-color: transparent;
        background-color: transparent;
        &:hover,
        &:focus,
        &:active {
            & /deep/ g {
                fill: var(--hiq-gray);
            }
        }
    }

    form {
        display: flex;
        align-items: center;
        & button {
            height: 2.5rem;
            margin-left: 0.5rem;
        }
    }

    input {
        width: auto;
    }
</style>
