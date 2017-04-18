import React from 'react';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';
import { Bert } from 'meteor/themeteorchef:bert';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }

  handleSendMessage() {
    const message = {
      name: this.name.value,
      email: this.email.value,
      message: this.message.value,
    };

    Meteor.call('sendMessage', message, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        this.contactForm.reset();
        Bert.alert('Message sent!', 'success');
      }
    });
  }

  componentDidMount() {
    const component = this;
    $(component.contactForm).validate({
      rules: {
        name: {
          required: true,
        },
        email: {
          required: true,
          email: true,
        },
        message: {
          required: true,
        },
      },
      messages: {
        name: {
          required: 'Need to know who you are, skipper.',
        },
        email: {
          required: 'Need an email, champ.',
          email: 'Is this legit, friend?',
        },
        message: {
          required: 'Well you have to say something!',
        },
      },
      submitHandler() { component.handleSendMessage(); },
    });
  }

  render() {
    return (
      <div className="Index">
        <h4 className="page-header">Contact Us!</h4>
        <form
          ref={contactForm => (this.contactForm = contactForm)}
          onSubmit={event => event.preventDefault()}
        >
          <FormGroup>
            <ControlLabel>Your Name</ControlLabel>
            <input
              ref={name => (this.name = name)}
              type="text"
              name="name"
              className="form-control"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Your Email</ControlLabel>
            <input
              ref={email => (this.email = email)}
              type="email"
              name="email"
              className="form-control"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Your Message</ControlLabel>
            <textarea
              ref={message => (this.message = message)}
              name="message"
              className="form-control"
            />
          </FormGroup>
          <Button type="submit" bsStyle="success">Send Message</Button>
        </form>
      </div>
    );
  }
}

export default Index;
