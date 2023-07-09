import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../css/department.module.css";
export const Department = () => {
	return (
		<div className={styles.department_container}>
			<div className={styles.department_wrapper}>
				<div className={styles.btech}>
					<span>B.Tech Courses</span>
					<div>
						<NavLink to="computer-science-and-engineering" end>
							Computer Science
						</NavLink>
					</div>
					<div>
						<NavLink to="mechanical-engineering" end>
							Mechanical Engineering
						</NavLink>
					</div>
					<div>
						<NavLink to="civil-engineering" end>
							Civil Engineering
						</NavLink>
					</div>
					<div>
						<NavLink to="electrical-engineering" end>
							Electrical Engineering
						</NavLink>
					</div>
					<div>
						<NavLink to="instrumentation-engineering" end>
							Instrumentation Engineering
						</NavLink>
					</div>
				</div>

				<div className={styles.humanities}>
					<span>Humanities</span>
					<div>
						<NavLink to={"humanities"} end>
							Humanities
						</NavLink>
					</div>
				</div>
				<div className={styles.science}>
					<span>Science</span>
					<div>
						<NavLink to={"physics"} end>
							Physics
						</NavLink>
					</div>
					<div>
						<NavLink to={"chemistry"} end>
							Chemistry
						</NavLink>
					</div>
					<div>
						<NavLink to={"mathematics"} end>
							Mathematics
						</NavLink>
					</div>
				</div>
				<div className={styles.postgraduate}>
					<span>Post Graduate</span>
					<div>
						<NavLink to={"mca"} end>
							Master of Computer Application(MCA)
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
};
