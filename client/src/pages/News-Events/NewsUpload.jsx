import React, { useEffect, useRef, useState } from "react";
import style from "../../css/newsUpload.module.css";
export const NewsUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setthumbnail] = useState(null);
  const [images, setImages] = useState([]);
  const [markdown, setMarkdown] = useState(null);
  const [eventType, setEventType] = useState("");

  const [titleLeft, setTitleLeft] = useState(0);
  const [desLeft, setDesLeft] = useState(0);

  const [thumbnailLimit, setthumbnailLimit] = useState(0.00);
  const [imagesLimit, setimagesLimit] = useState(0.00);
  
  const [previewImage, setPreviewImage] = useState(null);

  const submitRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("news_title", title);
    formData.append("news_description", description);
    formData.append("news_thumbnail", thumbnail);
    [...images].forEach((image, index) => {
      formData.append(`news_events_images`, image);
    });
    // formData.append("news_events_images", images);
    formData.append("news_events_markdown", markdown);
    formData.append("news_events_type", eventType);

    console.log(title, description, thumbnail, images, markdown);
    const requestOptions = {
      method: "POST",
      body: formData,
    };

    const response = await fetch(
      `${import.meta.env.VITE_REACT_BASE_BACKEND_URL}/news-events/`,
      requestOptions
    );
    const data = await response.json();

    console.log(data);
  };
  useEffect(() => {
    setTitleLeft(title.length);

  }, [title]);

  useEffect(() => {
    setDesLeft(description.length);
  }, [description]);

  useEffect(() => {
    setthumbnailLimit(thumbnail ? (thumbnail.size / 1048576).toFixed(2) : 0.00.toFixed(2));
  }, [thumbnail]);

  useEffect(() => {
    let totalSize = 0;
    for (let i = 0; i < images.length; i++) {
      totalSize += images[i].size;
    }

    setimagesLimit((totalSize / 1048576).toFixed(2));
  }, [images]);

  useEffect(() => {
    if (
      (thumbnailLimit > 1.00 || thumbnailLimit == 0.00) ||
      (imagesLimit > 10.00 || imagesLimit == 0.00) ||
      (markdown === null || markdown === undefined)
    ) {
      submitRef.current.disabled = true;
    } else submitRef.current.disabled = false;
  }, [thumbnailLimit, imagesLimit, markdown, title, description]);
  return (
    <>
      <form
        className={style.form}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="title">
          <label htmlFor="news_title">
            NEWS Title <p>{titleLeft}/50</p>
          </label>
          <input
            type="text"
            name="news_title"
            id="news_title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
            maxLength="50"
          />
        </div>
        <div className={style.description}>
          <label htmlFor="news_description">
            NEWS Description <p>{desLeft}/100</p>
          </label>
          <textarea
            type="text"
            name="news_description"
            id="news_description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
            maxLength="100"
          />
        </div>
        <div>
          <div className={style.description}>
            <label htmlFor="news_events_images">
              NEWS IMAGES <p>{imagesLimit}/10MB</p>
            </label>
            <input
              multiple
              type="file"
              accept="image/*"
              name="news_events_images"
              id="news_events_images"
              onChange={(e) => {
                const files = Array.from(e.target.files);

                for (let i = 0; i < files.length; i++) {
                  const file = files[i];

                  // Check file type
                  if (!file.type.startsWith("image/")) {
                    alert("Invalid file type. Please upload image files only.");
                    e.target.value = ""; // Clear the selected file(s)
                    return;
                  }
                }
                setImages(files);
              }}
            />
          </div>
          <div className={style.description}>
            <label htmlFor="news_events_markdown">NEWS MARKDOWN</label>
            <input
              type="file"
              name="news_events_markdown"
              id="news_events_markdown"
              onChange={(e) => setMarkdown(e.target.files[0])}
            />
          </div>
          <div className={style.thumbnail}>
            <label htmlFor="news_thumbnail">
              Upload Thumbnail <p>{thumbnailLimit}/1MB</p>
            </label>
            <input
              type="file"
              accept="image/jpg"
              name="news_thumbnail"
              id="news_thumbnail"
              onChange={(e) => {
                if (!e.target.files[0]?.type.startsWith("image/")) {
                  alert("Upload Image Files only");
                  e.target.value = "";
                }
                if (e.target.files[0]?.type.startsWith("image/"))
                  setthumbnail(e.target.files[0]);
              }}
            />
          </div>
          <div className={style.thumbnail}>
            <label htmlFor="event_type">News/Events type</label>
            <select
              name="event_type"
              id="event_type"
              value={eventType}
              onChange={(e) => {
                setEventType(e.target.value);
              }}
            >
              <option value="">--SELECT--</option>
              <option value="GENERAL">GENERAL</option>
              <option value="CSE">CSE</option>
              <option value="CIVIL">CIVIL</option>
              <option value="ELECTRICAL">ELECTRICAL</option>
              <option value="MECHANICAL">MECHANICAL</option>
              <option value="INSTRUMENTATION">INSTRUMENTATION</option>
            </select>
          </div>
        </div>

        <button ref={submitRef} type="submit">
          Submit
        </button>
        {/* {previewImage && <img width="300px" src={previewImage} alt="Preview" />} */}
      </form>
    </>
  );
};
