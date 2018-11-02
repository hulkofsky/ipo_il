import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPageContent } from '../../../redux/reducers/pageContent.reducer';
import multiLang from '../../_HOC/lang.hoc';
import BaseLayout from '../../grid/BaseLayout/BaseLayout.index';
import Container from '../../grid/Container/Container.index';
import ContentSection from '../../ContentSection/ContentSection.index';

import { admin } from '../../../utils/routesBack';
const { dashboard } = admin;

class Dashboard extends PureComponent {
  static propTypes = {
    dir: PropTypes.string,
    lang: PropTypes.string,
    getPageContent: PropTypes.func,
    content: PropTypes.object
  }
  state = {}
  componentDidMount () {
    const { getPageContent, lang } = this.props;
    getPageContent(lang, dashboard);
  }
  renderPage () {
    const { content, dir, lang } = this.props;
//    const { isModalOpen } = this.state;
    if (! content.pageContent) return null;
    return (
      <BaseLayout pageHeaderText = { content.pageContent[0][lang] }
        pageHeaderMedia = { content.pageContent[0].media }
        pageFooterText = { content.pageContent[1][lang] }
        path = { dashboard }
      >
        <Container>
          <ContentSection className="admin-dashboard">
            <header className="content-section__header" dir={ dir }>
              <h1 className="content-section__title">
                { content.pageContent[2][lang] ? content.pageContent[2][lang]['admin_dashboard.title'] : null}
              </h1>
              <div className="content-section__text">
                <p>
                  { content.pageContent[2][lang] ? content.pageContent[2][lang]['admin_dashboard.descr'] : null }
                </p>
              </div>
            </header>
            
          </ContentSection>
        </Container>
      </BaseLayout>
    );
  }
  render() {
    return (
      <Fragment>
        { this.renderPage() }
      </Fragment>
    );
  }
};

const mapStateToProps = state => ({ content: state.pageContent });
const mapDispatchToProps = { getPageContent };

export default connect(mapStateToProps, mapDispatchToProps)(multiLang(Dashboard));