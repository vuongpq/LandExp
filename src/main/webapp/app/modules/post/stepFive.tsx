import './stepTwo.css';

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { Cascader, Input, Select, Radio } from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

export interface IStepFiveProp extends StateProps, DispatchProps {}

export interface IStepFiveState {
  value: string
}

export class StepFive extends React.Component<IStepFiveProp, IStepFiveState> {
  state: IStepFiveState = {
    value: ''
  };

  componentDidMount() {
    this.props.getSession();
  }

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    const { account } = this.props;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    return (
      <Row>
        <Col md="12">
          <h5>Thông tin liên hệ của bạn?</h5>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <Input addonBefore="Họ và tên " placeholder="Ho và tên người liên hệ"/>
          </div>
        </Col>
        <Col md="12">
          <div style={{ marginTop: 16 }}>
            <Input addonBefore="Điện thoại" placeholder="Số điện thoại liên hệ"/>
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StepFive);
