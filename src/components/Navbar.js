import React, { useEffect, useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { BsPerson } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import styled from "styled-components";
import Logo from "../logo.svg";
import { Badge } from "antd";

const Navbar = () => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const html = document.querySelector("html");
  html.addEventListener("click", (e) => setIsNavOpen(false));

  const handleLogout = () => {
    localStorage.clear();
    dispatch(showLoading());
    setInterval(async () => {
      dispatch(hideLoading());
    }, 3000);
    navigate("/login");
  };

  const navigateToNotification = () => {
    navigate("/notification-page");
  };

  return (
    <>
      <section className="h-[10vh] mb-2 bg-sky-400">
        <Container className="h-[10vh]" state={isNavOpen ? 1 : 0}>
          <div className="brand w-28 ">
            <img src={Logo} alt="logo" />
          </div>

          <div className="toggle">
            {isNavOpen ? (
              <MdClose onClick={() => setIsNavOpen(false)} />
            ) : (
              <MenuOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  setIsNavOpen(true);
                }}
              />
            )}
          </div>
          <div className={`links  ${isNavOpen ? "show" : ""}`}>
            <ul>
              <li>
                <a href="#services">Home</a>
              </li>
              <li>
                <a href="#destination"> Destination</a>
              </li>
              <li>
                <a href="#offer">Offer</a>
              </li>
              <li>
                <a href="#tour">Tour</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
            </ul>
          </div>

          <div className="account-info">
            <div className="account mr-4">
              <Badge
                color="#faad14"
                count={user?.notification.length}
                className="mr-2"
              >
                <BsPerson
                  className="search text-3xl hover:text-white  transition-all	"
                  onClick={navigateToNotification}
                />
              </Badge>
              <span className="text-xl mr-1">{user?.name}</span>

              <AiOutlineLogout
                onClick={handleLogout}
                className="search text-2xl mt-1"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .brand {
    img {
      cursor: pointer;
    }
  }
  .toggle {
    display: none;
  }
  .links {
    ul {
      display: flex;
      gap: 3rem;
      list-style-type: none;
      li {
        a {
          text-decoration: none;
          color: black;
          cursor: pointer;
          transition: var(--default-transition);
          &:hover {
            color: var(--primary-color);
          }
        }
      }
    }
  }
  .account-info {
    display: flex;
    gap: 2rem;
    .account {
      display: flex;
      gap: 0.5rem;
      cursor: pointer;
    }
    .search {
      cursor: pointer;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    position: relative;
    padding: 1rem 0.5rem;
    z-index: 10;
    .account-info {
      display: none;
    }
    .brand {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 15vw;
    }
    .toggle {
      padding-right: 1rem;
      display: block;
      z-index: 1;
    }
    .show {
      opacity: 1 !important;
      visibility: visible !important;
    }

    .links {
      position: absolute;
      overflow-x: hidden;
      top: 0;
      right: 0;
      width: ${({ state }) => (state ? "60%" : "0%")};
      height: 100vh;
      background-color: var(--primary-color);
      opacity: 0;
      visibility: hidden;
      transition: 0.4s ease-in-out;
      ul {
        flex-direction: column;
        text-align: center;
        height: 100%;
        justify-content: center;
        li {
          a {
            color: white;
          }
        }
      }
    }
  }
`;
export default Navbar;
