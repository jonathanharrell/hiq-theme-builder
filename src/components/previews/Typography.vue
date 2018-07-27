<template>
    <div class="typography">
        <h1>Typography</h1>
        <h2>Global Settings</h2>
        <section class="typography-section global-settings">
            <div class="variable-group">
                <p style="letter-spacing: var(--hiq-letter-spacing-base);">Letter spacing</p>
                <p class="variable-label">Base Letter Spacing</p>
            </div>
            <div class="variable-group">
                <p style="color: var(--hiq-text-color);">Text color</p>
                <p class="variable-label">Text color</p>
            </div>
        </section>
        <h2>Font Families</h2>
        <section class="typography-section font-families">
            <div class="variable-group">
                <p style="font-family: var(--hiq-font-family-base);">abcdefghijklmnopqrstuvwxyz</p>
                <p class="variable-label">Base Font Family</p>
            </div>
            <div class="variable-group">
                <p style="font-family: var(--hiq-font-family-monospace);">abcdefghijklmnopqrstuvwxyz</p>
                <p class="variable-label">Monospace Font Family</p>
            </div>
        </section>
        <h2>Type Scale</h2>
        <section class="typography-section" style="font-family: var(--hiq-font-family-base); font-weight: var(--hiq-heading-font-weight);">
            <div class="variable-group">
                <p style="font-size: var(--hiq-font-size-1);">Heading 1</p>
                <p class="variable-label">Font Size 1</p>
            </div>
            <div class="variable-group">
                <p style="font-size: var(--hiq-font-size-2);">Heading 2</p>
                <p class="variable-label">Font Size 2</p>
            </div>
            <div class="variable-group">
                <p style="font-size: var(--hiq-font-size-3);">Heading 3</p>
                <p class="variable-label">Font Size 3</p>
            </div>
            <div class="variable-group">
                <p style="font-size: var(--hiq-font-size-4);">Heading 4</p>
                <p class="variable-label">Font Size 4</p>
            </div>
            <div class="variable-group">
                <p style="font-size: var(--hiq-font-size-5);">Heading 5</p>
                <p class="variable-label">Font Size 5</p>
            </div>
            <div class="variable-group">
                <p style="font-size: var(--hiq-font-size-6);">Heading 6</p>
                <p class="variable-label">Font Size 6</p>
            </div>
        </section>
        <h2>Line Height</h2>
        <section class="typography-section">
            <div class="variable-group">
                <p style="line-height: var(--hiq-line-height-base);">Vestibulum ut urna tristique, ultrices libero et, eleifend purus. Pellentesque aliquam, nunc et dictum sodales, massa ligula molestie ex, et efficitur dui ipsum posuere velit. Fusce rutrum scelerisque arcu, ut elementum metus sodales ac.</p>
                <p class="variable-label">Base Line Height</p>
            </div>
            <div class="variable-group">
                <h3>Vestibulum ut urna tristique, ultrices libero et, eleifend purus. Pellentesque aliquam, nunc et dictum sodales, massa ligula molestie ex, et efficitur dui ipsum posuere velit.</h3>
                <p class="variable-label">Heading Line Height</p>
            </div>
        </section>
        <h2>Font Weights</h2>
        <section class="typography-section font-weights">
            <div class="variable-group">
                <p style="font-weight: var(--hiq-font-weight-light);">Light</p>
                <p class="variable-label">Light Font Weight</p>
            </div>
            <div class="variable-group">
                <p style="font-weight: var(--hiq-font-weight-normal);">Normal</p>
                <p class="variable-label">Normal Font Weight</p>
            </div>
            <div class="variable-group">
                <p style="font-weight: var(--hiq-font-weight-medium);">Medium</p>
                <p class="variable-label">Medium Font Weight</p>
            </div>
            <div class="variable-group">
                <p style="font-weight: var(--hiq-font-weight-semibold);">Semibold</p>
                <p class="variable-label">Semibold Font Weight</p>
            </div>
            <div class="variable-group">
                <p style="font-weight: var(--hiq-font-weight-bold);">Bold</p>
                <p class="variable-label">Bold Font Weight</p>
            </div>
        </section>
        <h2>Inline Text Elements</h2>
        <section class="typography-section">
            <div class="variable-group">
                <p><mark>This is marked text</mark></p>
                <p class="variable-label">Mark Color</p>
            </div>
            <div class="variable-group">
                <p><del>This is deleted text</del></p>
                <p class="variable-label">Deleted Color</p>
            </div>
            <div class="variable-group">
                <p><ins>This is inserted text</ins></p>
                <p class="variable-label">Inserted Color</p>
            </div>
        </section>
        <h2>Lists</h2>
        <section class="typography-section">
            <div class="variable-group">
                <ul>
                    <li>Unordered list item 1</li>
                    <li>Unordered list item 2</li>
                    <li>Unordered list item 3
                        <ul>
                            <li>Nested list item 1</li>
                            <li>Nested list item 2</li>
                            <li>Nested list item 3</li>
                        </ul>
                    </li>
                </ul>
                <p class="variable-label">Unordered List</p>
            </div>
            <div class="variable-group">
                <ol>
                    <li>Ordered list item 1</li>
                    <li>Ordered list item 2</li>
                    <li>Ordered list item 3</li>
                </ol>
                <p class="variable-label">Ordered List</p>
            </div>
            <div class="variable-group">
                <ul class="has-inline-children is-unstyled">
                    <li>Inline list item 1</li>
                    <li>Inline list item 2</li>
                    <li>Inline list item 3</li>
                </ul>
                <p class="variable-label">Unstyled List</p>
            </div>
            <div class="variable-group">
                <dl>
                    <dt>Description term</dt>
                    <dd>Description</dd>
                    <dt>Another description term</dt>
                    <dd>
                        <dl>
                            <dt>Nested description term</dt>
                            <dd>Description</dd>
                        </dl>
                    </dd>
                </dl>
                <p class="variable-label">Description List</p>
            </div>
        </section>
        <h2>Blockquotes</h2>
        <section class="typography-section">
            <div class="variable-group">
                <blockquote>
                    <p>A block quotation is a quotation that is offset from the main text as a paragraph, or block of text.</p>
                    <cite>Quote citation</cite>
                </blockquote>
                <p class="variable-label">Blockquote</p>
            </div>
        </section>
        <h2>Horizontal Rules</h2>
        <section class="typography-section">
            <div class="variable-group">
                <hr>
                <p class="variable-label">Horizontal Rule</p>
            </div>
        </section>
        <h2>Links</h2>
        <section class="typography-section">
            <div class="variable-group">
                <p><a href="#">This is a link</a></p>
                <p class="variable-label">Link</p>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'typography'
    }
</script>

<style scoped>
    .typography-section {
        padding: 1rem 1.5rem;
        border: 1px solid var(--editor-panel-border-color);
        transition: border-color var(--hiq-speed) var(--hiq-easing);
        &:not(:last-of-type) {
            margin-bottom: 2rem;
        }
    }

    .variable-group {
        margin-bottom: 0.75rem;
        &:last-child {
            margin-bottom: 0;
        }
        & p {
            margin-bottom: 0;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    .variable-label {
        margin-top: 0;
    }

    .font-families p:not(.variable-label) {
        font-size: var(--hiq-font-size-3);
    }

    .font-weights p:not(.variable-label) {
        font-size: var(--hiq-font-size-3);
    }
</style>
