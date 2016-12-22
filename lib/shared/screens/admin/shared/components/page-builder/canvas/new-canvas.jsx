import Component from 'components/component';
import Scrollable from 'components/scrollable';
import Styles from 'components/styles';
import bind from 'decorators/bind';
import displays from 'statics/displays';
import React, {PropTypes} from 'react';

import NoLinks from './no-links';
import PageElement from './page-element';
import classes from './canvas.less';

export default class Canvas extends Component {
  static propTypes = {
    display: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    template: PropTypes.object
  };

  @bind
  onScroll () {
    window.dispatchEvent(new Event('scroll'));
  }

  render () {
    const {display} = this.props;
    const bodyStyle = {
      maxWidth: displays[display]
    };

    return (
      <Scrollable className={classes.canvas} onScroll={this.onScroll}>
        <div className={classes.content} style={bodyStyle} ref='Body' id='pb-canvas'>
          {this.renderContent()}
        </div>
        {this.renderNoLinks()}
        <Styles />
      </Scrollable>
    );
  }

  renderNoLinks () {
    const {template, type} = this.props;
    const templateHasLinks = !!(template && template.links && template.links[type]);

    if (template && !templateHasLinks) {
      return <NoLinks templateId={template._id} />;
    }
  }

  renderContent () {
    const {template, type} = this.props;

    return (
      <PageElement
        id='Body'
        contextDoc={template ? 'template' : 'draft'}
        contextProperty='data'
        links={template && template.links && template.links[type]}
        linksData='draft'
      />
    );
  }
}
