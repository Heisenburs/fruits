const React = require('react')

function New() {
    return (
        <div>
            <h1>New Fruit Added</h1>
            <br />
            <form action='/fruits' method='POST'>
                {/* //* action is the route, POST is the HTTP verb */}
                Name: <input type="text" name="name" />
                <br />
                Color: <input type="text" name="color" />
                <br />
                Is ready to eat: <input type="checkbox" name="readyToEat" />
                <br />
                <input type='submit' value='Create New Fruit' />
            </form>
        </div>
        
    )
}

module.exports = New