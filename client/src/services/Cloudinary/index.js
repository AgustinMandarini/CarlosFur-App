import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Image } from "react-bootstrap";
import { setImageURL } from "../../redux/actions";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();

  const uploadImage = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("file", image);
    data.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
    data.append("folder", "Cloudinary-React");
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();
      setUrl(res.secure_url);
      dispatch(setImageURL(res.secure_url));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setPreview(reader.result);
      };
    } else {
      console.log("No se selecciono ninguna imagen!");
    }
  };

  const handleResetClick = () => {
    setPreview(null);
    setImage(null);

    const inputFile = document.getElementById("hidden-input");
    if (inputFile) {
      inputFile.value = ""; // Esto borra la selección de archivo anterior
    }
  };

  return (
    <div>
      <div>
        <header>
          <p>
            <span>Click on Upload a File</span>&nbsp;
          </p>
          <input
            id="hidden-input"
            type="file"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />
          <div>{preview && <img src={preview} alt="preview" />}</div>
        </header>
        <div>
          <button onClick={uploadImage}>Upload now</button>
          <button onClick={handleResetClick}>Reset</button>
        </div>
        {loading ? (
          <div>
            <div></div>
            <span>Processing...</span>
          </div>
        ) : (
          url && (
            <div>
              <Image
                cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                secure_url={url}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
