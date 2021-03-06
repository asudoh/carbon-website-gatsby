import React from 'react';
import classnames from 'classnames';

import { Link } from "gatsby";
import { Button, Search, Icon } from 'carbon-components-react';

import SideNavItem from './SideNavItem';
import navigation from '../../data/navigation/navigation.json';

console.log(process.env.GATSBY_CARBON_ENV);

export default class SideNav extends React.Component {
  renderNavItems = nav =>
    Object.keys(nav).map(item => {
      const { GATSBY_CARBON_ENV } = process.env;
      const hideInternal = GATSBY_CARBON_ENV !== 'internal' && nav[item].internal;
      if (hideInternal) {
        return '';
      }
      return ( 
        <SideNavItem itemSlug={item} item={nav[item]} key={item} />
      );
    });

  render() {
    const { isOpen, isFinal } = this.props;
    const navItems = this.renderNavItems(navigation);

    const classNames = classnames({
      'side-nav': true,
      'side-nav__closed': !isOpen,
      'side-nav__closed--final': isFinal && !isOpen,
    });

    return (
      <nav className={classNames}>
        <Link to="/" className="side-nav__logo">
          <span>Carbon</span> Design System
        </Link>
        <div className="side-nav__search">
          <Search small id="side-nav-search" labelText="Search" placeHolderText="Search" onChange={() => {}} />
        </div>
        <ul className="side-nav__nav-items">{navItems}</ul>
        <div className="side-nav__links">
          <Button
            className="side-nav__link"
            kind="secondary"
            icon="icon--arrow--right"
            iconDescription="Arrow right"
            href="https://github.com/ibm/carbon-design-kit"
          >
            Design Kit
          </Button>
          <Link to="/resources#github" className="side-nav__link bx--btn bx--btn bx--btn--secondary">
            GitHub Repos
            <Icon
              className="bx--btn__icon"
              name="icon--arrow--right"
              description="Arrow right"
            />
          </Link>
        </div>
      </nav>
    );
  }
}
