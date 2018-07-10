import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Container, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { getActionType, getLandType, getCityType, getDirection, getPresent, getSaleType, getStatusType } from 'app/shared/util/utils';
// tslint:disable-next-line:no-unused-variable
import {
  openFile,
  byteSize,
  Translate,
  translate,
  ICrudSearchAction,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  getPaginationItemsNumber,
  JhiPagination
} from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Spin } from 'antd';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './house.reducer';
import { IHouse } from 'app/shared/model/house.model';
// tslint:disable-next-line:no-unused-variable
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import SearchPage from 'app/shared/layout/search/search-menu';

export interface IHouseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IHouseState extends IPaginationBaseState {
  search: string;
}

export class House extends React.Component<IHouseProps, IHouseState> {
  state: IHouseState = {
    search: '',
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  search = () => {
    if (this.state.search) {
      this.props.getSearchEntities(this.state.search);
    }
  };

  clear = () => {
    this.props.getEntities();
    this.setState({
      search: ''
    });
  };

  handleSearch = event => this.setState({ search: event.target.value });

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { houseList, match, totalItems } = this.props;
    return (
      <Row>
        <SearchPage location={this.props.location} history={this.props.history} />
        <Container>
          <Spin spinning={this.props.loading} tip="Đang cập nhật dữ liệu...">
            <h2 id="house-heading">
              <Translate contentKey="landexpApp.house.home.title">Houses</Translate>
            </h2>
            {/*}
            <Row>
              <Col sm="12">
                <AvForm onSubmit={this.search}>
                  <AvGroup>
                    <InputGroup>
                      <AvInput
                        type="text"
                        name="search"
                        value={this.state.search}
                        onChange={this.handleSearch}
                        placeholder={translate('landexpApp.house.home.search')}
                      />
                      <Button className="input-group-addon">
                        <FontAwesomeIcon icon="search" />
                      </Button>
                      <Button type="reset" className="input-group-addon" onClick={this.clear}>
                        <FontAwesomeIcon icon="trash" />
                      </Button>
                    </InputGroup>
                  </AvGroup>
                </AvForm>
              </Col>
            </Row>
            {*/}
            <div className="table-responsive">
              <Table responsive>
                <thead>
                  <tr>
                    <th className="hand" onClick={this.sort('avatar')}>
                      <Translate contentKey="landexpApp.house.avatar">Avatar</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('actionType')}>
                      <Translate contentKey="landexpApp.house.actionType">Action Type</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('landType')}>
                      <Translate contentKey="landexpApp.house.landType">Land Type</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('money')}>
                      <Translate contentKey="landexpApp.house.money">Money</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('discount')}>
                      <Translate contentKey="landexpApp.house.discount">Discount</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th>
                      <Translate contentKey="landexpApp.house.city">City</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th>
                      <Translate contentKey="landexpApp.house.district">District</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th>
                      <Translate contentKey="landexpApp.house.ward">Ward</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th>
                      <Translate contentKey="landexpApp.house.saleType">Sale Type</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th>
                      <Translate contentKey="landexpApp.house.statusType">Status Type</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th>
                      <Translate contentKey="landexpApp.house.createBy">Create By</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {houseList.map((house, i) => (
                    <tr key={`entity-${i}`}>
                      <td>
                        {house.avatar ? (
                          <div>
                            <a onClick={openFile(house.avatarContentType, house.avatar)}>
                              <img src={`data:${house.avatarContentType};base64,${house.avatar}`} style={{ maxHeight: '30px' }} />
                              &nbsp;
                            </a>
                            <span>
                              {house.avatarContentType}, {byteSize(house.avatar)}
                            </span>
                          </div>
                        ) : null}
                      </td>
                      <td>{house.actionType === 'FOR_SELL' ? 'Bán' : 'Cho thuê'}</td>
                      <td>{getLandType(house.landType)}</td>
                      <td>{new Intl.NumberFormat().format(house.money)} VNĐ</td>
                      <td>{new Intl.NumberFormat().format(house.discount)} VNĐ</td>
                      <td>{house.cityName ? <Link to={`city/${house.cityId}`}>{house.cityName}</Link> : ''}</td>
                      <td>{house.districtName ? <Link to={`district/${house.districtId}`}>{house.districtName}</Link> : ''}</td>
                      <td>{house.wardName ? <Link to={`ward/${house.wardId}`}>{house.wardName}</Link> : ''}</td>
                      <td>{getSaleType(house.saleType)}</td>
                      <td>{getStatusType(house.statusType)}</td>
                      <td>{house.createByLogin}</td>
                      <td className="text-right">
                        <div className="btn-group flex-btn-group-container">
                          <Button tag={Link} to={`${match.url}/${house.id}/edit`} color="primary" size="sm">
                            <FontAwesomeIcon icon="pencil-alt" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.edit">Edit</Translate>
                            </span>
                          </Button>
                          {this.props.isManager ? (
                            <Button tag={Link} to={`${match.url}/${house.id}/delete`} color="danger" size="sm">
                              <FontAwesomeIcon icon="trash" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.delete">Delete</Translate>
                              </span>
                            </Button>
                          ) : (
                            ''
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <Row className="justify-content-center">
              <JhiPagination
                items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
                activePage={this.state.activePage}
                onSelect={this.handlePagination}
                maxButtons={5}
              />
            </Row>
          </Spin>
        </Container>
      </Row>
    );
  }
}

const mapStateToProps = ({ house, authentication }: IRootState) => ({
  isManager: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.MANAGER]),
  loading: house.loading,
  houseList: house.entities,
  totalItems: house.totalItems
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(House);
