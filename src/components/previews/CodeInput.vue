<template>
    <div class="code">
        <h1>Code</h1>
        <h2>Inline Code</h2>
        <section class="code-section">
            <code>code</code>
        </section>
        <h2>Code blocks</h2>
        <section class="code-section">
            <pre><code>&lt;p&gt;This is a sample paragraph.&lt;/p&gt;
            &lt;p&gt;This is another sample paragraph.&lt;/p&gt;</code></pre>
        </section>
        <h2>User Input</h2>
        <section class="code-section">
            To install HiQ, enter <kbd>npm install hiq</kbd> in your terminal.<br>
            To cancel the installation process, press <kbd><kbd>ctrl</kbd> + <kbd>c</kbd></kbd>.
        </section>
    </div>
</template>

<script>
    export default {
        name: 'code-input'
    }
</script>

<style scoped>
    .code-section {
        padding: 1.5rem 1.5rem;
        border: 1px solid var(--editor-panel-border-color);
        transition: border-color var(--hiq-speed) var(--hiq-easing);
        &:not(:last-of-type) {
            margin-bottom: 2rem;
        }
        & > * {
            margin-bottom: 0;
        }
    }
</style>
