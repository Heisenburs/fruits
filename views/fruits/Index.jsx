const React = require('react')

function Index(props) {
    const { fruits } = props;
    console.log(fruits);
    return (
        <>
            <nav>
                <a href="/fruits/new">Create A New Fruit</a>
            </nav>
        <h1>Index</h1>
        <ul>
                {
                    fruits.map((fruit, i) => {
                        return (
                            <li key={fruit._id}> 
                                The{' '}
                                      <a href={`/fruits/${fruit._id}`}>
                                          {fruit.name}
                                      </a>{' '}
                                      is {fruit.color} <br></br>
                                      {fruit.readyToEat
                                          ? `It is ready to eat`
                                          : `It is not ready to eat`}
                                      <br />
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

module.exports = Index;