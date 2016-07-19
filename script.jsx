const Card = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    const component = this;
    $.get("https://api.github.com/users/" + this.props.login, function(data){
      component.setState(data)
    });
  },
  render: function() {
    return(
      <div>
        <img src={this.state.avatar_url} width="80" />
        <h3>{this.state.name}</h3>
        <hr/>
      </div>
    );
  }
});

const Form = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    const loginInput = React.findDOMNode(this.refs.login);
    this.props.addCard(loginInput.value);
    loginInput.value = '';
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input placeholder="github login" ref="login"/>
        <button>Add</button>
      </form>
    );
  }
});

const Main = React.createClass({
  getInitialState: function() {
    return {logins: []};
  },
  addCard: function(loginToAdd) {
    this.setState({logins: this.state.logins.concat(loginToAdd)});
  },
  render: function() { 
    const cards = this.state.logins.map(function(login) {
      return (<Card login={login} />)
    })
    return (
      <div>
        <Form addCard={this.addCard} />
        {cards}
      </div>
    )}
});

React.render(<Main />, document.getElementById('root'))
