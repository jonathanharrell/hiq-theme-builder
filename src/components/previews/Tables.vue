<template>
    <div class="tables">
        <h1>Tables</h1>
        <div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Column 1</th>
                        <th scope="col">Column 2</th>
                        <th scope="col">Column 3</th>
                        <th scope="col">Column 4</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Row 1</th>
                        <td>Row 1 Cell 1</td>
                        <td>Row 1 Cell 2</td>
                        <td>Row 1 Cell 3</td>
                    </tr>
                    <tr>
                        <th scope="row">Row 2</th>
                        <td>Row 2 Cell 1</td>
                        <td>Row 2 Cell 2</td>
                        <td>Row 2 Cell 3</td>
                    </tr>
                    <tr>
                        <th scope="row">Row 3</th>
                        <td>Row 3 Cell 1</td>
                        <td>Row 3 Cell 2</td>
                        <td>Row 3 Cell 3</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="col">Column 1</th>
                        <th scope="col">Column 2</th>
                        <th scope="col">Column 3</th>
                        <th scope="col">Column 4</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tables'
    }
</script>
