import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
      state = {
        response: '',
        code: '',
        responseToPost: '',};
      
      componentDidMount() {
         this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
      }

      callApi = async () => {
         const response = await fetch('/api/start');
         const body = await response.json();
         if (response.status !== 200) throw Error(body.message);
         return body;
      };

      handleSubmit = async e => {
         e.preventDefault();
         const response = await fetch('/api/submit', {
              method: 'POST',
              headers: {'Content-Type': 'application/json',
               },
              body: JSON.stringify({code: this.state.code}),
            });
         const body = await response.text();

         this.setState({responseToPost: body});
      };


  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <body>
          <p>
      <form onSubmit = {this.handleSubmit}>
             <textarea rows = "5" cols = "60" name = "code"
      value = {this.state.code}
      onChange = {e=> this.setState({code: e.target.value}) }/>
             <br/>
             <input type="submit" value="Submit"/>
          </form>
          </p>
      <p>
         {this.state.responseToPost}
      </p>

        </body>
      </div>
    );
  }
}

export default App;
