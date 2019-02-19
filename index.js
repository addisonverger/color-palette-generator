// Write your app here! (HINT: First thing should be a call to ReactDOM.render()... )

const RandomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).toUpperCase()
}

const ColorBlock = (props) => {
  console.log(props)
  let { color, key, isLocked, toggle } = props

  return (
    <div key={key} style={{backgroundColor: color}} className="w-100 d-flex flex-column align-items-center justify-content-center">
      <h1>{color}</h1>
      <button onClick={toggle} className={isLocked ? "btn btn-dark" : "btn btn-outline-dark"}>{isLocked ? "UNLOCK" : "LOCK"}</button>
    </div>
  )
}

class ColorPalette extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      colorValues: [{
        color: RandomColor(),
        isLocked: false
      },
      {
        color: RandomColor(),
        isLocked: false
      },
      {
        color: RandomColor(),
        isLocked: false
      },
      {
        color: RandomColor(),
        isLocked: false
      },
      {
        color: RandomColor(),
        isLocked: false
      }]
    }
  }
  RandomizeColor = () => {
    var newArray = this.state.colorValues.map((colorValue) => {
      if (colorValue.isLocked === false) {
        return {
          ...colorValue,
          color: RandomColor()
        }
      } else {
        return colorValue
      }
    })
    this.setState({
      colorValues: newArray
    })
  }
  ToggleLock = (clickedIndex) => {
    console.log(clickedIndex)
    var newArray = this.state.colorValues.map((colorValue, index) => {
      console.log(index)
      if (clickedIndex === index) {
        return {
          ...colorValue,
          isLocked: !colorValue.isLocked
        }
      } else {
        return colorValue
      }
    })
    this.setState({
      colorValues: newArray
    })
  }
  render () {
    console.log(this.state.colorValues)
    return (
      <div>
        <div className="text-center bg-dark fixed-top">
          <button className="btn btn-secondary m-1" onClick={this.RandomizeColor}>RANDOMIZE COLORS</button>
        </div>
        <div className="w-100 d-flex" style={{height: "100vh"}}>
          {
            this.state.colorValues.map((colorValue, index) => <ColorBlock color={colorValue.color} isLocked={colorValue.isLocked} key={index} toggle={() => this.ToggleLock(index)}/>)
          }
        </div>
      </div>
    )
  }
}

ReactDOM.render(<ColorPalette />, document.getElementById('root'))
