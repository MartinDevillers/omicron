import React from "react"
import DataSets from "../data-sets"

const rows = DataSets.all.map(x => <tr>
    <td>{x.name}</td>
    <td><code>[{x.generate(20).map(y => y.toFixed()).join(', ')}]</code></td>
</tr>)

const DataSetsTable = () => (
    <table role="table">
        <thead>
        <tr>
            <th style={{width: '100px'}}>Name</th>
            <th>Example</th>
        </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
    </table>
)

export default DataSetsTable