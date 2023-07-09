import React, { Children, useEffect, useRef, useState } from "react";
import styles from "../css/testnav.module.css";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Navitems } from "../components/NavItems";
import jecLogo from "../assets/jec_logo.webp";

export const Navbar = () => {
  const { auth, setauth } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubdropdown, setActiveSubdropdown] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleLogout = () => {
    setauth({
      isAutheticated: false,
      role: [],
      tokenid: "",
      username: "",
      email: "",
    });
    localStorage.removeItem("tokenid");
  };

  const navRef = useRef(null);

  const handleNavitemHover = (index) => {
    if (windowWidth >= 750) setActiveDropdown(index);
  };

  const handleNavitemLeave = () => {
    if (windowWidth >= 750) {
      setActiveDropdown(null);
      setActiveSubdropdown(null);
    }
  };

  const handleDropdownHover = (index) => {
    if (windowWidth >= 750) setActiveSubdropdown(index);
  };

  const handleSubDropdownLeave = () => {
    if (windowWidth >= 750) setActiveSubdropdown(null);
  };

  const handleClick = () => {
    setActiveDropdown(null);
    setActiveSubdropdown(null);
  };

  const handleNavItemsClick = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
      setActiveSubdropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };
  const handleDropdownClick = (index) => {
    if (activeSubdropdown === index) {
      setActiveSubdropdown(null);
    } else {
      setActiveSubdropdown(index);
    }
  };

  useEffect(() => {
    // Event handler to update the state with the window's inner width
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add the event listener when the component mounts
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fix = () => {
      if (windowWidth > 750) navRef.current.style.display = "block";
      else navRef.current.style.display = "none";
    };
    fix();
  }, [windowWidth]);
  const handleExpandNav = () => {
    handleClick();

    if (windowWidth < 750) {
      if (navRef.current.style.display == "block")
        navRef.current.style.display = "none";
      else navRef.current.style.display = "block";
    }
  };
  const renderSubdropdown = (subdropdownItems) => {
    if (subdropdownItems.length > 0) {
      return (
        <ul
          className={`${styles.subdropdown} `}
          // onMouseLeave={handleSubDropdownLeave}
        >
          {subdropdownItems.map((subdropdownItem, sdmiIndex) => {
            return (
              <li key={subdropdownItem.id}>
                <NavLink onClick={handleClick} to={subdropdownItem.path}>
                  {subdropdownItem.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      );
    }
  };

  const renderDropdown = (dropdownItems) => {
    if (dropdownItems.length > 0) {
      return (
        <ul className={`${styles.dropdown} `}>
          {dropdownItems.map((dropdownItem, dmiIndex) => {
            return (
              <li key={dropdownItem.id}>
                <NavLink
                  to={dropdownItem.path}
                  onMouseEnter={() => handleDropdownHover(dropdownItem.id)}
                  onClick={handleExpandNav}
                >
                  {dropdownItem.title}
                  {dropdownItem.dropdown?.length > 0 && <span> &rarr; </span>}
                </NavLink>
                {dropdownItem.dropdown?.length > 0 && (
                  <span
                    className={styles.add}
                    onClick={() => handleDropdownClick(dropdownItem.id)}
                  >
                    +
                  </span>
                )}
                {activeSubdropdown == dropdownItem.id &&
                  dropdownItem.dropdown?.length > 0 &&
                  renderSubdropdown(dropdownItem.dropdown)}
              </li>
            );
          })}
        </ul>
      );
    }
  };

  const renderNavItems = (navItems) => {
    return navItems.map((navItem, index) => {
      return (
        <li
          key={navItem.id}
          onMouseEnter={() => handleNavitemHover(navItem.id)}
          onMouseLeave={handleNavitemLeave}
        >
          <NavLink to={navItem.path} onClick={handleExpandNav}>
            {navItem.title}
            {navItem.dropdown?.length > 0 && <span> &#10146; </span>}
          </NavLink>

          {navItem.dropdown?.length > 0 && (
            <span
              className={styles.add}
              onClick={() => handleNavItemsClick(navItem.id)}
            >
              +
            </span>
          )}
          {activeDropdown == navItem.id &&
            navItem.dropdown?.length > 0 &&
            renderDropdown(navItem.dropdown)}
        </li>
      );
    });
  };

  return (
    <>
      <header className={styles.nav_header}>
        <div className={styles.user_detail}>
          <Info auth={auth} handleLogout={handleLogout} />
        </div>
        <span className={styles.hamburger} onClick={handleExpandNav}>
          +
        </span>
        <nav ref={navRef} className={styles.nav_menu}>
          <ul className={styles.nav_items}>{renderNavItems(Navitems)}</ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

const Info = ({ auth, handleLogout }) => {
  return (
    <>
      <div className={styles.logo}>
        <NavLink to={"/"}>
          <img src={jecLogo} alt="LOGO" />
        </NavLink>
        <p>
        <span>Garmur, Jorhat Assam</span>
        <br />
          Jorhat Engineering College
          <br />
          <span>Estd 1960</span>
        </p>
      </div>
      <div className={styles.nav_login}>
        {auth?.isAuthenticated ? (
          <div className={styles.nav_login_detail}>
            <span onClick={handleLogout}>Logout</span>
            {auth.role.includes("FACULTY") ? (
              <span>
                <Link to={`/profile/f/${auth.username}`}>{auth.username}</Link>
              </span>
            ) : (
              auth.role.includes("STUDENT") && (
                <span>
                  <Link to={`/profile/s/${auth.username}`}>
                    {auth.username}
                  </Link>
                </span>
              )
            )}
          </div>
        ) : (
          <span>
            <Link to="/login">Login</Link>
          </span>
        )}
      </div>
    </>
  );
};
