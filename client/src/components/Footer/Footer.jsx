import React, { Component } from 'react';

class Footer extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <footer className="pt-4 my-4 border-top">
        <small className="d-block mb-3 text-muted text-center">
          Devplace &copy; {new Date().getFullYear()}
        </small>
      </footer>
    );
  }
}

export default Footer;
