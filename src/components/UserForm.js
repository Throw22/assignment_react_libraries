import React, { Component } from 'react';
import Input from './elements/Input';
import InputGroup from './elements/InputGroup';
import Button from './elements/Button';
import Alert from './elements/Alert';
import Showable from './elements/Showable';
import { findUser } from '../helpers/userHelper';

class UserForm extends Component {
  constructor(props) {
    super(props);
    let user = findUser(props.users, props.isEditing);
    this.state = {
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar
    };
  }

  componentWillReceiveProps(newProps) {
    let user = findUser(newProps.users, newProps.isEditing);
    this.setState({
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar
    });
  }

  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { onSubmit, error, header, isEditing, users } = this.props;
    const { first_name, last_name, avatar } = this.state;

    return (
      <form
        className="container"
        style={{ marginBottom: '40px' }}
        onSubmit={onSubmit}
      >
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <h1 className="text-center">{header} User</h1>
            <Showable show={error}>
              <Alert type="danger">
                Oops, there was a problem...
              </Alert>
            </Showable>
            <Input name="id" type="hidden" value={isEditing} />
            <InputGroup name="first_name" labelText="First Name">
              <Input
                name="first_name"
                value={first_name}
                onChange={this.onChangeInput}
              />
            </InputGroup>
            <InputGroup name="last_name" labelText="Last Name">
              <Input
                name="last_name"
                value={last_name}
                onChange={this.onChangeInput}
              />
            </InputGroup>
            <InputGroup name="avatar" labelText="Photo Link">
              <Input
                name="avatar"
                value={avatar}
                onChange={this.onChangeInput}
              />
            </InputGroup>
            <Button type="submit" color="primary">{header}</Button>
          </div>
        </div>
      </form>
    );
  }
}

export default UserForm;
