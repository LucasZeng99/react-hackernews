import React, { Component } from 'react'
import {fetchIDsByType, fetchItems} from '../api'

class ListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: this.props.type,
      activeId: [],
      items: [],
      activeItems: []
    }
  }

  componentWillMount () {
    fetchIDsByType(this.props.type)
      .then(res => fetchItems(res))
      .then(items => {
        // console.log(items)
        this.setState({items: items})
      })
  }

  componentDidMount () {
    
  }

  ActiveItemsByPages () {
    
  }
  render () {
    return (
      <div className="list-view">
        This is list view.
        my props are: {this.props.type}
        my list is: {this.state.activeId}
        <div className="item">
          {this.state.items.map((item, i) => <ListCard item={item} key={i}/>)}
        </div>
      </div>
    )
  }
}

function ListCard (props) {
  return <div className="list-item">
    <h2 className="list-item-title">{props.item.title}</h2>
  </div>
} 
export default ListView