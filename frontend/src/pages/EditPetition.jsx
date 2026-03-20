import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./EditPetition.module.css";

const EditPetition = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [target, setTarget] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchPetition();
  }, []);

  /* FETCH PETITION DATA */

  const fetchPetition = async () => {
    try {

      const res = await fetch(`http://localhost:3000/api/petitions/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch petition");
      }

      const data = await res.json();

      setTitle(data.title || "");
      setCategory(data.category || "");
      setLocation(data.location || "");
      setTarget(data.target || "");
      setDescription(data.description || "");

    } catch (error) {
      console.error("Error loading petition:", error);
    }
  };

  /* UPDATE PETITION */

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch(`http://localhost:3000/api/petitions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          category,
          location,
          target,
          description,
        }),
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }

      alert("Petition Updated Successfully");

      navigate("/petitions");

    } catch (error) {
      console.error("Update error:", error);
      alert("Error updating petition");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Edit Petition</h2>

      <form onSubmit={handleUpdate} className={styles.form}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />

        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          required
        />

        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Target"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />

        <button type="submit">Update Petition</button>
      </form>
    </div>
  );
};

export default EditPetition;