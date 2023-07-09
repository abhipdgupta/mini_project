import React, { useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import styles from "../css/department.module.css";

import { departmentMap } from "../utils/departmentMap";
import { NotFound404 } from "../components/NotFound404";

export const DepartmentLayout = () => {
  const { department_name } = useParams();

  if (!departmentMap[department_name]) return <NotFound404 />;

  return (
    <div className={styles.top_container}>
      <div className={styles.container}>
        <SideLinks department_name={department_name} />
        <div className={styles.wrapper}>
          <Outlet context={{ department_name: department_name }} />
        </div>
      </div>
    </div>
  );
};

const SideLinks = ({ department_name }) => {
  useEffect(() => {
    function scrollToTop() {
      window.scrollTo(0, 0);
    }
	scrollToTop();
  }, []);
  return (
    <div className={styles.sidelinks}>
      <div className={styles.links}>
        <NavLink
          className={({ isActive }) => (isActive ? `${styles.active}` : {})}
          to={""}
          end
        >
          {department_name}
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? `${styles.active}` : {})}
          to={"faculty"}
          end
        >
          Faculty
        </NavLink>
        {/* <NavLink
					className={({ isActive }) => (isActive ? `${styles.active}` : {})}
					to={"staff"}
					end
				>
					Staff
				</NavLink> */}
        <NavLink
          className={({ isActive }) => (isActive ? `${styles.active}` : {})}
          to={"student"}
          end
        >
          Student
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? `${styles.active}` : {})}
          to={"academic-program"}
          end
        >
          Academic Program
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? `${styles.active}` : {})}
          to={"labs"}
          end
        >
          Labs
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? `${styles.active}` : {})}
          to={"projects"}
          end
        >
          Projects
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? `${styles.active}` : {})}
          to={"events"}
          end
        >
          Events
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? `${styles.active}` : {})}
          to={"research-publication"}
          end
        >
          Research & Publication
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? `${styles.active}` : {})}
          to={"interaction"}
          end
        >
          Interaction
        </NavLink>
        {/* <NavLink
          className={({ isActive }) => (isActive ? `${styles.active}` : {})}
          to={"achievement"}
          end
        >
          Achievement
        </NavLink> */}
        {/* <NavLink
					className={({ isActive }) => (isActive ? `${styles.active}` : {})}
					to={"placement"}
					end
				>
					Placement
				</NavLink> */}
        {/* <NavLink
					className={({ isActive }) => (isActive ? `${styles.active}` : {})}
					to={"student-club"}
					end
				>
					Student Club
				</NavLink> */}
        {/* <NavLink
					className={({ isActive }) => (isActive ? `${styles.active}` : {})}
					to={"alumni"}
					end
				>
					Alumni
				</NavLink> */}
        {/* <NavLink
					className={({ isActive }) => (isActive ? `${styles.active}` : {})}
					to={"other-info"}
					end
				>
					Other information
				</NavLink> */}
      </div>
    </div>
  );
};
