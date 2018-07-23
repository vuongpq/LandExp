import './article.css';

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { TextFormat } from 'react-jhipster';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Container, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import ImageGallery from 'react-image-gallery';

import { getLandType, getDirection, getMoney, encodeId, decodeId } from 'app/shared/util/utils';
import { getEntities } from 'app/entities/article/article.reducer';
import { getImageOfHouse } from 'app/entities/house-photo/house-photo.reducer';
import { SERVER_API_URL, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';
import HomeNewsBox from 'app/modules/home/home-newsbox';
import ExperienceAndLife from './articleByExperienceAndLife';
import DesignCorner from './articleByDesignCorner';
import EconomicInvestment from './articleByEconomicInvestment';

export interface IArticleProp extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export class Article extends React.Component<IArticleProp> {
  render() {
    return (
      <Row>
        <SearchPage location={this.props.location} history={this.props.history} />
        <Container>
          {this.props.loading ? (
            <Loading />
          ) : (
            <>
              <HomeNewsBox />
              <ExperienceAndLife />
              <DesignCorner />
              <EconomicInvestment />
            </>
          )}
        </Container>
      </Row>
    );
  }
}

const mapStateToProps = ({ article }) => ({
  articleEntity: article.entity,
  loading: article.loading
});

const mapDispatchToProps = { getEntities };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);
