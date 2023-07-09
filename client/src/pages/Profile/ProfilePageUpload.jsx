import React, { useState } from "react";

export const ProfilePageUpload = () => {
	const [examsResult, setExamsResult] = useState([]);

	const [resources, setResources] = useState([]);

	const addExam = () => {
		const exam = {
			exam_result_name: "",
			exam_result_file: null,
		};

		const newExamResult = [...examsResult];
		newExamResult.push(exam);

		setExamsResult(newExamResult);
	};

	const handleExamChange = (e, index, str) => {
		const newArray = [...examsResult];

		if (str === "NAME") {
			newArray[index] = {
				...newArray[index],
				[e.target.name]: e.target.value,
			};
		}
		if (str === "FILE") {
			newArray[index] = {
				...newArray[index],
				[e.target.name]: e.target.files[0],
			};
		}
		setExamsResult(newArray);
	};

    const addResource = () => {
		const resource = {
			resource_name: "",
			resource_file: null,
		};

		const newResources = [...resources];
		newResources.push(resource);

		setResources(newResources);
	};

	const handleResourceChange = (e, index, str) => {
		const newArray = [...resources];

		if (str === "NAME") {
			newArray[index] = {
				...newArray[index],
				[e.target.name]: e.target.value,
			};
		}
		if (str === "FILE") {
			newArray[index] = {
				...newArray[index],
				[e.target.name]: e.target.files[0],
			};
		}
		setResources(newArray);
	};

	return (
		<>
			<label htmlFor="subject_name">Subject Name</label>
			<input type="text" id="subject_name" />

			<div>
				{examsResult.map((exam, index) => {
					return (
						<div key={index}>
							<label>Exam Name :</label>
							<input
								type="text"
								name="exam_result_name"
								value={exam.exam_result_name}
								onChange={(e) => handleExamChange(e, index, "NAME")}
							/>

							<label>Upload Result</label>
							<input
								type="file"
								name="exam_result_file"
								accept="application/pdf"
								onChange={(e) => handleExamChange(e, index, "FILE")}
							/>
						</div>
					);
				})}
				<button onClick={addExam}>Add Exam Result </button>
			</div>

            <div>
				{resources.map((resource, index) => {
					return (
						<div key={index}>
							<label>Resource Name :</label>
							<input
								type="text"
								name="resource_name"
								value={resource.resource_name}
								onChange={(e) => handleResourceChange(e, index, "NAME")}
							/>

							<label>Upload Resource</label>
							<input
								type="file"
								name="resource_file"
								accept="application/pdf"
								onChange={(e) => handleResourceChange(e, index, "FILE")}
							/>
						</div>
					);
				})}
				<button onClick={addResource}>Add Resource </button>
			</div>


		</>
	);
};

// const [teachSubjects, setTeachSubjects] = useState([
//     {
//         name: "",
//         exams: [{ name: "", filePath: "" }],
//         resources: [{ title: "", filePath: "" }],
//     },
// ]);

// const addExam = (subjectIndex) => {
//     const updatedSubjects = [...teachSubjects];
//     updatedSubjects[subjectIndex].exams.push({ name: "", filePath: "" });
//     setTeachSubjects(updatedSubjects);
// };

// const removeExam = (subjectIndex, examIndex) => {
//     const updatedSubjects = [...teachSubjects];
//     updatedSubjects[subjectIndex].exams.splice(examIndex, 1);
//     setTeachSubjects(updatedSubjects);
// };

// const addResource = (subjectIndex) => {
//     const updatedSubjects = [...teachSubjects];
//     updatedSubjects[subjectIndex].resources.push({ title: "", filePath: "" });
//     setTeachSubjects(updatedSubjects);
// };

// const removeResource = (subjectIndex, resourceIndex) => {
//     const updatedSubjects = [...teachSubjects];
//     updatedSubjects[subjectIndex].resources.splice(resourceIndex, 1);
//     setTeachSubjects(updatedSubjects);
// };

// const handleChange = (event, subjectIndex, field, index) => {
//     const { name, value } = event.target;
//     const updatedSubjects = [...teachSubjects];
//     updatedSubjects[subjectIndex][field][index][name] = value;
//     setTeachSubjects(updatedSubjects);
// };

// return (
//     <form>
//         {teachSubjects.map((subject, subjectIndex) => (
//             <div key={subjectIndex}>
//                 <h3>Subject {subjectIndex + 1}</h3>
//                 <label>
//                     Name:
//                     <input
//                         type="text"
//                         name="name"
//                         value={subject.name}
//                         onChange={(event) => handleChange(event, subjectIndex, "name")}
//                     />
//                 </label>

//                 <h4>Exams</h4>
//                 {subject.exams.map((exam, examIndex) => (
//                     <div key={examIndex}>
//                         <label>
//                             Exam Name:
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={exam.name}
//                                 onChange={(event) =>
//                                     handleChange(event, subjectIndex, "exams", examIndex)
//                                 }
//                             />
//                         </label>
//                         <label>
//                             File Path:
//                             <input
//                                 type="text"
//                                 name="filePath"
//                                 value={exam.filePath}
//                                 onChange={(event) =>
//                                     handleChange(event, subjectIndex, "exams", examIndex)
//                                 }
//                             />
//                         </label>
//                         <button
//                             type="button"
//                             onClick={() => removeExam(subjectIndex, examIndex)}
//                         >
//                             Remove Exam
//                         </button>
//                     </div>
//                 ))}
//                 <button type="button" onClick={() => addExam(subjectIndex)}>
//                     Add Exam
//                 </button>

//                 <h4>Resources</h4>
//                 {subject.resources.map((resource, resourceIndex) => (
//                     <div key={resourceIndex}>
//                         <label>
//                             Resource Title:
//                             <input
//                                 type="text"
//                                 name="title"
//                                 value={resource.title}
//                                 onChange={(event) =>
//                                     handleChange(
//                                         event,
//                                         subjectIndex,
//                                         "resources",
//                                         resourceIndex
//                                     )
//                                 }
//                             />
//                         </label>
//                         <label>
//                             File Path:
//                             <input
//                                 type="text"
//                                 name="filePath"
//                                 value={resource.filePath}
//                                 onChange={(event) =>
//                                     handleChange(
//                                         event,
//                                         subjectIndex,
//                                         "resources",
//                                         resourceIndex
//                                     )
//                                 }
//                             />
//                         </label>
//                         <button
//                             type="button"
//                             onClick={() => removeResource(subjectIndex, resourceIndex)}
//                         >
//                             Remove Resource
//                         </button>
//                     </div>
//                 ))}
//                 <button type="button" onClick={() => addResource(subjectIndex)}>
//                     Add Resource
//                 </button>
//             </div>
//         ))}
//         <button type="submit">Submit</button>
//     </form>
// );
