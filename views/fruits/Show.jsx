const React = require('react');

function Show(props) {
    const { fruit } = props
    console.log(fruit);

    return (
        <> 
        <h1>Show Route v2 </h1>
            <h2>{fruit.name}</h2>
        </>
    )
}

// class Show extends React.Component{
//     render() {
//         return (
//             <h1>Show Route</h1>
//         )
//     }
// }

module.exports = Show;