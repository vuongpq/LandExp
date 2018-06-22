import * as React from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Container, Button } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { savePassword, reset } from './password.reducer';

import SearchPage from 'app/modules/search/search-page';

export interface IUserPasswordProps extends StateProps, DispatchProps {}

export interface IUserPasswordState {
  password: string;
}

export class PasswordPage extends React.Component<IUserPasswordProps, IUserPasswordState> {
  state: IUserPasswordState = {
    password: ''
  };

  componentDidMount() {
    this.props.reset();
    this.props.getSession();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  handleValidSubmit = (event, values) => {
    this.props.savePassword(values.currentPassword, values.newPassword);
  };

  updatePassword = event => {
    this.setState({ password: event.target.value });
  };

  render() {
    const { account } = this.props;

    return (
      <Row>
        <SearchPage />
        <Container className="justify-content-center">
          <Col md="8">
            <h2 id="password-title">
              <Translate contentKey="password.title" interpolate={{ username: account.login }}>
                Password for {account.login}
              </Translate>
            </h2>
            <AvForm id="password-form" onValidSubmit={this.handleValidSubmit}>
              <AvField
                name="currentPassword"
                label={translate('global.form.currentpassword')}
                placeholder={translate('global.form.currentpassword.placeholder')}
                type="password"
                validate={{
                  required: { value: true, errorMessage: translate('global.messages.validate.newpassword.required') }
                }}
              />
              <AvField
                name="newPassword"
                label={translate('global.form.newpassword')}
                placeholder={translate('global.form.newpassword.placeholder')}
                type="password"
                validate={{
                  required: { value: true, errorMessage: translate('global.messages.validate.newpassword.required') },
                  minLength: { value: 4, errorMessage: translate('global.messages.validate.newpassword.minlength') },
                  maxLength: { value: 50, errorMessage: translate('global.messages.validate.newpassword.maxlength') }
                }}
                onChange={this.updatePassword}
              />
              <PasswordStrengthBar password={this.state.password} />
              <AvField
                name="confirmPassword"
                label={translate('global.form.confirmpassword')}
                placeholder={translate('global.form.confirmpassword.placeholder')}
                type="password"
                validate={{
                  required: {
                    value: true,
                    errorMessage: translate('global.messages.validate.confirmpassword.required')
                  },
                  minLength: {
                    value: 4,
                    errorMessage: translate('global.messages.validate.confirmpassword.minlength')
                  },
                  maxLength: {
                    value: 50,
                    errorMessage: translate('global.messages.validate.confirmpassword.maxlength')
                  },
                  match: {
                    value: 'newPassword',
                    errorMessage: translate('global.messages.error.dontmatch')
                  }
                }}
              />
              <Button color="success" type="submit">
                <Translate contentKey="password.form.button">Save</Translate>
              </Button>
            </AvForm>
          </Col>
        </Container>
      </Row>
    );
  }
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = { getSession, savePassword, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PasswordPage);
