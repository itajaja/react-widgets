var React = require('react/addons')
  , cx    = React.addons.classSet
  , dates = require('../util/dates')
  , List = require('../common/list.jsx')
  , mergePropsInto = require('../util/transferProps')
  , _ = require('lodash')


var ListItem = React.createClass({

  render: function(){
      return this.transferPropsTo(
        <li>{ dates.format(this.props.item, this.props.format) }</li>
      )
  }
})

module.exports = React.createClass({

  propTypes: {
    value:        React.PropTypes.instanceOf(Date),
    min:          React.PropTypes.instanceOf(Date),
    max:          React.PropTypes.instanceOf(Date),
    step:         React.PropTypes.number,
    onChange:     React.PropTypes.func.isRequired
  },

  getDefaultProps: function(){
    return {
      step:   30,
      format: 't'
    }
  },

  render: function(){
    var times = this._times()
      , format = this.props.format
      , listItem = function(props, children){
        return ListItem(_.extend(props, { format: format }), children)
      }

    return mergePropsInto(_.omit(this.props, 'value'),
      <List ref="list"
        data={times} 
        textField='label'
        valueField='date'
        selectedIndex={ this._selectedIndex(times, this.props.value) }
        onSelect={this.props.onChange}/>
    )
  },

  _selectedIndex: function(times, date){
    return _.findIndex(times, function(d){
      return dates.eq(date, d, 'hours')
    })
  },

  _times: function(){
      var times = []
        , start = dates.eq(this.props.value, this.props.min, 'day') ? this.props.min : dates.today
        , end   = dates.eq(this.props.value, this.props.max, 'day') ? this.props.max : dates.tomorrow;

    while( dates.lt(start, end, 'day') ) {
      times.push({ date: start, label: dates.format(start, this.props.format) })
      start = dates.add(start, this.props.step || 30, 'minutes')
    }
    return times
  },

  _keyUp: function(e){
    this.refs.list._keyUp(e)
  },

});


var btn = require('../common/btn.jsx')