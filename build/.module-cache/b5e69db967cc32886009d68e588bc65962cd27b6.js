/** @jsx React.DOM */
 
var initialize = React.createClass({displayName: 'initialize',
  getInitialState: function(){
    return{ data: data, title: 'hi'};

  },
  render: function() {
    var elements = this.state.data.map(function (form) {
      return generator( {type:form.type, label:form.label} );
    });
    return(
      React.DOM.form(null, 
        elements
      )
    );
  }
});

var generator = React.createClass({displayName: 'generator',

  render: function(){
    return(
      React.DOM.input( {type:"text"} )
    );
  }
});

React.renderComponent(
  initialize(null ),
  document.body
  );