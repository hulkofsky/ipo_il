import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPageContent } from '../../../redux/reducers/pageContent.reducer';
import { Link } from 'react-router-dom';
import multiLang from '../../_HOC/lang.hoc';
import { admins } from '../../../utils/routesBack';
import BaseLayout from '../../grid/BaseLayout/BaseLayout.index';
import Container from '../../grid/Container/Container.index';
import ContentSection from '../../ContentSection/ContentSection.index';

class Admin extends PureComponent {
  static propTypes = {
    dir: PropTypes.string,
    lang: PropTypes.string,
    getPageContent: PropTypes.func,
    content: PropTypes.object
  }
  /*  state = {
    isModalOpen: false
  }*/
  componentDidMount () {
    const { getPageContent, lang } = this.props;
    getPageContent(lang, admins);
  }
  renderPage () {
    const { content, dir, lang } = this.props;
    if (! content.pageContent) return null;
    return (
      <BaseLayout dir={ dir }
        pageHeaderText={ content.pageContent[0][lang] }
        pageHeaderMedia={ content.pageContent[0].media }
        pageFooterText={ content.pageContent[1][lang] }
        path = {admins}
      >
        <Container>
          <ContentSection className={'log-in'}>
            <header className="content-section__header" dir={ dir }>
              <h1 className="content-section__title">
                { content.pageContent[2][lang] ? content.pageContent[2][lang][`admins.title`] : null }
              </h1>
              <div className="content-section__text">
                <p>
                  { content.pageContent[2][lang] ? content.pageContent[2][lang][`admins.descr`] : null }
                </p>
              </div>
            </header>
          </ContentSection>
        </Container>
{/*        <Container>
          <ContentSection className={`log-in`}>
            {isModalOpen && <Modal close={this.closeModal} contentText = { content.pageContent[2][lang] } />}
            <header className="content-section__header" dir={ dir }>
              <h1 className="content-section__title">
                { content.pageContent[2][lang] ? content.pageContent[2][lang][`admin.title`] : null}
              </h1>
              <div className="content-section__text">
                <p>
                  { content.pageContent[2][lang] ? content.pageContent[2][lang][`admin.descr`] : null}
                </p>
              </div>
            </header>
            <div className="sign-up-container">
              <Form openModal={this.openModal} contentText = { content.pageContent[2][lang] } />
            </div>
            <div className="sign-up__login" dir={ dir }>
              <div className="sign-up__login-text">
                { content.pageContent[2][lang] ? content.pageContent[2][lang][`admin.dont_have`] : null}
              </div>
              <Link to="/sign-up" className="sign-up__link">
                { content.pageContent[2][lang] ? content.pageContent[2][lang][`admin.sign_up_link`] : null}
              </Link>
            </div>
          </ContentSection>
        </Container>*/}
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
}

const mapStateToProps = state => ({ content: state.pageContent});
const mapDispatchToProps = { getPageContent };

export default connect(mapStateToProps, mapDispatchToProps)(multiLang(Admin))