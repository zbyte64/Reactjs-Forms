/** @jsx React.DOM */
//form.js
var initialize = React.createClass({displayName: 'initialize',
  getInitialState: function(){
    return{ data: elements, form: form,values: []};

  },
  handleChange: function(element){
    // if(!this.state.values){
    //   var currentValues = [];
    // }
    // else{
    //   var currentValues = this.state.values;
    // }
    // currentValues.push({name: element.name, value: element.value});
    // this.setState({values: currentValues});
  },
  handleSubmit: function() {
    var data = [];
    var formValues = this.state.values;

  $.ajax({
      url: this.state.form.action,
      dataType: 'json',
      data: formValues,
      type: this.state.form.type,
      success: function(data) {
        //this.setState({data: data});
      }.bind(this)
    });
    return false;
  },
  render: function() {
    var elements = this.state.data.map(function (element) {
      if(element.type == "textarea"){
        return generateTextarea( 
        {label:        element.label, 
        name:         element.name, 
        placeholder:  element.placeholder, 
        value:        element.value} );
      }
      else if(element.type == "select"){
        return generateSelectbox( 
        {name:     element.name, 
        options:  element.options} );
      }
      else{
        return generateInputField( 
        {type:          element.type, 
        label:         element.label, 
        name:          element.name, 
        placeholder:   element.placeholder, 
        value:         element.value, 
        change:  this.handleChange} );
      }
    });
    return(
      React.DOM.form( {ref:"form", onSubmit:this.handleSubmit}, 
        elements,
        React.DOM.input( {type:"submit", value:this.state.form.submitText} )
      )
    );
  }
});
//regular input fields

var generateInputField = React.createClass({displayName: 'generateInputField',
  handleChange: function() {
    var name  = this.props.name;
    var value = this.refs[this.props.name].getDOMNode().value.trim();
    alert(this.props.onFieldChange({name: name, value: value}));
    return false;
  },
  render: function(){
    console.log(this.props.onFieldChange({name:''}));
    return(
      React.DOM.div( {className:"element textfield"}, 
      React.DOM.label(null, this.props.label),
      React.DOM.input( {type:this.props.type, ref:this.props.name, placeholder:this.props.placeholder, value:this.props.value, onChange:this.handleChange})
      )
    );
  }
});
//textarea

var generateTextarea = React.createClass({displayName: 'generateTextarea',

  render: function(){
    return(
      React.DOM.div( {className:"element textarea"}, 
      React.DOM.label(null, this.props.label),
      React.DOM.textarea( {ref:this.props.name, placeholder:this.props.placeholder}, this.props.value)
      )
    );
  }
});
//select box
var generateSelectbox = React.createClass({displayName: 'generateSelectbox',

  render: function(){
    var options = this.props.options.map(function (option) {
      return  React.DOM.option( {value:option.value}, option.text)
    });
    return(
      React.DOM.div( {className:"element select"}, 
      React.DOM.label(null, this.props.label),
      React.DOM.select( {ref:this.props.name}, 
      options
      )
      )
    );
  }
});
React.renderComponent(
  initialize(null ),
  document.body
  );