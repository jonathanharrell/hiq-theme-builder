<template>
    <div class="forms-inputs">
        <h1>Forms & Inputs</h1>
        <h2>Forms</h2>
        <section class="form-section">
            <div class="variable-group">
                <fieldset>
                    <legend>Fieldset Legend</legend>
                    <p>
                        <label for="field-1">Field Label</label>
                        <input type="text" id="field-1">
                    </p>
                </fieldset>
            </div>
        </section>
        <h2>Inputs</h2>
        <section class="form-section">
            <div class="variable-group">
                <div class="variable-group">
                    <p>
                        <input type="text" required>
                    </p>
                    <p class="variable-label">Invalid border color</p>
                </div>
                <p>
                    <input type="text" required value="Input value">
                </p>
                <p class="variable-label">Valid border color</p>
            </div>
            <div class="variable-group">
                <p>
                    <input type="text" placeholder="Enter text">
                </p>
                <p class="variable-label">Text input</p>
            </div>
            <div class="variable-group">
                <p>
                    <input type="text" placeholder="••••••••••">
                </p>
                <p class="variable-label">Password input</p>
            </div>
            <div class="variable-group">
                <p>
                    <input type="email" placeholder="name@email.com">
                </p>
                <p class="variable-label">Email input</p>
            </div>
            <div class="variable-group">
                <p>
                    <input type="url" placeholder="http://yoursite.com">
                </p>
                <p class="variable-label">URL input</p>
            </div>
            <div class="variable-group">
                <p>
                    <input type="tel" placeholder="(999) 999-9999">
                </p>
                <p class="variable-label">Telephone input</p>
            </div>
            <div class="variable-group">
                <p>
                    <input type="search" placeholder="Enter search term">
                </p>
                <p class="variable-label">Search input</p>
            </div>
            <div class="variable-group">
                <p>
                    <input type="number" placeholder="1234">
                </p>
                <p class="variable-label">Number input</p>
            </div>
            <div class="variable-group">
                <p>
                    <input type="date" placeholder="mm/dd/yyyy">
                </p>
                <p class="variable-label">Date input</p>
            </div>
            <div class="variable-group">
                <p>
                    <input type="time" placeholder="--:-- --">
                </p>
                <p class="variable-label">Time input</p>
            </div>
            <div class="variable-group">
                <p>
                    <input type="month" placeholder="Enter month">
                </p>
                <p class="variable-label">Month input</p>
            </div>
            <div class="variable-group">
                <p>
                    <input type="week" placeholder="Enter week">
                </p>
                <p class="variable-label">Week input</p>
            </div>
            <div class="variable-group">
                <p>
                    <input type="datetime-local" placeholder="Enter date and time">
                </p>
                <p class="variable-label">Local Datetime input</p>
            </div>
            <div class="variable-group">
                <p>
                    <input list="options" placeholder="Type 'o' to see matching options" />
                    <datalist id="options">
                        <option value="Option 1" />
                        <option value="Option 2" />
                        <option value="Option 3" />
                    </datalist>
                </p>
                <p class="variable-label">Datalist</p>
            </div>
            <div class="variable-group">
                <p>
                    <input type="file" id="file">
                </p>
                <p class="variable-label">File Input</p>
            </div>
            <div class="variable-group">
                <p>
                    <input type="color" id="color">
                </p>
                <p class="variable-label">Color Input</p>
            </div>
            <div class="variable-group">
                <p>
                    <input type="text" placeholder="Enter text" readonly>
                </p>
                <p class="variable-label">Readonly input</p>
            </div>
            <div class="variable-group">
                <p>
                    <input type="text" placeholder="Enter text" disabled>
                </p>
                <p class="variable-label">Disabled input</p>
            </div>
        </section>
        <h2>Textareas</h2>
        <section class="form-section">
            <div class="variable-group">
                <p>
                    <textarea placeholder="Enter text"></textarea>
                </p>
            </div>
        </section>
        <h2>Selects</h2>
        <section class="form-section">
            <div class="variable-group">
                <p>
                    <select>
                        <optgroup label="Option Group">
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                        </optgroup>
                    </select>
                </p>
                <p class="variable-label">Single select</p>
            </div>
            <div class="variable-group">
                <p>
                    <select multiple>
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                    </select>
                </p>
                <p class="variable-label">Multi-select</p>
            </div>
        </section>
        <h3>Checkboxes</h3>
        <section class="form-section">
            <div class="variable-group">
                <fieldset>
                    <div class="checkbox">
                        <input type="checkbox" name="checkbox" id="check-option1" value="option1" />
                        <label for="check-option1">Option 1</label>
                    </div>
                    <div class="checkbox">
                        <input type="checkbox" name="checkbox" id="check-option2" value="option2" />
                        <label for="check-option2">Option 2</label>
                    </div>
                    <div class="checkbox">
                        <input type="checkbox" name="checkbox" id="check-option3" value="option3" disabled />
                        <label for="check-option3">Option 3</label>
                    </div>
                </fieldset>
            </div>
        </section>
        <h3>Radio Buttons</h3>
        <section class="form-section">
            <div class="variable-group">
                <fieldset>
                    <div class="radio">
                        <input type="radio" name="radio" id="radio-option1" value="option1" />
                        <label for="radio-option1">Option 1</label>
                    </div>
                    <div class="radio">
                        <input type="radio" name="radio" id="radio-option2" value="option2" />
                        <label for="radio-option2">Option 2</label>
                    </div>
                    <div class="radio">
                        <input type="radio" name="radio" id="radio-option3" value="option3" disabled />
                        <label for="radio-option3">Option 3</label>
                    </div>
                </fieldset>
            </div>
        </section>
        <h3>Range Inputs</h3>
        <section class="form-section range-inputs">
            <div class="variable-group">
                <p>
                    <input type="range" min="100" max="500" step="10">
                </p>
            </div>
        </section>
        <h3>Meters</h3>
        <section class="form-section">
            <div class="variable-group">
                <meter min="0" max="100" low="25" high="75" optimum="100" value="10"></meter>
                <p class="variable-label">Weak meter</p>
            </div>
            <div class="variable-group">
                <meter min="0" max="100" low="25" high="75" optimum="100" value="50"></meter>
                <p class="variable-label">Good meter</p>
            </div>
            <div class="variable-group">
                <meter min="0" max="100" low="25" high="75" optimum="100" value="80"></meter>
                <p class="variable-label">Strong meter</p>
            </div>
        </section>
        <h3>Progress Bars</h3>
        <section class="form-section">
            <div class="variable-group">
                <progress value="50" max="100">progress</progress>
                <p class="variable-label">Determinate progress</p>
            </div>
            <div class="variable-group">
                <progress>indeterminate progress</progress>
                <p class="variable-label">Indeterminate progress</p>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'forms-inputs'
    }
</script>

<style scoped>
    .form-section {
        padding: 1.5rem 1.5rem;
        border: 1px solid var(--editor-panel-border-color);
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
        }
        & fieldset {
            margin-bottom: 0;
        }
    }
</style>
